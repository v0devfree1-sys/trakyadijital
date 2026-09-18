import Reveal from "@/components/Reveal";
import { useLang } from "@/lib/i18n";

// Yasal sayfaların paylaşılan brütalist yerleşimi: başlık + bölüm kartları.
export default function LegalPage({ title, intro, updated, sections }) {
  const { t } = useLang();

  return (
    <div className="bg-gridlines flex-1">
      <div className="max-w-4xl mx-auto px-6 py-16 md:py-24">
        <Reveal>
          <p className="font-mono text-[11px] tracking-[0.25em] text-primary mb-3">{t("DİJİTRAK · YASAL METİN")}</p>
          <h1 className="font-heading text-3xl md:text-5xl font-extrabold tracking-tight">{t(title)}</h1>
          <p className="text-muted-foreground mt-4 max-w-2xl leading-relaxed">{t(intro)}</p>
          <p className="text-xs text-muted-foreground mt-3 font-mono">
            {t("Son güncelleme")}: {updated}
          </p>
        </Reveal>

        <div className="mt-12 space-y-6">
          {sections.map((s, i) => (
            <Reveal key={i} delay={Math.min(i * 0.03, 0.2)}>
              <section className="brutal-card border border-white/15 bg-card p-6 md:p-8">
                <h2 className="font-heading text-lg md:text-xl font-bold mb-3">{t(s.heading)}</h2>
                {(s.paragraphs || []).map((p, j) => (
                  <p key={j} className="text-sm text-muted-foreground leading-relaxed mb-2.5 last:mb-0">
                    {t(p)}
                  </p>
                ))}
                {s.bullets && (
                  <ul className="list-disc pl-5 space-y-1.5 text-sm text-muted-foreground mt-3">
                    {s.bullets.map((b, j) => (
                      <li key={j}>{t(b)}</li>
                    ))}
                  </ul>
                )}
              </section>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}