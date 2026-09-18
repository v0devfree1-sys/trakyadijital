import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Clock } from "lucide-react";
import Reveal from "@/components/Reveal";
import { base44 } from "@/api/base44Client";
import { useLang } from "@/lib/i18n";

export default function BlogPreview() {
  const { t } = useLang();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    base44.entities.BlogPost.filter({ published: true }, "-created_date", 3)
      .then(setPosts)
      .catch(() => setPosts([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="border-t border-white/15 py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 bg-primary" />
              <p className="text-[11px] font-mono tracking-[0.25em] text-primary">{t("BLOG & REHBERLER")}</p>
            </div>
            <h2 className="mt-5 font-heading text-3xl md:text-5xl font-extrabold tracking-[-0.03em]">
              {t("Trakya işletmesi rehberleri")}
            </h2>
          </div>
          <Link to="/blog" className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:gap-3 transition-all">
            {t("Tüm yazılar")} <ArrowUpRight className="w-4 h-4" />
          </Link>
        </Reveal>

        {loading ? (
          <div className="mt-12 border border-white/15 divide-y divide-white/15">
            {[0, 1, 2].map((i) => (
              <div key={i} className="h-20 bg-[#101010] animate-pulse" />
            ))}
          </div>
        ) : posts.length === 0 ? (
          <p className="mt-12 text-muted-foreground text-sm border border-dashed border-white/20 px-6 py-10 inline-block">
            {t("Rehberler yakında yayında.")}
          </p>
        ) : (
          <div className="mt-12 border border-white/15 divide-y divide-white/15">
            {posts.map((p, i) => (
              <Reveal key={p.id} delay={i * 0.06} className="bg-background">
                <Link
                  to={`/blog/${p.slug || p.id}`}
                  className="brutal-card group grid md:grid-cols-[150px_1fr_auto] items-center gap-4 px-6 py-6"
                >
                  <span className="justify-self-start text-[10px] font-mono tracking-widest text-primary border border-primary/40 px-2.5 py-1">
                    {p.category}
                  </span>
                  <div>
                    <h3 className="font-heading text-base md:text-lg font-bold tracking-tight group-hover:text-primary transition-colors">
                      {p.title}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground line-clamp-1">{p.excerpt}</p>
                  </div>
                  <span className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="w-3.5 h-3.5" /> {p.read_minutes || 5} {t("dk")}
                    <ArrowUpRight className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}