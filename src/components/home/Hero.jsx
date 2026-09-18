import { motion } from "framer-motion";
import { ArrowRight, BadgeCheck, Clock, Sparkles } from "lucide-react";
import { openAssistant } from "@/lib/assistant";
import { useLang } from "@/lib/i18n";

const fade = (delay) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { type: "spring", stiffness: 100, damping: 20, delay },
});

const STATS = [
  { icon: BadgeCheck, value: "₺4.900", label: "Başlangıç paketi" },
  { icon: Clock, value: "14 gün", label: "Ortalama teslim" },
  { icon: Sparkles, value: "7/24", label: "AI asistan desteği" },
];

export default function Hero() {
  const { t } = useLang();

  return (
    <section className="relative overflow-hidden">
      {/* Arka plan katmanları */}
      <div className="absolute inset-0 bg-gridlines opacity-40" />
      <div className="absolute -top-32 -right-32 w-[420px] h-[420px] rounded-full bg-primary/15 blur-[120px] animate-glow-pulse" />
      <div className="absolute -bottom-40 -left-24 w-[380px] h-[380px] rounded-full bg-primary/10 blur-[110px]" />

      <div className="relative max-w-7xl mx-auto px-6 pt-24 md:pt-32 pb-16 md:pb-20">
        {/* Üst rozet */}
        <motion.div
          {...fade(0)}
          className="inline-flex flex-wrap items-center gap-x-4 gap-y-2 rounded-full border border-white/15 bg-[#0A0A0B]/70 backdrop-blur px-4 py-2.5"
        >
          <span className="text-[11px] font-mono tracking-[0.18em] text-primary">
            {t("DİJİTRAK — TEKİRDAĞ · EDİRNE · KIRKLARELİ")}
          </span>
          <span className="hidden sm:inline-flex items-center gap-2 text-[11px] font-mono tracking-[0.18em] text-foreground/70">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            {t("AI ASİSTAN AKTİF")}
          </span>
        </motion.div>

        <div className="mt-8 md:mt-12 grid lg:grid-cols-[1.15fr_1fr] gap-10 lg:gap-12 items-center">
          {/* İçerik */}
          <div>
            <motion.h1
              {...fade(0.1)}
              className="font-heading font-extrabold tracking-[-0.04em] leading-[1.05] text-4xl sm:text-5xl md:text-6xl"
            >
              {t("Trakya işletmesinin")}
              <br />
              <span className="text-primary">{t("dijital izi")}</span>{" "}
              {t("bize emanet")}
            </motion.h1>
            <motion.p
              {...fade(0.25)}
              className="mt-5 sm:mt-6 max-w-xl text-foreground/70 text-base sm:text-lg leading-relaxed"
            >
              {t("Freelancer fiyatı, ajans kalitesi: web siteleri 4.900 TL'den başlar, 14 iş gününde yayında. E-ticaret, SEO ve 7/24 AI destekli bakım — hepsi tek çatı altında.")}
            </motion.p>

            <motion.div {...fade(0.4)} className="mt-8 flex flex-col sm:flex-row gap-3">
              <button
                onClick={openAssistant}
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-primary text-primary-foreground font-bold px-7 py-3.5 min-h-[48px] hover:shadow-[0_0_32px_-6px_rgba(251,178,43,0.8)] hover:brightness-110 active:scale-95 transition-all"
              >
                <Sparkles className="w-4 h-4" />
                {t("AI Asistanla Fiyat Al")}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <a
                href="#hizmetler"
                className="inline-flex items-center justify-center rounded-full px-7 py-3.5 min-h-[48px] border border-white/25 font-bold hover:border-primary hover:text-primary active:scale-95 transition-all"
              >
                {t("Hizmetleri Keşfet")}
              </a>
            </motion.div>

            {/* İstatistik şeridi */}
            <motion.div
              {...fade(0.55)}
              className="mt-8 grid grid-cols-3 rounded-2xl border border-white/10 bg-white/[0.03] divide-x divide-white/10 overflow-hidden"
            >
              {STATS.map((s) => (
                <div key={s.value} className="px-3 sm:px-5 py-3.5 sm:py-4 text-center sm:text-left">
                  <s.icon className="hidden sm:block w-4 h-4 text-primary mb-1.5" />
                  <p className="font-heading font-extrabold text-base sm:text-xl leading-none">{t(s.value)}</p>
                  <p className="text-[9px] sm:text-[11px] text-muted-foreground mt-1 leading-tight">{t(s.label)}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Canlı kart — tarayıcı önizlemesi */}
          <motion.div
            {...fade(0.35)}
            className="relative rounded-2xl border border-white/15 bg-[#0A0A0B]/60 backdrop-blur overflow-hidden shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)]"
          >
            {/* Tarayıcı çubuğu */}
            <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
              <span className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
                <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
                <span className="w-2.5 h-2.5 rounded-full bg-primary/70" />
              </span>
              <span className="flex-1 rounded-full bg-white/5 px-3 py-1 text-[10px] font-mono text-muted-foreground truncate">
                dijitrak.net/{"{sizin-isletmeniz}"}
              </span>
              <span className="flex items-center gap-1.5 text-[9px] font-mono tracking-widest text-primary">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                {t("YAYINDA")}
              </span>
            </div>

            {/* Canlı sayaçlar */}
            <div className="p-5 sm:p-6 space-y-4">
              <div className="flex items-baseline justify-between">
                <p className="text-[10px] font-mono tracking-[0.22em] text-muted-foreground">{t("BUGÜN SİTE İSTATİSTİĞİ")}</p>
                <span className="text-[10px] font-mono text-primary">{t("CANLI")}</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-white/[0.04] border border-white/10 p-4">
                  <p className="font-heading text-2xl sm:text-3xl font-extrabold text-primary">1.284</p>
                  <p className="text-[10px] text-muted-foreground mt-1">{t("Ziyaretçi")}</p>
                </div>
                <div className="rounded-xl bg-white/[0.04] border border-white/10 p-4">
                  <p className="font-heading text-2xl sm:text-3xl font-extrabold">%+96</p>
                  <p className="text-[10px] text-muted-foreground mt-1">{t("Google trafiği")}</p>
                </div>
              </div>

              {/* Mini bar grafik */}
              <div className="flex items-end gap-1.5 h-20 sm:h-24">
                {[35, 48, 42, 60, 55, 72, 66, 84, 78, 92, 100].map((h, i) => (
                  <motion.span
                    key={i}
                    initial={{ height: 0 }}
                    animate={{ height: `${h}%` }}
                    transition={{ delay: 0.7 + i * 0.06, type: "spring", stiffness: 120, damping: 18 }}
                    className={`flex-1 rounded-t-sm ${i >= 8 ? "bg-primary" : "bg-white/15"}`}
                  />
                ))}
              </div>
              <p className="text-[10px] font-mono tracking-[0.18em] text-muted-foreground text-center">
                {t("SİZİN SİTENİZ DE BU İZİ BIRAKSIN")}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}