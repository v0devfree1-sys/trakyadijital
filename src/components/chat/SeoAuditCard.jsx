import { Gauge, ShieldCheck, TriangleAlert } from "lucide-react";
import { useLang } from "@/lib/i18n";

// Sohbette AI asistanın gerçekleştirdiği ücretsiz SEO denetiminin sonuç kartı
export default function SeoAuditCard({ seo }) {
  const { t } = useLang();
  if (!seo) return null;

  const score = Number(seo.score) || 0;
  const findings = Array.isArray(seo.findings) ? seo.findings.slice(0, 5) : [];

  return (
    <div className="mt-2 w-full max-w-[95%] border border-primary/30 bg-[#0D0D0E] px-4 py-3.5">
      <p className="flex items-center gap-2 text-[11px] font-mono tracking-widest text-primary">
        <Gauge className="w-3.5 h-3.5 shrink-0" /> {t("ÜCRETSİZ SEO DENETİMİ")}
      </p>
      <div className="flex items-start gap-4 mt-3">
        <div className="shrink-0 text-center">
          <p className="font-heading text-3xl font-extrabold text-primary leading-none">
            {score}
            <span className="text-sm text-primary/60">/100</span>
          </p>
          <p className="text-[10px] text-muted-foreground mt-1.5 break-all max-w-[120px]">{seo.url?.replace(/^https?:\/\//, "")}</p>
        </div>
        <div className="flex-1 min-w-0">
          {findings.length === 0 ? (
            <p className="flex items-center gap-2 text-[12px] text-foreground/75">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              {t("Temel SEO açıları sağlıklı — detaylı analiz için ekibimiz tam rapor çıkarır.")}
            </p>
          ) : (
            <ul className="space-y-1.5">
              {findings.map((f) => (
                <li key={f} className="flex items-start gap-2 text-[12px] text-muted-foreground leading-snug">
                  <TriangleAlert className="w-3 h-3 text-primary/70 shrink-0 mt-0.5" />
                  <span>{f}</span>
                </li>
              ))}
              {seo.findings?.length > 5 && (
                <li className="text-[11px] text-primary/70">+{seo.findings.length - 5} {t("bulgu daha")}</li>
              )}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}