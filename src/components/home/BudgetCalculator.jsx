import { useEffect, useMemo, useState } from "react";
import { motion, useSpring, useTransform } from "framer-motion";
import { ArrowRight, Camera, Check, Globe, Info, MapPin, Search, ShoppingCart, Sparkles, Wrench } from "lucide-react";
import Reveal from "@/components/Reveal";
import { openAssistant } from "@/lib/assistant";
import { useLang } from "@/lib/i18n";

// Freelancer seviyesi — piyasanın en uygun fiyatları
const SERVICE_OPTS = [
  { id: "web", label: "Kurumsal Web Sitesi", base: 4900, desc: "Özel tasarım, mobil uyumlu", icon: Globe },
  { id: "eticaret", label: "E-Ticaret Altyapısı", base: 14900, desc: "Ödeme, stok, kargo entegrasyonu", icon: ShoppingCart },
  { id: "seo", label: "SEO Optimizasyonu", base: 2900, desc: "Teknik SEO + anahtar kelime planı", icon: Search },
  { id: "yerel", label: "Yerel SEO & Haritalar", base: 1900, desc: "Google Business profil yönetimi", icon: MapPin },
  { id: "icerik", label: "İçerik & Fotoğraf", base: 2400, desc: "Profesyonel çekim + metinler", icon: Camera },
  { id: "bakim", label: "Yıllık Bakım & Destek", base: 1900, desc: "Güncelleme, güvenlik, raporlama", icon: Wrench },
];

const TIERS = [
  { id: "hizli", label: "Hızlı Başlangıç", mult: 0.8, note: "Şablon bazlı, 2 haftada yayında" },
  { id: "profesyonel", label: "Profesyonel", mult: 1, note: "Özel tasarım, dengeli süreç" },
  { id: "kurumsal", label: "Kurumsal", mult: 1.3, note: "Özel entegrasyonlar, kurumsal kimlik" },
];

const PAGES = [3, 5, 8, 12, 20];
const BASE_PAGES = 5;
const PER_PAGE = 250;

const fmt = (v) => Math.round(v).toLocaleString("tr-TR");

