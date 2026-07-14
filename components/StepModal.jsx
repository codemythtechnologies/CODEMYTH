"use client";

import { useModals } from "@/context/ModalsContext";
import { scrollToSection } from "@/lib/useSiteActions";
import { steps } from "@/data/steps";

export default function StepModal() {
  const { stepIndex, closeStepModal } = useModals();
  if (stepIndex === null) return null;
  const step = steps[stepIndex];

  return (
    <div className="modal-overlay step-modal-overlay open" onClick={(e) => { if (e.target === e.currentTarget) closeStepModal(); }}>
      <div className="modal-box step-modal-box" role="dialog" aria-modal="true" aria-labelledby="step-modal-title">
        <div className="modal-head">
          <h3 id="step-modal-title"><span className="step-modal-num-badge">{step.num}</span><span>{step.title}</span></h3>
          <button className="modal-close" aria-label="Close" onClick={closeStepModal}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
          </button>
        </div>

        <div className="modal-body">
          <p>{step.intro}</p>

          {step.checklist && (
            <div className="mock-checklist" style={{ marginTop: 14 }}>
              {step.checklist.map((c) => (
                <div className="mock-check" key={c}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>{c}
                </div>
              ))}
            </div>
          )}

          {step.code && (
            <div className="mock">
              {step.code.map((line) => (
                <div className="ln" key={line.n}><span className="no">{line.n}</span><span className="c">{line.text}</span></div>
              ))}
            </div>
          )}

          {step.metrics && (
            <div className="mock-metrics">
              {step.metrics.map((m) => (
                <div className="mock-metric" key={m.label}><b>{m.value}</b><span>{m.label}</span></div>
              ))}
            </div>
          )}

          <p style={{ marginTop: 18, fontSize: 12, color: "var(--text-muted)" }}>{step.footnote}</p>
        </div>

        <div className="modal-foot">
          <button type="button" onClick={() => { scrollToSection("contact"); closeStepModal(); }}>Reach us about this stage</button>
        </div>
      </div>
    </div>
  );
}
