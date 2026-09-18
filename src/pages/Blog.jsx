import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Clock } from "lucide-react";
import Reveal from "@/components/Reveal";
import { base44 } from "@/api/base44Client";
import { useLang } from "@/lib/i18n";
import usePageMeta from "@/lib/usePageMeta";

export default function Blog() {
  const { t } = useLang();
  usePageMeta({
    title: "Blog & Rehberler | DijiTrak — SEO ve Dijital Büyüme İpuçları",
    description:
      "Web sitesi fiyatlarından SEO ipuçlarına, Trakya işletmeleri için hazırlanmış sektörel içerikler ve dijitalleşme rehberleri.",
  });
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState(null);

  useEffect(() => {
    base44.entities.BlogPost.filter({ published: true }, "-created_date", 50)
      .then(setPosts)
      .catch(() => setPosts([]))
      .finally(() => setLoading(false));
  }, []);

  const categories = useMemo(() => [...new Set(posts.map((p) => p.category).filter(Boolean))], [posts]);
  const filtered = category ? posts.filter((p) => p.category === category) : posts;

  return (
    <div className="pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal>
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 bg-primary" />
            <p className="text-[11px] font-mono tracking-[0.25em] text-primary">{t("BLOG & REHBERLER")}</p>
          </div>
          <h1 className="mt-5 font-heading text-4xl md:text-6xl font-extrabold tracking-[-0.04em]">
            {t("Dijitalleşme rehberi")}
          </h1>
          <p className="mt-5 text-muted-foreground max-w-xl leading-relaxed">
            {t("Web sitesi fiyatlarından SEO ipuçlarına, Trakya işletmeleri için hazırlanmış sektörel içerikler.")}
          </p>
        </Reveal>

        {categories.length > 0 && (
          <Reveal delay={0.08} className="mt-10 flex flex-wrap gap-2">
            <button
              onClick={() => setCategory(null)}
              className={`text-xs font-semibold px-4 py-2 border transition-colors ${
                !category ? "bg-primary border-primary text-primary-foreground" : "border-white/20 text-muted-foreground hover:text-foreground hover:border-white/40"
              }`}
            >
              {t("Tümü")}
            </button>
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c === category ? null : c)}
                className={`text-xs font-semibold px-4 py-2 border transition-colors ${
                  c === category ? "bg-primary border-primary text-primary-foreground" : "border-white/20 text-muted-foreground hover:text-foreground hover:border-white/40"
                }`}
              >
                {c}
              </button>
            ))}
          </Reveal>
        )}

        {loading ? (
          <div className="mt-14 grid md:grid-cols-3 gap-px bg-white/15 border border-white/15">
            {[0, 1, 2].map((i) => (
              <div key={i} className="h-56 bg-[#101010] animate-pulse" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <p className="mt-14 text-muted-foreground text-sm border border-dashed border-white/20 px-6 py-10 inline-block">
            {t("Bu kategoride henüz yazı yok.")}
          </p>
        ) : (
          <div className="mt-14 grid md:grid-cols-3 gap-px bg-white/15 border border-white/15">
            {filtered.map((p, i) => (
              <Reveal key={p.id} delay={(i % 3) * 0.07} className="bg-background">
                <Link
                  to={`/blog/${p.slug || p.id}`}
                  className="group flex flex-col h-full p-6 hover:bg-[#101010] transition-colors"
                >
                  <span className="self-start text-[10px] font-mono tracking-widest text-primary border border-primary/40 px-2.5 py-1">
                    {p.category}
                  </span>
                  <h2 className="mt-4 font-heading text-lg font-bold tracking-tight group-hover:text-primary transition-colors">
                    {p.title}
                  </h2>
                  <p className="mt-2.5 text-sm text-muted-foreground line-clamp-3 flex-1">{p.excerpt}</p>
                  <div className="mt-5 flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="w-3.5 h-3.5" /> {p.read_minutes || 5} {t("dk okuma")}
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}