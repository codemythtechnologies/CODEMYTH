"use client";

import { Fragment } from "react";
import Reveal from "./Reveal";
import { pipeline } from "@/data/services";
import { scrollToSection } from "@/lib/useSiteActions";

const PIPE_ICONS = {
  generate: <path d="M12 2a10 10 0 1 0 10 10" />,
  test: null,
  review: null,
  ship: null,
  monitor: null,
};

function PipeIcon({ icon }) {
  switch (icon) {
    case "generate":
      return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a10 10 0 1 0 10 10" /><path d="M12 2v10l7 3" /></svg>;
    case "test":
      return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="6" height="6" /><path d="M4 12a8 8 0 0 1 8-8" /><path d="M20 12a8 8 0 0 1-8 8" /></svg>;
    case "review":
      return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3" /><path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" /></svg>;
    case "ship":
      return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2 11 13" /><path d="M22 2 15 22l-4-9-9-4z" /></svg>;
    case "monitor":
      return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12h4l3 8 4-16 3 8h4" /></svg>;
    default:
      return null;
  }
}

export default function AiEraSection() {
  return (
    <section className="section" id="ai-era">
      <div className="ai-era-grid">
        <div className="ai-era-left">
          <div className="section-head" style={{ marginBottom: 30 }}>
            <div className="section-tag"><div className="dot" /><span>THE AI ERA</span></div>
            <Reveal as="h2"><span>Software is being rebuilt around AI. We build with it, not around it.</span></Reveal>
            <Reveal as="p"><span>AI has moved from novelty to infrastructure — teams that use it well now ship faster, test more thoroughly, and catch problems before customers do. We treat AI as part of the engineering process itself, not a bolt-on chatbot feature.</span></Reveal>
            <Reveal as="p" delay={0.06}><span>In practice, that means AI pair-programming tools scaffold the repetitive parts of a build, LLMs generate edge-case test suites a human would take days to write by hand, and automation handles the checks that used to eat a QA engineer&apos;s whole afternoon. A person still reviews and merges every line — AI sets the pace, engineers set the standard.</span></Reveal>
          </div>
          <div className="ai-stat-row">
            <Reveal className="ai-stat"><div className="ai-stat-num">01</div><div className="ai-stat-txt"><b>Faster production.</b> AI-assisted scaffolding, boilerplate generation, and code review let our small team move at the pace of a much larger one — without cutting corners on architecture.</div></Reveal>
            <Reveal className="ai-stat" delay={0.06}><div className="ai-stat-num">02</div><div className="ai-stat-txt"><b>Deeper testing.</b> LLM-generated test cases, edge-case discovery, and automated regression checks mean bugs are caught in staging — not reported by your users.</div></Reveal>
            <Reveal className="ai-stat" delay={0.12}><div className="ai-stat-num">03</div><div className="ai-stat-txt"><b>Dependable delivery.</b> Every release goes through the same checklist: automated checks, manual QA, and a staged rollout — professionalism isn&apos;t optional, it&apos;s the default.</div></Reveal>
          </div>
        </div>

        <div className="ai-era-right" id="ai-era-pipeline">
          <div className="stack-title" style={{ paddingLeft: 2 }}>AI-ASSISTED DELIVERY PIPELINE</div>
          <div className="pipeline">
            {pipeline.map((p, i) => (
              <Fragment key={p.title}>
                <Reveal className="pipeline-step" delay={i * 0.05}>
                  <div className="pipeline-ico"><PipeIcon icon={p.icon} /></div>
                  <div className="pipeline-txt"><b>{p.title}</b><span>{p.text}</span></div>
                  <svg className="pipeline-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                </Reveal>
                {i < pipeline.length - 1 && <div className="pipeline-connector" />}
              </Fragment>
            ))}
          </div>
        </div>
      </div>

      <div className="ai-charts" id="ai-era-metrics">
        <Reveal className="chart-card" style={{ "--target": "45%" }}>
          <div className="chart-title">TIME TO PRODUCTION</div>
          <div className="chart-sub">Typical 4-week feature build: traditional workflow vs. our AI-assisted process, start to staging link.</div>
          <div className="bar-row">
            <div className="bar-label">Traditional</div>
            <div className="bar-track"><div className="bar-fill bar-muted" style={{ "--target": "100%" }} /></div>
            <div className="bar-val">4 wks</div>
          </div>
          <div className="bar-row">
            <div className="bar-label">AI-assisted</div>
            <div className="bar-track"><div className="bar-fill bar-accent" style={{ "--target": "45%" }} /></div>
            <div className="bar-val">~1.8 wks</div>
          </div>
        </Reveal>
        <Reveal className="chart-card" delay={0.08} style={{ "--offset": "25.13" }}>
          <div className="chart-title">CAUGHT BEFORE LAUNCH</div>
          <div className="chart-sub">Share of defects found in AI-assisted testing &amp; QA, not reported by users after launch.</div>
          <div className="donut-wrap">
            <svg viewBox="0 0 120 120" className="donut">
              <circle cx="60" cy="60" r="50" fill="none" stroke="var(--surface-3)" strokeWidth="14" />
              <circle className="donut-arc" cx="60" cy="60" r="50" fill="none" stroke="url(#cmGrad)" strokeWidth="14" strokeLinecap="round" strokeDasharray="314" transform="rotate(-90 60 60)" />
              <defs>
                <linearGradient id="cmGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="var(--accent-light)" /><stop offset="1" stopColor="var(--accent)" />
                </linearGradient>
              </defs>
              <text x="60" y="67" textAnchor="middle" fontFamily="Space Grotesk, Arial, sans-serif" fontWeight="700" fontSize="26" fill="var(--text-primary)">92%</text>
            </svg>
            <div className="donut-caption">Caught pre-launch through AI-generated tests + manual QA passes</div>
          </div>
        </Reveal>
      </div>

      <div className="ai-triad" id="ai-era-principles">
        <Reveal className="ai-card">
          <div className="ai-card-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" /></svg></div>
          <h3>Faster production</h3>
          <p>AI-assisted development compresses the distance between idea and working software, so your project moves from kickoff to a real staging link in days, not months.</p>
        </Reveal>
        <Reveal className="ai-card" delay={0.06}>
          <div className="ai-card-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 11l3 3 8-8" /><path d="M20 12v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h9" /></svg></div>
          <h3>Rigorous, AI-augmented testing</h3>
          <p>We pair automated, AI-generated test coverage with manual QA passes across devices and browsers, so issues surface before launch — not after.</p>
        </Reveal>
        <Reveal className="ai-card" delay={0.12}>
          <div className="ai-card-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2 2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" /></svg></div>
          <h3>Delivery you can rely on</h3>
          <p>Clear timelines, fixed-price or hourly billing, and a professional handover — documentation, staging access, and support included, not an afterthought.</p>
        </Reveal>
      </div>

      <div className="reach-cta">
        <p><b>Want AI built into your product the right way?</b> Let&apos;s talk through what that looks like for you.</p>
        <button className="btn btn-primary" onClick={() => scrollToSection("contact")}>
          Reach us
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 14, height: 14 }}><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
        </button>
      </div>
    </section>
  );
}
