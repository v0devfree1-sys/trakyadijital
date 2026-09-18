// Maskot tepki köprüsü: formlar gibi sayfa içi bileşenler maskota mesaj gönderebilir
export const MASCOT_SAY_EVENT = "mascot:say";

export function mascotSay(message) {
  window.dispatchEvent(new CustomEvent(MASCOT_SAY_EVENT, { detail: { message } }));
}