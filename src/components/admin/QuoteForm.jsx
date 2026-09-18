import { useEffect, useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { base44 } from "@/api/base44Client";

const EMPTY = {
  lead_id: "",
  name: "",
  email: "",
  company: "",
  title: "",
  service: "",
  valid_until: "",
  notes: "",
  status: "taslak",
};

const fmt = (n) =>
  new Intl.NumberFormat("tr-TR", { style: "currency", currency: "TRY", maximumFractionDigits: 0 }).format(n || 0);

export default function QuoteForm({ open, onOpenChange, initial, prefill, onSaved }) {
  const [form, setForm] = useState(EMPTY);
  const [items, setItems] = useState([{ description: "", amount: "" }]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!open) return;
    setError("");
    if (initial?.id) {
      setForm({
        lead_id: initial.lead_id || "",
        name: initial.name || "",
        email: initial.email || "",
        company: initial.company || "",
        title: initial.title || "",
        service: initial.service || "",
        valid_until: (initial.valid_until || "").slice(0, 10),
        notes: initial.notes || "",
        status: initial.status || "taslak",
      });
      setItems(
        (initial.items || []).length
          ? initial.items.map((i) => ({ description: i.description, amount: String(i.amount ?? "") }))
          : [{ description: "", amount: "" }]
      );
    } else {
      setForm({ ...EMPTY, ...prefill });
      setItems([{ description: prefill?.service || "", amount: "" }]);
    }
  }, [open, initial, prefill]);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const total = items.reduce((s, i) => s + (parseFloat(i.amount) || 0), 0);

  async function save() {
    if (!form.title.trim() || !form.name.trim() || !form.email.trim()) {
      setError("Teklif başlığı, müşteri adı ve e-posta zorunludur.");
      return;
    }
    const cleanItems = items
      .map((i) => ({ description: (i.description || "").trim(), amount: parseFloat(i.amount) || 0 }))
      .filter((i) => i.description);
    if (!cleanItems.length) {
      setError("En az bir teklif kalemi girin.");
      return;
    }
    setSaving(true);
    setError("");
    try {
      const payload = {
        ...form,
        items: cleanItems,
        total: cleanItems.reduce((s, i) => s + i.amount, 0),
      };
      if (initial?.id) {
        await base44.entities.Quote.update(initial.id, payload);
      } else {
        await base44.entities.Quote.create(payload);
      }
      onOpenChange(false);
      onSaved();
    } catch {
      setError("Kaydedilirken bir sorun oluştu. Lütfen tekrar deneyin.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#0A0A0B] border-white/20 max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{initial?.id ? "Teklifi Düzenle" : "Yeni Teklif"}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 pt-2">
          <div className="space-y-2">
            <Label>Teklif başlığı *</Label>
            <Input value={form.title} onChange={set("title")} placeholder="Kurumsal Web Tasarımı — Teklif" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Müşteri adı *</Label>
              <Input value={form.name} onChange={set("name")} placeholder="Ahmet Yılmaz" />
            </div>
            <div className="space-y-2">
              <Label>E-posta *</Label>
              <Input type="email" value={form.email} onChange={set("email")} placeholder="ahmet@firmam.com" />
            </div>
            <div className="space-y-2">
              <Label>Firma</Label>
              <Input value={form.company} onChange={set("company")} placeholder="Firmanızın adı" />
            </div>
            <div className="space-y-2">
              <Label>Ana hizmet</Label>
              <Input value={form.service} onChange={set("service")} placeholder="Kurumsal Web Tasarımı" />
            </div>
          </div>

          {/* Teklif kalemleri */}
          <div className="space-y-2">
            <Label>Kalemler</Label>
            {items.map((it, i) => (
              <div key={i} className="flex gap-2">
                <Input
                  value={it.description}
                  onChange={(e) => setItems((rs) => rs.map((x, j) => (j === i ? { ...x, description: e.target.value } : x)))}
                  placeholder="Kalem açıklaması — örn. 5 sayfalık kurumsal site tasarımı"
                  className="flex-1"
                />
                <Input
                  value={it.amount}
                  onChange={(e) => setItems((rs) => rs.map((x, j) => (j === i ? { ...x, amount: e.target.value } : x)))}
                  inputMode="decimal"
                  placeholder="0"
                  className="w-28"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setItems((rs) => (rs.length > 1 ? rs.filter((_, j) => j !== i) : rs))}
                  className="border-white/25 px-2.5"
                  aria-label="Kalemi kaldır"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
            <div className="flex items-center justify-between">
              <Button type="button" variant="outline" onClick={() => setItems((rs) => [...rs, { description: "", amount: "" }])} className="border-white/25">
                <Plus className="w-4 h-4 mr-1.5" /> Kalem ekle
              </Button>
              <p className="text-sm font-bold text-primary">
                Toplam: <span className="font-mono">{fmt(total)}</span>
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Geçerlilik tarihi</Label>
              <Input type="date" value={form.valid_until} onChange={set("valid_until")} />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Müşteriye görünen not / kapsam</Label>
            <Textarea rows={3} value={form.notes} onChange={set("notes")} placeholder="Teslim süresi, neler dahil, ödeme planı vb." />
          </div>

          {error && <p className="text-destructive text-sm">{error}</p>}

          <div className="flex justify-end gap-3 pt-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>Vazgeç</Button>
            <Button onClick={save} disabled={saving} className="bg-primary text-primary-foreground hover:brightness-110">
              {saving ? "Kaydediliyor…" : "Kaydet"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}