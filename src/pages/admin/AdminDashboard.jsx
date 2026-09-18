import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Inbox, FileText, Briefcase, Store, CalendarDays, ArrowUpRight } from "lucide-react";
import { base44 } from "@/api/base44Client";
import LeadStats from "@/components/admin/LeadStats";

const LEAD_STATUS_LABELS = {
  yeni: "Yeni",
  iletisime_gecildi: "İletişime geçildi",
  teklif_gonderildi: "Teklif gönderildi",
  donustu: "Dönüştü",
  kayip: "Kayıp",
};

export default function AdminDashboard() {
  const [leads, setLeads] = useState([]);
  const [posts, setPosts] = useState([]);
  const [cases, setCases] = useState([]);
  const [businesses, setBusinesses] = useState([]);
  const [appts, setAppts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        // Tek bir sorgu hatası tüm paneli boş göstermesin
        const [l, p, c, biz, ap] = await Promise.allSettled([
          base44.entities.Lead.list("-created_date", 500),
          base44.entities.BlogPost.list("-created_date", 100),
          base44.entities.CaseStudy.list("-created_date", 100),
          base44.entities.Business.list("name", 500),
          base44.entities.Appointment.list("date", 500),
        ]);
        setLeads(l.status === "fulfilled" ? l.value : []);
        setPosts(p.status === "fulfilled" ? p.value : []);
        setCases(c.status === "fulfilled" ? c.value : []);
        setBusinesses(biz.status === "fulfilled" ? biz.value : []);
        setAppts(ap.status === "fulfilled" ? ap.value : []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const newLeads = leads.filter((x) => x.status === "yeni").length;
  const today = new Date().toISOString().slice(0, 10);
  const upcoming = appts.filter((a) => a.date >= today && a.status !== "iptal").slice(0, 5);

  const cards = [
    { label: "Toplam Talep", value: leads.length, icon: Inbox, to: "/admin/talepler" },
    { label: "Yeni Talep", value: newLeads, icon: Inbox, to: "/admin/talepler" },
    { label: "Yaklaşan Randevu", value: upcoming.length, icon: CalendarDays, to: "/admin/randevular" },
    { label: "Blog Yazısı", value: posts.length, icon: FileText, to: "/admin/blog" },
    { label: "Dijital İz", value: cases.length, icon: Briefcase, to: "/admin/vakalar" },
    { label: "Rehberdeki İşletme", value: businesses.length, icon: Store, to: "/admin/isletmeler" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-2xl font-bold tracking-tight">Genel Bakış</h1>
        <p className="text-sm text-muted-foreground mt-1">Ajansın güncel durumu ve son gelen talepler.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
        {cards.map((c) => (
          <Link key={c.label} to={c.to} className="group p-5 border border-white/15 bg-background hover:border-primary transition-colors">
            <div className="flex items-center justify-between">
              <c.icon className="w-4 h-4 text-primary" />
              <ArrowUpRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
            <p className="mt-4 font-heading text-3xl font-extrabold">{loading ? "—" : c.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{c.label}</p>
          </Link>
        ))}
      </div>

      <LeadStats leads={leads} loading={loading} />

      <div className="border border-white/15 bg-background overflow-hidden">
        <div className="px-5 py-4 border-b border-white/15 flex items-center justify-between">
          <h2 className="font-heading font-bold tracking-tight text-sm">Son Talepler</h2>
          <Link to="/admin/talepler" className="text-xs text-primary hover:underline">Tümünü gör</Link>
        </div>
        {loading ? (
          <div className="p-8 text-sm text-muted-foreground">Yükleniyor…</div>
        ) : leads.length === 0 ? (
          <p className="p-8 text-sm text-muted-foreground">Henüz talep yok.</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-muted-foreground border-b border-white/15">
                <th className="px-5 py-3 font-medium">İsim</th>
                <th className="px-5 py-3 font-medium hidden md:table-cell">Firma</th>
                <th className="px-5 py-3 font-medium hidden sm:table-cell">Hizmet</th>
                <th className="px-5 py-3 font-medium">Durum</th>
              </tr>
            </thead>
            <tbody>
              {leads.slice(0, 6).map((l) => (
                <tr key={l.id} className="border-b border-white/5 last:border-0">
                  <td className="px-5 py-3">{l.name}</td>
                  <td className="px-5 py-3 text-muted-foreground hidden md:table-cell">{l.company || "—"}</td>
                  <td className="px-5 py-3 text-muted-foreground hidden sm:table-cell">{l.service || "—"}</td>
                  <td className="px-5 py-3">
                    <span className={`text-[10px] font-mono px-2 py-1 border ${
                      l.status === "yeni" ? "bg-primary text-primary-foreground border-primary font-semibold" : "border-white/20 text-muted-foreground"
                    }`}>
                      {LEAD_STATUS_LABELS[l.status] || l.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="border border-white/15 bg-background overflow-hidden">
        <div className="px-5 py-4 border-b border-white/15 flex items-center justify-between">
          <h2 className="font-heading font-bold tracking-tight text-sm">Yaklaşan Randevular</h2>
          <Link to="/admin/randevular" className="text-xs text-primary hover:underline">Tümünü gör</Link>
        </div>
        {loading ? (
          <div className="p-8 text-sm text-muted-foreground">Yükleniyor…</div>
        ) : upcoming.length === 0 ? (
          <p className="p-8 text-sm text-muted-foreground">Yaklaşan randevu yok.</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-muted-foreground border-b border-white/15">
                <th className="px-5 py-3 font-medium">Tarih / Saat</th>
                <th className="px-5 py-3 font-medium">İsim</th>
                <th className="px-5 py-3 font-medium hidden sm:table-cell">Hizmet</th>
                <th className="px-5 py-3 font-medium">Durum</th>
              </tr>
            </thead>
            <tbody>
              {upcoming.map((a) => (
                <tr key={a.id} className="border-b border-white/5 last:border-0">
                  <td className="px-5 py-3">
                    {a.date ? new Date(`${a.date}T00:00:00`).toLocaleDateString("tr-TR", { day: "numeric", month: "long" }) : "—"}
                    <span className="text-muted-foreground font-mono text-xs ml-2">{a.time}</span>
                  </td>
                  <td className="px-5 py-3">{a.name}</td>
                  <td className="px-5 py-3 text-muted-foreground hidden sm:table-cell">{a.service || "—"}</td>
                  <td className="px-5 py-3">
                    <span className={`text-[10px] font-mono px-2 py-1 border ${
                      a.status === "onaylandi" ? "bg-primary text-primary-foreground border-primary font-semibold" : "border-white/20 text-muted-foreground"
                    }`}>
                      {a.status === "onaylandi" ? "Onaylandı" : a.status === "gerceklesti" ? "Gerçekleşti" : "Beklemede"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}