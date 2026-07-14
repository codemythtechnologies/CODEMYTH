"use client";

import { forwardRef, useImperativeHandle, useState } from "react";
import { services } from "@/data/services";
import { scrollToSection } from "@/lib/useSiteActions";

const ServiceDetailSection = forwardRef(function ServiceDetailSection(_, ref) {
  const [active, setActive] = useState("fullstack");

  useImperativeHandle(ref, () => ({
    open(key) {
      setActive(key);
      scrollToSection("service-detail");
      flash();
    },
  }));

  function flash() {
    const el = document.getElementById("service-detail");
    if (!el) return;
    el.classList.remove("jump-highlight");
    void el.offsetWidth;
    el.classList.add("jump-highlight");
  }

  const current = services.find((s) => s.key === active) || services[0];

  return (
    <section className="section" id="service-detail">
      <div className="section-pad" style={{ paddingBottom: 0 }}>
        <div className="section-head">
          <div className="section-tag"><div className="dot" /><span>HOW WE BUILD EACH SERVICE</span></div>
          <h2>Same team, four different playbooks</h2>
          <p>A landing page and an AI product don&apos;t get built the same way. Here&apos;s the specific approach behind each service.</p>
        </div>
      </div>
      <div className="approach-grid">
        <div className="tab-list" id="svcTabList" role="tablist">
          {services.map((s) => (
            <button
              key={s.key}
              className={`tab-btn${active === s.key ? " active" : ""}`}
              role="tab"
              aria-selected={active === s.key}
              onClick={() => setActive(s.key)}
            >
              <span className="t-num">{s.num}</span><span className="t-title">{s.title}</span>
            </button>
          ))}
        </div>
        <div className="tab-panels">
          <div className="tab-panel active">
            <h4>{current.detailTitle}</h4>
            <p>{current.detailBody}</p>

            {current.metrics && (
              <div className="mock-metrics">
                {current.metrics.map((m) => (
                  <div className="mock-metric" key={m.label}><b>{m.value}</b><span>{m.label}</span></div>
                ))}
              </div>
            )}

            {current.checklist && (
              <div className="mock">
                <div className="mock-checklist">
                  {current.checklist.map((c) => (
                    <div className="mock-check" key={c}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>{c}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {current.code && (
              <div className="mock">
                {current.code.map((line) => (
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

            <p style={{ marginTop: 18, fontSize: 12, color: "var(--text-muted)" }}>{current.footnote}</p>
          </div>
        </div>
      </div>
      <div className="reach-cta">
        <p><b>Like the sound of this service?</b> Tell us what you&apos;re building and we&apos;ll scope it for free.</p>
        <button className="btn btn-primary" onClick={() => scrollToSection("contact")}>
          Reach us
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 14, height: 14 }}><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
        </button>
      </div>
    </section>
  );
});

export default ServiceDetailSection;
