import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Bell, ChevronDown, Download, Loader2, Plus, Receipt, Search, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { base44 } from "@/api/base44Client";
import LeadNotes from "@/components/admin/LeadNotes";
import LeadCreateForm from "@/components/admin/LeadCreateForm";

const STATUS_OPTIONS = [
  { value: "yeni", label: "Yeni" },
  { value: "iletisime_gecildi", label: "İletişime geçildi" },
  { value: "teklif_gonderildi", label: "Teklif gönderildi" },
  { value: "donustu", label: "Dönüştü" },
  { value: "kayip", label: "Kayıp" },
];

const SECTOR_LABELS = {
  tarim: "Tarım",
  sanayi: "Sanayi",
  eticaret: "E-Ticaret",
  "yerel-ticaret": "Yerel Ticaret",
  diger: "Diğer",
};

export default function AdminLeads() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);
  const [sweeping, setSweeping] = useState(false);
  const [sweepMsg, setSweepMsg] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("hepsi");

  async function load(silent = false) {
    if (!silent) setLoading(true);
    try {
      setLeads(await base44.entities.Lead.list("-created_date", 200));
    } finally {
      if (!silent) setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  // Canlı akış: yeni talep veya değişiklikte liste sessizce tazelenir
  useEffect(() => {
    const unsub = base44.entities.Lead.subscribe(() => load(true));
    return unsub;
  }, []);

  async function updateStatus(id, status) {
    await base44.entities.Lead.update(id, { status });
    setLeads((list) => list.map((l) => (l.id === id ? { ...l, status } : l)));
  }

  async function remove(id) {
    if (!window.confirm("Bu talebi silmek istediğinize emin misiniz?")) return;
    await base44.entities.Lead.delete(id);
    setLeads((list) => list.filter((l) => l.id !== id));
  }

  function exportCsv() {
    const header = ["Ad", "E-posta", "Telefon", "Firma", "Sektör", "Hizmet", "Kaynak", "Durum", "Mesaj", "Tarih"];
    const rows = [
      header,
      ...leads.map((l) => [
        l.name,
        l.email,
        l.phone || "",
        l.company || "",
        SECTOR_LABELS[l.sector] || "",
        l.service || "",
        l.source || "",
        (STATUS_OPTIONS.find((s) => s.value === l.status) || {}).label || l.status || "",
        l.message || "",
        l.created_date ? new Date(l.created_date).toLocaleString("tr-TR") : "",
      ]),
    ];
    const esc = (v) => `"${String(v ?? "").replace(/"/g, '""')}"`;
    const csv = "\uFEFF" + rows.map((r) => r.map(esc).join(";")).join("\r\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8;" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = `dijitrak-talepler-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  async function runReminderSweep() {
    setSweeping(true);
    setSweepMsg("");
    try {
      const res = await base44.functions.invoke("leadReminderSweep", {});
      const data = res.data || {};
      const failed = Array.isArray(data.failed) ? data.failed.length : 0;
      setSweepMsg(
        `${data.sent || 0} talebe 48 saat hatırlatması gönderildi` +
          (failed ? ` · ${failed} gönderim başarısız` : "") +
          ` (${data.considered || 0} aday değerlendirildi).`
      );
      load();
    } catch {
      setSweepMsg("Hatırlatma gönderilemedi, lütfen tekrar deneyin.");
    } finally {
      setSweeping(false);
    }
  }

  function syncNotes(id, notes) {
    setLeads((list) => list.map((l) => (l.id === id ? { ...l, notes } : l)));
  }

  const q = search.trim().toLowerCase();
  const filtered = leads.filter((l) => {
    if (statusFilter !== "hepsi" && l.status !== statusFilter) return false;
    if (!q) return true;
    return [l.name, l.email, l.company, l.service, l.message].some((v) =>
      (v || "").toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-bold tracking-tight">Müşteri Talepleri</h1>
          <p className="text-sm text-muted-foreground mt-1">
            AI asistan ve iletişim formundan gelen tüm talepler.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFormOpen(true)}
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-3.5 py-2 text-xs font-semibold hover:brightness-110 transition-all"
          >
            <Plus className="w-3.5 h-3.5" /> Yeni Talep
          </button>
          <button
            onClick={exportCsv}
            disabled={!leads.length}
            className="inline-flex items-center gap-2 border border-white/20 px-3.5 py-2 text-xs hover:border-primary hover:text-primary transition-colors disabled:opacity-40"
          >
            <Download className="w-3.5 h-3.5" /> CSV indir
          </button>
          <button
            onClick={runReminderSweep}
            disabled={sweeping}
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-3.5 py-2 text-xs font-semibold hover:brightness-110 transition-all disabled:opacity-50"
          >
            {sweeping ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Bell className="w-3.5 h-3.5" />}
            48s hatırlatma gönder
          </button>
        </div>
      </div>

      {sweepMsg && <p className="text-xs text-muted-foreground border border-white/15 px-3 py-2">{sweepMsg}</p>}

      <div className="flex flex-col sm:flex-row gap-2">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="İsim, e-posta, firma veya mesaj ara…"
            className="pl-9"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-[170px] text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="hepsi">Tüm durumlar</SelectItem>
            {STATUS_OPTIONS.map((s) => (
              <SelectItem key={s.value} value={s.value}>
                {s.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="border border-white/15 bg-background overflow-x-auto">
        {loading ? (
          <p className="p-8 text-sm text-muted-foreground">Yükleniyor…</p>
        ) : leads.length === 0 ? (
          <p className="p-8 text-sm text-muted-foreground">Henüz talep yok. "Yeni Talep" ile ekleyin.</p>
        ) : filtered.length === 0 ? (
          <p className="p-8 text-sm text-muted-foreground">Aramanızla eşleşen talep yok.</p>
        ) : (
          <table className="w-full text-sm min-w-[800px]">
            <thead>
              <tr className="text-left text-xs text-muted-foreground border-b border-white/15">
                <th className="px-4 py-3 font-medium">İsim / E-posta</th>
                <th className="px-4 py-3 font-medium">Firma</th>
                <th className="px-4 py-3 font-medium">Sektör</th>
                <th className="px-4 py-3 font-medium">Hizmet</th>
                <th className="px-4 py-3 font-medium">Kaynak</th>
                <th className="px-4 py-3 font-medium">Mesaj</th>
                <th className="px-4 py-3 font-medium">Durum</th>
                <th className="px-4 py-3 font-medium"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((l) => (
                <Fragment key={l.id}>
                  <tr className="border-b border-white/10 last:border-0 hover:bg-[#101010]">
                    <td className="px-4 py-3">
                      <p className="font-medium">{l.name}</p>
                      <p className="text-xs text-muted-foreground">{l.email}</p>
                      {l.phone && <p className="text-xs text-muted-foreground">{l.phone}</p>}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{l.company || "—"}</td>
                    <td className="px-4 py-3 text-muted-foreground">{SECTOR_LABELS[l.sector] || "—"}</td>
                    <td className="px-4 py-3 text-muted-foreground">{l.service || "—"}</td>
                    <td className="px-4 py-3">
                      <span className="text-[10px] font-mono border border-white/20 px-2 py-1 text-muted-foreground">
                        {l.source === "ai_asistan" ? "AI ASİSTAN" : l.source === "manuel" ? "MANUEL" : "WEB FORM"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground max-w-[220px]">
                      <p className="line-clamp-2 text-xs">{l.message}</p>
                    </td>
                    <td className="px-4 py-3">
                      <Select value={l.status} onValueChange={(v) => updateStatus(l.id, v)}>
                        <SelectTrigger className="h-8 text-xs w-[150px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {STATUS_OPTIONS.map((s) => (
                            <SelectItem key={s.value} value={s.value}>
                              {s.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <Link
                          to={`/admin/teklifler?lead=${l.id}`}
                          className="p-2 text-muted-foreground hover:text-primary transition-colors"
                          aria-label="Teklif oluştur"
                          title="Teklif oluştur"
                        >
                          <Receipt className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => setExpandedId(expandedId === l.id ? null : l.id)}
                          className={`p-2 transition-colors ${
                            expandedId === l.id || (l.notes && l.notes.length)
                              ? "text-primary"
                              : "text-muted-foreground hover:text-primary"
                          }`}
                          aria-label="Notlar"
                        >
                          <ChevronDown
                            className={`w-4 h-4 transition-transform ${expandedId === l.id ? "rotate-180" : ""}`}
                          />
                        </button>
                        <button
                          onClick={() => remove(l.id)}
                          className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                          aria-label="Sil"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                  {expandedId === l.id && (
                    <tr className="border-b border-white/10">
                      <td colSpan={8} className="px-4 py-4 bg-[#101010]">
                        <LeadNotes lead={l} onSaved={(notes) => syncNotes(l.id, notes)} />
                      </td>
                    </tr>
                  )}
                </Fragment>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <LeadCreateForm open={formOpen} onOpenChange={setFormOpen} onSaved={load} />
    </div>
  );
}