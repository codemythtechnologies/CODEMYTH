"use client";

import { steps } from "@/data/steps";
import { scrollToSection } from "@/lib/useSiteActions";

const ARROW = (
  <svg className="step-card-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" /></svg>
);

const ICONS = {
  search: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>,
  code: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>,
  check: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 11l3 3 8-8" /><path d="M20 12v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h9" /></svg>,
  rocket: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l3 7h7l-5.5 4.5L18.5 21 12 16.5 5.5 21l2-7.5L2 9h7z" /></svg>,
  support: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 18v-6a9 9 0 0 1 18 0v6" /><path d="M21 19a2 2 0 0 1-2 2h-1v-8h3z" /><path d="M3 19a2 2 0 0 0 2 2h1v-8H3z" /></svg>,
};

export default function ApproachSection({ onOpenStep }) {
  return (
    <section className="section" id="approach">
      <div className="section-pad" style={{ paddingBottom: 0 }}>
        <div className="section-head">
          <div className="section-tag"><div className="dot" /><span>HOW WE WORK</span></div>
          <h2>From idea to production</h2>
          <p>A straightforward five-step process built around remote collaboration, AI-assisted engineering, and fast feedback loops.</p>
        </div>
      </div>

      <div className="approach-steps-grid" id="approachStepsGrid">
        {steps.map((s, i) => (
          <button type="button" className="step-card" key={s.num} onClick={() => onOpenStep(i)}>
            {ARROW}
            <div className="step-card-icon">{ICONS[s.icon]}</div>
            <span className="step-card-num">{s.num}</span>
            <span className="step-card-title">{s.title}</span>
            <span className="step-card-dur">{s.duration}</span>
          </button>
        ))}
      </div>

      <div className="reach-cta">
        <p><b>Want this exact process running on your project?</b> Tell us what you&apos;re building and we&apos;ll map it to a timeline.</p>
        <button className="btn btn-primary" onClick={() => scrollToSection("contact")}>
          Reach us
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 14, height: 14 }}><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
        </button>
      </div>
    </section>
  );
}
