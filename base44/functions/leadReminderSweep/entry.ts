import { createClientFromRequest } from 'npm:@base44/sdk@0.8.44';

// 48 saatten eski, hâlâ "yeni" durumundaki taleplere hatırlatma e-postası gönderir.
// Yalnızca admin çağırabilir; admin panelindeki "48s hatırlatma gönder" düğmesi veya
// (Builder+ planında) günlük zamanlanmış bir workflow bu fonksiyonu tetikleyebilir.
export default async function(req: Request): Promise<Response> {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user || user.role !== 'admin') {
      return Response.json({ error: 'Yetkisiz erişim' }, { status: 403 });
    }

    const cutoff = Date.now() - 48 * 60 * 60 * 1000;
    const result = await base44.asServiceRole.entities.Lead.filter({ status: 'yeni' }, 'created_date', 200);
    const rows: any[] = (Array.isArray(result) ? result : [])
      .filter((l: any) => new Date(l.created_date || 0).getTime() < cutoff)
      .slice(0, 25);

    let sent = 0;
    const failed: string[] = [];
    for (const lead of rows) {
      try {
        await base44.asServiceRole.integrations.Core.SendEmail({
          to: lead.email,
          subject: 'DijiTrak talebiniz hakkında kısa bir hatırlatma',
          text:
            `Merhaba ${lead.name},\n\n` +
            `DijiTrak ekibi olarak talebinizi aldığımızı ve en kısa sürede size döneceğimizi bildirmek istedik. ` +
            `${lead.service ? `Talebiniz: ${lead.service}. ` : ''}` +
            `Bu arada sorularınız varsa 7/24 AI asistanımızı kullanabilir ya da +90 282 123 45 67 numarasından bize ulaşabilirsiniz.\n\n` +
            `DijiTrak Ajans — merhaba@dijitrak.net`,
        });
        const notes = Array.isArray(lead.notes) ? lead.notes : [];
        await base44.asServiceRole.entities.Lead.update(lead.id, {
          notes: [
            ...notes,
            {
              text: '48 saatte dönüş alınamadı — otomatik hatırlatma e-postası gönderildi.',
              author: 'Sistem',
              date: new Date().toISOString(),
            },
          ],
        });
        sent++;
      } catch {
        failed.push(lead.email);
      }
    }

    return Response.json({ sent, considered: rows.length, failed });
  } catch (error) {
    return Response.json({ error: (error as any).message || String(error) }, { status: 500 });
  }
}