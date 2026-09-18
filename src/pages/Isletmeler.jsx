import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Search, Store } from "lucide-react";
import { base44 } from "@/api/base44Client";
import Reveal from "@/components/Reveal";
import BusinessCard from "@/components/businesses/BusinessCard";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { openAssistant } from "@/lib/assistant";
import { useLang } from "@/lib/i18n";
import usePageMeta from "@/lib/usePageMeta";

export default function Isletmeler() {
  const { t } = useLang();
  usePageMeta({
    title: "Trakya İşletme Rehberi | DijiTrak — Tekirdağ, Edirne, Kırklareli, Çanakkale",
    description:
      "Trakya'daki dijitalleşen şirketler, dükkanlar, atölyeler ve kafeler: il ve sektör bazlı işletme rehberi. İşletmenizi ekletin.",
  });
  const [items, setItems] = useState(null);
  const [q, setQ] = useState("");
  const [city, setCity] = useState("all");
  const [sector, setSector] = useState("all");

  useEffect(() => {
    base44.entities.Business.filter({ published: true }, "-created_date", 500)
      .then(setItems)
      .catch(() => setItems([]));
  }, []);

  const CITIES = ["Tekirdağ", "Edirne", "Kırklareli", "Çanakkale"];
  const sectors = useMemo(() => [...new Set((items || []).map((i) => i.sector).filter(Boolean))].sort((a, b) => a.localeCompare(b, "tr")), [items]);
  const cityCounts = useMemo(() => {
    const c = {};
    for (const i of items || []) if (i.city) c[i.city] = (c[i.city] || 0) + 1;
    return c;
  }, [items]);

  const filtered = useMemo(() => {
    let f = items || [];
    if (city !== "all") f = f.filter((i) => i.city === city);
    if (sector !== "all") f = f.filter((i) => i.sector === sector);
    const t = q.trim().toLocaleLowerCase("tr");
    if (t) {
      f = f.filter((i) =>
        `${i.name} ${i.description} ${i.sector} ${i.district || ""} ${i.city}`.toLocaleLowerCase("tr").includes(t)
      );
    }
    return [...f].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0) || a.name.localeCompare(b.name, "tr"));
  }, [items, city, sector, q]);

  return (
    <div className="pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal>
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 bg-primary" />
            <p className="text-[11px] font-mono tracking-[0.25em] text-primary">{t("İŞLETME REHBERİ")}</p>
          </div>
          <h1 className="mt-5 font-heading text-4xl md:text-6xl font-extrabold tracking-[-0.04em] max-w-3xl">
            {t("Trakya'nın işletme haritası")}
          </h1>
          <p className="mt-5 text-muted-foreground max-w-xl leading-relaxed">
            {t("Şirketler, dükkanlar, atölyeler, kafeler… Bölgedeki dijitalleşen işletmeleri tek rehberde topluyoruz. Aradığınızı bulun, ilham alın.")}
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-10 border border-white/15 flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-white/15 bg-background">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={t("İşletme, sektör veya ilçe ara…")}
              className="pl-9 h-12 border-0 border-b md:border-b-0 focus-visible:ring-0 focus-visible:border-transparent"
            />
          </div>
          <Select value={sector} onValueChange={setSector}>
            <SelectTrigger className="w-full md:w-52 h-12 border-0 focus:ring-0">
              <SelectValue placeholder={t("Sektör")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("Tüm Sektörler")}</SelectItem>
              {sectors.map((s) => (
                <SelectItem key={s} value={s}>{s}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Reveal>

        {/* Hızlı il filtreleri */}
        <Reveal delay={0.15} className="mt-5">
          <div className="flex gap-2 overflow-x-auto pb-1 -mx-6 px-6 md:mx-0 md:px-0 md:flex-wrap">
            <button
              onClick={() => setCity("all")}
              className={`shrink-0 inline-flex items-center gap-2 px-4 py-2.5 text-sm font-bold border transition-colors ${
                city === "all"
                  ? "bg-primary text-primary-foreground border-primary"
                  : "border-white/20 text-foreground/75 hover:border-primary/60 hover:text-foreground"
              }`}
            >
              {t("Tüm İller")}
              <span className="font-mono text-[10px] opacity-70">{items?.length ?? "–"}</span>
            </button>
            {CITIES.map((c) => {
              const count = cityCounts[c] || 0;
              const active = city === c;
              return (
                <button
                  key={c}
                  onClick={() => setCity(active ? "all" : c)}
                  disabled={count === 0 && !active}
                  className={`shrink-0 inline-flex items-center gap-2 px-4 py-2.5 text-sm font-bold border transition-colors ${
                    active
                      ? "bg-primary text-primary-foreground border-primary"
                      : count === 0
                        ? "border-white/10 text-muted-foreground/50"
                        : "border-white/20 text-foreground/75 hover:border-primary/60 hover:text-foreground"
                  }`}
                >
                  {c}
                  <span className="font-mono text-[10px] opacity-70">{count}</span>
                </button>
              );
            })}
          </div>
        </Reveal>

        <div className="mt-6 flex items-center gap-2 text-xs text-muted-foreground font-mono">
          <Store className="w-3.5 h-3.5 text-primary" />
          {items === null ? t("YÜKLENİYOR…") : `${filtered.length} ${t("İŞLETME")}`}
        </div>

        {items === null ? (
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-48 border border-white/15 bg-[#101010] animate-pulse" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="mt-12 p-12 border border-dashed border-white/20 text-center">
            <Search className="w-8 h-8 text-muted-foreground mx-auto mb-4" />
            <p className="font-heading font-bold text-lg">{t("Sonuç bulunamadı")}</p>
            <p className="text-sm text-muted-foreground mt-2">{t("Aramanızla eşleşen işletme yok. Filtreleri değiştirmeyi deneyin.")}</p>
          </div>
        ) : (
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((b, i) => (
              <Reveal key={b.id} delay={(i % 3) * 0.07}>
                <BusinessCard b={b} />
              </Reveal>
            ))}
          </div>
        )}

        <Reveal delay={0.1} className="mt-16">
          <div className="border border-primary bg-primary text-primary-foreground p-8 md:p-12 text-center">
            <h2 className="font-heading text-2xl md:text-3xl font-extrabold tracking-tight">{t("İşletmeniz bu listede yok mu?")}</h2>
            <p className="text-primary-foreground/80 text-sm mt-3 max-w-lg mx-auto leading-relaxed">
              {t("Trakya'daki tüm şirketler, dükkanlar ve atölyeler için rehberimiz açık. İşletmenizi ekletmek ve dijital varlığınızı güçlendirmek için bize ulaşın.")}
            </p>
            <div className="mt-7 flex flex-col sm:flex-row justify-center gap-3">
              <button
                onClick={openAssistant}
                className="inline-flex items-center justify-center bg-[#0A0A0B] text-primary font-bold px-6 py-3 hover:bg-black transition-colors"
              >
                {t("AI Asistanla Başvur")}
              </button>
              <Link
                to="/iletisim"
                className="inline-flex items-center justify-center px-6 py-3 border border-[#0A0A0B]/40 font-bold hover:border-[#0A0A0B] transition-colors"
              >
                {t("İletişim Formu")}
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}