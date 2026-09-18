import { useEffect } from "react";

const SITE_URL = "https://dijitrak.net";

const setMeta = (attr, key, content) => {
  let tag = document.querySelector(`meta[${attr}="${key}"]`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attr, key);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
};

const DEFAULT_ROBOTS = "index, follow, max-image-preview:large, max-snippet:-1";

// SPA'de sayfa bazlı <title>, description, canonical, yapısal veri (JSON-LD) ve sosyal paylaşım etiketleri (SEO)
export function usePageMeta({ title, description, jsonLd, noindex } = {}) {
  useEffect(() => {
    if (title) {
      document.title = title;
      setMeta("property", "og:title", title);
      setMeta("name", "twitter:title", title);
    }
    if (description) {
      setMeta("name", "description", description);
      setMeta("property", "og:description", description);
      setMeta("name", "twitter:description", description);
    }
    // Sayfanın kendi canonical + og:url değeri (kopya içerik riskini önler)
    const url = `${SITE_URL}${window.location.pathname}`;
    let link = document.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement("link");
      link.setAttribute("rel", "canonical");
      document.head.appendChild(link);
    }
    link.setAttribute("href", url);
    setMeta("property", "og:url", url);
  }, [title, description]);

  // noindex (404 vb.): arama motorlarına indekslenmesin sinyali
  useEffect(() => {
    setMeta("name", "robots", noindex ? "noindex, nofollow" : DEFAULT_ROBOTS);
  }, [noindex]);

  // Sayfa bazlı yapısal veri: FAQPage, BlogPosting, BreadcrumbList vb. (zengin sonuçlar için)
  const jsonLdText = jsonLd ? JSON.stringify(jsonLd) : null;
  useEffect(() => {
    if (!jsonLdText) return;
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "page-jsonld";
    script.textContent = jsonLdText;
    document.head.appendChild(script);
    return () => {
      document.getElementById("page-jsonld")?.remove();
    };
  }, [jsonLdText]);
}

export default usePageMeta;