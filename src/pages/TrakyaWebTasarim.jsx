import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, MapPin, ChevronRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import { openAssistant } from "@/lib/assistant";
import { useLang } from "@/lib/i18n";
import usePageMeta from "@/lib/usePageMeta";

const CITIES = [
  {
    id: "tekirdag",
    name: "Tekirdağ",
    title: "Tekirdağ Web Tasarım",
    text: "Çorlu, Ergene ve Kapaklı'daki tekstil-metal sanayisi için B2B katalog ve teklif (RFQ) siteleri; Süleymanpaşa çarşı esnafı için Google Haritalar optimizasyonu; Malkara ve Şarköy'de zeytin-üzüm işletmeleri için tanıtım siteleri kuruyoruz.",
    districts: ["Çorlu", "Süleymanpaşa", "Kapaklı", "Ergene", "Malkara", "Şarköy", "Saray", "Hayrabolu", "Muratlı"],
  },
  {
    id: "edirne",
    name: "Edirne",
    title: "Edirne Web Tasarım",
    text: "Tarihi merkezde turizm, konaklama ve restoran işletmelerini görsel ağırlıklı sitelerle buluşturuyoruz. Keşan ve İpsala'da sınır ticareti yapan firmalar için çoklu dilli e-ticaret; Meriç ve Uzunköprü'de tarım kooperatifleri için B2B sipariş altyapısı kuruyoruz.",
    districts: ["Merkez", "Keşan", "İpsala", "Uzunköprü", "Meriç", "Havsa", "Enez", "Lalapaşa", "Süloğlu"],
  },
  {
    id: "kirklareli",
    name: "Kırklareli",
    title: "Kırklareli Web Tasarım",
    text: "Lüleburgaz sanayi bölgesindeki imalatçılar için kurumsal siteler ve CAD dosya paylaşım portalları; Babaeski ve Pınarhisar'da tarım işletmeleri için ürün katalogları; Vize'nin turizm potansiyeli için rezervasyon entegrasyonlu siteler hazırlıyoruz.",
    districts: ["Merkez", "Lüleburgaz", "Babaeski", "Vize", "Pınarhisar", "Demirköy", "Kofçaz", "Ahırköy"],
  },
  {
    id: "canakkale",
    name: "Çanakkale",
    title: "Çanakkale Web Tasarım",
    text: "Gelibolu ve Eceabat'ta turizm işletmelerini çoklu dilli sitelerle yurt dışı ziyaretçiye ulaştırıyoruz. Biga ve Çan'daki tarım-sanayi firmaları için kurumsal tanıtım siteleri kuruyor, bölge genelinde yerel SEO çalışması yürütüyoruz.",
    districts: ["Merkez", "Gelibolu", "Eceabat", "Biga", "Çan", "Lapseki", "Ayvacık", "Bozcaada"],
  },
];

const FAQS = [
  {
    q: "Trakya'da web tasarım fiyatları ne kadar?",
    a: "Kurumsal tanıtım siteleri 4.900 TL'den, e-ticaret paketimiz 14.900 TL'den başlar. Keşif görüşmesi ve fiyat teklifi ücretsizdir; 1 iş günü içinde yazılı teklif veririz.",
  },
  {
    q: "Hangi illere ve ilçelere hizmet veriyorsunuz?",
    a: "Tekirdağ, Edirne, Kırklareli ve Çanakkale'in tüm ilçelerine yerinde keşif dahil hizmet veriyoruz. Ayrıca Türkiye'nin tamamına online olarak çalışıyoruz.",
  },
  {
    q: "Yerinde keşif ücretli mi?",
    a: "Trakya bölgesindeki işletmeler için yerinde keşif tamamen ücretsizdir. Ekibimiz Çorlu merkezli olduğundan aynı gün randevu bile mümkün olabilir.",
  },
  {
    q: "Trakya'da SEO çalışması işletmeme ne kazandırır?",
    a: "Bölgenizdeki müşteriler hizmeti önce telefonundan arıyor. Yerel SEO ile 'web tasarım Çorlu' veya 'Çorlu dijital ajans' gibi aramalarda görünür hale gelir, Google Haritalar kaydınız optimize edilir ve rakiplerinizin önüne geçersiniz.",
  },
  {
    q: "Sitem hazır olduğunda ne olacak? Sonrası var mı?",
    a: "Yayın sonrası 1 yıl hosting hediye; ardından 1.900 TL'den başlayan yıllık bakım paketiyle yedekleme, güvenlik güncellemeleri ve 7/24 Türkçe destek sağlarız.",
  },
];

