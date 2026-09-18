import { createClientFromRequest } from 'npm:@base44/sdk@0.8.44';

// Randevu takviminde dolu saat sorgusu: verilen gün için rezerve edilmiş
// saatleri döndürür. Yalnızca saat listesi paylaşılır; kişisel veri dönmez.
// (Appointment kayıtları RLS ile sahiplerine kısıtlı olduğu için doluluk
// kontrolü service role üzerinden yapılır.)
export default async function (req: Request): Promise<Response> {
  try {
    const base44 = createClientFromRequest(req);
    const body = await req.json().catch(() => ({}));
    const date = String(body?.date || '');
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return Response.json({ error: 'Geçersiz tarih' }, { status: 400 });
    }
    const appts = await base44.asServiceRole.entities.Appointment.filter({ date });
    const taken = [...new Set(
      appts
        .filter((a) => a.status !== 'iptal' && a.time)
        .map((a) => a.time)
    )];
    return Response.json({ taken });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}