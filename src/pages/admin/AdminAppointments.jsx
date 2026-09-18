import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { base44 } from "@/api/base44Client";

const STATUS_OPTIONS = [
  { value: "beklemede", label: "Beklemede" },
  { value: "onaylandi", label: "Onaylandı" },
  { value: "gerceklesti", label: "Gerçekleşti" },
  { value: "iptal", label: "İptal" },
];

export default function AdminAppointments() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");

  // Önce yaklaşan (bugün ve sonrası) randevular eskiden yeniye, sonra geçmişler en yeniden eskiye
  function sortAppts(list) {
    const today = new Date().toISOString().slice(0, 10);
    return [...list].sort((a, b) => {
      const aFuture = (a.date || "") >= today;
      const bFuture = (b.date || "") >= today;
      if (aFuture !== bFuture) return aFuture ? -1 : 1;
      const cmp =
        String(a.date || "").localeCompare(String(b.date || "")) ||
        String(a.time || "").localeCompare(String(b.time || ""));
      return aFuture ? cmp : -cmp;
    });
  }

  async function load(silent = false) {
    if (!silent) setLoading(true);
    try {
      setItems(sortAppts(await base44.entities.Appointment.list("date", 500)));
    } finally {
      if (!silent) setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  // Canlı akış: yeni randevu veya değişiklikte liste sessizce tazelenir
  useEffect(() => {
    const unsub = base44.entities.Appointment.subscribe(() => load(true));
    return unsub;
  }, []);

  async function updateStatus(id, status) {
    await base44.entities.Appointment.update(id, { status });
    setItems((list) => list.map((a) => (a.id === id ? { ...a, status } : a)));
    // Durum değişikliğini müşteriye e-postayla bildir
    setMsg("");
    try {
      const res = await base44.functions.invoke("sendAppointmentStatus", { appointment_id: id, status });
      if (res.data?.sent) setMsg(`Durum güncellendi; ${res.data.sent} adresine bilgilendirme e-postası gönderildi.`);
      else if (res.data?.skipped) setMsg("Durum güncellendi.");
    } catch {
      setMsg("Durum güncellendi; müşteri e-postası gönderilemedi.");
    }
  }

  async function remove(id) {
    if (!window.confirm("Bu randevuyu silmek istediğinize emin misiniz?")) return;
    await base44.entities.Appointment.delete(id);
    setItems((list) => list.filter((a) => a.id !== id));
  }

  const fmtDate = (iso) =>
    iso
      ? new Date(`${iso}T00:00:00`).toLocaleDateString("tr-TR", {
          weekday: "short",
          day: "numeric",
          month: "long",
          year: "numeric",
        })
      : "—";

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold tracking-tight">Randevular</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Siteden gelen ücretsiz keşif randevusu talepleri.
        </p>
      </div>

      <div className="border border-white/15 bg-background overflow-x-auto">
        {loading ? (
          <p className="p-8 text-sm text-muted-foreground">Yükleniyor…</p>
        ) : items.length === 0 ? (
          <p className="p-8 text-sm text-muted-foreground">Henüz randevu yok.</p>
        ) : (
          <table className="w-full text-sm min-w-[800px]">
            <thead>
              <tr className="text-left text-xs text-muted-foreground border-b border-white/15">
                <th className="px-4 py-3 font-medium">Tarih / Saat</th>
                <th className="px-4 py-3 font-medium">İsim / İletişim</th>
                <th className="px-4 py-3 font-medium">Hizmet</th>
                <th className="px-4 py-3 font-medium">Not</th>
                <th className="px-4 py-3 font-medium">Durum</th>
                <th className="px-4 py-3 font-medium"></th>
              </tr>
            </thead>
            <tbody>
              {items.map((a) => (
                <tr key={a.id} className="border-b border-white/10 last:border-0 hover:bg-[#101010]">
                  <td className="px-4 py-3">
                    <p className="font-medium">{fmtDate(a.date)}</p>
                    <p className="text-xs text-muted-foreground font-mono">{a.time}</p>
                  </td>
                  <td className="px-4 py-3">
                    <p className="font-medium">{a.name}</p>
                    <p className="text-xs text-muted-foreground">{a.email}</p>
                    {a.phone && <p className="text-xs text-muted-foreground">{a.phone}</p>}
                    {a.company && <p className="text-xs text-muted-foreground">{a.company}</p>}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{a.service || "—"}</td>
                  <td className="px-4 py-3 text-muted-foreground max-w-[220px]">
                    <p className="line-clamp-2 text-xs">{a.message || "—"}</p>
                  </td>
                  <td className="px-4 py-3">
                    <Select value={a.status} onValueChange={(v) => updateStatus(a.id, v)}>
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
                    <button
                      onClick={() => remove(a.id)}
                      className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                      aria-label="Sil"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {msg && <p className="text-xs text-muted-foreground border border-white/15 px-3 py-2">{msg}</p>}
    </div>
  );
}