export default function TrakyaWebTasarim() {
  const { t } = useLang();

  usePageMeta({
    title: "Trakya Web Tasarım | Tekirdağ, Edirne, Kırklareli, Çanakkale — DijiTrak",
    description:
      "Trakya'nın dört ilinde web tasarım, e-ticaret ve SEO hizmeti: Tekirdağ (Çorlu), Edirne (Keşan, İpsala), Kırklareli (Lüleburgaz) ve Çanakkale. Ücretsiz yerinde keşif, 1 iş gününde teklif.",
  });

  // Sayfaya özel yapısal veri: SSS + Breadcrumb
  useEffect(() => {
    const ld = [
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: FAQS.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "DijiTrak", item: "https://dijitrak.net/" },
          { "@type": "ListItem", position: 2, name: "Trakya Web Tasarım", item: "https://dijitrak.net/trakya-web-tasarim" },
        ],
      },
      {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "DijiTrak Hizmet Bölgeleri",
        itemListElement: CITIES.map((c, i) => ({
          "@type": "ListItem",
          position: i + 1,
          item: { "@type": "City", name: c.name },
        })),
      },
    ];
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.dataset.page = "trakya-seo";
    script.text = JSON.stringify(ld);
    document.head.appendChild(script);
    return () => script.remove();
  }, []);

  return (
    <div className="pt-16 pb-20 min-h-screen bg-[#0A0A0B]">
      <div className="max-w-7xl mx-auto px-6 pt-10">
        {/* Başlık */}
        <Reveal>
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 bg-primary" />
            <p className="text-[11px] font-mono tracking-[0.25em] text-primary">{t("TRAKYA GENELİ HİZMET")}</p>
          </div>
          <h1 className="mt-4 font-heading text-3xl md:text-5xl font-extrabold tracking-[-0.04em] max-w-3xl">
            {t("Trakya Web Tasarım — Dört İl, Her İlçe, Tek Ajans")}
          </h1>
          <p className="text-muted-foreground mt-5 max-w-2xl leading-relaxed">
            {t(
              "Tekirdağ'dan Edirne'ye, Kırklareli'den Çanakkale'ye — Trakya'nın her ilçesindeki işletmeye kendi bölgesini bilen bir ajansla çalışma avantajı. Yerinde keşif ücretsiz, teklif 1 iş gününde."
            )}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={openAssistant}
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-bold px-5 py-3 hover:brightness-110 transition-all"
            >
              {t("Ücretsiz Keşif İste")} <ArrowUpRight className="w-4 h-4" />
            </button>
            <Link
              to="/hizmetler/web-tasarim"
              className="inline-flex items-center gap-2 border border-white/25 px-5 py-3 hover:border-primary hover:text-primary transition-colors"
            >
              {t("Hizmetleri Gör")} <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </Reveal>

        {/* İl bölümleri */}
        <div className="mt-14 space-y-6">
          {CITIES.map((c, i) => (
            <Reveal key={c.id} delay={i * 0.03} className="border border-white/15 bg-background p-7 md:p-9 brutal-card">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div className="flex items-center gap-3">
                  <span className="inline-flex w-10 h-10 border border-primary/40 bg-primary/10 items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-primary" />
                  </span>
                  <div>
                    <p className="text-[11px] font-mono tracking-[0.25em] text-primary">{t(`HİZMET BÖLGESİ 0${i + 1}`)}</p>
                    <h2 className="font-heading text-xl md:text-2xl font-extrabold tracking-tight">{t(c.title)}</h2>
                  </div>
                </div>
                <Link
                  to="/isletmeler"
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-muted-foreground hover:text-primary transition-colors shrink-0"
                >
                  {t("İşletme rehberine göz at")} <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
              <p className="mt-4 text-sm text-muted-foreground leading-relaxed max-w-3xl">{t(c.text)}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {c.districts.map((d) => (
                  <span key={d} className="text-[11px] font-mono border border-white/15 px-2.5 py-1 text-foreground/70">
                    {d}
                  </span>
                ))}
              </div>
            </Reveal>
          ))}
        </div>

        {/* SSS */}
        <Reveal className="mt-14">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 bg-primary" />
            <p className="text-[11px] font-mono tracking-[0.25em] text-primary">{t("SIKÇA SORULANLAR")}</p>
          </div>
          <h2 className="mt-4 font-heading text-2xl md:text-3xl font-extrabold tracking-tight">
            {t("Trakya'daki işletmeler bize bunları soruyor")}
          </h2>
          <div className="mt-8 border border-white/15 divide-y divide-white/15">
            {FAQS.map((f, i) => (
              <details key={i} className="group bg-background px-5 py-4">
                <summary className="flex items-center justify-between gap-4 cursor-pointer list-none font-heading font-bold text-sm md:text-base">
                  {t(f.q)}
                  <ChevronRight className="w-4 h-4 text-primary shrink-0 transition-transform group-open:rotate-90" />
                </summary>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{t(f.a)}</p>
              </details>
            ))}
          </div>
        </Reveal>

        {/* CTA */}
        <Reveal delay={0.05} className="mt-10 border border-primary bg-primary/5 p-7 md:p-9 flex flex-col md:flex-row md:items-center gap-6 justify-between">
          <div className="max-w-xl">
            <h2 className="font-heading text-2xl font-extrabold">{t("İlçenizde bugün başlayalım")}</h2>
            <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
              {t("Trakya'nın her köşesinden talep alıyoruz. AI asistanımıza yazın; 1 iş günü içinde size özel teklif elinizde olsun.")}
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <button
              onClick={openAssistant}
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-bold px-5 py-3 hover:brightness-110 transition-all"
            >
              {t("Sohbete Başla")} <ArrowUpRight className="w-4 h-4" />
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