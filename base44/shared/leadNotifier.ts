// Yeni talep bildirimi: verilen Lead kaydı için admin kullanıcılara e-posta gönderir.
// notifyNewLead ve aiAssistant (AI asistan talep kaydı) ortak mantığı.
export async function notifyLeadCreated(base44, lead) {
  const users = await base44.asServiceRole.entities.User.list('-created_date', 100);
  const admins = (Array.isArray(users) ? users : [])
    .filter((u) => u.role === 'admin' && u.email)
    .slice(0, 3);
  if (admins.length === 0) {
    return 0;
  }

  const subject = `Yeni Müşteri Talebi — ${lead.name}`;
  const bodyText = [
    'Yeni bir müşteri talebi aldınız.',
    '',
    `Ad Soyad: ${lead.name}`,
    `E-posta: ${lead.email}`,
    lead.phone ? `Telefon: ${lead.phone}` : null,
    lead.company ? `Firma: ${lead.company}` : null,
    `Sektör: ${lead.sector || 'belirtilmedi'}`,
    lead.service ? `İlgilenilen hizmet: ${lead.service}` : null,
    `Kaynak: ${lead.source || 'web_form'}`,
    '',
    'Mesaj:',
    lead.message || '',
    '',
    'Talebi yönetim panelinizin "Müşteri Talepleri" bölümünden görüntüleyebilirsiniz.',
    '— DijiTrak',
  ]
    .filter((l) => l !== null)
    .join('\n');

  let notified = 0;
  for (const admin of admins) {
    try {
      await base44.asServiceRole.integrations.Core.SendEmail({
        to: admin.email,
        subject,
        body: bodyText,
      });
      notified++;
    } catch (e) {
      // Tek bir alıcıdaki hata bildirim akışını bozmasın
    }
  }
  return notified;
}

// Müşteri onayı: talebi oluşturan kişiye "talebiniz alındı" e-postası gönderir (best-effort).
export async function confirmLeadToCustomer(base44, lead) {
  try {
    await base44.asServiceRole.integrations.Core.SendEmail({
      to: lead.email,
      from_name: 'DijiTrak',
      subject: 'Talebiniz alındı — DijiTrak',
      body: [
        `Merhaba ${lead.name},`,
        '',
        lead.service ? `${lead.service} konusundaki talebiniz ekibimize ulaştı.` : 'Talebiniz ekibimize ulaştı.',
        'En geç 1 iş günü içinde size dönüş yapacağız.',
        '',
        'Bu arada sorularınız için AI asistanımız 7/24 yanınızda: https://dijitrak.net/ai-asistan',
        'Randevu almak isterseniz takvimimiz hazır: https://dijitrak.net/randevu',
        '',
        '— DijiTrak Ekibi',
      ].join('\n'),
    });
    return true;
  } catch (e) {
    // Onay e-postası gönderilemezse akışı bozmaz
    return false;
  }
}

// Müşteri onayı: randevu talebinde bulunan kişiye tarih/saat teyidi e-postası gönderir (best-effort).
export async function confirmAppointmentToCustomer(base44, appt) {
  try {
    const dateStr = appt.date
      ? new Date(`${appt.date}T00:00:00`).toLocaleDateString('tr-TR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
      : 'belirtilmedi';
    await base44.asServiceRole.integrations.Core.SendEmail({
      to: appt.email,
      from_name: 'DijiTrak',
      subject: `Randevu talebiniz alındı — ${dateStr}${appt.time ? ' ' + appt.time : ''}`,
      body: [
        `Merhaba ${appt.name},`,
        '',
        'Ücretsiz keşif randevu talebiniz ekibimize ulaştı:',
        `📅 ${dateStr}${appt.time ? ` · ⏰ ${appt.time}` : ''}`,
        appt.service ? `Görüşme konusu: ${appt.service}` : null,
        '',
        'Ekibimiz randevunuzu teyit etmek için en kısa sürede sizinle iletişime geçecek.',
        'Talebinizi değiştirmek isterseniz bize WhatsApp üzerinden yazabilirsiniz.',
        '',
        '— DijiTrak Ekibi',
      ]
        .filter((l) => l !== null)
        .join('\n'),
    });
    return true;
  } catch (e) {
    // Onay e-postası gönderilemezse akışı bozmaz
    return false;
  }
}

// Yeni randevu bildirimi: verilen Appointment kaydı için admin kullanıcılara e-posta gönderir.
export async function notifyAppointmentCreated(base44, appt) {
  const users = await base44.asServiceRole.entities.User.list('-created_date', 100);
  const admins = (Array.isArray(users) ? users : [])
    .filter((u) => u.role === 'admin' && u.email)
    .slice(0, 3);
  if (admins.length === 0) {
    return 0;
  }

  const dateStr = appt.date
    ? new Date(`${appt.date}T00:00:00`).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })
    : 'belirtilmedi';

  const subject = `Yeni Randevu Talebi — ${appt.name} · ${dateStr} ${appt.time || ''}`;
  const bodyText = [
    'Yeni bir ücretsiz keşif randevusu talebi aldınız.',
    '',
    `Ad Soyad: ${appt.name}`,
    `E-posta: ${appt.email}`,
    appt.phone ? `Telefon: ${appt.phone}` : null,
    appt.company ? `Firma: ${appt.company}` : null,
    appt.service ? `Görüşülecek hizmet: ${appt.service}` : null,
    `Tarih: ${dateStr}`,
    `Saat: ${appt.time || 'belirtilmedi'}`,
    appt.message ? `Not: ${appt.message}` : null,
    '',
    'Randevuyu yönetim panelinizin "Randevular" bölümünden onaylayabilirsiniz.',
    '— DijiTrak',
  ]
    .filter((l) => l !== null)
    .join('\n');

  let notified = 0;
  for (const admin of admins) {
    try {
      await base44.asServiceRole.integrations.Core.SendEmail({
        to: admin.email,
        subject,
        body: bodyText,
      });
      notified++;
    } catch (e) {
      // Tek bir alıcıdaki hata bildirim akışını bozmasın
    }
  }
  return notified;
}