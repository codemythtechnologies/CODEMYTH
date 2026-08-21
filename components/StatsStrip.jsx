"use client";

import Reveal from "./Reveal";
import Counter from "./Counter";

const STATS = [
  { target: 7, suffix: "+", label: "LIVE APPS SHIPPED" },
  { target: 100, suffix: "%", label: "REMOTE-FIRST TEAM" },
  { target: 4, suffix: "", label: "CORE SERVICES OFFERED" },
  { target: 24, suffix: "h", label: "AVG. RESPONSE TIME" },
];

export default function StatsStrip() {
  return (
    <section className="section stats-strip">
      <div className="stats-inner">
        {STATS.map((s, i) => (
          <Reveal className="stat-block" key={s.label} delay={i * 0.05}>
            <div className="stat-val"><Counter target={s.target} suffix={s.suffix} /></div>
            <div className="stat-label">{s.label}</div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
