import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Sparkles, User } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { useAuth } from "@/lib/AuthContext";
import LangSwitcher from "@/components/navbar/LangSwitcher";
import NavLink from "@/components/navbar/NavLink";
import MoreDropdown from "@/components/navbar/MoreDropdown";
import MobileMenu from "@/components/navbar/MobileMenu";
import Logo from "@/components/Logo";

const MAIN_LINKS = [
  { to: "/sektorler", label: "Sektörler" },
  { to: "/isletmeler", label: "İşletmeler" },
  { to: "/iz-biraktiklarimiz", label: "İz Bıraktıklarımız" },
  { to: "/blog", label: "Blog" },
  { to: "/randevu", label: "Randevu" },
  { to: "/iletisim", label: "İletişim" },
];

const MORE_LINKS = [
  { to: "/trakya-web-tasarim", label: "Trakya'da Web Tasarım" },
  { to: "/hakkimizda", label: "Hakkımızda" },
  { to: "/sss", label: "SSS" },
];

const MOBILE_LINKS = [{ to: "/", label: "Ana Sayfa" }, ...MAIN_LINKS, ...MORE_LINKS];

function Hamburger({ open }) {
  return (
    <span className="relative block w-5 h-3">
      <span
        className={`absolute left-0 block h-0.5 bg-current transition-all duration-300 ${
          open ? "top-1.5 w-5 rotate-45" : "top-0 w-5"
        }`}
      />
      <span
        className={`absolute left-0 block h-0.5 bg-current transition-all duration-300 ${
          open ? "top-1.5 w-5 -rotate-45" : "top-2.5 w-3.5"
        }`}
      />
    </span>
  );
}

export default function Navbar() {
  const { t } = useLang();
  const { user } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  // Sayfa değişince menüyü kapat
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Mobil menü açıkken arka planı kilitle
  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const moreItems = MORE_LINKS.map((l) => ({ ...l, label: t(l.label) }));

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-50 px-3 pt-2.5 sm:px-5 sm:pt-2 lg:px-8">
        <nav
          className={`max-w-7xl mx-auto flex items-center justify-between gap-3 h-[52px] sm:h-14 pl-4 sm:pl-5 pr-1.5 sm:pr-2 rounded-full border transition-all duration-300 ${
            scrolled
              ? "bg-[#0A0A0B]/90 backdrop-blur-2xl border-white/15 shadow-[0_12px_40px_-12px_rgba(0,0,0,0.85),0_0_28px_-10px_rgba(251,178,43,0.35)]"
              : "bg-[#0A0A0B]/55 backdrop-blur-xl border-white/10"
          }`}
        >
          <Link to="/" className="shrink-0 active:opacity-80 transition-opacity" aria-label="DijiTrak — Ana Sayfa">
            <span className="lg:hidden">
              <Logo size="sm" />
            </span>
            <span className="hidden lg:block">
              <Logo />
            </span>
          </Link>

          {/* Masaüstü menü */}
          <div className="hidden lg:flex items-center gap-6">
            {MAIN_LINKS.map((l) => (
              <NavLink key={l.to} to={l.to} label={t(l.label)} />
            ))}
            <MoreDropdown label={t("Daha Fazla")} items={moreItems} />
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <Link
              to={user ? "/hesabim" : "/login"}
              aria-label={user ? t("Hesabım") : t("Giriş Yap")}
              title={user ? t("Hesabım") : t("Giriş Yap")}
              className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-white/15 text-foreground/75 hover:border-primary/60 hover:text-primary hover:bg-primary/10 transition-colors"
            >
              <User className="w-4 h-4" />
            </Link>
            <LangSwitcher className="rounded-full" />
            <Link
              to="/ai-asistan"
              className="group inline-flex items-center gap-2 bg-primary text-primary-foreground text-sm font-bold px-4 py-2 rounded-full hover:shadow-[0_0_24px_-6px_rgba(251,178,43,0.75)] hover:brightness-110 active:scale-95 transition-all"
            >
              <Sparkles className="w-4 h-4" />
              {t("AI Asistan")}
            </Link>
          </div>

          {/* Mobil sağ taraf — ince, çerçevesiz dokunma hedefleri */}
          <div className="lg:hidden flex items-center gap-0.5">
            <Link
              to="/ai-asistan"
              aria-label={t("AI Asistan")}
              className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-primary text-primary-foreground shadow-[0_4px_20px_-6px_rgba(251,178,43,0.6)] active:scale-95 transition-transform"
            >
              <Sparkles className="w-[18px] h-[18px]" />
            </Link>
            <button
              className={`w-11 h-11 flex items-center justify-center rounded-full active:scale-95 transition-all active:bg-white/10 ${
                menuOpen ? "bg-white/10 text-primary" : "text-foreground/85"
              }`}
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={t("Menü")}
              aria-expanded={menuOpen}
            >
              <Hamburger open={menuOpen} />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobil tam ekran menü — header'ın dışında: kaydırma durumundaki blur efekti
          menünün konumunu bozuyordu (fixed kapsayıcı tuzağı), artık güvenli */}
      <AnimatePresence>{menuOpen && <MobileMenu links={MOBILE_LINKS} />}</AnimatePresence>
    </>
  );
}