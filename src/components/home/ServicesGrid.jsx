import { Link } from "react-router-dom";
import { Globe, ShoppingBag, Search, MapPin, Smartphone, Wrench, ArrowUpRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import { SERVICES } from "@/lib/siteData";
import { useLang } from "@/lib/i18n";

const ICONS = { Globe, ShoppingBag, Search, MapPin, Smartphone, Wrench };

export default function ServicesGrid() {
  const { t } = useLang();
  return (
    <section id="hizmetler" className="border-t border-white/15 py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal>
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 bg-primary" />
            <p className="text-[11px] font-mono tracking-[0.25em] text-primary">{t("HİZMETLER")}</p>
          </div>
          <h2 className="mt-5 font-heading text-3xl md:text-5xl font-extrabold tracking-[-0.03em] max-w-2xl">
            {t("Uçtan uca dijital altyapı")}
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl">
            {t("Tasarımdan SEO'ya, e-ticaretten bakıma kadar işletmenizin ihtiyaç duyduğu her dijital hizmet tek çatı altında.")}
          </p>
        </Reveal>

        <div className="mt-12 border border-white/15 grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/15">
          {SERVICES.map((s, i) => {
            const Icon = ICONS[s.icon];
            return (
              <Link key={s.id} to={`/hizmetler/${s.id}`} className="block h-full">
                <Reveal delay={i * 0.05} className="brutal-card bg-background p-8 h-full">
                  <div className="flex items-start justify-between">
                    <span className="inline-flex w-11 h-11 border border-primary/40 bg-primary/10 items-center justify-center">
                      <Icon className="w-5 h-5 text-primary" />
                    </span>
                    <ArrowUpRight className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <h3 className="mt-5 font-heading text-lg font-bold tracking-tight">{t(s.title)}</h3>
                  <p className="mt-2.5 text-sm text-muted-foreground leading-relaxed">{t(s.description)}</p>
                </Reveal>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}