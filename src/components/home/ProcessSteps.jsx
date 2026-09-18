import Reveal from "@/components/Reveal";
import { PROCESS } from "@/lib/siteData";
import { useLang } from "@/lib/i18n";

export default function ProcessSteps() {
  const { t } = useLang();
  return (
    <section className="border-t border-white/15 py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal>
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 bg-primary" />
            <p className="text-[11px] font-mono tracking-[0.25em] text-primary">{t("SÜREÇ")}</p>
          </div>
          <h2 className="mt-5 font-heading text-3xl md:text-5xl font-extrabold tracking-[-0.03em]">
            {t("Keşiften büyümeye, 4 adım")}
          </h2>
        </Reveal>
        <div className="mt-12 border border-white/15 grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/15">
          {PROCESS.map((p, i) => (
            <Reveal key={p.step} delay={i * 0.08} className="brutal-card bg-background p-8">
              <span className="inline-flex w-12 h-12 bg-primary text-primary-foreground items-center justify-center font-heading font-extrabold text-lg">
                {p.step}
              </span>
              <h3 className="mt-5 font-heading text-lg font-bold tracking-tight">{t(p.title)}</h3>
              <p className="mt-2.5 text-sm text-muted-foreground leading-relaxed">{t(p.description)}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}