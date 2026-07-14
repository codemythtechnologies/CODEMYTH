"use client";

import Reveal from "./Reveal";

const PROMISES = [
  {
    title: "NDA-friendly",
    desc: "Your idea stays yours, on paper.",
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4.5 8-11V5l-8-3-8 3v6c0 6.5 8 11 8 11z" /></svg>,
  },
  {
    title: "24h response time",
    desc: "No waiting weeks for a reply.",
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>,
  },
  {
    title: "Fixed-price or hourly",
    desc: "Clear costs before we start.",
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 3H8v4h8V3z" /></svg>,
  },
  {
    title: "Tested before ship",
    desc: "QA is a step, not an afterthought.",
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 11l3 3 8-8" /><path d="M20 12v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h9" /></svg>,
  },
];

export default function PromiseSection() {
  return (
    <section className="section promise">
      <div className="promise-inner">
        {PROMISES.map((p, i) => (
          <Reveal className="promise-item" key={p.title} delay={i * 0.05}>
            {p.icon}
            <h4>{p.title}</h4>
            <p>{p.desc}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
