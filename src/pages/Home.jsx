import Hero from "@/components/home/Hero";
import StatsBar from "@/components/home/StatsBar";
import ChatPromo from "@/components/home/ChatPromo";
import Testimonials from "@/components/home/Testimonials";
import ServicesGrid from "@/components/home/ServicesGrid";
import SectorHub from "@/components/home/SectorHub";
import ProcessSteps from "@/components/home/ProcessSteps";
import CasePreview from "@/components/home/CasePreview";
import BlogPreview from "@/components/home/BlogPreview";
import CTASection from "@/components/home/CTASection";
import BudgetCalculator from "@/components/home/BudgetCalculator";
import usePageMeta from "@/lib/usePageMeta";

export default function Home() {
  usePageMeta({
    title: "DijiTrak | Web Tasarım, E-Ticaret ve SEO Ajansı — Trakya'nın Dijital Gücü",
    description:
      "Tekirdağ, Edirne, Kırklareli ve Çanakkale işletmeleri için profesyonel web tasarımı, e-ticaret kurulumu ve SEO hizmetleri. AI destekli dijital ajans — ücretsiz teklif alın.",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": "https://dijitrak.net/#website",
      "name": "DijiTrak",
      "alternateName": "Trakya Dijital Ajans",
      "url": "https://dijitrak.net/",
      "inLanguage": "tr",
      "publisher": { "@id": "https://dijitrak.net/#organization" },
      "keywords":
        "trakya web tasarım, tekirdağ web tasarım, edirne web tasarım, kırklareli web tasarım, çanakkale web tasarım, trakya seo ajansı, e-ticaret kurulumu",
      "about": {
        "@type": "Thing",
        "name": "Web tasarımı, e-ticaret ve dijital pazarlama hizmetleri"
      }
    },
  });
  return (
    <>
      <Hero />
      <StatsBar />
      <ServicesGrid />
      <BudgetCalculator />
      <ChatPromo />
      <SectorHub />
      <ProcessSteps />
      <Testimonials />
      <CasePreview />
      <BlogPreview />
      <CTASection />
    </>
  );
}