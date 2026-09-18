// WhatsApp iletişim linki merkezi tek yerden yönetilir
export const WHATSAPP_NUMBER = "902821234567";

export function whatsappUrl(message = "Merhaba! DijiTrak hakkında bilgi almak istiyorum.") {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}