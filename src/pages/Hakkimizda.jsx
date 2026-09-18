import { Link } from "react-router-dom";
import { ArrowUpRight, MapPin, Zap, ShieldCheck, MessageSquareHeart } from "lucide-react";
import Reveal from "@/components/Reveal";
import { useLang } from "@/lib/i18n";
import usePageMeta from "@/lib/usePageMeta";
import { STATS } from "@/lib/siteData";

const VALUES = [
  {
    icon: MapPin,
    title: "Yerel Olmak",
    text: "Ofisimiz Çorlu'da; müşterimizle aynı çarşıda, aynı pazardayız. Trakya'yı tanımadan bu bölgede dijital iş yapılamaz.",
  },
  {
    icon: Zap,
    title: "Hız ve Performans",
    text: "Modern altyapıyla saniyede açılan siteler kurarız. Yavaş site, kayıp müşteri demektir — bunu kabul etmeyiz.",
  },
  {
    icon: ShieldCheck,
    title: "Dürüst Fiyat, Net Söz",
    text: "Sürpriz paket ücreti yok. Kapsamı, süreyi ve fiyatı baştan yazılı veririz; söz verdiğimiz günde teslim ederiz.",
  },
  {
    icon: MessageSquareHeart,
    title: "7/24 Türkçe Destek",
    text: "AI asistanımız günün her saati yanınızda; insan ekibimiz de iş günleri içinde her zaman ulaşılabilir.",
  },
];

export default function Hakkimizda() {
  const { t } = useLang();

  usePageMeta({
    title: "Hakkımızda | DijiTrak — Trakya'nın Dijital Ajansı",
    description:
      "DijiTrak, Trakya'daki işletmeleri dünya standartında web teknolojisiyle buluşturan bölgesel dijital ajans. Hikâyemiz, değerlerimiz ve ekibimiz.",
  });

  return (
    <div className="pt-16 pb-20 min-h-screen bg-[#0A0A0B]">
      <div className="max-w-7xl mx-auto px-6 pt-10">
        {/* Başlık */}
        <Reveal>
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 bg-primary" />
            <p className="text-[11px] font-mono tracking-[0.25em] text-primary">{t("HAKKIMIZDA")}</p>
          </div>
          <h1 className="font-heading text-3xl md:text-5xl font-extrabold tracking-[-0.04em] mt-4 max-w-3xl">
            {t("Trakya'nın toprağından, ekranına dijital güç katıyoruz.")}
          </h1>
          <p className="text-muted-foreground mt-5 max-w-2xl leading-relaxed">
            {t(
              "DijiTrak, Trakya'daki işletmelerin dijital dünyada hak ettiği yeri bulması için kuruldu. Ayçiçeği tarlalarından Çorlu'nun sanayi tesislerine, çarşı esnafından e-ticaret girişimlerine kadar bölgenin her sektörüne dünya standartında web tasarımı sunuyoruz."
            )}
          </p>
        </Reveal>

        {/* Hikâye */}
        <div className="mt-14 grid lg:grid-cols-2 gap-6">
          <Reveal delay={0.05} className="border border-white/15 bg-background p-7 brutal-card">
            <p className="text-xs font-mono tracking-widest text-primary mb-4">{t("HİKÂYEMİZ")}</p>
            <p className="text-sm text-foreground/80 leading-relaxed">
              {t(
                "Trakya'da yıllarca işletmelerin dijital ihtiyaçlarını yakından izledik: güzelim ürünlerin karaktersiz şablon sitelerde kaybolduğunu, esnafın Google Haritalar'da bile görünmediğini, sanayicinin yurt dışı müşteriye ulaşamadığını gördük. DijiTrak'ı bu boşluğu kapatmak için kurduk — büyük şehir ajanslarının kalitesini, mahallenin samimiyetiyle birleştirdik."
              )}
            </p>
          </Reveal>
          <Reveal delay={0.1} className="border border-white/15 bg-background p-7 brutal-card">
            <p className="text-xs font-mono tracking-widest text-primary mb-4">{t("MİSYONUMUZ")}</p>
            <p className="text-sm text-foreground/80 leading-relaxed">
              {t(
                "2030'a kadar Trakya'daki her işletmenin profesyonel bir dijital varlığa sahip olmasını sağlamak. Bunu yaparken hiçbir işletmeyi pahalı paketlerle dışarıda bırakmayacak, her bütçeye uygun bir başlangıç noktası sunacağız."
              )}
            </p>
          </Reveal>
        </div>

        {/* Değerler */}
        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {VALUES.map((v, i) => (
            <Reveal key={v.title} delay={0.05 * i} className="border border-white/15 bg-background p-6 brutal-card">
              <v.icon className="w-6 h-6 text-primary mb-4" />
              <h3 className="font-heading font-bold">{t(v.title)}</h3>
              <p className="text-[13px] text-muted-foreground mt-2 leading-relaxed">{t(v.text)}</p>
            </Reveal>
          ))}
        </div>

        {/* İstatistikler */}
        <Reveal className="mt-6 border border-white/15 bg-background grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-white/10">
          {STATS.map((s) => (
            <div key={s.label} className="p-6 lg:p-8">
              <p className="font-heading text-3xl md:text-4xl font-extrabold text-primary">{s.value}</p>
              <p className="text-xs text-muted-foreground mt-1.5">{t(s.label)}</p>
            </div>
          ))}
        </Reveal>

        {/* CTA */}
        <Reveal delay={0.05} className="mt-6 border border-primary bg-primary/5 p-7 md:p-9 flex flex-col md:flex-row md:items-center gap-6 justify-between">
          <div className="max-w-xl">
            <h2 className="font-heading text-2xl font-extrabold">{t("Projenizi birlikte büyütelim")}</h2>
            <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
              {t("Ücretsiz keşif görüşmesinde hedeflerinizi konuşalım; size özel yol haritasını 1 iş günü içinde iletelim.")}
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <Link
              to="/ai-asistan"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-bold px-5 py-3 hover:brightness-110 transition-all"
            >
              {t("AI Asistanla Başla")} <ArrowUpRight className="w-4 h-4" />
            </Link>
            <Link
              to="/iletisim"
              className="inline-flex items-center gap-2 border border-white/25 px-5 py-3 hover:border-primary hover:text-primary transition-colors"
            >
              {t("İletişim")}
            </Link>
          </div>
        </Reveal>
      </div>
    </div>
  );
}