import { MapPin, Phone, Mail, Clock, Zap } from "lucide-react";
import Reveal from "@/components/Reveal";
import LeadForm from "@/components/LeadForm";
import { useLang } from "@/lib/i18n";
import usePageMeta from "@/lib/usePageMeta";

const INFO = [
  { icon: MapPin, label: "Ofis", value: "Barış Mah. Fabrikalar Cad. No:12, Çorlu / Tekirdağ" },
  { icon: Phone, label: "Telefon", value: "+90 (282) 123 45 67", href: "tel:+902821234567" },
  { icon: Mail, label: "E-posta", value: "merhaba@dijitrak.net", href: "mailto:merhaba@dijitrak.net" },
  { icon: Clock, label: "Çalışma saatleri", value: "Hafta içi 09:00 – 18:00" },
  { icon: Zap, label: "AI asistan", value: "7/24 aktif — anında yanıt" },
];

export default function Contact() {
  const { t } = useLang();
  usePageMeta({
    title: "İletişim & Teklif | DijiTrak — Ücretsiz Keşif Görüşmesi",
    description:
      "DijiTrak ile iletişime geçin: web tasarımı, e-ticaret ve SEO için ücretsiz teklif. 1 iş günü içinde dönüş garantisi, 7/24 AI asistan.",
  });
  return (
    <div className="pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal>
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 bg-primary" />
            <p className="text-[11px] font-mono tracking-[0.25em] text-primary">{t("İLETİŞİM")}</p>
          </div>
          <h1 className="mt-5 font-heading text-4xl md:text-6xl font-extrabold tracking-[-0.04em]">
            {t("Projenizi konuşalım")}
          </h1>
          <p className="mt-5 text-muted-foreground max-w-xl leading-relaxed">
            {t("Formu doldurun, 1 iş günü içinde size dönüş yapalım. Ya da AI asistanımızla hemen konuşun.")}
          </p>
        </Reveal>

        <div className="mt-14 grid lg:grid-cols-5 gap-8">
          <Reveal className="lg:col-span-2">
            <div className="border border-white/15 divide-y divide-white/15">
              {INFO.map((item) => (
                <div key={item.label} className="flex items-center gap-4 p-5 hover:bg-[#101010] transition-colors">
                  <span className="w-10 h-10 bg-primary/10 border border-primary/40 flex items-center justify-center shrink-0">
                    <item.icon className="w-5 h-5 text-primary" />
                  </span>
                  <div>
                    <p className="text-[10px] font-mono tracking-[0.2em] text-muted-foreground">{t(item.label).toUpperCase()}</p>
                    {item.href ? (
                      <a href={item.href} className="text-sm mt-1 block hover:text-primary transition-colors">{t(item.value)}</a>
                    ) : (
                      <p className="text-sm mt-1">{t(item.value)}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-3">
            <div className="p-7 border border-white/15 bg-background">
              <h2 className="font-heading text-xl font-bold tracking-tight mb-6">{t("Teklif / bilgi talebi")}</h2>
              <LeadForm source="iletisim_sayfasi" />
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}