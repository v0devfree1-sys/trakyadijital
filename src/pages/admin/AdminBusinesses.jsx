import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { base44 } from "@/api/base44Client";

const CITIES = ["Tekirdağ", "Edirne", "Kırklareli", "Çanakkale"];

const EMPTY = {
  name: "",
  city: "Tekirdağ",
  district: "",
  sector: "",
  description: "",
  phone: "",
  website: "",
  address: "",
  featured: false,
  published: true,
};

export default function AdminBusinesses() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [saving, setSaving] = useState(false);

  async function load() {
    setLoading(true);
    try {
      setItems(await base44.entities.Business.list("name", 500));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  function openCreate() {
    setEditing(null);
    setForm(EMPTY);
    setDialogOpen(true);
  }

  function openEdit(b) {
    setEditing(b);
    setForm({
      name: b.name || "",
      city: b.city || CITIES[0],
      district: b.district || "",
      sector: b.sector || "",
      description: b.description || "",
      phone: b.phone || "",
      website: b.website || "",
      address: b.address || "",
      featured: !!b.featured,
      published: b.published !== false,
    });
    setDialogOpen(true);
  }

  async function save() {
    if (!form.name.trim() || !form.sector.trim() || !form.description.trim()) {
      window.alert("İşletme adı, sektör ve tanıtım metni zorunludur.");
      return;
    }
    setSaving(true);
    try {
      const payload = {
        name: form.name,
        city: form.city,
        district: form.district,
        sector: form.sector,
        description: form.description,
        phone: form.phone,
        website: form.website,
        address: form.address,
        featured: form.featured,
        published: form.published,
      };
      if (editing) {
        await base44.entities.Business.update(editing.id, payload);
      } else {
        await base44.entities.Business.create(payload);
      }
      setDialogOpen(false);
      await load();
    } finally {
      setSaving(false);
    }
  }

  async function remove(b) {
    if (!window.confirm(`"${b.name}" işletmesini rehberden silmek istediğinize emin misiniz?`)) return;
    await base44.entities.Business.delete(b.id);
    await load();
  }

  async function toggle(b, field) {
    await base44.entities.Business.update(b.id, { [field]: !b[field] });
    await load();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-bold tracking-tight">İşletme Rehberi</h1>
          <p className="text-sm text-muted-foreground mt-1">Trakya'daki işletmeleri buradan yönetin.</p>
        </div>
        <Button onClick={openCreate} className="bg-primary text-primary-foreground hover:brightness-110">
          <Plus className="w-4 h-4 mr-1.5" /> Yeni İşletme
        </Button>
      </div>

      <div className="border border-white/15 bg-background overflow-x-auto">
        {loading ? (
          <p className="p-8 text-sm text-muted-foreground">Yükleniyor…</p>
        ) : items.length === 0 ? (
          <p className="p-8 text-sm text-muted-foreground">Henüz işletme yok. "Yeni İşletme" ile başlayın.</p>
        ) : (
          <table className="w-full text-sm min-w-[760px]">
            <thead>
              <tr className="text-left text-xs text-muted-foreground border-b border-white/15">
                <th className="px-4 py-3 font-medium">İşletme</th>
                <th className="px-4 py-3 font-medium">Konum</th>
                <th className="px-4 py-3 font-medium">Sektör</th>
                <th className="px-4 py-3 font-medium">Öne Çıkan</th>
                <th className="px-4 py-3 font-medium">Yayında</th>
                <th className="px-4 py-3 font-medium"></th>
              </tr>
            </thead>
            <tbody>
              {items.map((b) => (
                <tr key={b.id} className="border-b border-white/10 last:border-0 hover:bg-[#101010]">
                  <td className="px-4 py-3">
                    <p className="font-medium flex items-center gap-2">
                      {b.name}
                      {b.featured && <Star className="w-3.5 h-3.5 text-primary" />}
                    </p>
                    {b.website && <p className="text-xs text-muted-foreground truncate max-w-[220px]">{b.website}</p>}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{[b.district, b.city].filter(Boolean).join(" / ")}</td>
                  <td className="px-4 py-3 text-muted-foreground">{b.sector}</td>
                  <td className="px-4 py-3">
                    <Switch checked={!!b.featured} onCheckedChange={() => toggle(b, "featured")} />
                  </td>
                  <td className="px-4 py-3">
                    <Switch checked={b.published !== false} onCheckedChange={() => toggle(b, "published")} />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-1">
                      <button onClick={() => openEdit(b)} className="p-2 text-muted-foreground hover:text-primary transition-colors" aria-label="Düzenle">
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button onClick={() => remove(b)} className="p-2 text-muted-foreground hover:text-destructive transition-colors" aria-label="Sil">
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

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="bg-[#0A0A0B] border-white/20 max-w-2xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editing ? "İşletmeyi Düzenle" : "Yeni İşletme"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div className="space-y-2">
              <Label>İşletme Adı *</Label>
              <Input value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} placeholder="Örn. Trakya Ayçiçek Yağ Fabrikası" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>İl *</Label>
                <Select value={form.city} onValueChange={(v) => setForm((f) => ({ ...f, city: v }))}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {CITIES.map((c) => (
                      <SelectItem key={c} value={c}>{c}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>İlçe</Label>
                <Input value={form.district} onChange={(e) => setForm((f) => ({ ...f, district: e.target.value }))} placeholder="Örn. Çorlu" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Sektör *</Label>
              <Input value={form.sector} onChange={(e) => setForm((f) => ({ ...f, sector: e.target.value }))} placeholder="Örn. Kafe & Restoran, Esnaf & Dükkan…" />
            </div>
            <div className="space-y-2">
              <Label>Tanıtım Metni *</Label>
              <Textarea rows={4} value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} placeholder="İşletmenin kısa tanıtımı" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Telefon</Label>
                <Input value={form.phone} onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))} placeholder="+90 (282) ..." />
              </div>
              <div className="space-y-2">
                <Label>Web Sitesi</Label>
                <Input value={form.website} onChange={(e) => setForm((f) => ({ ...f, website: e.target.value }))} placeholder="https://…" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Adres</Label>
              <Input value={form.address} onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))} placeholder="Mahalle, cadde, no…" />
            </div>
            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-3">
                <Switch checked={form.featured} onCheckedChange={(v) => setForm((f) => ({ ...f, featured: v }))} id="biz-featured" />
                <Label htmlFor="biz-featured" className="cursor-pointer">Öne Çıkan</Label>
              </div>
              <div className="flex items-center gap-3">
                <Switch checked={form.published} onCheckedChange={(v) => setForm((f) => ({ ...f, published: v }))} id="biz-published" />
                <Label htmlFor="biz-published" className="cursor-pointer">Yayında</Label>
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <Button variant="outline" onClick={() => setDialogOpen(false)}>Vazgeç</Button>
              <Button onClick={save} disabled={saving} className="bg-primary text-primary-foreground hover:brightness-110">
                {saving ? "Kaydediliyor…" : "Kaydet"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}