// Teklif gönderimi: admin panelinden müşteriye HTML teklif e-postası yollar,
// teklifi "gonderildi" olarak işaretler ve ilgili talebin durumunu güncelleyerek
// satış akışını (talep -> teklif -> dönüş) bütünler.
import { createClientFromRequest } from 'npm:@base44/sdk@0.8.44';

const esc = (s) =>
  String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

export default async function(req) {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user) return Response.json({ error: 'Yetkisiz erişim' }, { status: 401 });
    if (user.role !== 'admin') return Response.json({ error: 'Bu işlem için admin yetkisi gerekiyor' }, { status: 403 });

    const body = await req.json().catch(() => ({}));
    const quoteId = String(body.quote_id || '').trim();
    if (!quoteId) {
      return Response.json({ error: 'quote_id zorunludur' }, { status: 400 });
    }

    const quote = await base44.entities.Quote.get(quoteId);
    if (!quote) return Response.json({ error: 'Teklif bulunamadı' }, { status: 404 });
    if (!quote.email) return Response.json({ error: 'Teklifte müşteri e-postası yok' }, { status: 400 });

    const fmt = new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: quote.currency || 'TRY',
      maximumFractionDigits: 2,
    });

    const items = (quote.items || []).filter((i) => i && i.description);
    const rows = items
      .map(
        (i) => `
        <tr>
          <td style="padding:10px 0;border-bottom:1px solid #ececec;font-size:14px;color:#1a1a1a;">${esc(i.description)}</td>
          <td style="padding:10px 0;border-bottom:1px solid #ececec;font-size:14px;color:#1a1a1a;text-align:right;white-space:nowrap;">${fmt.format(i.amount || 0)}</td>
        </tr>`
      )
      .join('');

    const validText = quote.valid_until
      ? new Date(`${quote.valid_until}T00:00:00`).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })
      : '';

    const html = `
    <div style="font-family:Arial,Helvetica,sans-serif;max-width:620px;margin:0 auto;border:1px solid #e5e5e5;">
      <div style="background:#FBB22B;padding:20px 28px;">
        <span style="font-size:20px;font-weight:bold;letter-spacing:1px;color:#241a05;">DİJİTRAK</span>
        <span style="float:right;font-size:12px;color:#241a05;padding-top:6px;">TRAKYA'NIN DİJİTAL İZİ</span>
      </div>
      <div style="padding:28px;color:#1a1a1a;">
        <p style="margin:0 0 6px;font-size:15px;">Merhaba ${esc(quote.name)},</p>
        <p style="margin:0 0 22px;font-size:14px;color:#444;">
          Talebinizle ilgili hazırladığımız teklifi aşağıda bulabilirsiniz.
        </p>

        <p style="margin:0 0 4px;font-size:13px;color:#888;text-transform:uppercase;letter-spacing:1px;">Teklif</p>
        <h2 style="margin:0 0 18px;font-size:20px;">${esc(quote.title)}</h2>

        <table style="width:100%;border-collapse:collapse;">
          <tr>
            <td style="padding:0 0 4px;font-size:13px;color:#888;">${esc(quote.company || '')}</td>
          </tr>
          ${rows}
          <tr>
            <td style="padding:14px 0;font-size:16px;"><strong>Toplam</strong></td>
            <td style="padding:14px 0;font-size:18px;text-align:right;"><strong>${fmt.format(quote.total || 0)}</strong></td>
          </tr>
        </table>

        ${validText ? `<p style="margin:18px 0 0;font-size:13px;color:#444;">Bu teklif <strong>${validText}</strong> tarihine kadar geçerlidir.</p>` : ''}
        ${quote.notes ? `<div style="margin:18px 0 0;padding:14px;background:#faf7ef;border-left:3px solid #FBB22B;font-size:13px;color:#333;white-space:pre-line;">${esc(quote.notes)}</div>` : ''}

        <p style="margin:26px 0 0;font-size:13px;color:#444;">
          Teklifi kabul etmek veya sorularınız için bu e-postayı yanıtlayabilir, WhatsApp üzerinden bize yazabilirsiniz.
        </p>
        <p style="margin:18px 0 0;font-size:13px;color:#888;">— DijiTrak Ekibi</p>
      </div>
    </div>`;

    await base44.asServiceRole.integrations.Core.SendEmail({
      to: quote.email,
      from_name: 'DijiTrak',
      subject: `DijiTrak Teklifi — ${quote.title}`,
      html,
    });

    const today = new Date().toISOString().slice(0, 10);
    await base44.entities.Quote.update(quote.id, { status: 'gonderildi', sent_date: today });

    // İlgili talebin durumunu akışta tut — ama "dönüştü"/"kayıp" gibi ilerlemiş
    // durumları geriye düşürme (hata akışı bozmasın)
    if (quote.lead_id) {
      try {
        const lead = await base44.entities.Lead.get(quote.lead_id);
        if (lead && (lead.status === 'yeni' || lead.status === 'iletisime_gecildi')) {
          await base44.entities.Lead.update(quote.lead_id, { status: 'teklif_gonderildi' });
        }
      } catch (e) {}
    }

    return Response.json({ ok: true, sent: quote.email });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}