import { createClientFromRequest } from 'npm:@base44/sdk@0.8.44';
import { notifyAppointmentCreated, confirmAppointmentToCustomer } from '../../shared/leadNotifier.ts';

// Yeni randevu bildirimi: randevu kaydedildikten sonra admin kullanıcılara e-posta gönderir.
// İstek, sunucuda gerçek ve yakın tarihli bir randevuyla eşleşmediği takdirde reddedilir.
export default async function(req) {
  try {
    const base44 = createClientFromRequest(req);
    const body = await req.json().catch(() => ({}));
    const appointmentId = typeof body.appointment_id === 'string' ? body.appointment_id.trim() : '';
    const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
    if (!appointmentId || !email.includes('@')) {
      return Response.json({ error: 'appointment_id ve email zorunludur' }, { status: 400 });
    }

    // Bildirim isteğinin gerçek bir randevuya ait olduğunu doğrula (spam koruması)
    const appt = await base44.asServiceRole.entities.Appointment.get(appointmentId);
    if (!appt || (appt.email || '').toLowerCase() !== email) {
      return Response.json({ error: 'Randevu bulunamadı' }, { status: 404 });
    }
    const createdMs = new Date(appt.created_date).getTime();
    if (Date.now() - createdMs > 2 * 60 * 60 * 1000) {
      return Response.json({ error: 'Randevu süresi dolmuş' }, { status: 404 });
    }

    const notified = await notifyAppointmentCreated(base44, appt);
    const customerNotified = await confirmAppointmentToCustomer(base44, appt);
    return Response.json({ ok: true, notified, customerNotified });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}