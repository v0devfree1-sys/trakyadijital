import { useEffect, useRef, useState } from "react";
import { base44 } from "@/api/base44Client";
import { useLang } from "@/lib/i18n";

// Sohbet geçmişi tarayıcıda saklanır: widget ile asistan sayfası aynı konuşmayı
// paylaşır ve sayfa yenilendiğinde sohbet kaybolmaz.
const STORAGE_KEY = "td_assistant_chat";
const MAX_STORED = 30;

function loadStored() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : null;
    if (Array.isArray(parsed) && parsed.length > 0) return parsed.slice(-MAX_STORED);
  } catch {
    // bozuk kayıt — yok say
  }
  return null;
}

export function useAssistantChat(greetingKey) {
  const { lang, t } = useLang();
  const [messages, setMessages] = useState(() => loadStored() || [{ role: "ai", text: t(greetingKey) }]);
  const [loading, setLoading] = useState(false);
  const inFlight = useRef(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages.slice(-MAX_STORED)));
    } catch {
      // kota doluysa sessizce geç
    }
  }, [messages]);

  // Dil değişince kayıtlı yanıtlar eski dilde kalacağından sohbeti yeniden başlat
  const firstRun = useRef(true);
  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }
    setMessages([{ role: "ai", text: t(greetingKey) }]);
  }, [lang]);

  async function send(presetText) {
    const text = (presetText ?? "").trim();
    if (!text || inFlight.current) return;
    inFlight.current = true;
    const history = [...messages, { role: "user", text }];
    setMessages(history);
    setLoading(true);
    try {
      const res = await base44.functions.invoke("aiAssistant", {
        message: text,
        lang,
        history: history.slice(-8).map((m) => ({ role: m.role === "user" ? "user" : "ai", text: m.text })),
      });
      const reply = res?.data?.reply || t("Üzgünüm, şu an yanıt alamadım. Lütfen tekrar deneyin.");
      setMessages((m) => [
        ...m,
        {
          role: "ai",
          text: reply,
          suggestions: res?.data?.suggestions || [],
          quote: res?.data?.quote_intent === true,
          booking: res?.data?.booking_intent === true,
          lead: res?.data?.lead || null,
          seo: res?.data?.seo || null,
        },
      ]);
    } catch (err) {
      const rateLimited = err?.response?.status === 429 || err?.response?.data?.error === "RATE_LIMITED";
      setMessages((m) => [
        ...m,
        {
          role: "ai",
          text: rateLimited
            ? t("Çok fazla mesaj gönderdiniz. Birkaç dakika sonra tekrar deneyin.")
            : t("Bağlantıda bir sorun oluştu. Lütfen tekrar dener misiniz?"),
        },
      ]);
    } finally {
      setLoading(false);
      inFlight.current = false;
    }
  }

  function reset() {
    setMessages([{ role: "ai", text: t(greetingKey) }]);
  }

  return { messages, loading, send, reset };
}