import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight, MessageCircle, Phone, Sparkles, User } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { useAuth } from "@/lib/AuthContext";
import { whatsappUrl } from "@/lib/whatsapp";
import LangSwitcher from "@/components/navbar/LangSwitcher";

const EASE = [0.22, 1, 0.36, 1];

export default function MobileMenu({ links }) {
  const { t } = useLang();
  const { user } = useAuth();
  const { pathname } = useLocation();

  // İlk 4 bağlantı büyük karo, kalanı kompakt satır
  const tiles = links.slice(0, 4);
  const rows = links.slice(4);

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.22, ease: EASE }}
      className="lg:hidden fixed left-0 right-0 bottom-0 top-[62px] sm:top-16 z-40 bg-[#0A0A0B]/95 backdrop-blur-2xl bg-gridlines flex flex-col overscroll-contain border-t border-primary/40"
    >
      {/* Bağlantılar */}
      <div className="flex-1 flex flex-col px-5 pt-6 pb-4 overflow-y-auto overscroll-contain">
        <p className="font-mono text-[10px] tracking-[0.35em] text-muted-foreground mb-4">MENÜ</p>

        {/* Öne çıkan sayfalar — bento karolar */}
        <div className="grid grid-cols-2 gap-2.5">
          {tiles.map((l, i) => {
            const active = pathname === l.to;
            return (
              <motion.div
                key={l.to}
                initial={{ opacity: 0, y: 22, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.04 * i, type: "spring", stiffness: 120, damping: 17 }}
              >
                <Link
                  to={l.to}
                  className={`relative flex flex-col justify-between min-h-[96px] p-3.5 border active:scale-[0.97] transition-all ${
                    active
                      ? "border-primary bg-primary/10 shadow-[0_0_30px_-10px_rgba(251,178,43,0.5)]"
                      : "border-white/12 bg-white/[0.03] active:border-primary/50"
                  }`}
                >
                  <span className="flex items-start justify-between">
                    <span className={`font-mono text-[10px] ${active ? "text-primary" : "text-primary/60"}`}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <ArrowUpRight className={`w-4 h-4 ${active ? "text-primary" : "text-muted-foreground"}`} />
                  </span>
                  <span
                    className={`font-heading font-bold text-[15px] leading-snug ${
                      active ? "text-primary" : "text-foreground"
                    }`}
                  >
                    {t(l.label)}
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Diğer sayfalar — kompakt satırlar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.04 * tiles.length + 0.04, duration: 0.28, ease: EASE }}
          className="mt-3 border border-white/10 divide-y divide-white/[0.07]"
        >
          {rows.map((l) => {
            const active = pathname === l.to;
            return (
              <Link
                key={l.to}
                to={l.to}
                className={`group flex items-center justify-between min-h-[52px] px-4 py-3 active:bg-white/5 transition-colors ${
                  active ? "bg-primary/10" : ""
                }`}
              >
                <span className={`text-sm font-semibold ${active ? "text-primary" : "text-foreground/85"}`}>
                  {t(l.label)}
                </span>
                <ArrowUpRight className={`w-4 h-4 ${active ? "text-primary" : "text-muted-foreground/60"}`} />
              </Link>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.04 * links.length + 0.08, duration: 0.28, ease: EASE }}
          className="mt-4 grid grid-cols-2 gap-2.5"
        >
          <Link
            to="/ai-asistan"
            className="flex items-center justify-center gap-2 bg-primary text-primary-foreground font-bold px-4 py-3.5 text-sm active:brightness-110 active:scale-[0.97] shadow-[0_6px_30px_-8px_rgba(251,178,43,0.55)] transition-all"
          >
            <Sparkles className="w-4 h-4" />
            {t("AI Asistan")}
          </Link>
          <Link
            to={user ? "/hesabim" : "/login"}
            className="flex items-center justify-center gap-2 border border-white/25 px-4 py-3.5 text-sm font-semibold active:border-primary active:scale-[0.97] transition-all"
          >
            <User className="w-4 h-4" />
            {user ? t("Hesabım") : t("Giriş Yap")}
          </Link>
        </motion.div>
      </div>

      {/* Alt hızlı iletişim çubuğu */}
      <div className="border-t border-white/15 px-5 pt-3.5 pb-[max(1rem,env(safe-area-inset-bottom))] shrink-0 bg-[#0A0A0B]">
        <div className="flex gap-3">
          <a
            href={whatsappUrl()}
            target="_blank"
            rel="noreferrer"
            className="flex-1 flex items-center justify-center gap-2 border border-white/20 h-12 text-xs font-semibold hover:border-primary hover:text-primary active:border-primary/60 active:text-primary active:scale-[0.97] transition-all"
          >
            <MessageCircle className="w-4 h-4" /> WhatsApp
          </a>
          <a
            href="tel:+902821234567"
            className="flex-1 flex items-center justify-center gap-2 border border-white/20 h-12 text-xs font-semibold hover:border-primary hover:text-primary active:border-primary/60 active:text-primary active:scale-[0.97] transition-all"
          >
            <Phone className="w-4 h-4" /> {t("Hemen Ara")}
          </a>
        </div>
        <div className="flex justify-center pt-3.5">
          <LangSwitcher size="lg" />
        </div>
      </div>
    </motion.div>
  );
}