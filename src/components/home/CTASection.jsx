import { ArrowRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import { PACKAGES } from "@/lib/siteData";
import { openAssistant } from "@/lib/assistant";
import { useLang } from "@/lib/i18n";

export default function CTASection() {
  const { t } = useLang();
  return (
    <section className="relative border-t border-white/15 py-20 md:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-gridlines opacity-30" />
      <div className="relative max-w-7xl mx-auto px-6">
        <Reveal>
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 bg-primary" />
            <p className="text-[11px] font-mono tracking-[0.25em] text-primary">{t("PAKETLER")}</p>
          </div>
          <h2 className="mt-5 font-heading text-3xl md:text-5xl font-extrabold tracking-[-0.03em]">
            {t("Net fiyatlar, sürpriz yok")}
          </h2>
        </Reveal>
        <div className="mt-12 grid md:grid-cols-3 gap-5">
          {PACKAGES.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.08} className="h-full">
              <div
                className={`h-full p-8 border flex flex-col transition-colors ${
                  p.popular
                    ? "border-primary bg-primary text-primary-foreground"
                    : "brutal-card border-white/15 bg-background"
                }`}
              >
                {p.popular && (
                  <span className="self-start text-[10px] font-mono tracking-widest font-bold bg-[#0A0A0B] text-primary px-2.5 py-1 mb-4">
                    {t("EN POPÜLER")}
                  </span>
                )}
                <h3 className="font-heading text-xl font-bold tracking-tight">{t(p.name)}</h3>
                <p className={`text-xs mt-1 ${p.popular ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                  {t(p.description)}
                </p>
                <p className="mt-5 font-heading text-4xl font-extrabold">
                  {p.price}
                  <span className={`text-xs font-normal ml-2 ${p.popular ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                    {t(p.period)}
                  </span>
                </p>
                <ul className="mt-6 space-y-2.5 flex-1">
                  {p.features.map((f) => (
                    <li
                      key={f}
                      className={`text-sm flex items-start gap-2.5 ${p.popular ? "text-primary-foreground/85" : "text-muted-foreground"}`}
                    >
                      <span className={`w-1.5 h-1.5 mt-2 shrink-0 ${p.popular ? "bg-[#0A0A0B]" : "bg-primary"}`} /> {t(f)}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={openAssistant}
                  className={`mt-7 inline-flex items-center justify-center gap-2 w-full py-3 font-bold text-sm transition-colors ${
                    p.popular
                      ? "bg-[#0A0A0B] text-primary hover:bg-black"
                      : "border border-white/25 hover:border-primary hover:text-primary"
                  }`}
                >
                  {t("Teklif İste")} <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}