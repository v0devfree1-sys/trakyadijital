import { Outlet, useLocation } from "react-router-dom";
import { motion, useScroll, useSpring } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AIAssistant from "@/components/AIAssistant";
import CookieConsent from "@/components/CookieConsent";

export default function SiteLayout() {
  const location = useLocation();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <motion.div
        style={{ scaleX: progress }}
        className="fixed top-0 inset-x-0 h-[3px] bg-primary origin-left z-[60]"
      />
      <Navbar />
      <motion.main
        key={location.pathname}
        initial={{ opacity: 0, y: 28, filter: "blur(8px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ type: "spring", stiffness: 90, damping: 20 }}
        className="flex-1"
      >
        <Outlet />
      </motion.main>
      <Footer />
      <AIAssistant />
      <CookieConsent />
    </div>
  );
}