export default function BudgetCalculator() {
  const { t } = useLang();
  const [selected, setSelected] = useState(["web"]);
  const [tier, setTier] = useState("profesyonel");
  const [pages, setPages] = useState(5);

  const toggle = (id) =>
    setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

  const { sum, total, discountRate } = useMemo(() => {
    const base = SERVICE_OPTS.filter((s) => selected.includes(s.id)).reduce((a, s) => a + s.base, 0)
      + (selected.includes("web") ? (pages - BASE_PAGES) * PER_PAGE : 0);
    const tierMult = TIERS.find((x) => x.id === tier)?.mult || 1;
    const rate = selected.length >= 4 ? 0.1 : selected.length >= 2 ? 0.05 : 0;
    const calc = Math.max(0, base) * tierMult * (1 - rate);
    return { sum: base, total: Math.round(calc / 500) * 500, discountRate: rate };
  }, [selected, tier, pages]);

  const spring = useSpring(0, { stiffness: 80, damping: 18 });
  useEffect(() => {
    spring.set(total);
  }, [total, spring]);
  const display = useTransform(spring, (v) => fmt(v));

  const hasWeb = selected.includes("web");
  const tierMult = TIERS.find((x) => x.id === tier)?.mult || 1;

  return (
    <section id="butce-hesaplayici" className="border-t border-white/10 py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal>
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-primary shadow-[0_0_14px_2px_rgba(251,178,43,0.6)]" />
            <p className="text-[11px] font-mono tracking-[0.25em] text-primary">{t("BÜTÇE HESAPLAYICI")}</p>
          </div>
          <h2 className="mt-5 font-heading text-3xl md:text-5xl font-extrabold tracking-[-0.03em] max-w-2xl">
            {t("Projenize 60 saniyede fiyat alın")}
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl">
            {t("İhtiyaçlarınızı seçin, bütçeniz anında hesaplansın. Çok hizmet seçerseniz paket indirimi otomatik uygulanır.")}
          </p>
        </Reveal>

        {/* Mobil — hesaplarken ekranda kalan yüzen bütçe pilli */}
        <div className="lg:hidden sticky top-[62px] sm:top-16 z-30 -mx-6 px-6 py-2 bg-[#0A0A0B]/85 backdrop-blur-xl">
          <div className="flex items-center justify-between gap-2 rounded-full border border-primary/30 bg-primary/10 pl-4 pr-1.5 py-1.5 shadow-[0_8px_40px_-12px_rgba(251,178,43,0.5)] overflow-hidden">
            <div className="leading-tight min-w-0">
              <p className="text-[8px] font-mono tracking-[0.18em] text-primary/80">{t("TAHMİNİ BÜTÇE")}</p>
              <p className="font-heading font-extrabold text-base sm:text-lg whitespace-nowrap">₺<motion.span>{display}</motion.span></p>
            </div>
            <button
              onClick={openAssistant}
              className="shrink-0 inline-flex items-center gap-1.5 rounded-full bg-primary text-primary-foreground text-[11px] sm:text-xs font-bold px-3.5 h-10 active:scale-95 transition-transform"
            >
              <Sparkles className="w-3.5 h-3.5" /> {t("Teklif Al")}
            </button>
          </div>
        </div>

        <div className="mt-8 grid lg:grid-cols-[1.5fr_1fr] gap-5">
          {/* Seçim paneli */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 md:p-7 space-y-8">
            <div>
              <p className="text-[11px] font-mono tracking-[0.2em] text-muted-foreground">{t("01 — İHTİYAÇLARINIZ")}</p>
              <div className="mt-4 grid sm:grid-cols-2 gap-2.5">
                {SERVICE_OPTS.map((s) => {
                  const on = selected.includes(s.id);
                  const Icon = s.icon;
                  return (
                    <button
                      key={s.id}
                      onClick={() => toggle(s.id)}
                      className={`text-left p-4 rounded-xl border flex items-start gap-3 transition-all active:scale-[0.98] ${
                        on
                          ? "border-primary/60 bg-primary/10 shadow-[0_0_30px_-12px_rgba(251,178,43,0.45)]"
                          : "border-white/10 bg-white/[0.02] hover:border-white/25 hover:bg-white/[0.05]"
                      }`}
                    >
                      <span
                        className={`mt-0.5 w-5 h-5 shrink-0 rounded-md flex items-center justify-center transition-colors ${
                          on ? "bg-primary" : "border border-white/25"
                        }`}
                      >
                        {on && <Check className="w-3.5 h-3.5 text-primary-foreground" />}
                      </span>
                      <span className="min-w-0">
                        <span className="flex items-start gap-1.5 text-sm font-bold break-words">
                          <Icon className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${on ? "text-primary" : "text-muted-foreground"}`} />
                          {t(s.label)}
                        </span>
                        <span className="block text-xs text-muted-foreground mt-1 break-words">{t(s.desc)}</span>
                        <span className="block text-xs font-mono text-primary mt-1.5">₺{fmt(s.base)}</span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <p className="text-[11px] font-mono tracking-[0.2em] text-muted-foreground">{t("02 — KAPSAM")}</p>
              <div className="mt-4 grid grid-cols-3 gap-2.5">
                {TIERS.map((tierOpt) => {
                  const on = tier === tierOpt.id;
                  return (
                    <button
                      key={tierOpt.id}
                      onClick={() => setTier(tierOpt.id)}
                      className={`rounded-xl border p-3 text-left transition-all active:scale-[0.98] ${
                        on
                          ? "border-primary/60 bg-primary/10 shadow-[0_0_30px_-12px_rgba(251,178,43,0.45)]"
                          : "border-white/10 bg-white/[0.02] hover:border-white/25 hover:bg-white/[0.05]"
                      }`}
                    >
                      <span className={`block text-xs sm:text-sm font-bold break-words ${on ? "text-primary" : ""}`}>{t(tierOpt.label)}</span>
                      <span className="block text-[10px] leading-snug text-muted-foreground mt-1 hidden sm:block">{t(tierOpt.note)}</span>
                    </button>
                  );
                })}
              </div>
              <div className={`mt-4 transition-opacity ${hasWeb ? "opacity-100" : "opacity-40 pointer-events-none"}`}>
                <p className="text-xs text-muted-foreground mb-2.5">
                  {t("Sayfa sayısı:")} <span className="font-mono text-primary font-bold">{pages}</span>
                  {!hasWeb && <span className="ml-2">{t("(web sitesi seçiliyken aktif)")}</span>}
                </p>
                <div className="flex flex-wrap gap-2">
                  {PAGES.map((p) => (
                    <button
                      key={p}
                      onClick={() => setPages(p)}
                      className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full text-xs sm:text-sm font-mono transition-all active:scale-95 ${
                        pages === p
                          ? "bg-primary text-primary-foreground shadow-[0_4px_20px_-4px_rgba(251,178,43,0.55)]"
                          : "border border-white/15 text-foreground/75 hover:border-white/35"
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Özet kart — masaüstü */}
          <div className="hidden lg:flex flex-col rounded-2xl border border-primary/25 bg-gradient-to-b from-primary/[0.08] to-transparent p-7 lg:sticky lg:top-24 self-start shadow-[0_0_60px_-20px_rgba(251,178,43,0.35)]">
            <p className="text-[11px] font-mono tracking-[0.25em] text-primary">{t("TAHMİNİ PROJE BÜTÇESİ")}</p>
            <p className="mt-4 font-heading text-4xl md:text-5xl font-extrabold tracking-tight">
              ₺<motion.span>{display}</motion.span>
            </p>
            <p className="mt-2 text-xs font-mono text-muted-foreground">
              ₺{fmt(total * 0.9)} — ₺{fmt(total * 1.1)} {t("aralığı")}
            </p>

            {discountRate > 0 && (
              <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3.5 py-1.5 text-xs font-bold text-primary">
                <Sparkles className="w-3.5 h-3.5" />
                {t("Paket indirimi")} %{discountRate * 100}
              </div>
            )}

            <div className="mt-6 pt-5 border-t border-white/10 space-y-2.5">
              {SERVICE_OPTS.filter((s) => selected.includes(s.id)).map((s) => (
                <div key={s.id} className="flex items-baseline justify-between gap-3 text-sm">
                  <span className="text-muted-foreground">{t(s.label)}</span>
                  <span className="font-mono text-xs">₺{fmt(s.base)}</span>
                </div>
              ))}
              {hasWeb && pages !== BASE_PAGES && (
                <div className="flex items-baseline justify-between gap-3 text-sm">
                  <span className="text-muted-foreground">{t("Ek sayfalar")} ({pages - BASE_PAGES})</span>
                  <span className="font-mono text-xs">₺{fmt((pages - BASE_PAGES) * PER_PAGE)}</span>
                </div>
              )}
              {tierMult !== 1 && (
                <div className="flex items-baseline justify-between gap-3 text-sm pt-2.5 border-t border-white/10">
                  <span className="text-muted-foreground">{t("Kapsam katsayısı")}</span>
                  <span className="font-mono text-xs text-primary">×{tierMult}</span>
                </div>
              )}
              {discountRate > 0 && (
                <div className="flex items-baseline justify-between gap-3 text-sm">
                  <span className="text-muted-foreground">{t("Paket indirimi")}</span>
                  <span className="font-mono text-xs text-primary">-₺{fmt(sum * tierMult * discountRate)}</span>
                </div>
              )}
              {selected.length === 0 && (
                <p className="text-sm text-muted-foreground">{t("Hesaplama için en az bir hizmet seçin.")}</p>
              )}
            </div>

            <button
              onClick={openAssistant}
              className="mt-7 inline-flex items-center justify-center gap-2 w-full rounded-full bg-primary text-primary-foreground font-bold px-6 py-3.5 hover:shadow-[0_0_32px_-6px_rgba(251,178,43,0.8)] active:scale-[0.98] transition-all"
            >
              {t("Kesin teklifi AI asistanla al")} <ArrowRight className="w-4 h-4" />
            </button>
            <p className="mt-4 flex items-start gap-2 text-[11px] text-muted-foreground leading-relaxed">
              <Info className="w-3.5 h-3.5 mt-0.5 shrink-0" />
              {t("Fiyatlar bilgilendirme amaçlı tahminlerdir; kesin teklif keşif görüşmesi sonrası verilir.")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}