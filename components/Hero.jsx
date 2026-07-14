"use client";

import { useEffect, useRef } from "react";
import TechMarquee from "./TechMarquee";
import { scrollToSection } from "@/lib/useSiteActions";

// Faithful port of the original vanilla-JS "hero robot mascot sequence".
// Same class names as the original markup (enter, walking, wave, talk,
// settled, leaning, pushed, show, card-in) so the existing CSS keyframes
// in globals.css drive the animation exactly as before — only the
// imperative DOM scripting has been replaced with a React effect.
export default function Hero() {
  const wrapRef = useRef(null);
  const contentRef = useRef(null);
  const panelRef = useRef(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const content = contentRef.current;
    const panel = panelRef.current;
    if (!content) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isWide = window.matchMedia("(min-width: 1151px)").matches;
    const timers = [];

    content.classList.add("card-in");

    if (reduced || !wrap || !panel) {
      if (wrap) wrap.classList.add("enter", "settled", "talk", "leaning");
      if (isWide) content.classList.add("pushed");
      if (panel) panel.classList.add("show");
      return;
    }

    if (!isWide) return;

    timers.push(setTimeout(() => wrap.classList.add("enter", "walking"), 500));
    timers.push(setTimeout(() => wrap.classList.remove("walking"), 2200));
    timers.push(setTimeout(() => wrap.classList.add("wave", "talk"), 2450));
    timers.push(setTimeout(() => wrap.classList.remove("wave"), 4100));
    timers.push(
      setTimeout(() => {
        content.classList.add("pushed");
        wrap.classList.add("settled", "leaning");
      }, 4300)
    );
    timers.push(setTimeout(() => panel.classList.add("show"), 5100));
    timers.push(setTimeout(() => wrap.classList.remove("talk"), 7600));

    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <section className="hero" id="home">
      <div className="hero-glow" />

      <div className="hero-stage">
        <div className="hero-robot-wrap" id="heroRobotWrap" ref={wrapRef} aria-hidden="true">
          <div className="robot-bubble" id="robotBubble">Hi! I&apos;m Cody 👋</div>
          <svg className="hero-robot" viewBox="0 0 200 320" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <radialGradient id="robotEyeGlow" cx="35%" cy="30%" r="75%">
                <stop offset="0" stopColor="#ffe4dc" />
                <stop offset="45%" stopColor="var(--accent-light)" />
                <stop offset="100%" stopColor="var(--accent-dark)" />
              </radialGradient>
              <radialGradient id="rbHeadShell" cx="34%" cy="24%" r="80%">
                <stop offset="0" stopColor="#ffffff" />
                <stop offset="45%" stopColor="#f2f1ef" />
                <stop offset="100%" stopColor="#d3d3d8" />
              </radialGradient>
              <linearGradient id="rbBodyShell" x1="0.15" y1="0" x2="0.85" y2="1">
                <stop offset="0" stopColor="#fbfbfa" />
                <stop offset="55%" stopColor="#eeeef0" />
                <stop offset="100%" stopColor="#d6d6da" />
              </linearGradient>
              <linearGradient id="rbLimbShell" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stopColor="#fdfdfc" />
                <stop offset="100%" stopColor="#d9d9dd" />
              </linearGradient>
              <linearGradient id="rbVisor" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#241d1c" />
                <stop offset="100%" stopColor="#0a0808" />
              </linearGradient>
              <linearGradient id="rbFoot" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#2a2220" />
                <stop offset="100%" stopColor="#100c0b" />
              </linearGradient>
              <radialGradient id="rbJoint" cx="32%" cy="28%" r="75%">
                <stop offset="0" stopColor="#ffcabb" />
                <stop offset="50%" stopColor="var(--accent-light)" />
                <stop offset="100%" stopColor="var(--accent-dark)" />
              </radialGradient>
              <linearGradient id="rbChest" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="var(--accent-light)" />
                <stop offset="100%" stopColor="var(--accent)" />
              </linearGradient>
              <clipPath id="rbHeadClip"><circle cx="100" cy="82" r="54" /></clipPath>
            </defs>
            <g className="robot-bob">
              <ellipse cx="100" cy="312" rx="58" ry="8" fill="#000" opacity=".32" />

              <g className="robot-leg-l">
                <rect x="65" y="244" width="24" height="46" rx="11" fill="url(#rbLimbShell)" />
                <rect x="65" y="244" width="8" height="46" rx="4" fill="#fff" opacity=".5" />
                <rect x="62" y="284" width="30" height="16" rx="8" fill="url(#rbJoint)" />
                <rect x="62" y="288" width="30" height="4" fill="#fff" opacity=".35" />
                <path d="M55 296 h44 a11 11 0 0 1 11 11 v3 h-66 v-3 a11 11 0 0 1 11 -11 z" fill="url(#rbFoot)" />
                <rect x="52" y="309" width="50" height="4" rx="2" fill="var(--accent-dark)" opacity=".85" />
              </g>
              <g className="robot-leg-r">
                <rect x="111" y="244" width="24" height="46" rx="11" fill="url(#rbLimbShell)" />
                <rect x="111" y="244" width="8" height="46" rx="4" fill="#fff" opacity=".5" />
                <rect x="108" y="284" width="30" height="16" rx="8" fill="url(#rbJoint)" />
                <rect x="108" y="288" width="30" height="4" fill="#fff" opacity=".35" />
                <path d="M101 296 h44 a11 11 0 0 1 11 11 v3 h-66 v-3 a11 11 0 0 1 11 -11 z" fill="url(#rbFoot)" />
                <rect x="98" y="309" width="50" height="4" rx="2" fill="var(--accent-dark)" opacity=".85" />
              </g>

              <rect x="63" y="234" width="74" height="18" rx="9" fill="#100c0b" opacity=".85" />
              <path d="M58 154 a28 28 0 0 1 28 -22 h28 a28 28 0 0 1 28 22 v58 a26 26 0 0 1 -26 26 h-32 a26 26 0 0 1 -26 -26 z" fill="url(#rbBodyShell)" />
              <ellipse cx="82" cy="160" rx="26" ry="14" fill="#fff" opacity=".38" />
              <rect x="76" y="203" width="48" height="8" rx="4" fill="#000" opacity=".07" />
              <rect x="85" y="172" width="30" height="40" rx="9" fill="#161211" opacity=".9" />
              <rect x="90" y="177" width="20" height="12" rx="4" fill="url(#rbChest)" />
              <rect x="90" y="193" width="20" height="12" rx="4" fill="url(#rbChest)" opacity=".55" />
              <circle cx="100" cy="211" r="2.4" fill="var(--accent-light)" />

              <g className="robot-arm-l">
                <rect x="33" y="158" width="20" height="52" rx="10" fill="url(#rbJoint)" />
                <rect x="33" y="158" width="7" height="52" rx="3.5" fill="#fff" opacity=".4" />
                <rect x="29" y="204" width="18" height="44" rx="9" fill="url(#rbLimbShell)" />
                <circle cx="38" cy="253" r="12" fill="#18110f" opacity=".88" />
                <path d="M32 258 l4 6 M38 260 l0 7 M44 258 l-4 6" stroke="#3a2f2c" strokeWidth="2.2" strokeLinecap="round" />
              </g>
              <g className="robot-arm-r">
                <rect x="147" y="158" width="20" height="52" rx="10" fill="url(#rbJoint)" />
                <rect x="147" y="158" width="7" height="52" rx="3.5" fill="#fff" opacity=".4" />
                <rect x="153" y="204" width="18" height="44" rx="9" fill="url(#rbLimbShell)" />
                <circle cx="162" cy="253" r="12" fill="#18110f" opacity=".88" />
                <path d="M156 258 l4 6 M162 260 l0 7 M168 258 l-4 6" stroke="#3a2f2c" strokeWidth="2.2" strokeLinecap="round" />
              </g>
              <circle cx="49" cy="160" r="19" fill="url(#rbJoint)" />
              <circle cx="43" cy="153" r="5.5" fill="#fff" opacity=".55" />
              <circle cx="151" cy="160" r="19" fill="url(#rbJoint)" />
              <circle cx="145" cy="153" r="5.5" fill="#fff" opacity=".55" />

              <rect x="88" y="132" width="24" height="20" rx="7" fill="#c9c9ce" />
              <rect x="88" y="132" width="24" height="6" rx="3" fill="#000" opacity=".12" />

              <line x1="100" y1="26" x2="100" y2="10" stroke="#b7b7bc" strokeWidth="3" strokeLinecap="round" />
              <circle cx="100" cy="8" r="5.5" fill="var(--accent)" />
              <circle cx="98" cy="6" r="1.8" fill="#fff" opacity=".8" />

              <ellipse cx="39" cy="83" rx="11" ry="20" fill="url(#rbJoint)" />
              <ellipse cx="35" cy="74" rx="3.5" ry="7" fill="#fff" opacity=".45" />
              <ellipse cx="161" cy="83" rx="11" ry="20" fill="url(#rbJoint)" />
              <ellipse cx="157" cy="74" rx="3.5" ry="7" fill="#fff" opacity=".45" />

              <circle cx="100" cy="82" r="55" fill="#000" opacity=".08" />
              <circle cx="100" cy="82" r="54" fill="url(#rbHeadShell)" />
              <g clipPath="url(#rbHeadClip)">
                <ellipse cx="76" cy="46" rx="46" ry="26" fill="#fff" opacity=".55" />
                <path d="M46 96 q54 40 108 0 v56 h-108 z" fill="#000" opacity=".06" />
                <line x1="66" y1="30" x2="80" y2="24" stroke="#fff" strokeWidth="7" strokeLinecap="round" opacity=".4" />
                <line x1="118" y1="26" x2="132" y2="34" stroke="#fff" strokeWidth="5" strokeLinecap="round" opacity=".3" />
              </g>
              <circle cx="100" cy="82" r="54" fill="none" stroke="#fff" strokeWidth="1.4" opacity=".5" />

              <rect x="51" y="57" width="98" height="53" rx="27" fill="url(#rbVisor)" />
              <rect x="51" y="57" width="98" height="53" rx="27" fill="none" stroke="#3a3230" strokeWidth="1" />
              <path d="M58 66 q42 -14 84 0" stroke="#fff" strokeWidth="6" strokeLinecap="round" opacity=".08" fill="none" />

              <circle className="robot-eye-glow" cx="79" cy="84" r="16" fill="url(#robotEyeGlow)" />
              <circle cx="79" cy="84" r="16" fill="none" stroke="var(--accent-light)" strokeWidth="1.4" opacity=".8" />
              <circle className="robot-eye-glow" cx="121" cy="84" r="16" fill="url(#robotEyeGlow)" />
              <circle cx="121" cy="84" r="16" fill="none" stroke="var(--accent-light)" strokeWidth="1.4" opacity=".8" />
              <circle cx="73" cy="78" r="4.6" fill="#fff" opacity=".95" />
              <circle cx="115" cy="78" r="4.6" fill="#fff" opacity=".95" />
              <circle cx="85" cy="90" r="2" fill="#fff" opacity=".5" />
              <circle cx="127" cy="90" r="2" fill="#fff" opacity=".5" />

              <rect x="86" y="120" width="28" height="4.5" rx="2.25" fill="#3a3230" />
            </g>
          </svg>
        </div>

        <div className="hero-content" id="heroContent" ref={contentRef}>
          <div className="eyebrow"><div className="eyebrow-dot" /><span>MSME REGISTERED — INDIA</span></div>
          <h1>Building <em>legendary</em><br />code for the<br />modern web</h1>
          <p className="lead">
            Remote IT services company delivering full stack web apps, AI-powered solutions, and custom software — fast, clean, and production-ready.
          </p>
          <div className="btn-row">
            <button className="btn btn-primary" onClick={() => scrollToSection("contact")}>Start a project</button>
            <button className="btn-link" onClick={() => scrollToSection("work")}>
              See our work
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
            </button>
          </div>
          <div className="badge-row" style={{ padding: "28px 0 0" }}>
            <div className="info-chip"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>Response within 24h</div>
            <div className="info-chip"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4.5 8-11V5l-8-3-8 3v6c0 6.5 8 11 8 11z" /></svg>NDA-friendly</div>
            <div className="info-chip"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 3H8v4h8V3z" /></svg>Fixed-price or hourly</div>
          </div>
        </div>

        <div className="hero-reveal-panel" id="heroRevealPanel" ref={panelRef}>
          <div className="reveal-chip"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg><span>Full stack web apps</span></div>
          <div className="reveal-chip"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="16" height="16" rx="2" /><rect x="9" y="9" width="6" height="6" /></svg><span>AI-powered products</span></div>
          <div className="reveal-chip"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" /></svg><span>Launch-ready in days</span></div>
          <div className="reveal-chip"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4.5 8-11V5l-8-3-8 3v6c0 6.5 8 11 8 11z" /></svg><span>NDA-friendly &amp; remote-first</span></div>
        </div>
      </div>

      <TechMarquee />
    </section>
  );
}
