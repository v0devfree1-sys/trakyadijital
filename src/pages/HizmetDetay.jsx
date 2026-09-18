import { Link, useParams } from "react-router-dom";
import { Globe, ShoppingBag, Search, MapPin, Smartphone, Wrench, ArrowLeft, ArrowUpRight, CheckCircle2, Clock, Tag, Rocket } from "lucide-react";
import Reveal from "@/components/Reveal";
import { openAssistant } from "@/lib/assistant";
import { SERVICES, SERVICE_DETAILS } from "@/lib/siteData";
import { useLang } from "@/lib/i18n";
import usePageMeta from "@/lib/usePageMeta";

const ICONS = { Globe, ShoppingBag, Search, MapPin, Smartphone, Wrench };

export default function HizmetDetay() {
  const { slug } = useParams();
  const { t } = useLang();
  const service = SERVICES.find((s) => s.id === slug);
  const detail = SERVICE_DETAILS[slug];

  usePageMeta({
    title: service ? `${service.title} | DijiTrak` : "Hizmet | DijiTrak",
    description: detail ? detail.intro : "DijiTrak dijital hizmetleri — web tasarımı, e-ticaret, SEO ve bakım desteği.",
    // Zengin sonuçlar: hizmet tanımı + sayfa yolu (breadcrumb) yapısal verisi
    jsonLd:
      service && detail
        ? [
            {
              "@context": "https://schema.org",
              "@type": "Service",
              name: service.title,
              description: detail.intro,
              url: `https://dijitrak.net/hizmetler/${slug}`,
              serviceType: service.title,
              provider: { "@type": "Organization", name: "DijiTrak", url: "https://dijitrak.net/" },
              areaServed: { "@type": "AdministrativeArea", name: "Trakya, Türkiye" },
            },
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: "https://dijitrak.net/" },
                { "@type": "ListItem", position: 2, name: service.title, item: `https://dijitrak.net/hizmetler/${slug}` },
              ],
            },
          ]
        : null,
  });

  if (!service || !detail) {
    return (
      <div className="pt-16 pb-20 min-h-screen bg-[#0A0A0B] flex items-center justify-center px-6">
        <div className="text-center">
          <p className="font-mono text-primary text-xs tracking-[0.25em] mb-3">{t("HİZMET BULUNAMADI")}</p>
          <h1 className="font-heading text-2xl font-extrabold">{t("Aradığınız hizmet kayıtlı değil")}</h1>
          <Link to="/" className="inline-flex items-center gap-2 mt-6 border border-white/25 px-5 py-3 text-sm hover:border-primary hover:text-primary transition-colors">
            <ArrowLeft className="w-4 h-4" /> {t("Ana sayfaya dön")}
          </Link>
        </div>
      </div>
    );
  }

  const Icon = ICONS[service.icon];

  return (
    <div className="pt-16 pb-20 min-h-screen bg-[#0A0A0B]">
      <div className="max-w-7xl mx-auto px-6 pt-10">
        <Link to="/#hizmetler" className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors font-mono">
          <ArrowLeft className="w-3.5 h-3.5" /> {t("TÜM HİZMETLER")}
        </Link>

        {/* Başlık */}
        <Reveal className="mt-6">
          <div className="flex items-center gap-3">
            <span className="inline-flex w-12 h-12 border border-primary/40 bg-primary/10 items-center justify-center shrink-0">
              <Icon className="w-6 h-6 text-primary" />
            </span>
            <div>
              <p className="text-[11px] font-mono tracking-[0.25em] text-primary">{t("HİZMET DETAYI")}</p>
              <h1 className="font-heading text-3xl md:text-5xl font-extrabold tracking-[-0.04em]">{t(service.title)}</h1>
            </div>
          </div>
          <p className="text-primary font-mono text-sm mt-4">&gt; {t(detail.tagline)}</p>
          <p className="text-muted-foreground mt-4 max-w-2xl leading-relaxed">{t(detail.intro)}</p>
        </Reveal>

        {/* Kapsam */}
        <Reveal delay={0.05} className="mt-12">
          <p className="text-[11px] font-mono tracking-[0.25em] text-primary mb-4">{t("KAPSAM")}</p>
          <div className="border border-white/15 grid sm:grid-cols-2 gap-px bg-white/15">
            {detail.kapsam.map((k) => (
              <div key={k} className="bg-background p-5 flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span className="text-sm text-foreground/80">{t(k)}</span>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Bilgiler */}
        <div className="mt-6 grid sm:grid-cols-3 gap-6">
          {[
            { icon: Clock, label: "SÜRE", value: detail.sure },
            { icon: Tag, label: "FİYATLANDIRMA", value: detail.fiyat },
            { icon: Rocket, label: "TESLİM", value: "Yayına alma + eğitim dahil" },
          ].map((info, i) => (
            <Reveal key={info.label} delay={0.05 * i} className="border border-white/15 bg-background p-6 brutal-card">
              <info.icon className="w-5 h-5 text-primary mb-3" />
              <p className="text-[11px] font-mono tracking-[0.25em] text-muted-foreground">{t(info.label)}</p>
              <p className="font-heading font-bold mt-1.5 text-sm">{t(info.value)}</p>
            </Reveal>
          ))}
        </div>

        {/* CTA */}
        <Reveal delay={0.05} className="mt-6 border border-primary bg-primary/5 p-7 md:p-9 flex flex-col md:flex-row md:items-center gap-6 justify-between">
          <div className="max-w-xl">
            <h2 className="font-heading text-2xl font-extrabold">{t("Bu hizmete ihtiyacınız var mı?")}</h2>
            <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
              {t("AI asistanımıza yazın; scope'u birlikte netleştirip 1 iş günü içinde size özel teklif verelim.")}
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
              to="/iletisim"
              className="inline-flex items-center gap-2 border border-white/25 px-5 py-3 hover:border-primary hover:text-primary transition-colors"
            >
              {t("Teklif Al")}
            </Link>
          </div>
        </Reveal>
      </div>
    </div>
  );
}