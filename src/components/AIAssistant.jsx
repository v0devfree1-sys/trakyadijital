import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { X, Send, FileText, MessageSquare, RotateCcw, Sparkles, CalendarCheck, SearchCheck, Wheat } from "lucide-react";
import RobotMascot from "@/components/mascot/RobotMascot";
import MascotBubble from "@/components/mascot/MascotBubble";
import { OPEN_ASSISTANT_EVENT } from "@/lib/assistant";
import { MASCOT_SAY_EVENT } from "@/lib/mascotBus";
import LeadForm from "@/components/LeadForm";
import WhatsAppCta from "@/components/chat/WhatsAppCta";
import ChatMarkdown from "@/components/ChatMarkdown";
import SeoAuditCard from "@/components/chat/SeoAuditCard";
import { useLang } from "@/lib/i18n";
import { useAssistantChat } from "@/lib/useAssistantChat";

const GREETING =
  "Merhaba! Ben DijiTrak'ın AI asistanıyım. Fiyatlar, süreç ve sektör çözümleri hakkında her şeyi sorabilirsiniz.";

// Maskotun sayfa geçişlerinde verdiği tepkiler
const PAGE_REACTIONS = {
  "/": "Ana sayfadayız! Hizmetlerimize göz atabilirsin 🌻",
  "/sektorler": "Sektörüne özel çözümler tam burada!",
  "/isletmeler": "Trakya işletme rehberini keşfediyorsun!",
  "/iz-biraktiklarimiz": "Yayınladığımız işlerden ilham alabilirsin!",
  "/blog": "Rehberlerimiz SEO ve e-ticaret için tam kılavuz!",
  "/randevu": "Takvimden gününü seç — 30 dakikada net yol haritası çıkarız!",
  "/iletisim": "Formu doldurursan ekibim 1 iş günü içinde döner!",
  "/trakya-web-tasarim": "Trakya'da web tasarım rehberine hoş geldin!",
  "/hakkimizda": "Beni ve ekibimi daha yakından tanıyabilirsin!",
  "/sss": "Aklındaki sorunun cevabı muhtemelen burada!",
};
const PAGE_FALLBACK = "Bu sayfada ne ararsan bana sorabilirsin!";

const QUICK_ACTIONS = [
  { label: "Fiyat teklifi al", icon: Sparkles, message: "Web sitesi için fiyat teklifi almak istiyorum." },
  { label: "Ücretsiz SEO denetimi", icon: SearchCheck, message: "Sitem için ücretsiz SEO denetimi istiyorum." },
  { label: "Randevu oluştur", icon: CalendarCheck, to: "/randevu" },
  { label: "Tarım işletmesiyim", icon: Wheat, message: "Tarım işletmesiyim, bana özel çözümleriniz neler?" },
];

