import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "framer-motion";
import Reveal from "@/components/Reveal";
import { STATS } from "@/lib/siteData";
import { useLang } from "@/lib/i18n";

function CountUp({ value }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const m = value.match(/^(\D*)(\d+)(.*)$/);
  const [display, setDisplay] = useState(m ? `${m[1]}0${m[3]}` : value);

  useEffect(() => {
    if (!inView || !m) return;
    const controls = animate(0, parseInt(m[2], 10), {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(`${m[1]}${Math.round(v)}${m[3]}`),
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  return (
    <p ref={ref} className="font-heading text-4xl md:text-5xl font-extrabold text-primary tracking-tight">
      {m ? display : value}
    </p>
  );
}

export default function StatsBar() {
  const { t } = useLang();
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/15 border-x border-white/15">
      {STATS.map((s, i) => (
        <Reveal key={s.label} delay={i * 0.07} className="bg-background px-8 py-10 text-center md:text-left">
          <CountUp value={s.value} />
          <p className="mt-2 text-[11px] font-mono uppercase tracking-[0.2em] text-muted-foreground">{t(s.label)}</p>
        </Reveal>
      ))}
    </div>
  );
}