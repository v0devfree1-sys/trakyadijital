import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, MapPin } from "lucide-react";
import { Image } from "@/components/ui/image";
import Reveal from "@/components/Reveal";
import { base44 } from "@/api/base44Client";
import { useLang } from "@/lib/i18n";

export default function CasePreview() {
  const { t } = useLang();
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    base44.entities.CaseStudy.filter({ published: true }, "-created_date", 4)
      .then(setCases)
      .catch(() => setCases([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="border-t border-white/15 py-20 md:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 bg-primary" />
              <p className="text-[11px] font-mono tracking-[0.25em] text-primary">{t("BAŞARI ARŞİVİ")}</p>
            </div>
            <h2 className="mt-5 font-heading text-3xl md:text-5xl font-extrabold tracking-[-0.03em]">
              {t("Verilerle yazılmış hikâyeler")}
            </h2>
          </div>
          <Link to="/iz-biraktiklarimiz" className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:gap-3 transition-all">
            {t("Tüm izlerimiz")} <ArrowUpRight className="w-4 h-4" />
          </Link>
        </Reveal>
      </div>

      <div className="mt-12 max-w-7xl mx-auto pl-6 lg:pl-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))]">
        {loading ? (
          <div className="flex gap-5 overflow-hidden">
            {[0, 1, 2].map((i) => (
              <div key={i} className="min-w-[300px] md:min-w-[400px] h-[340px] border border-white/15 bg-[#101010] animate-pulse" />
            ))}
          </div>
        ) : cases.length === 0 ? (
          <p className="text-muted-foreground text-sm border border-dashed border-white/20 px-6 py-10 inline-block">
            {t("İz bıraktıklarımız yakında yayında.")}
          </p>
        ) : (
          <div className="flex gap-5 overflow-x-auto pb-4 snap-x">
            {cases.map((c, i) => (
              <Reveal key={c.id} delay={i * 0.08} className="snap-start">
                <Link
                  to={`/iz-biraktiklarimiz?sektor=${c.sector}`}
                  className="brutal-card group block w-[300px] md:w-[400px] border border-white/15 bg-background"
                >
                  <div className="relative h-44 overflow-hidden border-b border-white/15">
                    {c.hero_image_url && <Image src={c.hero_image_url} alt={c.client_name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />}
                    <span className="absolute top-3 left-3 text-[10px] font-mono tracking-widest bg-[#0A0A0B] border border-white/20 px-2.5 py-1 text-foreground/80">
                      {t(c.sector === "tarim" ? "TARIM" : c.sector === "sanayi" ? "SANAYİ" : c.sector === "eticaret" ? "E-TİCARET" : "YEREL TİCARET")}
                    </span>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <MapPin className="w-3 h-3" /> {c.city}
                    </div>
                    <h3 className="mt-2 font-heading text-lg font-bold tracking-tight">{c.client_name}</h3>
                    <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{c.summary}</p>
                    {(c.results || []).slice(0, 2).map((r) => (
                      <div key={r.label} className="mt-3 flex items-baseline gap-2">
                        <span className="font-heading text-xl font-extrabold text-primary">{r.value}</span>
                        <span className="text-xs text-muted-foreground">{r.label}</span>
                      </div>
                    ))}
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}