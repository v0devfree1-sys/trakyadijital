import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, CalendarDays, Inbox, LogOut, MessageSquare, ShieldCheck, Sparkles } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { useAuth } from "@/lib/AuthContext";
import { useLang } from "@/lib/i18n";

const LEAD_STATUS = {
  yeni: "Yeni",
  iletisime_gecildi: "İletişime geçildi",
  teklif_gonderildi: "Teklif gönderildi",
  donustu: "Dönüştü",
  kayip: "Kayıp",
};

const APPT_STATUS = {
  beklemede: "Beklemede",
  onaylandi: "Onaylandı",
  gerceklesti: "Gerçekleşti",
  iptal: "İptal",
};

function Badge({ label, active }) {
  return (
    <span
      className={`text-[10px] font-mono border px-2 py-1 whitespace-nowrap ${
        active ? "border-primary text-primary" : "border-white/20 text-muted-foreground"
      }`}
    >
      {label}
    </span>
  );
}

export default function Hesabim() {
  const { t } = useLang();
  const { user, logout } = useAuth();
  const [leads, setLeads] = useState(null);
  const [appts, setAppts] = useState(null);

  useEffect(() => {
    if (!user?.id) return;
    base44.entities.Lead.filter({ created_by_id: user.id }, "-created_date", 20)
      .then(setLeads)
      .catch(() => setLeads([]));
    base44.entities.Appointment.filter({ created_by_id: user.id }, "-created_date", 20)
      .then(setAppts)
      .catch(() => setAppts([]));
  }, [user?.id]);

  const memberSince = user?.created_date
    ? new Date(user.created_date).toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" })
    : "—";

  return (
    <div className="min-h-screen bg-[#0A0A0B]">
      {/* Üst çubuk */}
      <header className="border-b border-white/15">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <span className="w-3.5 h-3.5 bg-primary" />
            <span className="font-heading font-extrabold tracking-tight">
              DİJİ<span className="text-primary">TRAK</span>
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <Link to="/" className="text-xs text-muted-foreground hover:text-primary transition-colors hidden sm:inline">
              {t("Siteye dön")}
            </Link>
            <button
              onClick={() => logout()}
              className="inline-flex items-center gap-2 border border-white/20 px-3.5 py-2 text-xs hover:border-destructive hover:text-destructive transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" /> {t("Çıkış Yap")}
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 bg-primary" />
          <p className="text-[11px] font-mono tracking-[0.25em] text-primary">{t("HESABIM")}</p>
        </div>
        <h1 className="mt-4 font-heading text-3xl md:text-4xl font-extrabold tracking-[-0.04em]">
          {user?.full_name ? `${t("Merhaba")}, ${user.full_name}` : t("Hoş geldiniz")}
        </h1>

        {/* Profil kartı */}
        <div className="mt-8 border border-white/15 bg-background p-6 brutal-card">
          <p className="text-xs font-mono tracking-widest text-muted-foreground mb-5">{t("PROFİL BİLGİLERİ")}</p>
          <div className="grid sm:grid-cols-3 gap-6">
            <div>
              <p className="text-[11px] text-muted-foreground">{t("E-posta")}</p>
              <p className="text-sm font-medium mt-1 break-all">{user?.email}</p>
            </div>
            <div>
              <p className="text-[11px] text-muted-foreground">{t("Rol")}</p>
              <p className="text-sm font-medium mt-1 flex items-center gap-2">
                {user?.role === "admin" ? (
                  <>
                    <ShieldCheck className="w-4 h-4 text-primary" /> {t("Yönetici")}
                  </>
                ) : (
                  t("Kullanıcı")
                )}
              </p>
            </div>
            <div>
              <p className="text-[11px] text-muted-foreground">{t("Üyelik tarihi")}</p>
              <p className="text-sm font-medium mt-1">{memberSince}</p>
            </div>
          </div>
        </div>

        {/* Taleplerim */}
        <div className="mt-10">
          <p className="flex items-center gap-2 text-xs font-mono tracking-widest text-muted-foreground mb-4">
            <Inbox className="w-3.5 h-3.5 text-primary" /> {t("TALEPLERİM")}
          </p>
          <div className="border border-white/15 divide-y divide-white/10 bg-background">
            {leads === null ? (
              <p className="p-5 text-sm text-muted-foreground">{t("Yükleniyor…")}</p>
            ) : leads.length === 0 ? (
              <p className="p-5 text-sm text-muted-foreground">
                {t("Henüz talebiniz yok.")}{" "}
                <Link to="/iletisim" className="text-primary hover:underline">
                  {t("Bize yazın")}
                </Link>
              </p>
            ) : (
              leads.map((l) => (
                <div key={l.id} className="flex items-start justify-between gap-4 p-5 hover:bg-[#101010] transition-colors">
                  <div className="min-w-0">
                    <p className="text-sm font-semibold truncate">{l.service || t("Genel talep")}</p>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{l.message}</p>
                    <p className="text-[10px] font-mono text-muted-foreground mt-2">
                      {l.created_date ? new Date(l.created_date).toLocaleDateString("tr-TR") : ""}
                    </p>
                  </div>
                  <Badge label={t(LEAD_STATUS[l.status] || l.status)} active={l.status === "yeni"} />
                </div>
              ))
            )}
          </div>
        </div>

        {/* Randevularım */}
        <div className="mt-8">
          <p className="flex items-center gap-2 text-xs font-mono tracking-widest text-muted-foreground mb-4">
            <CalendarDays className="w-3.5 h-3.5 text-primary" /> {t("RANDEVULARIM")}
          </p>
          <div className="border border-white/15 divide-y divide-white/10 bg-background">
            {appts === null ? (
              <p className="p-5 text-sm text-muted-foreground">{t("Yükleniyor…")}</p>
            ) : appts.length === 0 ? (
              <p className="p-5 text-sm text-muted-foreground">
                {t("Henüz randevunuz yok.")}{" "}
                <Link to="/randevu" className="text-primary hover:underline">
                  {t("Ücretsiz keşif randevusu alın")}
                </Link>
              </p>
            ) : (
              appts.map((a) => (
                <div key={a.id} className="flex items-start justify-between gap-4 p-5 hover:bg-[#101010] transition-colors">
                  <div className="min-w-0">
                    <p className="text-sm font-semibold">
                      {a.date ? new Date(`${a.date}T00:00:00`).toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" }) : "—"}
                      {a.time ? ` · ${a.time}` : ""}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">{a.service || t("Keşif görüşmesi")}</p>
                  </div>
                  <Badge label={t(APPT_STATUS[a.status] || a.status)} active={a.status === "onaylandi"} />
                </div>
              ))
            )}
          </div>
        </div>

        {/* Hızlı erişim */}
        <div className="mt-10 grid sm:grid-cols-2 gap-4">
          {user?.role === "admin" && (
            <Link
              to="/admin"
              className="group border border-primary/40 bg-primary/5 p-6 hover:border-primary transition-colors"
            >
              <p className="flex items-center gap-2 font-heading font-bold">
                <ShieldCheck className="w-4 h-4 text-primary" /> {t("Yönetim Paneli")}
              </p>
              <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                {t("Talepler, blog, dijital izler ve işletme rehberi yönetimi.")}
              </p>
              <span className="inline-flex items-center gap-1 text-xs text-primary mt-3">
                {t("Panele git")} <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
            </Link>
          )}
          <Link to="/ai-asistan" className="group border border-white/15 bg-background p-6 hover:border-primary transition-colors">
            <p className="flex items-center gap-2 font-heading font-bold">
              <Sparkles className="w-4 h-4 text-primary" /> {t("AI Asistan")}
            </p>
            <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
              {t("Fiyat teklifi, SEO denetimi ve randevu için 7/24 asistan.")}
            </p>
            <span className="inline-flex items-center gap-1 text-xs text-primary mt-3">
              {t("Sohbete başla")} <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          </Link>
          <Link to="/randevu" className="group border border-white/15 bg-background p-6 hover:border-primary transition-colors">
            <p className="flex items-center gap-2 font-heading font-bold">
              <CalendarDays className="w-4 h-4 text-primary" /> {t("Randevu Al")}
            </p>
            <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
              {t("30 dakikalık ücretsiz keşif görüşmesi — yerinde veya online.")}
            </p>
            <span className="inline-flex items-center gap-1 text-xs text-primary mt-3">
              {t("Takvimden seç")} <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          </Link>
          <Link to="/iletisim" className="group border border-white/15 bg-background p-6 hover:border-primary transition-colors">
            <p className="flex items-center gap-2 font-heading font-bold">
              <MessageSquare className="w-4 h-4 text-primary" /> {t("İletişim")}
            </p>
            <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
              {t("Ekibimize doğrudan yazın; 1 iş günü içinde dönüş garantisi.")}
            </p>
            <span className="inline-flex items-center gap-1 text-xs text-primary mt-3">
              {t("Formu aç")} <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}