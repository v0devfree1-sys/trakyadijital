import { createClientFromRequest } from 'npm:@base44/sdk@0.8.44';
import { notifyLeadCreated, confirmLeadToCustomer } from '../../shared/leadNotifier.ts';

// Yeni müşteri talebi bildirimi: talep kaydedildikten sonra admin kullanıcılara e-posta gönderir.
// İstek, sunucuda gerçek ve yakın tarihli bir taleple eşleşmediği takdirde reddedilir.
export default async function(req) {
  try {
    const base44 = createClientFromRequest(req);
    const body = await req.json().catch(() => ({}));
    const leadId = typeof body.lead_id === 'string' ? body.lead_id.trim() : '';
    const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
    if (!leadId || !email.includes('@')) {
      return Response.json({ error: 'lead_id ve email zorunludur' }, { status: 400 });
    }

    // Bildirim isteğinin gerçek bir talebe ait olduğunu doğrula (spam koruması)
    const lead = await base44.asServiceRole.entities.Lead.get(leadId);
    if (!lead || (lead.email || '').toLowerCase() !== email) {
      return Response.json({ error: 'Talep bulunamadı' }, { status: 404 });
    }
    const createdMs = new Date(lead.created_date).getTime();
    if (Date.now() - createdMs > 2 * 60 * 60 * 1000) {
      return Response.json({ error: 'Talep süresi dolmuş' }, { status: 404 });
    }

    const notified = await notifyLeadCreated(base44, lead);
    const customerNotified = await confirmLeadToCustomer(base44, lead);
    return Response.json({ ok: true, notified, customerNotified });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}