export default function AIAssistant() {
  const { t } = useLang();
  const { messages, loading, send, reset } = useAssistantChat(GREETING);
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState("chat");
  const [input, setInput] = useState("");
  const endRef = useRef(null);

  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener(OPEN_ASSISTANT_EVENT, handler);
    return () => window.removeEventListener(OPEN_ASSISTANT_EVENT, handler);
  }, []);

  useEffect(() => {
    if (open && tab === "chat") endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open, loading, tab]);

  // --- Maskot tepkileri: site gezerken zaman ve kaydırma bazlı balonlar ---
  const [bubble, setBubble] = useState(null);
  const [hovering, setHovering] = useState(false);
  const shown = useRef(new Set());
  const hideTimer = useRef(null);

  const showBubble = (msg) => {
    if (hideTimer.current) clearTimeout(hideTimer.current);
    setBubble(msg);
    hideTimer.current = setTimeout(() => setBubble(null), 8000);
  };

  useEffect(() => {
    return () => {
      if (hideTimer.current) clearTimeout(hideTimer.current);
    };
  }, []);

  useEffect(() => {
    if (open) {
      setBubble(null);
      return;
    }
    const t1 = setTimeout(() => {
      if (!shown.current.has("greet")) {
        shown.current.add("greet");
        showBubble(t("Merhaba! Ben DijiTrak'ın robot asistanıyım 🤖 Sorularını yanıtlamaya hazırım!"));
      }
    }, 10000);
    const t2 = setTimeout(() => {
      if (!shown.current.has("tip")) {
        shown.current.add("tip");
        showBubble(t("Aklına takılan bir şey varsa bana yazabilirsin — 7/24 buradayım!"));
      }
    }, 50000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const { scrollYProgress } = useScroll();
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (open || v < 0.55 || shown.current.has("seo")) return;
    shown.current.add("seo");
    showBubble(t("Buraya kadar geldin! Siten için ücretsiz SEO denetimi ister misin?"));
  });

  const expression = hovering ? "wink" : bubble ? "happy" : "idle";

  // --- Sayfa geçişi tepkisi: maskot yeni sayfayı fark eder ---
  const location = useLocation();
  const firstRender = useRef(true);
  useEffect(() => {
    const key = `page:${location.pathname}`;
    if (firstRender.current) {
      firstRender.current = false;
      shown.current.add(key);
      return;
    }
    if (open || shown.current.has(key)) return;
    shown.current.add(key);
    const id = setTimeout(() => showBubble(t(PAGE_REACTIONS[location.pathname] || PAGE_FALLBACK)), 900);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, open]);

  // --- Form tepkileri: LeadForm, Randevu gibi bileşenlerden gelen mesajlar ---
  useEffect(() => {
    const handler = (e) => {
      if (open) return;
      showBubble(e.detail?.message);
    };
    window.addEventListener(MASCOT_SAY_EVENT, handler);
    return () => window.removeEventListener(MASCOT_SAY_EVENT, handler);
  }, [open]);

  const lastAiIndex = [...messages].reverse().findIndex((m) => m.role === "ai");
  const lastAi = lastAiIndex === -1 ? -1 : messages.length - 1 - lastAiIndex;
  const lastQuote = [...messages].reverse().find((m) => m.role === "ai" && m.quote);

  return (
    <>
      {/* Maskot tepki balonu */}
      <AnimatePresence>
        {!open && bubble && <MascotBubble message={bubble} onClick={() => setOpen(true)} />}
      </AnimatePresence>

      {/* Maskot düğmesi — robot asistan */}
      <AnimatePresence>
        {!open && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            onClick={() => setOpen(true)}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
            className="fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-5 z-[80] w-16 h-16 rounded-full bg-[#0A0A0B] border-2 border-primary text-primary flex items-center justify-center shadow-[0_10px_40px_-8px_rgba(251,178,43,0.55)] hover:scale-105 hover:shadow-[0_14px_50px_-8px_rgba(251,178,43,0.7)] transition-all"
            aria-label={t("Canlı sohbet aç")}
          >
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-[#0A0A0B]" />
            <RobotMascot expression={expression} spin className="w-10 h-10" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Canlı sohbet paneli */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
            className="fixed bottom-0 right-0 sm:bottom-5 sm:right-5 z-[80] w-full sm:w-[400px] h-[min(640px,calc(100dvh-5rem))] sm:h-[min(600px,calc(100dvh-2.5rem))] bg-[#0A0A0B] border border-white/15 sm:border shadow-[0_30px_80px_-20px_rgba(0,0,0,0.9)] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="border-b border-white/15 px-4 py-3.5 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <span className="w-9 h-9 rounded-full bg-primary/10 border border-primary/40 flex items-center justify-center shrink-0">
                  <RobotMascot expression="happy" className="w-6 h-6 text-primary" />
                </span>
                <div>
                  <p className="text-sm font-bold tracking-tight">{t("CANLI SOHBET")}</p>
                  <p className="text-[11px] text-muted-foreground flex items-center gap-1.5">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
                    </span>
                    {t("AI ASİSTAN AKTİF · 7/24")}
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <button onClick={reset} className="p-2 text-muted-foreground hover:text-primary transition-colors" aria-label={t("Sohbeti Sıfırla")}>
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button onClick={() => setOpen(false)} className="p-2 text-muted-foreground hover:text-foreground transition-colors" aria-label={t("Kapat")}>
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-white/15 shrink-0">
              <button
                onClick={() => setTab("chat")}
                className={`flex-1 text-xs font-bold py-3.5 flex items-center justify-center gap-2 transition-colors ${
                  tab === "chat" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <MessageSquare className="w-3.5 h-3.5" /> {t("SOHBET")}
              </button>
              <button
                onClick={() => setTab("form")}
                className={`flex-1 text-xs font-bold py-3.5 flex items-center justify-center gap-2 transition-colors ${
                  tab === "form" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <FileText className="w-3.5 h-3.5" /> {t("TEKLİF AL")}
                {lastQuote && tab !== "form" && <span className="w-1.5 h-1.5 bg-primary animate-pulse" />}
              </button>
            </div>

            {tab === "chat" ? (
              <>
                <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3.5">
                  {messages.map((m, i) => (
                    <div key={i} className={`flex flex-col ${m.role === "user" ? "items-end" : "items-start"}`}>
                      <span className={`text-[10px] font-bold tracking-wider text-muted-foreground mb-1 ${m.role === "user" ? "pr-1" : "pl-1"}`}>
                        {m.role === "user" ? t("SİZ") : t("ASİSTAN")}
                      </span>
                      <div
                        className={`max-w-[85%] px-3.5 py-2.5 text-sm leading-relaxed ${
                          m.role === "user"
                            ? "bg-primary text-primary-foreground font-medium"
                            : "bg-[#101010] border border-white/15 border-l-2 border-l-primary text-foreground/90"
                        }`}
                      >
                        {m.role === "user" ? m.text : <ChatMarkdown text={m.text} />}
                      </div>

                      {m.role === "ai" && m.seo && <SeoAuditCard seo={m.seo} />}

                      {/* Son AI mesajı için akıllı öneriler + teklif CTA */}
                      {m.role === "ai" && i === lastAi && i === messages.length - 1 && !loading && (
                        <>
                          {(m.quote || m.booking) && (
                            <div className="flex flex-wrap gap-2 mt-2">
                              {m.quote && (
                                <button
                                  onClick={() => setTab("form")}
                                  className="inline-flex items-center gap-1.5 bg-primary text-primary-foreground text-xs font-bold px-3.5 py-2.5 hover:brightness-110 active:scale-95 transition-all"
                                >
                                  <Sparkles className="w-3.5 h-3.5" /> {t("Teklif Al")}
                                </button>
                              )}
                              {m.booking && (
                                <Link
                                  to="/randevu"
                                  onClick={() => setOpen(false)}
                                  className="inline-flex items-center gap-1.5 border border-primary text-primary text-xs font-bold px-3.5 py-2.5 hover:bg-primary hover:text-primary-foreground active:scale-95 transition-all"
                                >
                                  <CalendarCheck className="w-3.5 h-3.5" /> {t("Randevu Al")}
                                </Link>
                              )}
                            </div>
                          )}
                          {Array.isArray(m.suggestions) && m.suggestions.length > 0 && (
                            <div className="mt-2.5 max-w-[95%]">
                              <p className="text-[10px] font-bold tracking-wider text-muted-foreground mb-1.5">{t("İLGİNİ ÇEKEBİLİR")}</p>
                              <div className="flex flex-wrap gap-2">
                                {m.suggestions.map((s) => (
                                  <button
                                    key={s}
                                    onClick={() => send(s)}
                                    className="text-xs border border-white/20 px-3.5 py-2.5 text-foreground/80 hover:border-primary hover:text-primary active:border-primary/60 active:text-primary active:scale-[0.97] transition-all text-left"
                                  >
                                    {s}
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  ))}
                  {loading && (
                    <div className="flex justify-start">
                      <div className="bg-[#101010] border border-white/15 border-l-2 border-l-primary px-4 py-3 flex items-center gap-2.5">
                        <div className="flex items-center gap-1.5">
                          {[0, 1, 2].map((i) => (
                            <span key={i} className="w-1.5 h-1.5 bg-primary animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                          ))}
                        </div>
                        <span className="text-[11px] text-muted-foreground">{t("Asistan yazıyor…")}</span>
                      </div>
                    </div>
                  )}
                  {messages.length <= 2 && !loading && (
                    <div className="pt-1.5">
                      <p className="text-[10px] font-bold tracking-wider text-muted-foreground mb-2">{t("HIZLI BAŞLA")}</p>
                      <div className="grid grid-cols-2 gap-2">
                        {QUICK_ACTIONS.map((q) => {
                          const Icon = q.icon;
                          return q.to ? (
                            <Link
                              key={q.label}
                              to={q.to}
                              className="text-xs font-medium border border-white/20 px-3 py-3 flex items-center gap-2 text-foreground/80 hover:border-primary hover:text-primary active:border-primary/60 active:text-primary active:scale-[0.97] transition-all"
                            >
                              <Icon className="w-4 h-4 shrink-0 text-primary" />
                              {t(q.label)}
                            </Link>
                          ) : (
                            <button
                              key={q.label}
                              onClick={() => send(t(q.message))}
                              className="text-xs font-medium border border-white/20 px-3 py-3 flex items-center gap-2 text-foreground/80 hover:border-primary hover:text-primary active:border-primary/60 active:text-primary active:scale-[0.97] transition-all"
                            >
                              <Icon className="w-4 h-4 shrink-0 text-primary" />
                              {t(q.label)}
                            </button>
                          );
                        })}
                        <WhatsAppCta className="col-span-2 text-xs font-medium inline-flex items-center justify-center gap-1.5 border border-emerald-500/40 px-3 py-3 text-emerald-400 hover:border-emerald-400 hover:text-emerald-300 transition-colors" />
                      </div>
                    </div>
                  )}
                  <div ref={endRef} />
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    send(input);
                    setInput("");
                  }}
                  className="border-t border-white/15 p-3.5 pb-[max(0.875rem,env(safe-area-inset-bottom))] flex items-center gap-3 shrink-0"
                >
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={t("Mesajınızı yazın…")}
                    className="flex-1 bg-[#101010] border border-white/15 px-3.5 py-3.5 text-base placeholder:text-muted-foreground focus:outline-none focus:border-primary"
                  />
                  <button
                    type="submit"
                    disabled={loading || !input.trim()}
                    className="bg-primary text-primary-foreground w-11 h-11 shrink-0 hover:brightness-110 active:scale-95 disabled:opacity-40 transition-all"
                    aria-label={t("Gönder")}
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </>
            ) : (
              <div className="flex-1 overflow-y-auto px-4 py-5 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
                {lastQuote?.lead && (
                  <div className="mb-4 border border-primary/40 bg-primary/10 px-3.5 py-2.5 text-[11px] font-mono text-primary/90 flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 shrink-0" />
                    {t("Sohbette paylaştığın bilgileri forma aktardım — eksikleri tamamla ve gönder!")}
                  </div>
                )}
                <div className="mb-4">
                  <h3 className="font-heading text-base font-bold">{t("Ücretsiz Teklif Formu")}</h3>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                    {t("Formu doldurun — ekibimiz 1 iş günü içinde net fiyat teklifiyle size döner. Bilgileriniz KVKK kapsamında korunur.")}
                  </p>
                  <div className="grid grid-cols-3 border border-white/10 mt-3 divide-x divide-white/10">
                    {[
                      { n: "1", label: t("Formu doldur") },
                      { n: "2", label: t("Ekibimiz inceler") },
                      { n: "3", label: t("Teklifin gelsin") },
                    ].map((s) => (
                      <div key={s.n} className="px-2.5 py-2.5 text-center">
                        <span className="inline-flex items-center justify-center w-5 h-5 bg-primary text-primary-foreground text-[10px] font-bold mb-1.5">
                          {s.n}
                        </span>
                        <p className="text-[10px] leading-snug text-muted-foreground">{s.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <LeadForm source="ai_asistan" compact prefill={lastQuote?.lead} />
                <div className="mt-4 border-t border-white/10 pt-4">
                  <p className="text-[11px] text-muted-foreground font-mono mb-2">{t("Ya da doğrudan yazın:")}</p>
                  <WhatsAppCta
                    message="Merhaba! DijiTrak'tan teklif almak istiyorum."
                    className="w-full inline-flex items-center justify-center gap-2 bg-emerald-500 text-white text-xs font-bold px-4 py-3 hover:brightness-110 transition-all"
                  />
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}