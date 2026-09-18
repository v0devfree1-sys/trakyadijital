import { useEffect, useRef, useState } from "react";
import { CalendarCheck, CheckCircle2, Clock, Loader2, MapPin, Phone, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Reveal from "@/components/Reveal";
import { base44 } from "@/api/base44Client";
import { SERVICE_OPTIONS } from "@/components/LeadForm";
import { useLang } from "@/lib/i18n";
import { mascotSay } from "@/lib/mascotBus";
import usePageMeta from "@/lib/usePageMeta";

const TIME_SLOTS = ["09:30", "10:30", "11:30", "13:30", "14:30", "15:30", "16:30", "17:30"];
const LOCALES = { tr: "tr-TR", en: "en-GB", bg: "bg-BG", el: "el-GR" };

function toInputDate(d) {
  const p = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

// Bugünden itibaren ilk 12 uygun gün (Pazar hariç)
function buildDays() {
  const days = [];
  const cursor = new Date();
  while (days.length < 12) {
    cursor.setDate(cursor.getDate() + 1);
    if (cursor.getDay() === 0) continue;
    days.push(new Date(cursor));
  }
  return days;
}

const DAYS = buildDays();

const PERKS = [
  { icon: Clock, title: "30 dakikalık ücretsiz keşif", desc: "Hedeflerinizi dinler, net yol haritası çıkarırız." },
  { icon: Video, title: "Yerinde veya online", desc: "Trakya'da yerinde, Türkiye genelinde görüntülü." },
  { icon: CalendarCheck, title: "1 iş günü içinde onay", desc: "Seçtiğiniz slotı ekibimiz teyit eder." },
];

export default function Randevu() {
  const { t, lang } = useLang();
  usePageMeta({
    title: "Ücretsiz Keşif Randevusu | DijiTrak — Trakya Web Tasarımı",
    description:
      "DijiTrak ile ücretsiz keşif görüşmesi planlayın: Trakya'da yerinde veya online. 30 dakikada projenizin net yol haritasını alın.",
  });

  const locale = LOCALES[lang] || "tr-TR";
  const [date, setDate] = useState(toInputDate(DAYS[0]));
  const [time, setTime] = useState("");
  const [form, setForm] = useState({ name: "", email: "", phone: "", company: "", service: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  const [hp, setHp] = useState("");
  // Çakışma koruması: seçilen gün için dolu saatler
  const [taken, setTaken] = useState([]);
  // Maskot tepkisi: forma ilk dokunuşta bir kez seslenir
  const cheered = useRef(false);
  const handleFirstFocus = () => {
    if (cheered.current) return;
    cheered.current = true;
    mascotSay(t("Randevu formunu doldururken aklına soru gelirse bana yazabilirsin!"));
  };

  const set = (k) => (v) =>
    setForm((f) => ({ ...f, [k]: typeof v === "object" && v !== null && "target" in v ? v.target.value : v }));

  const fmt = (iso) =>
    new Date(`${iso}T00:00:00`).toLocaleDateString(locale, { weekday: "long", day: "numeric", month: "long" });

  // Gün değiştikçe dolu saatleri getir
  useEffect(() => {
    let live = true;
    base44
      .functions.invoke("getTakenSlots", { date })
      .then((res) => { if (live) setTaken(res.data?.taken || []); })
      .catch(() => { if (live) setTaken([]); });
    return () => { live = false; };
  }, [date]);

  async function submit(e) {
    e.preventDefault();
    setError("");
    if (hp) {
      setDone(true);
      return;
    }
    if (!time) {
      setError(t("Lütfen bir saat seçin."));
      return;
    }
    if (!form.name.trim() || !form.email.trim()) {
      setError(t("Ad soyad ve e-posta zorunludur."));
      return;
    }
    setLoading(true);
    try {
      // Çakışma kontrolü: aynı tarih+saat bu arada dolduysa engelle
      const res = await base44.functions.invoke("getTakenSlots", { date });
      const takenNow = res.data?.taken || [];
      if (takenNow.includes(time)) {
        setTaken(takenNow);
        setTime("");
        setError(t("Seçtiğiniz saat az önce doldu. Lütfen boş bir saat seçin."));
        return;
      }
      const created = await base44.entities.Appointment.create({ ...form, date, time });
      base44.analytics.track("appointment_submit", { service: form.service || "" });
      // Ekibe anında e-posta bildirimi gönder (best-effort; gönderimi bloklamaz)
      base44
        .functions.invoke("notifyNewAppointment", { appointment_id: created.id, email: form.email })
        .catch(() => {});
      setDone(true);
      mascotSay(t("Randevun kaydedildi! Görüşmek için sabırsızlanıyorum 🌻"));
    } catch {
      setError(t("Randevu kaydedilirken bir sorun oluştu. Lütfen tekrar deneyin."));
    } finally {
      setLoading(false);
    }
  }

  if (done) {
    return (
      <div className="pt-32 pb-24">
        <div className="max-w-xl mx-auto px-6">
          <Reveal>
            <div className="flex flex-col items-center justify-center text-center py-12 border border-primary bg-primary text-primary-foreground">
              <CheckCircle2 className="w-14 h-14 mb-4" />
              <h2 className="font-heading text-2xl font-bold">{t("Randevunuz alındı!")}</h2>
              <p className="text-primary-foreground/90 text-sm mt-3 font-semibold">
                {fmt(date)} · {time}
              </p>
              <p className="text-primary-foreground/75 text-sm mt-2 max-w-sm leading-relaxed">
                {t(
                  "Ekibimiz randevunuzu onaylamak için en kısa sürede size dönecek. Bu arada sorularınız için AI asistanımız 7/24 yanınızda."
                )}
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal>
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 bg-primary" />
            <p className="text-[11px] font-mono tracking-[0.25em] text-primary">{t("ÜCRETSİZ KEŞİF RANDEVUSU")}</p>
          </div>
          <h1 className="mt-5 font-heading text-4xl md:text-6xl font-extrabold tracking-[-0.04em]">
            {t("Takvimden gün ve saatinizi seçin")}
          </h1>
          <p className="mt-5 text-muted-foreground max-w-xl leading-relaxed">
            {t(
              "Satış baskısı yok — 30 dakikada projenizi dinler, size net bir yol haritası ve fiyat aralığı sunarız."
            )}
          </p>
        </Reveal>

        <div className="mt-14 grid lg:grid-cols-5 gap-8">
          {/* Sol: avantajlar ve iletişim */}
          <Reveal className="lg:col-span-2 space-y-4">
            {PERKS.map((p) => (
              <div key={p.title} className="flex items-start gap-4 border border-white/15 p-5 hover:border-primary/50 transition-colors">
                <span className="w-10 h-10 bg-primary/10 border border-primary/40 flex items-center justify-center shrink-0">
                  <p.icon className="w-5 h-5 text-primary" />
                </span>
                <div>
                  <p className="font-heading font-bold text-sm">{t(p.title)}</p>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{t(p.desc)}</p>
                </div>
              </div>
            ))}
            <div className="border border-white/15 divide-y divide-white/15">
              <div className="flex items-center gap-3 p-4">
                <MapPin className="w-4 h-4 text-primary shrink-0" />
                <p className="text-xs text-muted-foreground">Barış Mah. Fabrikalar Cad. No:12, Çorlu / Tekirdağ</p>
              </div>
              <div className="flex items-center gap-3 p-4">
                <Phone className="w-4 h-4 text-primary shrink-0" />
                <a href="tel:+902821234567" className="text-xs hover:text-primary transition-colors">
                  +90 (282) 123 45 67
                </a>
              </div>
            </div>
          </Reveal>

          {/* Sağ: rezervasyon kartı */}
          <Reveal delay={0.1} className="lg:col-span-3">
            <form onSubmit={submit} onFocus={handleFirstFocus} className="p-7 border border-white/15 bg-background space-y-6">
              <div>
                <p className="text-[11px] font-mono tracking-[0.25em] text-primary mb-3">{t("1 · TARİH SEÇİN")}</p>
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                  {DAYS.map((d) => {
                    const val = toInputDate(d);
                    const active = val === date;
                    return (
                      <button
                        type="button"
                        key={val}
                        onClick={() => { setDate(val); setTime(""); }}
                        className={`flex flex-col items-center border py-3.5 transition-all active:scale-95 ${
                          active
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-white/15 text-muted-foreground hover:border-primary/50 hover:text-foreground"
                        }`}
                      >
                        <span className="text-[10px] font-mono uppercase tracking-wider">
                          {d.toLocaleDateString(locale, { weekday: "short" })}
                        </span>
                        <span className="font-heading text-lg font-bold leading-none mt-1">{d.getDate()}</span>
                        <span className="text-[9px] mt-1">{d.toLocaleDateString(locale, { month: "short" })}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <p className="text-[11px] font-mono tracking-[0.25em] text-primary mb-3">{t("2 · SAAT SEÇİN")}</p>
                <div className="grid grid-cols-4 gap-2">
                  {TIME_SLOTS.map((s) => {
                    const isTaken = taken.includes(s);
                    return (
                      <button
                        type="button"
                        key={s}
                        onClick={() => setTime(s)}
                        disabled={isTaken}
                        className={`border py-3 text-sm font-mono transition-all active:scale-95 ${
                          isTaken
                            ? "border-white/10 text-muted-foreground/40 line-through cursor-not-allowed"
                            : s === time
                              ? "border-primary bg-primary text-primary-foreground font-bold"
                              : "border-white/15 text-muted-foreground hover:border-primary/50 hover:text-foreground"
                        }`}
                      >
                        {s}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <p className="text-[11px] font-mono tracking-[0.25em] text-primary mb-3">{t("3 · BİLGİLERİNİZ")}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="appt-name">{t("Ad Soyad *")}</Label>
                    <Input id="appt-name" value={form.name} onChange={set("name")} placeholder="Ahmet Yılmaz" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="appt-email">{t("E-posta *")}</Label>
                    <Input id="appt-email" type="email" value={form.email} onChange={set("email")} placeholder="ahmet@firmam.com" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="appt-phone">{t("Telefon")}</Label>
                    <Input id="appt-phone" value={form.phone} onChange={set("phone")} placeholder="0 (5xx) xxx xx xx" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="appt-company">{t("Firma Adı")}</Label>
                    <Input id="appt-company" value={form.company} onChange={set("company")} placeholder="Firmanızın adı" />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label>{t("Görüşmek istediğiniz hizmet")}</Label>
                    <Select value={form.service} onValueChange={set("service")}>
                      <SelectTrigger>
                        <SelectValue placeholder={t("Hizmet seçin")} />
                      </SelectTrigger>
                      <SelectContent>
                        {SERVICE_OPTIONS.map((s) => (
                          <SelectItem key={s} value={s}>
                            {t(s)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="appt-message">{t("Kısa not (isteğe bağlı)")}</Label>
                    <Textarea
                      id="appt-message"
                      value={form.message}
                      onChange={set("message")}
                      rows={3}
                      placeholder={t("Neyi görüşmek istersiniz?")}
                    />
                  </div>
                </div>
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
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" /> {t("Kaydediliyor…")}
                  </>
                ) : (
                  t("Randevu Al")
                )}
              </Button>
            </form>
          </Reveal>
        </div>
      </div>
    </div>
  );
}