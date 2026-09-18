import { Link } from "react-router-dom";
import { useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import { Linkedin, Instagram, Twitter, ArrowUpRight } from "lucide-react";
import { openAssistant } from "@/lib/assistant";
import { useLang } from "@/lib/i18n";
import Logo from "@/components/Logo";

const TIERS = [
  { cta: "İletişime geçin", desc: "Trakya'nın dijital mimarısıyla tanışın.", action: "Sohbet başlat" },
  { cta: "Ücretsiz SEO denetimi alın", desc: "Sitenizi 24 saat içinde analiz edip raporlayalım.", action: "Denetim isteyin" },
  { cta: "DijiTrak ile ortak olun", desc: "Toprağınızı dijitalleştiren ekiple büyümeye başlayın.", action: "Projenizi anlatın" },
];

export default function Footer() {
  const { scrollYProgress } = useScroll();
  const { t } = useLang();
  const [tier, setTier] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setTier(v < 0.35 ? 0 : v < 0.75 ? 1 : 2);
  });
  const tierData = TIERS[tier];

  return (
    <footer className="border-t border-white/15 bg-[#0A0A0B]">
      <div className="max-w-7xl mx-auto px-6 py-14 grid md:grid-cols-2 gap-8 items-center border-b border-white/15">
        <div>
          <h3 className="font-heading text-3xl md:text-4xl font-extrabold tracking-tight">{t(tierData.cta)}</h3>
          <p className="text-muted-foreground mt-3">{t(tierData.desc)}</p>
        </div>
        <div className="flex md:justify-end gap-3">
          <button
            onClick={openAssistant}
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-bold px-6 py-3 hover:brightness-110 transition-all"
          >
            {t(tierData.action)} <ArrowUpRight className="w-4 h-4" />
          </button>
          <Link
            to="/iletisim"
            className="inline-flex items-center px-6 py-3 border border-white/25 hover:border-primary hover:text-primary transition-colors font-semibold"
          >
            {t("Form doldur")}
          </Link>
        </div>
      </div>

      <div className="border-b border-white/15">
        <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-10">
          <div>
            <div className="mb-4">
              <Logo size="sm" showTagline={false} />
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t("Tekirdağ, Edirne ve Kırklareli işletmeleri için web tasarımı, e-ticaret ve SEO.")}
            </p>
          </div>
          <div>
            <p className="text-[11px] font-mono tracking-[0.25em] text-primary mb-4">{t("HİZMETLER")}</p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/hizmetler/web-tasarim" className="inline-block py-1 hover:text-primary transition-colors">{t("Web Tasarımı")}</Link></li>
              <li><Link to="/hizmetler/eticaret" className="inline-block py-1 hover:text-primary transition-colors">{t("E-Ticaret Kurulumu")}</Link></li>
              <li><Link to="/hizmetler/seo" className="inline-block py-1 hover:text-primary transition-colors">{t("SEO & Yerel Arama")}</Link></li>
              <li><Link to="/hizmetler/destek" className="inline-block py-1 hover:text-primary transition-colors">{t("Bakım & Destek")}</Link></li>
            </ul>
          </div>
          <div>
            <p className="text-[11px] font-mono tracking-[0.25em] text-primary mb-4">{t("KEŞFET")}</p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/trakya-web-tasarim" className="inline-block py-1 hover:text-primary transition-colors">{t("Trakya'da Web Tasarım")}</Link></li>
              <li><Link to="/sektorler" className="inline-block py-1 hover:text-primary transition-colors">{t("Sektörel Çözümler")}</Link></li>
              <li><Link to="/isletmeler" className="inline-block py-1 hover:text-primary transition-colors">{t("İşletme Rehberi")}</Link></li>
              <li><Link to="/iz-biraktiklarimiz" className="inline-block py-1 hover:text-primary transition-colors">{t("İz Bıraktıklarımız")}</Link></li>
              <li><Link to="/paketler" className="inline-block py-1 hover:text-primary transition-colors">{t("Paketler & Fiyatlar")}</Link></li>
              <li><Link to="/blog" className="inline-block py-1 hover:text-primary transition-colors">{t("Blog & Rehberler")}</Link></li>
              <li><Link to="/hakkimizda" className="inline-block py-1 hover:text-primary transition-colors">{t("Hakkımızda")}</Link></li>
              <li><Link to="/sss" className="inline-block py-1 hover:text-primary transition-colors">{t("SSS")}</Link></li>
              <li><Link to="/randevu" className="inline-block py-1 hover:text-primary transition-colors">{t("Randevu Al")}</Link></li>
              <li><Link to="/iletisim" className="inline-block py-1 hover:text-primary transition-colors">{t("İletişim")}</Link></li>
            </ul>
          </div>
          <div>
            <p className="text-[11px] font-mono tracking-[0.25em] text-primary mb-4">{t("İLETİŞİM")}</p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Barış Mah. Fabrikalar Cad. No:12</li>
              <li>Çorlu / Tekirdağ</li>
              <li><a href="tel:+902821234567" className="hover:text-primary transition-colors">+90 (282) 123 45 67</a></li>
              <li><a href="mailto:merhaba@dijitrak.net" className="hover:text-primary transition-colors">merhaba@dijitrak.net</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div>
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <p className="text-xs text-muted-foreground">{t("© 2026 DijiTrak Ajans. Tüm hakları saklıdır.")}</p>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-3 gap-y-1 mt-2 text-[11px] text-muted-foreground">
              <Link to="/gizlilik-politikasi" className="inline-block py-1 hover:text-primary transition-colors">{t("Gizlilik Politikası")}</Link>
              <span className="text-white/20">·</span>
              <Link to="/cerez-politikasi" className="inline-block py-1 hover:text-primary transition-colors">{t("Çerez Politikası")}</Link>
              <span className="text-white/20">·</span>
              <Link to="/kullanim-kosullari" className="inline-block py-1 hover:text-primary transition-colors">{t("Kullanım Koşulları")}</Link>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <a href="https://www.linkedin.com" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center w-10 h-10 text-muted-foreground hover:text-primary active:scale-90 transition-all" aria-label="LinkedIn">
              <Linkedin className="w-4 h-4" />
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center w-10 h-10 text-muted-foreground hover:text-primary active:scale-90 transition-all" aria-label="Instagram">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center w-10 h-10 text-muted-foreground hover:text-primary active:scale-90 transition-all" aria-label="Twitter">
              <Twitter className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}