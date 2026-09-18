import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ArrowUpRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import { useLang } from "@/lib/i18n";
import usePageMeta from "@/lib/usePageMeta";

const FAQS = [
  {
    q: "Bir web sitesi ne kadar sürede yayına alınır?",
    a: "Ortalama teslim süremiz 14 iş günüdür. Keşif ve analiz 1-2 gün, tasarım onayı 5-7 gün, geliştirme ve test 5-7 gün sürer. Acil projelerde süreç önceliklendirilebilir.",
  },
  {
    q: "Fiyatlar neye göre belirleniyor?",
    a: "Paketlerimiz sabit fiyatlıdır: Başlangıç 4.900 TL, Kurumsal 9.900 TL, E-Ticaret 14.900 TL. Keşif görüşmesinden sonra kapsamı netleştirip yazılı teklif sunarız; sürpriz ek ücret çıkmaz.",
  },
  {
    q: "Mevcut sitemi yenileyebilir misiniz?",
    a: "Evet. Mevcut sitenizi inceleyip ücretsiz SEO denetimi yapar, neyin korunacağını ve neyin yenilenmesi gerektiğini raporlarız. Ardından tasarımı modernize edip içeriğinizi kayıpsız taşıyoruz.",
  },
  {
    q: "SEO çalışması tam olarak neyi kapsıyor?",
    a: "Teknik SEO (hız, mobil uyum, yapısal veri), sayfa içi optimizasyon (başlık, meta, içerik), Google kayıtları ve yerel arama optimizasyonunu içerir. Trakya'daki hedef kelimelerde ilk sayfa hedefiyle çalışırız.",
  },
  {
    q: "E-ticaret siteniz hangi ödeme ve kargo entegrasyonlarını destekliyor?",
    a: "Tüm büyük sanal POS sağlayıcılarıyla (iyzico, PayTR, banka POS'ları) ve Trendyol, Hepsiburada gibi pazaryerleriyle entegre çalışıyoruz. Kargo firması otomasyonu ve stok yönetimi pakete dahildir.",
  },
  {
    q: "Site yayınlandıktan sonra destek devam ediyor mu?",
    a: "Evet. Yıllık bakım paketimiz (1.900 TL'den başlar) yedekleme, güvenlik güncellemeleri, küçük içerik değişiklikleri ve 7/24 Türkçe destek içerir. AI asistanımız da her an yanınızda.",
  },
  {
    q: "Sitede birden fazla dil kullanabilir miyim?",
    a: "Evet, sitelerimiz Türkçe, İngilizce, Bulgarca ve Yunanca dahil çoklu dil altyapısıyla kurulur. Trakya'nın komşu ülke ticareti için Bulgarca ve Yunanca büyük avantajdır.",
  },
  {
    q: "Tasarım sürecinde ne kadar söz hakkım olacak?",
    a: "Tasarım aşamasında size özel hazırlanan kavramı onayınıza sunarız; sınırsız revizyon hakkınız vardır. Onayınız olmadan geliştirme aşamasına geçmeyiz.",
  },
  {
    q: "Ödemeyi nasıl yapıyorum?",
    a: "Projeler %40 başlangıç, %40 tasarım onayı, %20 teslim olarak üç taksitte tahsil edilir. Kurumsal müşterilerimize fatura düzenleriz.",
  },
  {
    q: "Dışarıdan aldığım hosting ve alan adımı kullanabilir miyim?",
    a: "Evet, mevcut alan adınızı ve hostinginizi kullanabiliriz. Ancak performans için kendi hızlı altyapımızı öneririz — Başlangıç paketinde 1 yıl hosting hediye ediyoruz.",
  },
];

export default function SSS() {
  const { t } = useLang();

  usePageMeta({
    title: "SSS | DijiTrak — Sık Sorulan Sorular",
    description:
      "Web sitesi fiyatları, teslim süreçleri, SEO kapsamı, e-ticaret entegrasyonları ve destek süreci hakkında merak edilen her şey.",
    // Google zengin sonucu: SSS içeriği arama sonucunda doğrudan görünebilir
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: FAQS.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  });

  return (
    <div className="pt-16 pb-20 min-h-screen bg-[#0A0A0B]">
      <div className="max-w-4xl mx-auto px-6 pt-10">
        <Reveal>
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 bg-primary" />
            <p className="text-[11px] font-mono tracking-[0.25em] text-primary">{t("SIK SORULAN SORULAR")}</p>
          </div>
          <h1 className="font-heading text-3xl md:text-5xl font-extrabold tracking-[-0.04em] mt-4">
            {t("Merak edilenler, net yanıtlar")}
          </h1>
          <p className="text-muted-foreground mt-5 max-w-2xl leading-relaxed">
            {t("Fiyat, süreç ve destek hakkındaki en çok sorulan soruları burada topladık. Yanıtını bulamadığınız her şey için AI asistanımız 7/24 yanınızda.")}
          </p>
        </Reveal>

        <Reveal delay={0.08} className="mt-10 border border-white/15 bg-background">
          <Accordion type="single" collapsible className="divide-y divide-white/10">
            {FAQS.map((f, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="border-b-0 px-5 md:px-6">
                <AccordionTrigger className="text-left font-heading font-bold text-sm md:text-base hover:text-primary hover:no-underline py-5">
                  <span className="flex items-baseline gap-3">
                    <span className="font-mono text-[10px] text-primary/70 shrink-0">0{i + 1}</span>
                    {t(f.q)}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-5 pl-8 md:pl-9">
                  {t(f.a)}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>

        <Reveal delay={0.1} className="mt-6 border border-primary bg-primary/5 p-6 md:p-7 flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
          <p className="text-sm text-foreground/80">
            {t("Aradığınız yanıtı bulamadınız mı? Sorunuzu iletin, 1 iş günü içinde dönelim.")}
          </p>
          <Link
            to="/ai-asistan"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-bold px-5 py-3 hover:brightness-110 transition-all shrink-0"
          >
            {t("AI Asistana Sor")} <ArrowUpRight className="w-4 h-4" />
          </Link>
        </Reveal>
      </div>
    </div>
  );
}