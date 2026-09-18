import { useEffect, useRef, useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { base44 } from "@/api/base44Client";
import { mascotSay } from "@/lib/mascotBus";
import { useLang } from "@/lib/i18n";

const SECTOR_OPTIONS = [
  { value: "tarim", label: "Tarım & Gıda" },
  { value: "sanayi", label: "Sanayi & İmalat" },
  { value: "eticaret", label: "E-Ticaret" },
  { value: "yerel-ticaret", label: "Yerel Ticaret & Hizmet" },
  { value: "diger", label: "Diğer" },
];

export const SERVICE_OPTIONS = [
  "Kurumsal Web Tasarımı",
  "E-Ticaret Kurulumu",
  "SEO & Yerel Arama",
  "Google Haritalar Optimizasyonu",
  "Mobil Uyumlama",
  "Bakım & Türkçe Destek",
];

export default function LeadForm({ source = "iletisim_sayfasi", compact = false, prefill = null }) {
  const { t } = useLang();
  const [form, setForm] = useState({ name: "", email: "", phone: "", company: "", sector: "", service: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  // Honeypot: insanların göremediği alan; botlar doldurursa talep sessizce yok sayılır
  const [hp, setHp] = useState("");
  // Maskot tepkisi: forma ilk dokunuşta bir kez merhaba der
  const cheered = useRef(false);
  const handleFirstFocus = () => {
    if (cheered.current) return;
    cheered.current = true;
    mascotSay(t("Formu doldururken aklına bir soru gelirse bana yazabilirsin!"));
  };

  // AI sohbetten gelen bilgileri yalnızca boş alanlara aktar (kullanıcı girdisini ezme)
  useEffect(() => {
    if (!prefill || done) return;
    setForm((f) => {
      const next = { ...f };
      // AI'ın sohbetten çıkardığı özet ("summary") mesaj alanına aktarılır
      const source = { ...prefill, message: prefill.message ?? prefill.summary };
      for (const [k, v] of Object.entries(source)) {
        if (typeof v === "string" && v.trim() && !next[k]) next[k] = v;
      }
      return next;
    });
  }, [prefill, done]);

  const set = (k) => (v) => setForm((f) => ({ ...f, [k]: typeof v === "object" && v !== null && "target" in v ? v.target.value : v }));

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (hp) {
      setDone(true);
      return;
    }
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setError(t("Ad, e-posta ve mesaj alanları zorunludur."));
      return;
    }
    setLoading(true);
    try {
      const created = await base44.entities.Lead.create({ ...form, source });
      base44.analytics.track("lead_submit", { source, sector: form.sector || "diger" });
      // Ekibe anında e-posta bildirimi gönder (best-effort; gönderimi bloklamaz)
      base44
        .functions.invoke("notifyNewLead", { lead_id: created.id, email: form.email })
        .catch(() => {});
      setDone(true);
      mascotSay(t("Talebin ekibime ulaştı! En geç 1 iş günü içinde dönecekler 🌻"));
    } catch (err) {
      setError(t("Talebiniz kaydedilirken bir sorun oluştu. Lütfen tekrar deneyin."));
    } finally {
      setLoading(false);
    }
  }

  if (done) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-10 border border-primary bg-primary text-primary-foreground">
        <CheckCircle2 className="w-12 h-12 mb-4" />
        <h3 className="font-heading text-xl font-bold">{t("Talebiniz alındı!")}</h3>
        <p className="text-primary-foreground/80 text-sm mt-2 max-w-xs">
          {t("Ekibimiz 1 iş günü içinde size dönüş yapacak. Acil durumlar için AI asistanımız 7/24 yanınızda.")}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} onFocus={handleFirstFocus} className="space-y-4">
      <div className={compact ? "space-y-4" : "grid grid-cols-1 md:grid-cols-2 gap-4"}>
        {compact && (
          <p className="text-[10px] font-bold tracking-wider text-primary/90 -mb-1">1 · {t("İLETİŞİM BİLGİLERİNİZ")}</p>
        )}
        <div className="space-y-2">
          <Label htmlFor="lead-name">{t("Ad Soyad *")}</Label>
          <Input id="lead-name" value={form.name} onChange={set("name")} placeholder="Ahmet Yılmaz" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lead-email">{t("E-posta *")}</Label>
          <Input id="lead-email" type="email" value={form.email} onChange={set("email")} placeholder="ahmet@firmam.com" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lead-phone">{t("Telefon")}</Label>
          <Input id="lead-phone" value={form.phone} onChange={set("phone")} placeholder="0 (5xx) xxx xx xx" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lead-company">{t("Firma Adı")}</Label>
          <Input id="lead-company" value={form.company} onChange={set("company")} placeholder="Firmanızın adı" />
        </div>
        {compact && (
          <p className="text-[10px] font-bold tracking-wider text-primary/90 -mb-1">2 · {t("PROJE DETAYLARI")}</p>
        )}
        <div className="space-y-2">
          <Label>{t("Sektörünüz")}</Label>
          <Select value={form.sector} onValueChange={set("sector")}>
            <SelectTrigger><SelectValue placeholder={t("Sektör seçin")} /></SelectTrigger>
            <SelectContent>
              {SECTOR_OPTIONS.map((o) => (
                <SelectItem key={o.value} value={o.value}>{t(o.label)}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>{t("İlgilendiğiniz Hizmet")}</Label>
          <Select value={form.service} onValueChange={set("service")}>
            <SelectTrigger><SelectValue placeholder={t("Hizmet seçin")} /></SelectTrigger>
            <SelectContent>
              {SERVICE_OPTIONS.map((s) => (
                <SelectItem key={s} value={s}>{t(s)}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="lead-message">{t("Projenizden bahsedin *")}</Label>
        <Textarea
          id="lead-message"
          value={form.message}
          onChange={set("message")}
          rows={compact ? 3 : 4}
          placeholder={t("Örn: Tekirdağ'da kafe işletiyorum, online sipariş almak için bir site istiyorum.")}
          required
        />
      </div>
      <input
        type="text"
        name="website"
        value={hp}
        onChange={(e) => setHp(e.target.value)}
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />
      {error && <p className="text-destructive text-sm">{error}</p>}
      <Button type="submit" disabled={loading} className="w-full bg-primary text-primary-foreground hover:brightness-110 font-bold">
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" /> {t("Gönderiliyor…")}
          </>
        ) : (
          t("Talebi Gönder")
        )}
      </Button>
    </form>
  );
}