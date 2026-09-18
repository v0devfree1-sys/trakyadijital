import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Send, Terminal, RotateCcw, FileText, Sparkles, CalendarCheck } from "lucide-react";
import LeadForm from "@/components/LeadForm";
import WhatsAppCta from "@/components/chat/WhatsAppCta";
import ChatMarkdown from "@/components/ChatMarkdown";
import SeoAuditCard from "@/components/chat/SeoAuditCard";
import { useLang } from "@/lib/i18n";
import { useAssistantChat } from "@/lib/useAssistantChat";
import usePageMeta from "@/lib/usePageMeta";

const GREETING =
  "Merhaba! Ben DijiTrak'ın AI asistanıyım. Fiyatlar, süreç, SEO, e-ticaret ve sektör çözümleri hakkında her şeyi sorabilirsiniz.";

const QUICK_ACTIONS = [
  { label: "Fiyat teklifi al", message: "Web sitesi için fiyat teklifi almak istiyorum." },
  { label: "Ücretsiz SEO denetimi", message: "Sitem için ücretsiz SEO denetimi istiyorum." },
  { label: "Randevu oluştur", to: "/randevu" },
  { label: "Esnaf işletmesiyim", message: "Esnaf işletmesiyim, bana özel çözümleriniz neler?" },
];

const SUGGESTIONS = [
  "Web sitesi ne kadar sürede teslim edilir?",
  "SEO çalışmaları neyi kapsıyor?",
  "E-ticaret paketi neler içeriyor?",
  "Bakım ve destek hizmeti nasıl işliyor?",
  "Google Haritalar optimizasyonu yapıyor musunuz?",
];

function TypingDots() {
  return (
    <span className="inline-flex items-center gap-1.5 px-1">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce"
          style={{ animationDelay: `${i * 0.15}s` }}
        />
      ))}
    </span>
  );
}

