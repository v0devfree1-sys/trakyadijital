import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { ArrowLeft, Clock, User } from "lucide-react";
import Reveal from "@/components/Reveal";
import { base44 } from "@/api/base44Client";
import usePageMeta from "@/lib/usePageMeta";

export default function BlogDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(true);

  const postUrl = post ? `https://dijitrak.net/blog/${post.slug || post.id}` : null;
  usePageMeta({
    title: post ? `${post.title} | DijiTrak Blog` : "Blog | DijiTrak",
    description: post?.excerpt || "DijiTrak blog — dijitalleşme rehberleri ve SEO ipuçları.",
    // Zengin sonuçlar: makale + sayfa yolu (breadcrumb) yapısal verisi
    jsonLd: post
      ? [
          {
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description: post.excerpt || "",
            inLanguage: "tr",
            datePublished: post.created_date,
            dateModified: post.updated_date || post.created_date,
            mainEntityOfPage: { "@type": "WebPage", "@id": postUrl },
            author: { "@type": "Organization", name: post.author || "DijiTrak Ekibi", url: "https://dijitrak.net/" },
            publisher: { "@type": "Organization", name: "DijiTrak", url: "https://dijitrak.net/" },
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Blog", item: "https://dijitrak.net/blog" },
              { "@type": "ListItem", position: 2, name: post.title, item: postUrl },
            ],
          },
        ]
      : null,
  });

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setNotFound(false);
    // Hem kimlik (eski URL'ler) hem slug (SEO dostu URL) ile çözümle
    base44.entities.BlogPost.get(id)
      .catch(() =>
        base44.entities.BlogPost.filter({ slug: id }, undefined, 1).then(
          (rows) => (Array.isArray(rows) && rows.length > 0 ? rows[0] : null)
        )
      )
      .then((p) => {
        if (cancelled) return;
        if (p) {
          // Slug'lu URL canonical'ın tek olması için: eski kimlik URL'sini slug'a çevir
          if (p.slug && p.slug !== id) {
            window.history.replaceState(null, "", `/blog/${p.slug}`);
          }
          setPost(p);
        } else {
          setNotFound(true);
        }
      })
      .catch(() => !cancelled && setNotFound(true))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) {
    return (
      <div className="pt-28 pb-24 max-w-3xl mx-auto px-6">
        <div className="h-8 w-2/3 bg-[#101010] animate-pulse" />
        <div className="mt-4 h-4 w-1/3 bg-[#101010] animate-pulse" />
        <div className="mt-10 space-y-3">
          {[0, 1, 2, 3, 4].map((i) => (
            <div key={i} className="h-4 bg-[#101010] animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (notFound || !post) {
    return (
      <div className="pt-28 pb-24 max-w-3xl mx-auto px-6 text-center">
        <h1 className="font-heading text-3xl font-extrabold">Yazı bulunamadı</h1>
        <p className="mt-3 text-muted-foreground">Bu yazı kaldırılmış veya hiç var olmamış olabilir.</p>
        <Link to="/blog" className="mt-6 inline-flex items-center gap-2 text-primary font-bold text-sm">
          <ArrowLeft className="w-4 h-4" /> Bloga dön
        </Link>
      </div>
    );
  }

  return (
    <article className="pt-28 pb-24">
      <div className="max-w-3xl mx-auto px-6">
        <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
          <ArrowLeft className="w-4 h-4" /> Bloga dön
        </Link>
        <Reveal className="mt-8">
          <span className="text-[10px] font-mono tracking-widest text-primary border border-primary/40 px-2.5 py-1">
            {post.category}
          </span>
          <h1 className="mt-6 font-heading text-3xl md:text-5xl font-extrabold tracking-[-0.03em] leading-tight">
            {post.title}
          </h1>
          <div className="mt-5 flex flex-wrap items-center gap-5 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5" /> {post.author || "DijiTrak Ekibi"}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" /> {post.read_minutes || 5} dk okuma
            </span>
          </div>
        </Reveal>
        <Reveal delay={0.1} className="mt-10 border-t border-white/15 pt-8">
          <div className="text-foreground/80">
            <ReactMarkdown
              components={{
                h2: (props) => <h2 className="font-heading text-2xl font-bold text-foreground mt-10 mb-4 tracking-tight" {...props} />,
                h3: (props) => <h3 className="font-heading text-xl font-semibold text-foreground mt-8 mb-3 tracking-tight" {...props} />,
                p: (props) => <p className="mb-4 leading-relaxed" {...props} />,
                ul: (props) => <ul className="list-disc pl-6 mb-5 space-y-2" {...props} />,
                ol: (props) => <ol className="list-decimal pl-6 mb-5 space-y-2" {...props} />,
                strong: (props) => <strong className="text-foreground font-semibold" {...props} />,
                a: (props) => <a className="text-primary underline underline-offset-4" {...props} />,
                blockquote: (props) => (
                  <blockquote className="border-l-2 border-primary pl-4 my-6 text-foreground/70 italic" {...props} />
                ),
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>
        </Reveal>
      </div>
    </article>
  );
}