import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Image } from "@/components/ui/image";
import { base44 } from "@/api/base44Client";
import CaseForm from "@/components/admin/CaseForm";

const SECTOR_LABELS = {
  tarim: "Tarım & Gıda",
  sanayi: "Sanayi & İmalat",
  eticaret: "E-Ticaret",
  "yerel-ticaret": "Yerel Ticaret & Hizmet",
};

export default function AdminCases() {
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  async function load() {
    setLoading(true);
    try {
      setCases(await base44.entities.CaseStudy.list("-created_date", 200));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function remove(c) {
    if (!window.confirm(`"${c.client_name}" izini silmek istediğinize emin misiniz?`)) return;
    await base44.entities.CaseStudy.delete(c.id);
    await load();
  }

  async function togglePublished(c) {
    await base44.entities.CaseStudy.update(c.id, { published: !c.published });
    await load();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-bold tracking-tight">İz Bıraktıklarımız</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Yaptığınız işleri buradan ekleyin; yayına aldığınız anda sitede görünür.
          </p>
        </div>
        <Button
          onClick={() => {
            setEditing(null);
            setFormOpen(true);
          }}
          className="bg-primary text-primary-foreground hover:brightness-110"
        >
          <Plus className="w-4 h-4 mr-1.5" /> Yeni İz
        </Button>
      </div>

      <div className="border border-white/15 bg-background overflow-x-auto">
        {loading ? (
          <p className="p-8 text-sm text-muted-foreground">Yükleniyor…</p>
        ) : cases.length === 0 ? (
          <p className="p-8 text-sm text-muted-foreground">Henüz iz yok. "Yeni İz" ile ilk projenizi ekleyin.</p>
        ) : (
          <table className="w-full text-sm min-w-[700px]">
            <thead>
              <tr className="text-left text-xs text-muted-foreground border-b border-white/15">
                <th className="px-4 py-3 font-medium">Görsel</th>
                <th className="px-4 py-3 font-medium">Müşteri</th>
                <th className="px-4 py-3 font-medium">Şehir</th>
                <th className="px-4 py-3 font-medium">Sektör</th>
                <th className="px-4 py-3 font-medium">Yayında</th>
                <th className="px-4 py-3 font-medium"></th>
              </tr>
            </thead>
            <tbody>
              {cases.map((c) => (
                <tr key={c.id} className="border-b border-white/10 last:border-0 hover:bg-[#101010]">
                  <td className="px-4 py-3">
                    <div className="w-20 h-12 border border-white/15 overflow-hidden bg-[#101010]">
                      {c.hero_image_url && <Image src={c.hero_image_url} alt={c.client_name} className="w-full h-full" fittingType="fill" />}
                    </div>
                  </td>
                  <td className="px-4 py-3 font-medium">
                    {c.client_name}
                    {(c.results || []).length > 0 && (
                      <span className="block text-[11px] text-muted-foreground font-normal mt-0.5">
                        {c.results.length} metrik
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{c.city}</td>
                  <td className="px-4 py-3 text-muted-foreground">{SECTOR_LABELS[c.sector] || c.sector}</td>
                  <td className="px-4 py-3">
                    <Switch checked={!!c.published} onCheckedChange={() => togglePublished(c)} />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-1">
                      <button
                        onClick={() => {
                          setEditing(c);
                          setFormOpen(true);
                        }}
                        className="p-2 text-muted-foreground hover:text-primary transition-colors"
                        aria-label="Düzenle"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button onClick={() => remove(c)} className="p-2 text-muted-foreground hover:text-destructive transition-colors" aria-label="Sil">
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

      <CaseForm
        open={formOpen}
        onOpenChange={setFormOpen}
        initial={editing}
        onSaved={load}
      />
    </div>
  );
}