export default function AIChat() {
  const { t } = useLang();
  const { messages, loading, send, reset } = useAssistantChat(GREETING);
  const [input, setInput] = useState("");
  const endRef = useRef(null);

  usePageMeta({
    title: "AI Asistan | DijiTrak — 7/24 Dijital Danışmanlık ve Teklif",
    description:
      "DijiTrak AI asistanı: fiyatlar, süreç, SEO ve e-ticaret sorularınızı 7/24 yanıtlayan akıllı danışman. Anında teklif alın.",
  });

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const lastAiIndex = [...messages].reverse().findIndex((m) => m.role === "ai");
  const lastAi = lastAiIndex === -1 ? -1 : messages.length - 1 - lastAiIndex;
  const lastQuote = [...messages].reverse().find((m) => m.role === "ai" && m.quote);
  const formRef = useRef(null);

  return (
    <div className="pt-16 pb-20 min-h-screen bg-[#0A0A0B]">
      <div className="relative max-w-7xl mx-auto px-6 pt-10">
        <div className="flex items-end justify-between gap-4 flex-wrap">
          <div>
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 bg-primary" />
              <p className="text-[11px] font-mono tracking-[0.25em] text-primary">{t("AI ASİSTAN")}</p>
            </div>
            <h1 className="font-heading text-3xl md:text-5xl font-extrabold tracking-[-0.04em]">
              {t("Komut Merkezi")}
            </h1>
            <p className="text-muted-foreground text-sm mt-3 flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              {t("ASİSTAN AKTİF — 7/24 Türkçe yanıt")}
            </p>
          </div>
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 text-xs border border-white/20 px-3.5 py-2 text-muted-foreground hover:border-primary hover:text-primary transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" /> {t("Sohbeti Sıfırla")}
          </button>
        </div>

        <div className="mt-8 grid lg:grid-cols-[1fr_340px] gap-5 items-start">
          <div className="border border-white/15 bg-background overflow-hidden flex flex-col">
            <div className="h-[55vh] lg:h-[calc(100vh-24rem)] min-h-[380px] overflow-y-auto px-5 py-6 space-y-4">
              <AnimatePresence initial={false}>
                {messages.map((m, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex flex-col ${m.role === "user" ? "items-end" : "items-start"}`}
                  >
                    <div
                      className={`max-w-[85%] px-4 py-3 text-sm ${
                        m.role === "user"
                          ? "bg-primary text-primary-foreground font-medium"
                          : "bg-[#101010] border border-white/15 border-l-2 border-l-primary text-foreground/90 font-mono text-[13px]"
                      }`}
                    >
                      {m.role === "user" ? m.text : <ChatMarkdown text={m.text} />}
                    </div>

                    {m.role === "ai" && m.seo && <SeoAuditCard seo={m.seo} />}

                    {m.role === "ai" && i === lastAi && i === messages.length - 1 && !loading && (
                      <>
                        {(m.quote || m.booking) && (
                          <div className="flex flex-wrap gap-2 mt-2 justify-end">
                            {m.quote && (
                              <button
                                onClick={() => formRef.current?.scrollIntoView({ behavior: "smooth" })}
                                className="inline-flex items-center gap-1.5 bg-primary text-primary-foreground text-xs font-bold px-3.5 py-2 hover:brightness-110 transition-all"
                              >
                                <Sparkles className="w-3.5 h-3.5" /> {t("Teklif Al")}
                              </button>
                            )}
                            {m.booking && (
                              <Link
                                to="/randevu"
                                className="inline-flex items-center gap-1.5 border border-primary text-primary text-xs font-bold px-3.5 py-2 hover:bg-primary hover:text-primary-foreground transition-all"
                              >
                                <CalendarCheck className="w-3.5 h-3.5" /> {t("Randevu Al")}
                              </Link>
                            )}
                          </div>
                        )}
                        {Array.isArray(m.suggestions) && m.suggestions.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-2 max-w-[95%] justify-end">
                            {m.suggestions.map((s) => (
                              <button
                                key={s}
                                onClick={() => send(s)}
                                className="text-xs border border-white/20 px-3 py-1.5 text-foreground/80 hover:border-primary hover:text-primary transition-colors text-left"
                              >
                                {s}
                              </button>
                            ))}
                          </div>
                        )}
                      </>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-[#101010] border border-white/15 border-l-2 border-l-primary px-4 py-3">
                    <TypingDots />
                  </div>
                </div>
              )}
              {messages.length <= 2 && !loading && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {QUICK_ACTIONS.map((q) =>
                    q.to ? (
                      <Link
                        key={q.label}
                        to={q.to}
                        className="text-xs border border-white/20 px-3.5 py-2 text-foreground/80 hover:border-primary hover:text-primary transition-colors"
                      >
                        {t(q.label)}
                      </Link>
                    ) : (
                      <button
                        key={q.label}
                        onClick={() => send(t(q.message))}
                        className="text-xs border border-white/20 px-3.5 py-2 text-foreground/80 hover:border-primary hover:text-primary transition-colors"
                      >
                        {t(q.label)}
                      </button>
                    )
                  )}
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
              className="border-t border-white/15 p-4 flex items-center gap-3"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t("Mesajınızı yazın…")}
                className="flex-1 bg-[#101010] border border-white/15 px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="bg-primary text-primary-foreground p-3 hover:brightness-110 disabled:opacity-40 transition-all"
                aria-label={t("Gönder")}
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

          <aside className="space-y-5">
            <div className="border border-white/15 bg-background p-5">
              <p className="flex items-center gap-2 text-xs font-mono tracking-widest text-muted-foreground mb-4">
                <Terminal className="w-3.5 h-3.5 text-primary" /> {t("SIK SORULANLAR")}
              </p>
              <div className="space-y-2">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(t(s))}
                    className="w-full text-left text-[13px] text-foreground/75 hover:text-primary border border-white/15 hover:border-primary px-3.5 py-2.5 transition-colors"
                  >
                    {t(s)}
                  </button>
                ))}
              </div>
            </div>

            <div ref={formRef} className="border border-white/15 border-l-2 border-l-primary p-5 scroll-mt-24">
              <p className="flex items-center gap-2 text-xs font-mono tracking-widest text-muted-foreground mb-3">
                <FileText className="w-3.5 h-3.5 text-primary" /> {t("TEKLİF AL")}
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                {t("Talebiniz ekibimize iletilir — 1 iş günü içinde dönüş garantisi. Dilerseniz ")}
                <Link to="/iletisim" className="text-primary underline underline-offset-2">
                  {t("iletişim sayfasını")}
                </Link>
                {t(" da kullanabilirsiniz.")}
              </p>
              <LeadForm source="ai_asistan" compact prefill={lastQuote?.lead} />
            </div>

            <div className="border border-emerald-500/30 bg-emerald-500/5 p-5">
              <p className="text-xs font-mono tracking-widest text-muted-foreground mb-3">{t("DOĞRUDAN İLETİŞİM")}</p>
              <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                {t("Sohbet yazmak istemezseniz WhatsApp hattımızdan doğrudan ekibimize ulaşabilirsiniz — 7/24 yanıt veriyoruz.")}
              </p>
              <WhatsAppCta
                message="Merhaba! DijiTrak'tan teklif almak istiyorum."
                className="w-full inline-flex items-center justify-center gap-2 bg-emerald-500 text-white text-sm font-bold px-4 py-3 hover:brightness-110 transition-all"
              />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}