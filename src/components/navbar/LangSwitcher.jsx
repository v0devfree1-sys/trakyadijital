import { useLang } from "@/lib/i18n";

const LANG_NAMES = { tr: "Türkçe", en: "English", bg: "Български", el: "Ελληνικά" };

export default function LangSwitcher({ size = "sm", className = "" }) {
  const { lang, setLang } = useLang();
  return (
    <div className={`inline-flex items-stretch border border-white/20 font-mono overflow-hidden ${className}`}>
      {Object.keys(LANG_NAMES).map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          className={`px-2.5 uppercase tracking-widest transition-colors active:scale-95 ${
            size === "lg" ? "px-3.5 py-3 text-xs" : "py-1.5 text-[11px]"
          } ${lang === l ? "bg-primary text-primary-foreground font-bold" : "text-muted-foreground hover:text-foreground hover:bg-white/5"}`}
          aria-label={LANG_NAMES[l]}
          aria-pressed={lang === l}
        >
          {l}
        </button>
      ))}
    </div>
  );
}