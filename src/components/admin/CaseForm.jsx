import { useEffect, useRef, useState } from "react";
import { ImagePlus, Loader2, Plus, RotateCcw, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Image } from "@/components/ui/image";
import { base44 } from "@/api/base44Client";
import { IMAGES } from "@/lib/siteData";

const SECTOR_OPTIONS = [
  { value: "tarim", label: "Tarım & Gıda" },
  { value: "sanayi", label: "Sanayi & İmalat" },
  { value: "eticaret", label: "E-Ticaret" },
  { value: "yerel-ticaret", label: "Yerel Ticaret & Hizmet" },
];

export default function CaseForm({ open, onOpenChange, initial, onSaved }) {
  const [form, setForm] = useState({
    client_name: "",
    city: "",
    sector: "sanayi",
    summary: "",
    challenge: "",
    solution: "",
    servicesText: "",
    hero_image_url: "",
    published: false,
  });
  const [results, setResults] = useState([{ label: "", value: "" }]);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const fileRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    setError("");
    setForm({
      client_name: initial?.client_name || "",
      city: initial?.city || "",
      sector: initial?.sector || "sanayi",
      summary: initial?.summary || "",
      challenge: initial?.challenge || "",
      solution: initial?.solution || "",
      servicesText: (initial?.services || []).join(", "),
      hero_image_url: initial?.hero_image_url || IMAGES[initial?.sector] || IMAGES.sanayi,
      published: !!initial?.published,
    });
    setResults(
      (initial?.results || []).length
        ? initial.results.map((r) => ({ label: r.label || "", value: r.value || "" }))
        : [{ label: "", value: "" }]
    );
  }, [open, initial]);

  const set = (k) => (v) =>
    setForm((f) => ({ ...f, [k]: typeof v === "object" && v !== null && "target" in v ? v.target.value : v }));

  async function handleFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Lütfen bir görsel dosyası seçin (jpg, png, webp).");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("Görsel en fazla 5MB olabilir.");
      return;
    }
    setUploading(true);
    setError("");
    try {
      const { file_url } = await base44.integrations.Core.UploadPublicFile({ file });
      setForm((f) => ({ ...f, hero_image_url: file_url }));
    } catch {
      setError("Görsel yüklenemedi, tekrar deneyin.");
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  async function save() {
    if (!form.client_name.trim() || !form.summary.trim()) {
      setError("Müşteri adı ve kısa özet zorunludur.");
      return;
    }
    setSaving(true);
    setError("");
    try {
      const { servicesText, ...rest } = form;
      const payload = {
        ...rest,
        services: servicesText.split(",").map((s) => s.trim()).filter(Boolean),
        results: results
          .map((r) => ({ label: r.label.trim(), value: r.value.trim() }))
          .filter((r) => r.label && r.value),
      };
      if (initial?.id) {
        await base44.entities.CaseStudy.update(initial.id, payload);
      } else {
        await base44.entities.CaseStudy.create(payload);
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
          <DialogTitle>{initial?.id ? "İzi Düzenle" : "Yeni İz Ekle"}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 pt-2">
          {/* Kapak görseli: panelden bilgisayardan yükle */}
          <div className="space-y-2">
            <Label>Kapak görseli</Label>
            <div className="flex gap-4 items-start">
              <div className="w-40 h-24 border border-white/20 overflow-hidden shrink-0 bg-[#101010]">
                {form.hero_image_url && (
                  <Image src={form.hero_image_url} alt="Kapak" className="w-full h-full" fittingType="fill" />
                )}
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => fileRef.current?.click()}
                    disabled={uploading}
                    className="border-white/25"
                  >
                    {uploading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-1.5 animate-spin" /> Yükleniyor…
                      </>
                    ) : (
                      <>
                        <ImagePlus className="w-4 h-4 mr-1.5" /> Bilgisayardan yükle
                      </>
                    )}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setForm((f) => ({ ...f, hero_image_url: IMAGES[form.sector] || IMAGES.sanayi }))}
                    className="border-white/25"
                  >
                    <RotateCcw className="w-4 h-4 mr-1.5" /> Varsayılan
                  </Button>
                </div>
                <Input
                  value={form.hero_image_url}
                  onChange={(e) => setForm((f) => ({ ...f, hero_image_url: e.target.value }))}
                  placeholder="veya görsel bağlantısı (URL)"
                  className="text-xs"
                />
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  Yaptığınız işin ekran görüntüsünü yükleyin — site kartında ve detayda bu görsel görünür. JPG, PNG, WebP · en fazla 5MB.
                </p>
              </div>
            </div>
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Müşteri adı *</Label>
              <Input value={form.client_name} onChange={set("client_name")} placeholder="Çorlu Tekstil A.Ş." />
            </div>
            <div className="space-y-2">
              <Label>Şehir</Label>
              <Input value={form.city} onChange={set("city")} placeholder="Çorlu" />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Sektör</Label>
            <Select value={form.sector} onValueChange={set("sector")}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {SECTOR_OPTIONS.map((s) => (
                  <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Kısa özet *</Label>
            <Textarea rows={2} value={form.summary} onChange={set("summary")} placeholder="Projeyi bir-iki cümlede anlatın — sitede kartta görünür." />
          </div>

          <div className="space-y-2">
            <Label>Zorluk</Label>
            <Textarea rows={2} value={form.challenge} onChange={set("challenge")} placeholder="Müşterinin karşılaştığı sorun neydi?" />
          </div>

          <div className="space-y-2">
            <Label>Çözüm</Label>
            <Textarea rows={2} value={form.solution} onChange={set("solution")} placeholder="DijiTrak olarak ne yaptınız?" />
          </div>

          <div className="space-y-2">
            <Label>Hizmetler (virgülle ayırın)</Label>
            <Input value={form.servicesText} onChange={set("servicesText")} placeholder="Web Tasarımı, SEO, Google Haritalar" />
          </div>

          {/* Sonuç metrikleri: satır satır etiket/değer */}
          <div className="space-y-2">
            <Label>Sonuçlar</Label>
            {results.map((r, i) => (
              <div key={i} className="flex gap-2">
                <Input
                  value={r.label}
                  onChange={(e) => setResults((rs) => rs.map((x, j) => (j === i ? { ...x, label: e.target.value } : x)))}
                  placeholder="Etiket — örn. Organik trafik"
                  className="flex-1"
                />
                <Input
                  value={r.value}
                  onChange={(e) => setResults((rs) => rs.map((x, j) => (j === i ? { ...x, value: e.target.value } : x)))}
                  placeholder="Değer — örn. +%240"
                  className="w-32"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setResults((rs) => (rs.length > 1 ? rs.filter((_, j) => j !== i) : rs))}
                  className="border-white/25 px-2.5"
                  aria-label="Sonucu kaldır"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
            <Button type="button" variant="outline" onClick={() => setResults((rs) => [...rs, { label: "", value: "" }])} className="border-white/25">
              <Plus className="w-4 h-4 mr-1.5" /> Sonuç ekle
            </Button>
          </div>

          <div className="flex items-center gap-3">
            <Switch checked={form.published} onCheckedChange={(v) => setForm((f) => ({ ...f, published: v }))} id="case-published" />
            <Label htmlFor="case-published" className="cursor-pointer">
              Sitede yayında {form.published ? "✓" : ""}
            </Label>
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