import { Link } from "react-router-dom";
import { ArrowUpRight, CheckCircle2, ShieldCheck, Wrench } from "lucide-react";
import Reveal from "@/components/Reveal";
import { PACKAGES } from "@/lib/siteData";
import { openAssistant } from "@/lib/assistant";
import { useLang } from "@/lib/i18n";
import usePageMeta from "@/lib/usePageMeta";

const PAYMENT_STEPS = [
  { step: "%40", label: "Başlangıç", desc: "Proje startı ve keşif çalışması" },
  { step: "%40", label: "Tasarım Onayı", desc: "Tasarımın onaylanmasıyla" },
  { step: "%20", label: "Teslim", desc: "Yayına alma ve eğitim sonrası" },
];

const MAINTENANCE = {
  title: "Yıllık Bakım & Destek",
  price: "₺1.900",
  period: "yıllık (12 ay taahhüt)",
  features: ["7/24 Türkçe destek hattı", "Otomatik yedekleme", "Güvenlik ve sürüm güncellemeleri", "Aylık içerik değişiklikleri", "Performans izleme"],
};

export default function Paketler() {
  const { t } = useLang();

  usePageMeta({
    title: "Paketler & Fiyatlar | DijiTrak — Trakya Web Tasarım Paketleri",
    description:
      "Başlangıç ₺4.900, Kurumsal ₺9.900, E-Ticaret ₺14.900. Sabit fiyatlı DijiTrak paketleri; sürpriz ek ücret yok. Yıllık bakım ₺1.900'den başlar.",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "ItemList",
        itemListElement: PACKAGES.map((p, i) => ({
          "@type": "ListItem",
          position: i + 1,
          item: {
            "@type": "Product",
            name: `DijiTrak ${p.name} Paketi`,
            description: p.description,
            offers: {
              "@type": "Offer",
              price: p.price.replace(/[^\d]/g, ""),
              priceCurrency: "TRY",
              availability: "https://schema.org/InStock",
              url: "https://dijitrak.net/paketler",
            },
          },
        })),
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: "https://dijitrak.net/" },
          { "@type": "ListItem", position: 2, name: "Paketler & Fiyatlar", item: "https://dijitrak.net/paketler" },
        ],
      },
    ],
  });

  return (
    <div className="pt-16 pb-20 min-h-screen bg-[#0A0A0B]">
      <div className="max-w-7xl mx-auto px-6 pt-10">
        <Reveal>
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 bg-primary" />
            <p className="text-[11px] font-mono tracking-[0.25em] text-primary">{t("PAKETLER & FİYATLAR")}</p>
          </div>
          <h1 className="font-heading text-3xl md:text-5xl font-extrabold tracking-[-0.04em] mt-4">
            {t("Net fiyatlar, sürpriz yok")}
          </h1>
          <p className="text-muted-foreground mt-5 max-w-2xl leading-relaxed">
            {t("Keşif görüşmesinden sonra kapsamı yazılı olarak netleştiriyor, sabit fiyatla anlaşıyoruz. Paketin dışına çıkan hiçbir ek ücret faturanızda görünmez.")}
          </p>
        </Reveal>

        {/* Paket kartları */}
        <div className="mt-12 grid md:grid-cols-3 gap-px bg-white/15 border border-white/15">
          {PACKAGES.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.06} className={`relative bg-background flex flex-col ${p.popular ? "md:-my-4 md:py-4 border-primary" : ""}`}>
              {p.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-[10px] font-bold tracking-widest px-3 py-1 whitespace-nowrap">
                  {t("EN ÇOK TERCİH EDİLEN")}
                </span>
              )}
              <div className={`h-full flex flex-col p-7 border ${p.popular ? "border-primary bg-primary/5" : "border-transparent"}`}>
                <p className="font-heading font-bold text-lg">{t(p.name)}</p>
                <p className="text-xs text-muted-foreground mt-1">{t(p.description)}</p>
                <div className="mt-6 flex items-baseline gap-2">
                  <span className="font-heading text-3xl font-extrabold text-primary">{p.price}</span>
                  <span className="text-xs text-muted-foreground">{t(p.period)}</span>
                </div>
                <ul className="mt-6 space-y-3 flex-1">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-foreground/80">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" /> {t(f)}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={openAssistant}
                  className={`mt-8 inline-flex items-center justify-center gap-2 font-bold px-5 py-3 transition-all ${
                    p.popular
                      ? "bg-primary text-primary-foreground hover:brightness-110"
                      : "border border-white/25 hover:border-primary hover:text-primary"
                  }`}
                >
                  {t("Bu paketi isteyin")} <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Bakım paketi */}
        <Reveal delay={0.05} className="mt-6 border border-white/15 bg-background p-7 flex flex-col md:flex-row md:items-center gap-6 justify-between">
          <div>
            <p className="flex items-center gap-2 text-[11px] font-mono tracking-[0.25em] text-primary">
              <Wrench className="w-3.5 h-3.5" /> {t("YAYIN SONRASI")}
            </p>
            <div className="mt-3 flex flex-wrap items-baseline gap-3">
              <p className="font-heading font-bold text-lg">{t(MAINTENANCE.title)}</p>
              <span className="font-heading text-2xl font-extrabold text-primary">{MAINTENANCE.price}</span>
              <span className="text-xs text-muted-foreground">{t(MAINTENANCE.period)}</span>
            </div>
            <p className="text-xs text-muted-foreground mt-2">{t(MAINTENANCE.features.join(" · "))}</p>
          </div>
          <button
            onClick={openAssistant}
            className="inline-flex items-center gap-2 border border-white/25 px-5 py-3 hover:border-primary hover:text-primary transition-colors shrink-0"
          >
            {t("Bakım teklifi al")} <ArrowUpRight className="w-4 h-4" />
          </button>
        </Reveal>

        {/* Ödeme planı */}
        <Reveal delay={0.05} className="mt-10">
          <p className="text-[11px] font-mono tracking-[0.25em] text-primary mb-4">{t("ÖDEME PLANI")}</p>
          <div className="grid sm:grid-cols-3 gap-px bg-white/15 border border-white/15">
            {PAYMENT_STEPS.map((s) => (
              <div key={s.label} className="bg-background p-6">
                <p className="font-heading text-2xl font-extrabold text-primary">{s.step}</p>
                <p className="font-heading font-bold text-sm mt-2">{t(s.label)}</p>
                <p className="text-xs text-muted-foreground mt-1">{t(s.desc)}</p>
              </div>
            ))}
          </div>
          <p className="flex items-center gap-2 text-xs text-muted-foreground mt-4">
            <ShieldCheck className="w-4 h-4 text-primary shrink-0" />
            {t("Tüm paketlerde fatura düzenlenir. Kurumsal müşterilerimize özel ödeme planı oluşturulabilir.")}
          </p>
        </Reveal>

        {/* Kapsam netleştirme */}
        <Reveal delay={0.08} className="mt-10 border border-primary bg-primary/5 p-7 md:p-9 flex flex-col md:flex-row md:items-center gap-6 justify-between">
          <div className="max-w-xl">
            <h2 className="font-heading text-2xl font-extrabold">{t("Hangi paket olduğunu bilemediniz mi?")}</h2>
            <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
              {t("Ücretsiz keşif görüşmesinde ihtiyacınızı birlikte netleştirip size uygun paketi veya özel kapsamı belirleyelim.")}
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <Link
              to="/randevu"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-bold px-5 py-3 hover:brightness-110 transition-all"
            >
              {t("Ücretsiz Keşif Randevusu")} <ArrowUpRight className="w-4 h-4" />
            </Link>
            <Link
              to="/iletisim"
              className="inline-flex items-center gap-2 border border-white/25 px-5 py-3 hover:border-primary hover:text-primary transition-colors"
            >
              {t("Bize yazın")}
            </Link>
          </div>
        </Reveal>
      </div>
    </div>
  );
}