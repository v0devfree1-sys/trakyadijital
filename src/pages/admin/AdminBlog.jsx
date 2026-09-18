import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { base44 } from "@/api/base44Client";

function slugify(text) {
  const map = { ç: "c", ğ: "g", ı: "i", ö: "o", ş: "s", ü: "u", Ç: "c", Ğ: "g", İ: "i", Ö: "o", Ş: "s", Ü: "u" };
  return text
    .split("")
    .map((ch) => map[ch] ?? ch)
    .join("")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const EMPTY = { title: "", category: "", excerpt: "", content: "", read_minutes: 5, published: false };

export default function AdminBlog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [saving, setSaving] = useState(false);

  async function load() {
    setLoading(true);
    try {
      setPosts(await base44.entities.BlogPost.list("-created_date", 200));
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

  function openEdit(p) {
    setEditing(p);
    setForm({
      title: p.title || "",
      category: p.category || "",
      excerpt: p.excerpt || "",
      content: p.content || "",
      read_minutes: p.read_minutes || 5,
      published: !!p.published,
    });
    setDialogOpen(true);
  }

  async function save() {
    if (!form.title.trim() || !form.content.trim()) {
      window.alert("Başlık ve içerik zorunludur.");
      return;
    }
    setSaving(true);
    try {
      const payload = {
        title: form.title,
        slug: slugify(form.title),
        category: form.category || "Genel",
        excerpt: form.excerpt,
        content: form.content,
        read_minutes: parseInt(form.read_minutes, 10) || 5,
        published: form.published,
      };
      if (editing) {
        await base44.entities.BlogPost.update(editing.id, payload);
      } else {
        await base44.entities.BlogPost.create(payload);
      }
      setDialogOpen(false);
      await load();
    } finally {
      setSaving(false);
    }
  }

  async function remove(p) {
    if (!window.confirm(`"${p.title}" yazısını silmek istediğinize emin misiniz?`)) return;
    await base44.entities.BlogPost.delete(p.id);
    await load();
  }

  async function togglePublished(p) {
    await base44.entities.BlogPost.update(p.id, { published: !p.published });
    await load();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-bold tracking-tight">Blog Yazıları</h1>
          <p className="text-sm text-muted-foreground mt-1">SEO rehberlerini buradan yönetin.</p>
        </div>
        <Button onClick={openCreate} className="bg-primary text-primary-foreground hover:brightness-110">
          <Plus className="w-4 h-4 mr-1.5" /> Yeni Yazı
        </Button>
      </div>

      <div className="border border-white/15 bg-background overflow-x-auto">
        {loading ? (
          <p className="p-8 text-sm text-muted-foreground">Yükleniyor…</p>
        ) : posts.length === 0 ? (
          <p className="p-8 text-sm text-muted-foreground">Henüz yazı yok. "Yeni Yazı" ile başlayın.</p>
        ) : (
          <table className="w-full text-sm min-w-[700px]">
            <thead>
              <tr className="text-left text-xs text-muted-foreground border-b border-white/15">
                <th className="px-4 py-3 font-medium">Başlık</th>
                <th className="px-4 py-3 font-medium">Kategori</th>
                <th className="px-4 py-3 font-medium">Yayında</th>
                <th className="px-4 py-3 font-medium"></th>
              </tr>
            </thead>
            <tbody>
              {posts.map((p) => (
                <tr key={p.id} className="border-b border-white/10 last:border-0 hover:bg-[#101010]">
                  <td className="px-4 py-3">
                    <p className="font-medium">{p.title}</p>
                    <p className="text-xs text-muted-foreground">/{p.slug}</p>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{p.category}</td>
                  <td className="px-4 py-3">
                    <Switch checked={!!p.published} onCheckedChange={() => togglePublished(p)} />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-1">
                      <button onClick={() => openEdit(p)} className="p-2 text-muted-foreground hover:text-primary transition-colors" aria-label="Düzenle">
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button onClick={() => remove(p)} className="p-2 text-muted-foreground hover:text-destructive transition-colors" aria-label="Sil">
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
            <DialogTitle>{editing ? "Yazıyı Düzenle" : "Yeni Yazı"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div className="space-y-2">
              <Label>Başlık *</Label>
              <Input value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} placeholder="Yazı başlığı" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Kategori</Label>
                <Input value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))} placeholder="SEO, E-Ticaret…" />
              </div>
              <div className="space-y-2">
                <Label>Okuma süresi (dk)</Label>
                <Input type="number" min="1" value={form.read_minutes} onChange={(e) => setForm((f) => ({ ...f, read_minutes: e.target.value }))} />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Kısa özet</Label>
              <Textarea rows={2} value={form.excerpt} onChange={(e) => setForm((f) => ({ ...f, excerpt: e.target.value }))} placeholder="Liste kartlarında gösterilen özet" />
            </div>
            <div className="space-y-2">
              <Label>İçerik (Markdown) *</Label>
              <Textarea rows={10} value={form.content} onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))} placeholder="## Başlık&#10;&#10;Paragraf…" className="font-mono text-xs" />
            </div>
            <div className="flex items-center gap-3">
              <Switch checked={form.published} onCheckedChange={(v) => setForm((f) => ({ ...f, published: v }))} id="post-published" />
              <Label htmlFor="post-published" className="cursor-pointer">Yayında</Label>
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