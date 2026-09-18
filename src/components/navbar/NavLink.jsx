import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

export default function NavLink({ to, label }) {
  const { pathname } = useLocation();
  const active = pathname === to;
  return (
    <Link
      to={to}
      className={`relative group text-sm transition-colors hover:text-primary ${
        active ? "text-primary font-semibold" : "text-foreground/70"
      }`}
    >
      {label}
      <span className="absolute left-0 right-0 -bottom-[9px] h-[2px] bg-primary origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
      {active && (
        <motion.span
          layoutId="nav-active-bar"
          className="absolute left-0 right-0 -bottom-[9px] h-[2px] bg-primary"
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
        />
      )}
    </Link>
  );
}