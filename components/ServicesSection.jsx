"use client";

import { useCallback, useRef } from "react";
import Reveal from "./Reveal";
import { services } from "@/data/services";

// Writes the pointer position straight to CSS variables on the card's own DOM
// node (no React state, no re-render) so the gradient-follows-cursor effect
// tracks with zero lag. requestAnimationFrame collapses bursts of mousemove
// events down to one DOM write per frame.
function useCardGlow() {
  const frame = useRef(null);
  const pending = useRef(null);

  const flush = useCallback(() => {
    frame.current = null;
    const { el, x, y } = pending.current;
    el.style.setProperty("--mx", `${x}%`);
    el.style.setProperty("--my", `${y}%`);
  }, []);

  const onMouseMove = useCallback(
    (e) => {
      const el = e.currentTarget;
      const rect = el.getBoundingClientRect();
      pending.current = {
        el,
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100,
      };
      if (frame.current === null) frame.current = requestAnimationFrame(flush);
    },
    [flush]
  );

  return onMouseMove;
}

const ICONS = {
  fullstack: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
    </svg>
  ),
  ai: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="4" width="16" height="16" rx="2" /><rect x="9" y="9" width="6" height="6" />
      <line x1="9" y1="1" x2="9" y2="4" /><line x1="15" y1="1" x2="15" y2="4" />
      <line x1="9" y1="20" x2="9" y2="23" /><line x1="15" y1="20" x2="15" y2="23" />
      <line x1="1" y1="9" x2="4" y2="9" /><line x1="1" y1="15" x2="4" y2="15" />
      <line x1="20" y1="9" x2="23" y2="9" /><line x1="20" y1="15" x2="23" y2="15" />
    </svg>
  ),
  landing: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" /><line x1="3" y1="9" x2="21" y2="9" /><line x1="9" y1="21" x2="9" y2="9" />
    </svg>
  ),
  api: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 17V7a2 2 0 0 1 2-2h8l6 6v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z" /><path d="M14 5v6h6" />
    </svg>
  ),
};

const TRIAD = [
  {
    num: "01 — BUILT FOR SHIPPING",
    title: "Real products, not demos",
    text: "Every engagement ends with something deployed and live — not a prototype gathering dust in a repo. We ship code that's actually used.",
  },
  {
    num: "02 — POWERED BY AI",
    title: "Modern tooling, used well",
    text: "We reach for LLMs and automation only where they genuinely save you time and money. AI is a force multiplier, not a crutch.",
  },
  {
    num: "03 — DESIGNED FOR SPEED",
    title: "Small team, fast turnaround",
    text: "No layers of account managers — you talk directly to the people writing your code. Decisions happen in hours, not weeks.",
  },
];

export default function ServicesSection({ onOpenServiceDetail, onOpenServiceModal }) {
  const onCardMouseMove = useCardGlow();

  return (
    <>
      <section className="section" id="services">
        <div className="section-pad" style={{ paddingBottom: 0 }}>
          <div className="section-head">
            <div className="section-tag"><div className="dot" /><span>WHAT WE BUILD</span></div>
            <h2>Four services, four different approaches</h2>
            <p>Click any service below to see exactly how we deliver it — each one has its own process, tools, and timeline.</p>
          </div>
        </div>
        <div className="services-inner">
          {services.map((s, i) => (
            <Reveal
              as="div"
              key={s.key}
              className="svc"
              role="button"
              tabIndex={0}
              delay={i * 0.08}
              onMouseMove={onCardMouseMove}
            >
              <div className="svc-grid" aria-hidden="true" />
              <div className="svc-glow" aria-hidden="true" />

              <button
                type="button"
                className="svc-arrow-btn"
                aria-label={`Open ${s.title} details`}
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenServiceModal?.(s.key);
                }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </button>

              <div
                className="svc-body"
                onClick={() => onOpenServiceDetail?.(s.key)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") onOpenServiceDetail?.(s.key);
                }}
                style={{ cursor: "pointer" }}
              >
                <div className="svc-icon">{ICONS[s.icon]}</div>
                <h3>{s.title}</h3>
                <p>{s.summary}</p>
                <div className="svc-tags">
                  {s.tags.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
                <span className="svc-more">
                  See how we build this
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="triad">
          {TRIAD.map((t, i) => (
            <Reveal as="div" className="triad-card" key={t.num} delay={i * 0.08}>
              <div className="triad-num">{t.num}</div>
              <h3>{t.title}</h3>
              <p>{t.text}</p>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
