import { createClientFromRequest } from 'npm:@base44/sdk@0.8.44';

// Randevu durumu panelden değiştiğinde müşteriye bilgilendirme e-postası gönderir.
// Yalnızca admin çağırabilir; "beklemede" durumuna dönüş için e-posta gönderilmez.
export default async function(req: Request): Promise<Response> {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user || user.role !== 'admin') {
      return Response.json({ error: 'Yetkisiz erişim' }, { status: 403 });
    }

    const body = await req.json().catch(() => ({}));
    const appointmentId = String(body.appointment_id || '').trim();
    const status = String(body.status || '').trim();
    if (!appointmentId || !['beklemede', 'onaylandi', 'gerceklesti', 'iptal'].includes(status)) {
      return Response.json({ error: 'Geçersiz istek' }, { status: 400 });
    }

    const appt = await base44.entities.Appointment.get(appointmentId);
    if (!appt) return Response.json({ error: 'Randevu bulunamadı' }, { status: 404 });
    if (!appt.email) return Response.json({ error: 'Randevuda e-posta bilgisi yok' }, { status: 400 });

    if (status === 'beklemede') {
      return Response.json({ ok: true, skipped: true });
    }

    const dateText = appt.date
      ? new Date(`${appt.date}T00:00:00`).toLocaleDateString('tr-TR', {
          weekday: 'long',
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        })
      : '';
    const when = `${dateText}${appt.time ? ` saat ${appt.time}` : ''}`;

    const texts: Record<string, { subject: string; body: string }> = {
      onaylandi: {
        subject: 'DijiTrak randevunuz onaylandı',
        body:
          `Merhaba ${appt.name},\n\n${when} tarihindeki keşif randevunuz onaylandı.\n` +
          `Görüşmek üzere! Sorunuz olursa bu e-postayı yanıtlamaktan çekinmeyin.\n\nDijiTrak Ajans`,
      },
      gerceklesti: {
        subject: 'DijiTrak görüşmemiz için teşekkürler',
        body:
          `Merhaba ${appt.name},\n\n${dateText || 'Son'} tarihindeki görüşmemiz için teşekkür ederiz.\n` +
          `Önerdiğimiz adımlar ve teklifimizle ilgili sorularınızı bu e-postaya yanıt olarak iletebilirsiniz.\n\nDijiTrak Ajans`,
      },
      iptal: {
        subject: 'DijiTrak randevunuz iptal edildi',
        body:
          `Merhaba ${appt.name},\n\n${when} tarihindeki randevunuz iptal edildi.\n` +
          `Yeni bir randevu isterseniz siteden kolayca tekrar planlayabilirsiniz.\n\nDijiTrak Ajans`,
      },
    };
    const t = texts[status];

    await base44.asServiceRole.integrations.Core.SendEmail({
      to: appt.email,
      from_name: 'DijiTrak',
      subject: t.subject,
      text: t.body,
    });

    return Response.json({ ok: true, sent: appt.email });
  } catch (error) {
    return Response.json({ error: (error as any).message || String(error) }, { status: 500 });
  }
}