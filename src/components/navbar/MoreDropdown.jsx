import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowUpRight, ChevronDown } from "lucide-react";

export default function MoreDropdown({ label, items }) {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const active = items.some((i) => i.to === pathname);

  return (
    <div className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button
        className={`relative flex items-center gap-1 text-sm transition-colors hover:text-primary ${
          active ? "text-primary font-semibold" : "text-foreground/70"
        }`}
        aria-expanded={open}
      >
        {label}
        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
        {active && <span className="absolute left-0 right-0 -bottom-[9px] h-[2px] bg-primary" />}
      </button>
      <div
        className={`absolute left-1/2 -translate-x-1/2 top-full pt-4 transition-all duration-200 ${
          open ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-2 pointer-events-none"
        }`}
      >
        <div className="border border-white/15 bg-[#0A0A0B]/97 backdrop-blur-xl min-w-60 py-2 shadow-[0_24px_60px_-12px_rgba(0,0,0,0.9)]">
          {items.map((i) => (
            <Link
              key={i.to}
              to={i.to}
              className="group/item flex items-center justify-between gap-3 px-4 py-2.5 text-sm text-foreground/75 hover:text-primary border-l-2 border-transparent hover:border-primary transition-colors"
            >
              <span>{i.label}</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 translate-y-1 group-hover/item:opacity-100 group-hover/item:translate-x-0 group-hover/item:translate-y-0 transition-all" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}