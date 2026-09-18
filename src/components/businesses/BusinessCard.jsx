import { MapPin, Phone, Globe, Star } from "lucide-react";

export default function BusinessCard({ b }) {
  const initial = (b.name || "?").charAt(0).toLocaleUpperCase("tr");
  return (
    <div className="group relative h-full p-6 border border-white/15 bg-background hover:border-primary/60 hover:bg-[#101010] transition-colors">
      {b.featured && (
        <span className="absolute top-0 right-0 inline-flex items-center gap-1 text-[10px] font-mono text-primary bg-primary text-primary-foreground px-2 py-1">
          <Star className="w-3 h-3" /> ÖNE ÇIKAN
        </span>
      )}
      <div className="flex items-center gap-3">
        <span className="w-10 h-10 bg-primary/10 border border-primary/40 flex items-center justify-center text-primary font-heading font-extrabold shrink-0">
          {initial}
        </span>
        <div>
          <h3 className="font-heading font-bold tracking-tight leading-tight">{b.name}</h3>
          <p className="text-xs text-muted-foreground mt-0.5">{b.sector}</p>
        </div>
      </div>
      <p className="mt-4 text-sm text-foreground/70 leading-relaxed line-clamp-3">{b.description}</p>
      <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between gap-2">
        <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
          <MapPin className="w-3.5 h-3.5 text-primary" />
          {[b.district, b.city].filter(Boolean).join(" / ")}
        </span>
        <div className="flex items-center gap-2">
          {b.phone && (
            <a
              href={`tel:${b.phone.replace(/\s/g, "")}`}
              className="p-2 border border-white/15 hover:border-primary hover:text-primary transition-colors"
              aria-label="Telefon"
            >
              <Phone className="w-3.5 h-3.5" />
            </a>
          )}
          {b.website && (
            <a
              href={b.website}
              target="_blank"
              rel="noreferrer"
              className="p-2 border border-white/15 hover:border-primary hover:text-primary transition-colors"
              aria-label="Web sitesi"
            >
              <Globe className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}