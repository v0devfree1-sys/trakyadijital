import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Zap, Clock } from "lucide-react";
import Reveal from "@/components/Reveal";
import { useLang } from "@/lib/i18n";

const BUBBLES = [
  { role: "user", text: "Kafe için web sitesi ne kadara olur?" },
  { role: "ai", text: "Kafe paketimiz QR dijital menü + rezervasyon formu içeriyor. Ayrıntı ve ödeme planını buradan paylaşabilirim…" },
  { role: "user", text: "Süremiz ne olur?" },
  { role: "ai", text: "Yayına alış ortalamamız 14 iş günü. Hemen keşif randevusu oluşturabilirim." },
];

export default function ChatPromo() {
  const { t } = useLang();

  return (
    <section className="border-t border-white/15 py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal>
          <div className="border border-primary bg-primary text-primary-foreground">
            <div className="grid lg:grid-cols-2">
              <div className="p-8 md:p-12">
                <p className="text-[11px] font-mono tracking-[0.25em] font-semibold">{t("AI ASİSTAN")}</p>
                <h2 className="mt-4 font-heading text-3xl md:text-4xl font-extrabold tracking-[-0.03em] leading-tight">
                  {t("Projenizi AI asistanla 5 dakikada netleştirin")}
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-primary-foreground/80 max-w-md">
                  {t("Fiyat, süreç ve sektör çözümleri — 7/24 Türkçe yanıt. Tek bir sohbetle ihtiyacınızı netleştirip teklifinizi ve randevunuzu anında oluşturuyor.")}
                </p>
                <div className="mt-8 flex flex-col sm:flex-row gap-3">
                  <Link
                    to="/ai-asistan"
                    className="group inline-flex items-center justify-center gap-2 bg-[#0A0A0B] text-primary font-bold px-6 py-3 hover:bg-black transition-colors"
                  >
                    {t("Sohbete Başla")}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link
                    to="/iletisim"
                    className="inline-flex items-center justify-center px-6 py-3 border border-[#0A0A0B]/40 font-bold hover:border-[#0A0A0B] transition-colors"
                  >
                    {t("Formla Devam Et")}
                  </Link>
                </div>
                <div className="mt-8 flex items-center gap-6 text-xs font-semibold">
                  <span className="inline-flex items-center gap-1.5"><Zap className="w-3.5 h-3.5" /> {t("Anında yanıt")}</span>
                  <span className="inline-flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {t("7/24 aktif")}</span>
                </div>
              </div>

              <div className="border-t lg:border-t-0 lg:border-l border-[#0A0A0B]/25 p-6 md:p-10 flex flex-col justify-center">
                <div className="bg-[#0A0A0B] p-5 space-y-3 font-mono text-[13px]">
                  {BUBBLES.map((b, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 14 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + i * 0.35, type: "spring", stiffness: 110, damping: 16 }}
                      className={`flex ${b.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <span
                        className={`max-w-[82%] px-3.5 py-2.5 ${
                          b.role === "user"
                            ? "bg-primary text-[#0A0A0B]"
                            : "border border-white/15 border-l-2 border-l-primary text-foreground/90"
                        }`}
                      >
                        {t(b.text)}
                      </span>
                    </motion.div>
                  ))}
                  <div className="flex items-center gap-2 pt-1 text-muted-foreground">
                    <span className="inline-block w-2 h-4 bg-primary animate-pulse" />
                    <span className="text-xs">{t("teklif hazırlanıyor…")}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}