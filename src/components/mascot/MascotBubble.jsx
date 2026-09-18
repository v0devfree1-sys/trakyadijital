import { motion } from "framer-motion";

// Maskotun site gezerken gösterdiği küçük tepki balonu
export default function MascotBubble({ message, onClick }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 6, scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      onClick={onClick}
      role="status"
      className="fixed bottom-[92px] right-5 z-[81] max-w-[250px] bg-[#0A0A0B] border border-primary/60 px-4 py-3 text-xs font-mono text-foreground/90 leading-relaxed shadow-[0_16px_50px_-16px_rgba(0,0,0,0.9)] cursor-pointer hover:border-primary hover:text-primary transition-colors"
    >
      {message}
      <span className="absolute -bottom-[6px] right-9 w-3 h-3 bg-[#0A0A0B] border-r border-b border-primary/60 rotate-45" />
    </motion.div>
  );
}