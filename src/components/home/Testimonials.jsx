import { Star } from "lucide-react";
import Reveal from "@/components/Reveal";
import { TESTIMONIALS } from "@/lib/siteData";
import { useLang } from "@/lib/i18n";

export default function Testimonials() {
  const { t } = useLang();
  return (
    <section id="referanslar" className="border-t border-white/15 py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal>
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 bg-primary" />
            <p className="text-[11px] font-mono tracking-[0.25em] text-primary">{t("MÜŞTERİ YORUMLARI")}</p>
          </div>
          <h2 className="mt-5 font-heading text-3xl md:text-5xl font-extrabold tracking-[-0.03em] max-w-2xl">
            {t("Trakya'da konuşan sonuçlar")}
          </h2>
        </Reveal>
        <div className="mt-12 border border-white/15 grid md:grid-cols-3 gap-px bg-white/15">
          {TESTIMONIALS.map((tm, i) => (
            <Reveal key={tm.name} delay={i * 0.08} className="brutal-card bg-background p-8 flex flex-col">
              <div className="flex gap-1">
                {[0, 1, 2, 3, 4].map((s) => (
                  <Star key={s} className="w-3.5 h-3.5 text-primary fill-primary" />
                ))}
              </div>
              <p className="mt-5 text-sm text-foreground/80 leading-relaxed flex-1">"{t(tm.quote)}"</p>
              <div className="mt-6 pt-5 border-t border-white/10">
                <p className="text-sm font-bold">{tm.name}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {tm.business} — {tm.city}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}