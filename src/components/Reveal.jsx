import { motion } from "framer-motion";

export default function Reveal({ children, delay = 0, y = 36, blur = true, scale = 0.98, className }) {
  return (
    <motion.div
      initial={{ opacity: 0, y, scale, filter: blur ? "blur(12px)" : "blur(0px)" }}
      whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ type: "spring", stiffness: 78, damping: 16, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}