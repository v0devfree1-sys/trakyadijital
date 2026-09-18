import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, MapPin } from "lucide-react";
import { Image } from "@/components/ui/image";
import Reveal from "@/components/Reveal";
import { base44 } from "@/api/base44Client";
import { openAssistant } from "@/lib/assistant";
import { useLang } from "@/lib/i18n";
import usePageMeta from "@/lib/usePageMeta";

const SECTOR_LABELS = {
  tarim: "Tarım & Gıda",
  sanayi: "Sanayi & İmalat",
  eticaret: "E-Ticaret",
  "yerel-ticaret": "Yerel Ticaret & Hizmet",
};

export default function CaseStudyDetail() {
  const { id } = useParams();
  const { t } = useLang();
  const [cs, setCs] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setNotFound(false);
    base44.entities.CaseStudy.get(id)
      .then(setCs)
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [id]);

  const detailUrl = cs ? `https://dijitrak.net/iz-biraktiklarimiz/${cs.id}` : null;
  usePageMeta({
    title: cs ? `${cs.client_name} — İz Bıraktıklarımız | DijiTrak` : "İz Bıraktıklarımız | DijiTrak",
    description: cs?.summary || "DijiTrak'ın Trakya'daki işletmelere bıraktığı izler: before/after metrikleriyle gerçek proje sonuçları.",
    jsonLd: cs
      ? [
          {
            "@context": "https://schema.org",
            "@type": "Article",
            headline: `${cs.client_name} — DijiTrak Projesi`,
            description: cs.summary || "",
            inLanguage: "tr",
            datePublished: cs.created_date,
            dateModified: cs.updated_date || cs.created_date,
            mainEntityOfPage: { "@type": "WebPage", "@id": detailUrl },
            ...(cs.hero_image_url ? { image: [cs.hero_image_url] } : {}),
            author: { "@type": "Organization", name: "DijiTrak", url: "https://dijitrak.net/" },
            publisher: { "@type": "Organization", name: "DijiTrak", url: "https://dijitrak.net/" },
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "İz Bıraktıklarımız", item: "https://dijitrak.net/iz-biraktiklarimiz" },
              { "@type": "ListItem", position: 2, name: cs.client_name, item: detailUrl },
            ],
          },
        ]
      : null,
  });

  if (loading) {
    return (
      <div className="pt-28 pb-24 max-w-5xl mx-auto px-6">
        <div className="h-8 w-2/3 bg-[#101010] animate-pulse" />
        <div className="mt-6 h-64 bg-[#101010] animate-pulse" />
        <div className="mt-8 grid grid-cols-3 gap-px bg-white/15 border border-white/15">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-24 bg-[#101010] animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (notFound || !cs) {
    return (
      <div className="pt-28 pb-24 max-w-3xl mx-auto px-6 text-center">
        <h1 className="font-heading text-3xl font-extrabold">{t("İz bulunamadı")}</h1>
        <p className="mt-3 text-muted-foreground">
          {t("Bu iz kaldırılmış veya hiç var olmamış olabilir.")}
        </p>
        <Link to="/iz-biraktiklarimiz" className="mt-6 inline-flex items-center gap-2 text-primary font-bold text-sm">
          <ArrowLeft className="w-4 h-4" /> {t("İz Bıraktıklarımıza dön")}
        </Link>
      </div>
    );
  }

  return (
    <article className="pt-28 pb-24">
      <div className="max-w-5xl mx-auto px-6">
        <Link to="/iz-biraktiklarimiz" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
          <ArrowLeft className="w-4 h-4" /> {t("İz Bıraktıklarımıza dön")}
        </Link>

        <Reveal className="mt-8">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-[10px] font-mono tracking-widest text-primary border border-primary/40 px-2.5 py-1">
              {t(SECTOR_LABELS[cs.sector] || cs.sector)}
            </span>
            {cs.city && (
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <MapPin className="w-3 h-3" /> {cs.city}
              </span>
            )}
          </div>
          <h1 className="mt-5 font-heading text-3xl md:text-5xl font-extrabold tracking-[-0.04em] leading-tight">
            {cs.client_name}
          </h1>
          <p className="mt-5 text-foreground/80 max-w-2xl leading-relaxed">{cs.summary}</p>
        </Reveal>

        {cs.hero_image_url && (
          <Reveal delay={0.08} className="mt-10 border border-white/15">
            <div className="h-56 md:h-80">
              <Image src={cs.hero_image_url} alt={cs.client_name} className="w-full h-full object-cover" />
            </div>
          </Reveal>
        )}

        {(cs.results || []).length > 0 && (
          <Reveal delay={0.1} className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-px bg-white/15 border border-white/15">
            {cs.results.map((r) => (
              <div key={r.label} className="bg-background p-5 sm:p-6 text-center">
                <p className="font-heading text-2xl md:text-3xl font-extrabold text-primary">{r.value}</p>
                <p className="text-xs text-muted-foreground mt-1.5">{r.label}</p>
              </div>
            ))}
          </Reveal>
        )}

        <div className="mt-10 grid md:grid-cols-2 gap-8">
          {cs.challenge && (
            <Reveal className="border border-white/15 p-6 md:p-7">
              <p className="text-[11px] font-mono tracking-[0.25em] text-primary mb-3">{t("ZORLUK")}</p>
              <p className="text-sm text-foreground/75 leading-relaxed">{cs.challenge}</p>
            </Reveal>
          )}
          {cs.solution && (
            <Reveal delay={0.05} className="border border-white/15 p-6 md:p-7">
              <p className="text-[11px] font-mono tracking-[0.25em] text-primary mb-3">{t("ÇÖZÜM")}</p>
              <p className="text-sm text-foreground/75 leading-relaxed">{cs.solution}</p>
            </Reveal>
          )}
        </div>

        {(cs.services || []).length > 0 && (
          <Reveal className="mt-8 flex flex-wrap gap-2">
            {cs.services.map((s) => (
              <span key={s} className="text-xs border border-white/20 px-3 py-1.5 text-muted-foreground">{s}</span>
            ))}
          </Reveal>
        )}

        <Reveal className="mt-12 border border-primary bg-primary/5 p-7 md:p-9 flex flex-col md:flex-row md:items-center gap-6 justify-between">
          <div className="max-w-xl">
            <h2 className="font-heading text-2xl font-extrabold">{t("Sizin de dijital iziniz kalsın")}</h2>
            <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
              {t("Projenizi anlatın; ücretsiz keşif görüşmesinden sonra 1 iş günü içinde size özel yol haritası ve teklifle dönelim.")}
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <button
              onClick={openAssistant}
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-bold px-5 py-3 hover:brightness-110 transition-all"
            >
              {t("AI Asistanla Başla")} <ArrowUpRight className="w-4 h-4" />
            </button>
            <Link
              to="/paketler"
              className="inline-flex items-center gap-2 border border-white/25 px-5 py-3 hover:border-primary hover:text-primary transition-colors"
            >
              {t("Paketleri Gör")}
            </Link>
          </div>
        </Reveal>
      </div>
    </article>
  );
}