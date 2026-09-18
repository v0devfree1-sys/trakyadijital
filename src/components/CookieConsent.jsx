import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie } from "lucide-react";

// KVKK çerez onayı: tercih localStorage'da saklanır, tercih yapılmadıkça banner görünür.
const STORAGE_KEY = "dijitrak_cerez_onay";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(!localStorage.getItem(STORAGE_KEY));
  }, []);

  function decide(choice) {
    localStorage.setItem(STORAGE_KEY, choice);
    setVisible(false);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 48 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 48 }}
          transition={{ type: "spring", stiffness: 140, damping: 22 }}
          className="fixed bottom-0 inset-x-0 z-[70] border-t border-white/20 bg-[#0A0A0B]/95 backdrop-blur px-4 py-4 pb-[calc(1rem+env(safe-area-inset-bottom))]"
        >
          <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex items-start gap-3 flex-1">
              <span className="w-9 h-9 shrink-0 border border-primary/40 bg-primary/10 flex items-center justify-center">
                <Cookie className="w-4 h-4 text-primary" />
              </span>
              <p className="text-xs leading-relaxed text-muted-foreground">
                Sitemizi geliştirmek için deneyiminizi ölçen çerezler kullanıyoruz. Ayrıntılar için{" "}
                <Link to="/cerez-politikasi" className="text-primary hover:underline">
                  Çerez Politikamızı
                </Link>{" "}
                inceleyebilirsiniz.
              </p>
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <button
                onClick={() => decide("kabul")}
                className="flex-1 sm:flex-none min-h-[44px] px-4 bg-primary text-primary-foreground text-xs font-semibold hover:brightness-110 transition-all active:scale-95"
              >
                Kabul et
              </button>
              <button
                onClick={() => decide("red")}
                className="flex-1 sm:flex-none min-h-[44px] px-4 border border-white/25 text-xs hover:border-primary hover:text-primary transition-all active:scale-95"
              >
                Sadece zorunlu
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}