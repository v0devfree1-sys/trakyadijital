import { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Image } from "@/components/ui/image";
import Reveal from "@/components/Reveal";
import { SECTORS } from "@/lib/siteData";
import { useLang } from "@/lib/i18n";

export default function SectorHub() {
  const { t } = useLang();
  const [activeId, setActiveId] = useState(SECTORS[0].id);
  const active = SECTORS.find((s) => s.id === activeId) || SECTORS[0];

  return (
    <section id="sektorler" className="border-t border-white/15 py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal>
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 bg-primary" />
            <p className="text-[11px] font-mono tracking-[0.25em] text-primary">{t("SEKTÖREL ÇÖZÜMLER")}</p>
          </div>
          <h2 className="mt-5 font-heading text-3xl md:text-5xl font-extrabold tracking-[-0.03em] max-w-2xl">
            {t("Sektörünüzü biliyor muyuz? Evet.")}
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl">
            {t("Tarımından sanayisine, Trakya'nın her sektörüne özel hazırlanmış dijital çözümler.")}
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-12 border border-white/15 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-px bg-white/15">
          {SECTORS.map((s) => (
            <button
              key={s.id}
              onClick={() => setActiveId(s.id)}
              className={`text-left p-5 transition-colors ${
                s.id === activeId
                  ? "bg-primary text-primary-foreground"
                  : "bg-background hover:bg-[#101010]"
              }`}
            >
              <p className="font-heading text-sm font-bold tracking-tight leading-snug">{t(s.name)}</p>
              <p className={`text-[11px] mt-1.5 leading-snug ${s.id === activeId ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                {t(s.tagline)}
              </p>
            </button>
          ))}
        </Reveal>

        <div className="border-x border-b border-white/15 grid lg:grid-cols-[1.2fr_1fr]">
          <div className="p-8 md:p-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
              >
                <p className="text-[11px] font-mono tracking-[0.25em] text-primary">{t("SEKTÖR")} / {active.id.toUpperCase()}</p>
                <p className="mt-4 text-sm text-foreground/80 leading-relaxed">{t(active.description)}</p>
                <ul className="mt-6 grid sm:grid-cols-2 gap-2.5">
                  {active.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                      <span className="w-1.5 h-1.5 mt-2 bg-primary shrink-0" /> {t(h)}
                    </li>
                  ))}
                </ul>
                <Link
                  to={`/sektorler?sektor=${active.id}`}
                  className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-primary hover:gap-3 transition-all"
                >
                  {t("Sektör çözümünü incele")} <ArrowUpRight className="w-4 h-4" />
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="relative min-h-[280px] border-t lg:border-t-0 lg:border-l border-white/15 overflow-hidden group">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                <Image src={active.image} alt={t(active.name)} className="w-full h-full object-cover" />
              </motion.div>
            </AnimatePresence>
            <div className="absolute bottom-0 inset-x-0 border-t border-white/15 bg-[#0A0A0B]/90 px-5 py-3">
              <p className="font-heading text-lg font-extrabold tracking-tight">{t(active.name)}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}