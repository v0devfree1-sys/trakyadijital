import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { base44 } from "@/api/base44Client";

export default function LeadNotes({ lead, onSaved }) {
  const [notes, setNotes] = useState(lead.notes || []);
  const [text, setText] = useState("");
  const [saving, setSaving] = useState(false);

  async function addNote() {
    const value = text.trim();
    if (!value || saving) return;
    setSaving(true);
    try {
      const next = [...notes, { text: value, author: "Ekibimiz", date: new Date().toISOString() }];
      await base44.entities.Lead.update(lead.id, { notes: next });
      setNotes(next);
      setText("");
      onSaved?.(next);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-3">
      <p className="text-[10px] font-mono tracking-widest text-muted-foreground">İÇ NOTLAR — {lead.name}</p>
      {notes.length === 0 ? (
        <p className="text-xs text-muted-foreground">Henüz not yok.</p>
      ) : (
        <ul className="space-y-2">
          {notes.map((n, i) => (
            <li key={i} className="border border-white/10 border-l-2 border-l-primary px-3 py-2">
              <p className="text-sm">{n.text}</p>
              <p className="text-[10px] text-muted-foreground mt-1 font-mono">
                {n.author || "—"} · {n.date ? new Date(n.date).toLocaleString("tr-TR") : ""}
              </p>
            </li>
          ))}
        </ul>
      )}
      <div className="flex gap-2 items-start">
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={2}
          placeholder="Yeni not ekle…"
          className="text-sm"
        />
        <Button
          onClick={addNote}
          disabled={saving || !text.trim()}
          className="bg-primary text-primary-foreground hover:brightness-110 shrink-0"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : "Ekle"}
        </Button>
      </div>
    </div>
  );
}