export const OPEN_ASSISTANT_EVENT = "trakya:open-assistant";

export function openAssistant() {
  window.dispatchEvent(new CustomEvent(OPEN_ASSISTANT_EVENT));
}