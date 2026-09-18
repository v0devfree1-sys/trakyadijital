import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Pencil, Plus, Receipt, Search, Send, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { base44 } from "@/api/base44Client";
import QuoteForm from "@/components/admin/QuoteForm";

const STATUS_OPTIONS = [
  { value: "taslak", label: "Taslak" },
  { value: "gonderildi", label: "Gönderildi" },
  { value: "kabul", label: "Kabul edildi" },
  { value: "red", label: "Reddedildi" },
];

const fmt = (n) =>
  new Intl.NumberFormat("tr-TR", { style: "currency", currency: "TRY", maximumFractionDigits: 0 }).format(n || 0);

export default function AdminQuotes() {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [prefill, setPrefill] = useState(null);
  const [sendingId, setSendingId] = useState(null);
  const [msg, setMsg] = useState("");
  const [search, setSearch] = useState("");
  const [params] = useSearchParams();

  async function load() {
    setLoading(true);
    try {
      setQuotes(await base44.entities.Quote.list("-created_date", 200));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    // Talepler sayfasındaki "Teklif oluştur" düğmesinden gelindiyse formu dolu aç
    const leadId = params.get("lead");
    if (leadId) {
      base44.entities.Lead.get(leadId)
        .then((lead) => {
          setEditing(null);
          setPrefill({
            lead_id: lead.id,
            name: lead.name || "",
            email: lead.email || "",
            company: lead.company || "",
            service: lead.service || "",
            title: lead.service ? `${lead.service} — Teklif` : "DijiTrak Hizmet Teklifi",
          });
          setFormOpen(true);
        })
        .catch(() => {});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function send(q) {
    if (!window.confirm(`Teklif ${q.email} adresine e-postayla gönderilecek. Onaylıyor musunuz?`)) return;
    setSendingId(q.id);
    setMsg("");
    try {
      const res = await base44.functions.invoke("sendQuote", { quote_id: q.id });
      setMsg(`Teklif ${res.data?.sent || q.email} adresine gönderildi.`);
      await load();
    } catch {
      setMsg("Teklif gönderilemedi. E-posta ayarlarını kontrol edin ve tekrar deneyin.");
    } finally {
      setSendingId(null);
    }
  }

  async function updateStatus(q, status) {
    await base44.entities.Quote.update(q.id, { status });
    setQuotes((list) => list.map((x) => (x.id === q.id ? { ...x, status } : x)));

    // Teklif yanıtı satış akışını ilerletsin: kabul → dönüştü, red → kayıp.
    // İlerlemiş bir talep durumu asla geriye düşürülmez.
    if (q.lead_id && (status === "kabul" || status === "red")) {
      try {
        const lead = await base44.entities.Lead.get(q.lead_id);
        if (lead && lead.status !== "donustu" && lead.status !== "kayip") {
          await base44.entities.Lead.update(q.lead_id, { status: status === "kabul" ? "donustu" : "kayip" });
        }
      } catch {}
    }
  }

  async function remove(q) {
    if (!window.confirm(`"${q.title}" teklifini silmek istediğinize emin misiniz?`)) return;
    await base44.entities.Quote.delete(q.id);
    await load();
  }

  const q = search.trim().toLowerCase();
  const filtered = quotes.filter(
    (x) => !q || [x.title, x.name, x.email, x.service].some((v) => (v || "").toLowerCase().includes(q))
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-bold tracking-tight">Teklifler</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Teklifi hazırlayın, panelden e-postayla gönderin; müşteri yanıtı geldiğinde durumunu buradan güncelleyin.
          </p>
        </div>
        <Button
          onClick={() => {
            setEditing(null);
            setPrefill(null);
            setFormOpen(true);
          }}
          className="bg-primary text-primary-foreground hover:brightness-110"
        >
          <Plus className="w-4 h-4 mr-1.5" /> Yeni Teklif
        </Button>
      </div>

      {msg && <p className="text-xs text-muted-foreground border border-white/15 px-3 py-2">{msg}</p>}

      <div className="relative max-w-md">
        <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Başlık, müşteri veya e-posta ara…"
          className="pl-9"
        />
      </div>

      <div className="border border-white/15 bg-background overflow-x-auto">
        {loading ? (
          <p className="p-8 text-sm text-muted-foreground">Yükleniyor…</p>
        ) : quotes.length === 0 ? (
          <p className="p-8 text-sm text-muted-foreground">
            Henüz teklif yok. "Yeni Teklif" ile oluşturun veya müşteri taleplerinden bir talebin yanındaki teklif simgesine tıklayın.
          </p>
        ) : filtered.length === 0 ? (
          <p className="p-8 text-sm text-muted-foreground">Aramanızla eşleşen teklif yok.</p>
        ) : (
          <table className="w-full text-sm min-w-[760px]">
            <thead>
              <tr className="text-left text-xs text-muted-foreground border-b border-white/15">
                <th className="px-4 py-3 font-medium">Teklif</th>
                <th className="px-4 py-3 font-medium">Müşteri</th>
                <th className="px-4 py-3 font-medium">Tutar</th>
                <th className="px-4 py-3 font-medium">Geçerlilik</th>
                <th className="px-4 py-3 font-medium">Durum</th>
                <th className="px-4 py-3 font-medium"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((q) => (
                <tr key={q.id} className="border-b border-white/10 last:border-0 hover:bg-[#101010]">
                  <td className="px-4 py-3">
                    <p className="font-medium">{q.title}</p>
                    {q.service && <p className="text-[11px] text-muted-foreground mt-0.5">{q.service}</p>}
                  </td>
                  <td className="px-4 py-3">
                    <p className="font-medium">{q.name}</p>
                    <p className="text-xs text-muted-foreground">{q.email}</p>
                  </td>
                  <td className="px-4 py-3 font-mono text-primary font-semibold">{fmt(q.total)}</td>
                  <td className="px-4 py-3 text-muted-foreground text-xs">
                    {q.valid_until
                      ? new Date(`${q.valid_until}T00:00:00`).toLocaleDateString("tr-TR", { day: "numeric", month: "short", year: "numeric" })
                      : "—"}
                  </td>
                  <td className="px-4 py-3">
                    <Select value={q.status} onValueChange={(v) => updateStatus(q, v)}>
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
                    <div className="flex items-center gap-1 justify-end">
                      <button
                        onClick={() => send(q)}
                        disabled={sendingId === q.id}
                        className="p-2 text-muted-foreground hover:text-primary transition-colors disabled:opacity-40"
                        aria-label="E-postayla gönder"
                        title="Müşteriye e-postayla gönder"
                      >
                        <Send className={`w-4 h-4 ${sendingId === q.id ? "animate-pulse" : ""}`} />
                      </button>
                      <button
                        onClick={() => {
                          setEditing(q);
                          setFormOpen(true);
                        }}
                        className="p-2 text-muted-foreground hover:text-primary transition-colors"
                        aria-label="Düzenle"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button onClick={() => remove(q)} className="p-2 text-muted-foreground hover:text-destructive transition-colors" aria-label="Sil">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <QuoteForm open={formOpen} onOpenChange={setFormOpen} initial={editing} prefill={prefill} onSaved={load} />

      <p className="text-[11px] text-muted-foreground flex items-center gap-1.5">
        <Receipt className="w-3.5 h-3.5" /> İpucu: "Müşteri Talepleri" sayfasında bir talebin yanındaki teklif simgesi, bilgileri otomatik doldurur.
      </p>
    </div>
  );
}