import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { MapPin, ChevronRight } from "lucide-react";
import { Image } from "@/components/ui/image";
import Reveal from "@/components/Reveal";
import { base44 } from "@/api/base44Client";
import { useLang } from "@/lib/i18n";
import usePageMeta from "@/lib/usePageMeta";

const SECTOR_LABELS = {
  tarim: "Tarım & Gıda",
  sanayi: "Sanayi & İmalat",
  eticaret: "E-Ticaret",
  "yerel-ticaret": "Yerel Ticaret & Hizmet",
};

export default function CaseStudies() {
  const { t } = useLang();
  usePageMeta({
    title: "İz Bıraktıklarımız | DijiTrak — Trakya'dan Başarılı Web Projeleri",
    description:
      "DijiTrak'ın Trakya'daki işletmelere bıraktığı izler: tamamladığımız web tasarımı, SEO ve e-ticaret projelerinin before/after metrikleriyle gerçek sonuçları.",
  });
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    base44.entities.CaseStudy.filter({ published: true }, "-created_date", 50)
      .then((list) => {
        setCases(list);
        // Sektör sayfalarından gelen bağlantı: ilgili izin detay sayfasına yönlendir
        const fromUrl = searchParams.get("sektor");
        if (fromUrl) {
          const match = list.find((c) => c.sector === fromUrl);
          if (match) navigate(`/iz-biraktiklarimiz/${match.id}`, { replace: true });
        }
      })
      .catch(() => setCases([]))
      .finally(() => setLoading(false));
  }, [searchParams, navigate]);

  return (
    <div className="pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal>
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 bg-primary" />
            <p className="text-[11px] font-mono tracking-[0.25em] text-primary">{t("BAŞARI ARŞİVİ")}</p>
          </div>
          <h1 className="mt-5 font-heading text-4xl md:text-6xl font-extrabold tracking-[-0.04em]">
            {t("İz Bıraktıklarımız")}
          </h1>
          <p className="mt-5 text-muted-foreground max-w-xl leading-relaxed">
            {t("Trakya'daki işletmelerin dijitalleşme yolculuğu, before/after metrikleriyle.")}
          </p>
        </Reveal>

        {loading ? (
          <div className="mt-14 grid md:grid-cols-2 gap-px bg-white/15 border border-white/15">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="h-64 bg-[#101010] animate-pulse" />
            ))}
          </div>
        ) : cases.length === 0 ? (
          <p className="mt-14 text-muted-foreground text-sm border border-dashed border-white/20 px-6 py-10 inline-block">
            {t("İz bıraktıklarımız yakında yayında.")}
          </p>
        ) : (
          <div className="mt-14 grid md:grid-cols-2 gap-px bg-white/15 border border-white/15">
            {cases.map((c, i) => (
              <Reveal key={c.id} delay={(i % 2) * 0.08} className="bg-background">
                <Link
                  to={`/iz-biraktiklarimiz/${c.id}`}
                  className="group flex w-full h-full flex-col hover:bg-[#101010] transition-colors"
                >
                  {c.hero_image_url && (
                    <div className="relative h-44 overflow-hidden border-b border-white/15">
                      <Image src={c.hero_image_url} alt={c.client_name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                  )}
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-[10px] font-mono tracking-widest text-primary border border-primary/40 px-2.5 py-1">
                        {t(SECTOR_LABELS[c.sector] || c.sector)}
                      </span>
                      {c.city && (
                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                          <MapPin className="w-3 h-3" /> {c.city}
                        </span>
                      )}
                    </div>
                    <h3 className="mt-4 font-heading text-xl font-bold tracking-tight">{c.client_name}</h3>
                    <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{c.summary}</p>
                    <div className="mt-4 flex items-center gap-2 text-xs text-primary font-bold group-hover:gap-3 transition-all">
                      {t("İzi incele")} <ChevronRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}