"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import Reveal from "./Reveal";

const CHECK = (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M3 8.5L6.2 12L13 4" stroke="#FF8468" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const CHECK_SM = (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
    <path d="M3 8.5L6.2 12L13 4" stroke="#FF8468" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const BA_SERVICES = [
  "Idea validation, competitor mapping & market sizing",
  "MVP scoping — must-haves vs. nice-to-haves, ranked by impact",
  "Product requirement docs (PRD), user flows & wireframes",
  "Business model, pricing & go-to-market framing",
  "Investor-ready metrics, roadmap & pitch narrative support",
  "Sprint planning & scope control once development kicks off",
];

const BA_CARDS = [
  {
    title: "Idea Validation & Market Research",
    desc: "Competitor mapping, TAM/SAM/SOM sizing and early customer signal — so you build with evidence, not a hunch.",
    icon: <svg width="26" height="26" viewBox="0 0 26 26" fill="none"><circle cx="11" cy="11" r="7" stroke="#E85B4A" strokeWidth="1.6" /><path d="M16.2 16.2L22 22" stroke="#FF8468" strokeWidth="1.8" strokeLinecap="round" /></svg>,
  },
  {
    title: "Product Requirement Docs",
    desc: "Clear PRDs, user stories and flows your engineering team can start building from on day one — no back-and-forth.",
    icon: <svg width="26" height="26" viewBox="0 0 26 26" fill="none"><rect x="4" y="4" width="18" height="18" rx="3" stroke="#FF8468" strokeWidth="1.6" /><path d="M8 10h10M8 14h6" stroke="#FF8468" strokeWidth="1.6" strokeLinecap="round" /></svg>,
  },
  {
    title: "MVP Scoping & Roadmapping",
    desc: "A ranked, phased roadmap that separates your launch-critical MVP from future-release features.",
    icon: <svg width="26" height="26" viewBox="0 0 26 26" fill="none"><circle cx="13" cy="13" r="9" stroke="#E85B4A" strokeWidth="1.6" /><path d="M13 8v5l3.5 2" stroke="#E85B4A" strokeWidth="1.6" strokeLinecap="round" /></svg>,
  },
  {
    title: "Business Model & GTM",
    desc: "Pricing strategy, revenue model options and a go-to-market plan mapped to your first 100 users.",
    icon: <svg width="26" height="26" viewBox="0 0 26 26" fill="none"><path d="M3 21V13M9 21V7M15 21V11M21 21V4" stroke="#FF8468" strokeWidth="1.8" strokeLinecap="round" /></svg>,
  },
  {
    title: "Founder & Client Handling",
    desc: "A dedicated point of contact for every founder, transparent status reporting, and clean sign-off — no surprises, no missed dates.",
    icon: <svg width="26" height="26" viewBox="0 0 26 26" fill="none"><path d="M13 3l3.5 7.2L24 11.3l-5.5 5.4L19.8 24 13 20.2 6.2 24l1.3-7.3L2 11.3l7.5-1.1L13 3z" stroke="#E85B4A" strokeWidth="1.5" strokeLinejoin="round" /></svg>,
  },
  {
    title: "Risk & Scope Control",
    desc: "Proactive scope governance and risk logs so your product can pivot without losing direction — or your runway.",
    icon: <svg width="26" height="26" viewBox="0 0 26 26" fill="none"><rect x="4" y="4" width="18" height="18" rx="3" stroke="#FF8468" strokeWidth="1.6" /><path d="M9 13h8M13 9v8" stroke="#FF8468" strokeWidth="1.6" strokeLinecap="round" /></svg>,
  },
];

const LEGEND = [
  { color: "#E85B4A", label: "Idea Validation & Research — 43%" },
  { color: "#FF8468", label: "PRD & Requirements — 29%" },
  { color: "#C0392B", label: "MVP Roadmapping — 21%" },
  { color: "#9C9CA3", label: "Business Model & GTM — 7%" },
];

const HBARS = [
  { label: "Idea Validation", value: 96, color: "#E85B4A" },
  { label: "PRD & Specs", value: 92, color: "#FF8468" },
  { label: "MVP Roadmapping", value: 94, color: "#C0392B" },
  { label: "Business Model", value: 90, color: "#9C9CA3" },
];

const CLIENT_POINTS = [
  "Structured MVP roadmaps & go-to-market plans for early-stage founders preparing to build or raise",
  "Successfully delivered validation & documentation projects for Mankind Pharma",
  "Completed project engagement with Alkem Pharma",
  "Consistent on-time delivery record across every engagement, startup or enterprise",
];

const BA_STATS = [
  { num: "2–3 wks", cap: "Average idea-to-PRD turnaround" },
  { num: "97.9%", cap: "On-time milestone submission" },
  { num: "97.9%", cap: "Client sign-off rate" },
  { num: "Global", cap: "Reach across domestic & abroad clients" },
];

export default function BusinessAnalysisSection({ onOpenBAConsult }) {
  const chartsRef = useRef(null);
  const chartsInView = useInView(chartsRef, { once: true, amount: 0.3, margin: "-40px" });
  const [workstreams, setWorkstreams] = useState(0);
  const [trendPct, setTrendPct] = useState(0);

  useEffect(() => {
    if (!chartsInView) return;
    const t1 = setTimeout(() => setWorkstreams(4), 900);
    let raf;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min(1, (now - start) / 1300);
      setTrendPct(Math.round(p * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => { clearTimeout(t1); cancelAnimationFrame(raf); };
  }, [chartsInView]);

  return (
    <section className="section ba-section" id="business-analysis">
      <div className="ba-wrap">
        <div className="ba-grid">
          {/* LEFT: narrative */}
          <Reveal>
            <div className="ba-eyebrow">For Founders &amp; Early-Stage Teams</div>
            <h2 className="ba-title">Business-Analysis &amp; <span>Product Counseling</span></h2>
            <p className="ba-sub">
              A dedicated Business Analyst sits with you before a single line of code is written —
              validating the idea, sizing the market, and turning a raw startup concept into a
              build-ready product requirement document your dev team can execute from day one.
            </p>

            <ul className="ba-services">
              {BA_SERVICES.map((s) => (
                <li key={s}>{CHECK}{s}</li>
              ))}
            </ul>

            <button type="button" className="ba-cta" onClick={onOpenBAConsult}>Talk to our expert team →</button>
          </Reveal>

          {/* RIGHT: signature dashboard mockup */}
          <Reveal className="ba-mock">
            <div className="ba-mock-header">
              <div className="dot-row"><span></span><span></span><span></span></div>
              <div className="label">STARTUP_ROADMAP.VIEW</div>
            </div>

            <div className="ba-kpis">
              <div className="ba-kpi up">
                <div className="num">2–3 wks</div>
                <div className="cap">Idea to build-ready PRD</div>
              </div>
              <div className="ba-kpi">
                <div className="num">PRD</div>
                <div className="cap">+ user flows delivered</div>
              </div>
              <div className="ba-kpi up">
                <div className="num">4.9/5</div>
                <div className="cap">Founder satisfaction</div>
              </div>
            </div>

            <div className="ba-chart-card">
              <svg viewBox="0 0 300 110" xmlns="http://www.w3.org/2000/svg">
                <rect x="10" y="55" width="18" height="45" rx="3" fill="#1f1f24" />
                <rect x="38" y="40" width="18" height="60" rx="3" fill="#1f1f24" />
                <rect x="66" y="30" width="18" height="70" rx="3" fill="#1f1f24" />
                <rect x="94" y="45" width="18" height="55" rx="3" fill="#1f1f24" />
                <rect x="122" y="20" width="18" height="80" rx="3" fill="#E85B4A" />
                <rect x="150" y="35" width="18" height="65" rx="3" fill="#1f1f24" />
                <rect x="178" y="15" width="18" height="85" rx="3" fill="#1f1f24" />
                <polyline points="19,50 47,35 75,25 103,40 131,15 159,30 187,10"
                  fill="none" stroke="#FF8468" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="131" cy="15" r="4" fill="#FF8468" />
              </svg>
            </div>

            <div className="ba-tools">
              <span className="ba-tool-chip">SQL</span>
              <span className="ba-tool-chip">Tableau</span>
              <span className="ba-tool-chip">Jira</span>
              <span className="ba-tool-chip">SAP</span>
              <span className="ba-tool-chip">Agile / Scrum</span>
            </div>
          </Reveal>
        </div>

        {/* ELABORATE SERVICE ICON CARDS */}
        <div className="ba-cards">
          {BA_CARDS.map((c, i) => (
            <Reveal as="div" className="ba-card" key={c.title} delay={(i % 3) * 0.08}>
              <div className="ba-card-icon">{c.icon}</div>
              <h3>{c.title}</h3>
              <p>{c.desc}</p>
            </Reveal>
          ))}
        </div>

        {/* MARKET & DELIVERY INSIGHTS */}
        <Reveal className="ba-insights">
          <div className="ba-insights-head">
            <div className="ba-eyebrow">Market &amp; Delivery Insights</div>
            <h3>How our product counseling effort breaks down for early-stage founders</h3>
          </div>

          <div className="ba-chart-grid" ref={chartsRef}>
            {/* Donut: effort mix */}
            <div className="ba-chart-panel">
              <div className="ba-chart-panel-title">Effort Mix by Workstream</div>
              <svg viewBox="0 0 220 220" className="ba-donut">
                <circle cx="110" cy="110" r="80" fill="none" stroke="#1f1f24" strokeWidth="26" />
                <circle className="ba-arc" style={{ "--len": "150.7" }} cx="110" cy="110" r="80" fill="none" stroke="#E85B4A" strokeWidth="26" strokeDashoffset="0" strokeLinecap="round" transform="rotate(-90 110 110)" />
                <circle className="ba-arc" style={{ "--len": "100.5" }} cx="110" cy="110" r="80" fill="none" stroke="#FF8468" strokeWidth="26" strokeDashoffset="-150.7" strokeLinecap="round" transform="rotate(-90 110 110)" />
                <circle className="ba-arc" style={{ "--len": "75.4" }} cx="110" cy="110" r="80" fill="none" stroke="#C0392B" strokeWidth="26" strokeDashoffset="-251.2" strokeLinecap="round" transform="rotate(-90 110 110)" />
                <circle className="ba-arc" style={{ "--len": "50.3" }} cx="110" cy="110" r="80" fill="none" stroke="#9C9CA3" strokeWidth="26" strokeDashoffset="-326.6" strokeLinecap="round" transform="rotate(-90 110 110)" />
                <text className="ba-donut-num" x="110" y="105" textAnchor="middle" fontFamily="Space Grotesk, Arial, sans-serif" fontSize="26" fontWeight="700" fill="#f5f5f4">{workstreams}</text>
                <text className="ba-donut-cap" x="110" y="126" textAnchor="middle" fontFamily="Inter, Arial, sans-serif" fontSize="10" fill="#9c9ca3">WORKSTREAMS</text>
              </svg>
              <ul className="ba-legend">
                {LEGEND.map((l) => (
                  <li key={l.label}><span style={{ background: l.color }}></span>{l.label}</li>
                ))}
              </ul>
            </div>

            {/* Area/trend: milestone delivery */}
            <div className="ba-chart-panel">
              <div className="ba-chart-panel-title">Milestone Delivery Consistency</div>
              <svg viewBox="0 0 260 150" className="ba-trend">
                <line x1="20" y1="20" x2="20" y2="120" stroke="rgba(255,255,255,.14)" strokeWidth="1" />
                <line x1="20" y1="120" x2="245" y2="120" stroke="rgba(255,255,255,.14)" strokeWidth="1" />
                <path className="ba-trend-line" d="M20,90 L70,70 L120,60 L170,38 L220,28"
                  fill="none" stroke="#FF8468" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                <path className="ba-trend-area" d="M20,90 L70,70 L120,60 L170,38 L220,28 L220,120 L20,120 Z" fill="url(#baAreaFill)" opacity="0.5" />
                <defs>
                  <linearGradient id="baAreaFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#FF8468" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#FF8468" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <circle className="ba-pt" cx="20" cy="90" r="3.2" fill="#FF8468" />
                <circle className="ba-pt" cx="70" cy="70" r="3.2" fill="#FF8468" />
                <circle className="ba-pt" cx="120" cy="60" r="3.2" fill="#FF8468" />
                <circle className="ba-pt" cx="170" cy="38" r="3.2" fill="#FF8468" />
                <circle className="ba-pt" cx="220" cy="28" r="4" fill="#FF8468" stroke="#08080a" strokeWidth="2" />
                <text x="20" y="136" fontFamily="Inter, Arial, sans-serif" fontSize="9" fill="#9c9ca3">Q1</text>
                <text x="68" y="136" fontFamily="Inter, Arial, sans-serif" fontSize="9" fill="#9c9ca3">Q2</text>
                <text x="118" y="136" fontFamily="Inter, Arial, sans-serif" fontSize="9" fill="#9c9ca3">Q3</text>
                <text x="168" y="136" fontFamily="Inter, Arial, sans-serif" fontSize="9" fill="#9c9ca3">Q4</text>
                <text x="210" y="136" fontFamily="Inter, Arial, sans-serif" fontSize="9" fill="#9c9ca3">Q5</text>
                <text x="196" y="20" fontFamily="Space Grotesk, Arial, sans-serif" fontSize="13" fontWeight="700" fill="#f5f5f4">{trendPct}%</text>
              </svg>
            </div>

            {/* Bar: founder satisfaction by workstream */}
            <div className="ba-chart-panel">
              <div className="ba-chart-panel-title">Founder Satisfaction by Workstream</div>
              <div className="ba-hbars">
                {HBARS.map((h) => (
                  <div className="ba-hbar-row" key={h.label}>
                    <span className="ba-hbar-label">{h.label}</span>
                    <div className="ba-hbar-track"><div className="ba-hbar-fill" style={{ "--target": `${h.value}%`, background: h.color }}></div></div>
                    <span className="ba-hbar-val">{h.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        {/* CLIENT EXPERIENCE (kept low-key, as simple points) */}
        <Reveal className="ba-team">
          <div className="ba-team-copy" style={{ maxWidth: "none" }}>
            <div className="ba-eyebrow">Client experience</div>
            <h3>Trusted from first-time founders to global pharma enterprises</h3>
            <ul className="ba-client-points">
              {CLIENT_POINTS.map((p) => (
                <li key={p}>{CHECK_SM}{p}</li>
              ))}
            </ul>
          </div>
        </Reveal>

        {/* stat strip */}
        <div className="ba-stats">
          {BA_STATS.map((s) => (
            <div className="ba-stat" key={s.cap}>
              <div className="num">{s.num}</div>
              <div className="cap">{s.cap}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
