import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { base44 } from "@/api/base44Client";

const SECTORS = [
  { value: "tarim", label: "Tarım" },
  { value: "sanayi", label: "Sanayi" },
  { value: "eticaret", label: "E-Ticaret" },
  { value: "yerel-ticaret", label: "Yerel Ticaret" },
  { value: "diger", label: "Diğer" },
];

const EMPTY = {
  name: "",
  email: "",
  phone: "",
  company: "",
  sector: "diger",
  service: "",
  message: "",
};

export default function LeadCreateForm({ open, onOpenChange, onSaved }) {
  const [form, setForm] = useState(EMPTY);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!open) return;
    setForm(EMPTY);
    setError("");
  }, [open]);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  async function save() {
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setError("İsim, e-posta ve mesaj zorunludur.");
      return;
    }
    setSaving(true);
    setError("");
    try {
      await base44.entities.Lead.create({ ...form, source: "manuel", status: "yeni" });
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
      <DialogContent className="bg-[#0A0A0B] border-white/20 max-w-xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Manuel Talep Aç</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 pt-2">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>İsim *</Label>
              <Input value={form.name} onChange={set("name")} placeholder="Ahmet Yılmaz" />
            </div>
            <div className="space-y-2">
              <Label>E-posta *</Label>
              <Input type="email" value={form.email} onChange={set("email")} placeholder="ahmet@firmam.com" />
            </div>
            <div className="space-y-2">
              <Label>Telefon</Label>
              <Input value={form.phone} onChange={set("phone")} placeholder="+90 ..." />
            </div>
            <div className="space-y-2">
              <Label>Firma</Label>
              <Input value={form.company} onChange={set("company")} placeholder="Firmanızın adı" />
            </div>
            <div className="space-y-2">
              <Label>Sektör</Label>
              <Select value={form.sector} onValueChange={(v) => setForm((f) => ({ ...f, sector: v }))}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {SECTORS.map((s) => (
                    <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Hizmet</Label>
              <Input value={form.service} onChange={set("service")} placeholder="Kurumsal Web Tasarımı" />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Mesaj *</Label>
            <Textarea rows={3} value={form.message} onChange={set("message")} placeholder="Telefonla gelen talep, müşteri notu vb." />
          </div>
          {error && <p className="text-destructive text-sm">{error}</p>}
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>Vazgeç</Button>
            <Button onClick={save} disabled={saving} className="bg-primary text-primary-foreground hover:brightness-110">
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : "Kaydet"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}