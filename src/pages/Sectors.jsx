import { useSearchParams } from "react-router-dom";
import { Check, MessageSquare, ArrowRight } from "lucide-react";
import { Image } from "@/components/ui/image";
import Reveal from "@/components/Reveal";
import { SECTORS } from "@/lib/siteData";
import { openAssistant } from "@/lib/assistant";
import { useLang } from "@/lib/i18n";
import usePageMeta from "@/lib/usePageMeta";

export default function Sectors() {
  const { t } = useLang();
  usePageMeta({
    title: "Sektörel Çözümler | DijiTrak — Tarım, Sanayi, E-Ticaret Web Tasarımı",
    description:
      "Tarım, sanayi, e-ticaret ve yerel ticaret sektörlerine özel web tasarımı ve dijital çözümler. Trakya'da sektöre göre şekillenen dijital altyapı.",
  });
  const [searchParams, setSearchParams] = useSearchParams();
  const activeId = searchParams.get("sektor") || SECTORS[0].id;
  const active = SECTORS.find((s) => s.id === activeId) || SECTORS[0];

  return (
    <div className="pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal>
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 bg-primary" />
            <p className="text-[11px] font-mono tracking-[0.25em] text-primary">{t("SEKTÖREL ÇÖZÜMLER")}</p>
          </div>
          <h1 className="mt-5 font-heading text-4xl md:text-6xl font-extrabold tracking-[-0.04em] max-w-3xl">
            {t("Sektörünüze özel dijital altyapı")}
          </h1>
          <p className="mt-5 text-muted-foreground max-w-xl leading-relaxed">
            {t("Her sektörün kendi dili, kendi müşterisi ve kendi dijital ihtiyaçları var. Trakya'da yıllardır sahadayız; çözümlerimiz de buradan çıkıyor.")}
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-12 grid sm:grid-cols-2 lg:grid-cols-5 gap-px bg-white/15 border border-white/15">
          {SECTORS.map((s) => (
            <button
              key={s.id}
              onClick={() => setSearchParams({ sektor: s.id })}
              className={`p-5 text-left transition-colors ${
                s.id === active.id ? "bg-primary text-primary-foreground" : "bg-background hover:bg-[#101010]"
              }`}
            >
              <p className="font-heading font-bold tracking-tight text-sm leading-snug">{t(s.name)}</p>
              <p className={`text-xs mt-1.5 leading-snug ${s.id === active.id ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                {t(s.tagline)}
              </p>
            </button>
          ))}
        </Reveal>

        <div className="mt-12 border border-white/15 grid lg:grid-cols-2">
          <Reveal className="p-8 lg:border-r border-white/15">
            <p className="text-[11px] font-mono text-primary tracking-[0.3em]">{t("SEKTÖR")} / {active.id.toUpperCase()}</p>
            <h2 className="mt-3 font-heading text-3xl md:text-4xl font-extrabold tracking-tight">{t(active.name)}</h2>
            <p className="mt-4 text-foreground/80 leading-relaxed">{t(active.detail)}</p>
            <ul className="mt-7 space-y-3">
              {active.highlights.map((h) => (
                <li key={h} className="flex items-center gap-3 text-sm">
                  <span className="w-6 h-6 bg-primary text-primary-foreground flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </span>
                  {t(h)}
                </li>
              ))}
            </ul>
            <div className="mt-9 flex flex-col sm:flex-row gap-3">
              <button
                onClick={openAssistant}
                className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-bold px-6 py-3 hover:brightness-110 transition-all"
              >
                <MessageSquare className="w-4 h-4" /> {t("Bu sektör için fiyat alın")}
              </button>
              <a
                href="/iletisim"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-white/25 hover:border-primary hover:text-primary transition-colors font-semibold"
              >
                {t("İletişim formu")} <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="relative min-h-[420px] border-t lg:border-t-0 border-white/15 overflow-hidden">
            <Image src={active.image} alt={t(active.name)} className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute bottom-0 inset-x-0 border-t border-white/15 bg-[#0A0A0B]/90 px-5 py-3">
              <p className="font-heading text-lg font-extrabold tracking-tight">{t(active.tagline)}</p>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}