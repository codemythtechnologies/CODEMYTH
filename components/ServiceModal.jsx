"use client";

import { useCallback, useRef } from "react";
import { useModals } from "@/context/ModalsContext";
import { services } from "@/data/services";
import { scrollToSection } from "@/lib/useSiteActions";

// Same rAF-throttled, ref-driven cursor tracking used on the service cards
// (see ServicesSection.jsx) — CSS variables are written directly to the DOM
// node instead of going through React state, so the glow follows the pointer
// with zero re-render overhead and no visible lag.
function useCursorGlow() {
  const elRef = useRef(null);
  const frame = useRef(null);
  const pending = useRef(null);

  const flush = useCallback(() => {
    frame.current = null;
    const el = elRef.current;
    const pos = pending.current;
    if (!el || !pos) return;
    el.style.setProperty("--mx", `${pos.x}%`);
    el.style.setProperty("--my", `${pos.y}%`);
  }, []);

  const onMouseMove = useCallback(
    (e) => {
      const el = elRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      pending.current = {
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100,
      };
      if (frame.current === null) frame.current = requestAnimationFrame(flush);
    },
    [flush]
  );

  return { elRef, onMouseMove };
}

export default function ServiceModal() {
  const { serviceKey, closeServiceModal } = useModals();
  const { elRef, onMouseMove } = useCursorGlow();

  if (!serviceKey) return null;
  const s = services.find((x) => x.key === serviceKey);
  if (!s) return null;

  return (
    <div
      className="modal-overlay svc-modal-overlay open"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeServiceModal();
      }}
    >
      <div
        className="modal-box svc-modal-box"
        role="dialog"
        aria-modal="true"
        aria-labelledby="service-modal-title"
        ref={elRef}
        onMouseMove={onMouseMove}
      >
        <div className="svc-modal-glow" aria-hidden="true" />
        <div className="svc-modal-grid" aria-hidden="true" />

        <div className="modal-head svc-modal-head">
          <h3 id="service-modal-title">
            <span className="svc-modal-num">{s.num}</span>
            <span>{s.detailTitle || s.title}</span>
          </h3>
          <button className="modal-close" aria-label="Close" onClick={closeServiceModal}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="modal-body svc-modal-body">
          <div className="svc-tags svc-modal-tags">
            {s.tags.map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>

          <p>{s.detailBody}</p>

          {s.metrics && (
            <div className="mock-metrics">
              {s.metrics.map((m) => (
                <div className="mock-metric" key={m.label}>
                  <b>{m.value}</b>
                  <span>{m.label}</span>
                </div>
              ))}
            </div>
          )}

          {s.checklist && (
            <div className="mock">
              <div className="mock-checklist">
                {s.checklist.map((c) => (
                  <div className="mock-check" key={c}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {c}
                  </div>
                ))}
              </div>
            </div>
          )}

          {s.code && (
            <div className="mock">
              {s.code.map((line) => (
                <div className="ln" key={line.n}>
                  <span className="no">{line.n}</span>
                  {line.k && <span className="k">{line.k}</span>}
                  {line.k && <>&nbsp;</>}
                  {line.s && <span className="s">{line.s}</span>}
                  {line.c && <span className="c">{line.c}</span>}
                </div>
              ))}
            </div>
          )}

          <p className="svc-modal-footnote">{s.footnote}</p>
        </div>

        <div className="modal-foot svc-modal-foot">
          <button
            type="button"
            onClick={() => {
              closeServiceModal();
              scrollToSection("contact");
            }}
          >
            Reach us about this service
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 14, height: 14 }}>
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
