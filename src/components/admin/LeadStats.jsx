import { useMemo } from "react";
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip, BarChart, Bar, PieChart, Pie, Cell, CartesianGrid } from "recharts";

const STATUS_FLOW = [
  { key: "yeni", label: "Yeni", color: "#FBB22B" },
  { key: "iletisime_gecildi", label: "İletişime Geçildi", color: "#E0912F" },
  { key: "teklif_gonderildi", label: "Teklif Gönderildi", color: "#C97A28" },
  { key: "donustu", label: "Dönüştü", color: "#7BC96F" },
  { key: "kayip", label: "Kayıp", color: "#7A7A82" },
];

const MONTHS_TR = ["Oca", "Şub", "Mar", "Nis", "May", "Haz", "Tem", "Ağu", "Eyl", "Eki", "Kas", "Ara"];

function ChartCard({ title, children }) {
  return (
    <div className="border border-white/15 bg-background p-5">
      <h3 className="font-heading font-bold text-sm mb-4">{title}</h3>
      {children}
    </div>
  );
}

const tooltipStyle = {
  backgroundColor: "#101010",
  border: "1px solid rgba(255,255,255,0.15)",
  fontSize: "12px",
  color: "#fff",
};

export default function LeadStats({ leads, loading }) {
  const monthly = useMemo(() => {
    const now = new Date();
    const buckets = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      buckets.push({ key: `${d.getFullYear()}-${d.getMonth()}`, label: `${MONTHS_TR[d.getMonth()]} ${String(d.getFullYear()).slice(2)}`, count: 0 });
    }
    const map = Object.fromEntries(buckets.map((b) => [b.key, b]));
    (leads || []).forEach((l) => {
      const d = l.created_date ? new Date(l.created_date) : null;
      if (!d || isNaN(d.getTime())) return;
      const k = `${d.getFullYear()}-${d.getMonth()}`;
      if (map[k]) map[k].count += 1;
    });
    return buckets;
  }, [leads]);

  const statusData = useMemo(
    () =>
      STATUS_FLOW.map((s) => ({
        ...s,
        count: (leads || []).filter((l) => (l.status || "yeni") === s.key).length,
      })),
    [leads]
  );

  const sourceData = useMemo(() => {
    const src = (l) =>
      l.source === "ai_asistan" ? "AI Asistan" : l.source === "manuel" ? "Manuel" : "Web Form";
    const counts = {};
    (leads || []).forEach((l) => {
      counts[src(l)] = (counts[src(l)] || 0) + 1;
    });
    const palette = { "AI Asistan": "#FBB22B", Manuel: "#7BC96F", "Web Form": "#6E6E76" };
    return Object.entries(counts).map(([name, value]) => ({ name, value, color: palette[name] || "#6E6E76" }));
  }, [leads]);

  const total = (leads || []).length;
  const converted = statusData.find((s) => s.key === "donustu").count;
  const conversion = total > 0 ? Math.round((converted / total) * 100) : 0;
  const thisMonth = monthly[monthly.length - 1]?.count || 0;
  const lastMonth = monthly[monthly.length - 2]?.count || 0;

  if (loading) {
    return (
      <div className="grid lg:grid-cols-3 gap-4">
        {[0, 1, 2].map((i) => (
          <div key={i} className="border border-white/15 bg-background p-8 text-sm text-muted-foreground">Yükleniyor…</div>
        ))}
      </div>
    );
  }

  if (total === 0) {
    return (
      <div className="border border-white/15 bg-background p-8 text-sm text-muted-foreground">
        İstatistikler için henüz yeterli talep verisi yok.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Özet şeridi */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="border border-white/15 bg-background p-4">
          <p className="text-[11px] font-mono tracking-widest text-muted-foreground">DÖNÜŞÜM ORANI</p>
          <p className="font-heading text-2xl font-extrabold mt-2 text-primary">%{conversion}</p>
          <p className="text-[11px] text-muted-foreground mt-1">{converted} / {total} talep müşteri oldu</p>
        </div>
        <div className="border border-white/15 bg-background p-4">
          <p className="text-[11px] font-mono tracking-widest text-muted-foreground">BU AY</p>
          <p className="font-heading text-2xl font-extrabold mt-2">{thisMonth}</p>
          <p className="text-[11px] text-muted-foreground mt-1">geçen ay: {lastMonth}</p>
        </div>
        <div className="border border-white/15 bg-background p-4">
          <p className="text-[11px] font-mono tracking-widest text-muted-foreground">BEKLEYEN</p>
          <p className="font-heading text-2xl font-extrabold mt-2">{statusData.find((s) => s.key === "yeni").count}</p>
          <p className="text-[11px] text-muted-foreground mt-1">yeni talep sırada</p>
        </div>
        <div className="border border-white/15 bg-background p-4">
          <p className="text-[11px] font-mono tracking-widest text-muted-foreground">AKTİF SÜREÇ</p>
          <p className="font-heading text-2xl font-extrabold mt-2">
            {statusData.find((s) => s.key === "iletisime_gecildi").count + statusData.find((s) => s.key === "teklif_gonderildi").count}
          </p>
          <p className="text-[11px] text-muted-foreground mt-1">teklif sürecinde</p>
        </div>
      </div>

      {/* Grafikler */}
      <div className="grid lg:grid-cols-3 gap-4">
        <ChartCard title="Aylık Talep Akışı (6 ay)">
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={monthly} margin={{ top: 4, right: 4, bottom: 0, left: -22 }}>
              <defs>
                <linearGradient id="leadFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#FBB22B" stopOpacity={0.45} />
                  <stop offset="100%" stopColor="#FBB22B" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
              <XAxis dataKey="label" tick={{ fill: "#8b8b93", fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#8b8b93", fontSize: 10 }} axisLine={false} tickLine={false} allowDecimals={false} />
              <Tooltip contentStyle={tooltipStyle} cursor={{ stroke: "rgba(251,178,43,0.3)" }} />
              <Area type="monotone" dataKey="count" name="Talep" stroke="#FBB22B" strokeWidth={2} fill="url(#leadFill)" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Satış Hunisi">
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={statusData} layout="vertical" margin={{ top: 0, right: 8, bottom: 0, left: 30 }}>
              <XAxis type="number" tick={{ fill: "#8b8b93", fontSize: 10 }} axisLine={false} tickLine={false} allowDecimals={false} />
              <YAxis type="category" dataKey="label" tick={{ fill: "#8b8b93", fontSize: 10 }} axisLine={false} tickLine={false} width={90} />
              <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "rgba(255,255,255,0.04)" }} />
              <Bar dataKey="count" name="Talep" radius={0} barSize={12}>
                {statusData.map((s) => (
                  <Cell key={s.key} fill={s.count === 0 ? "#26262a" : s.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Talep Kaynakları">
          <div className="flex items-center gap-6">
            <ResponsiveContainer width="55%" height={160}>
              <PieChart>
                <Tooltip contentStyle={tooltipStyle} />
                <Pie data={sourceData} dataKey="value" nameKey="name" innerRadius={40} outerRadius={70} paddingAngle={3} strokeWidth={0}>
                  {sourceData.map((s) => (
                    <Cell key={s.name} fill={s.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-3">
              {sourceData.map((s) => (
                <div key={s.name} className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 shrink-0" style={{ backgroundColor: s.color }} />
                  <div>
                    <p className="text-xs font-medium">{s.name}</p>
                    <p className="text-[11px] text-muted-foreground">
                      {s.value} talep{total > 0 ? ` · %${Math.round((s.value / total) * 100)}` : ""}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ChartCard>
      </div>
    </div>
  );
}