"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Reveal from "./Reveal";
import { team } from "@/data/team";

const AUTO_ADVANCE_MS = 6500; // within the requested 5–10s window

function PersonIcon({ variant }) {
  return variant === "person2" ? (
    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 3c-2.8 0-4.6 2-4.9 4.4C6.4 8 6 8.8 6 9.6c0 .7.3 1.3.8 1.7.4 1.9 2 3.3 3.9 3.7v1.2c-3.8.5-6.7 2.9-6.7 6.3v.5h16v-.5c0-3.4-2.9-5.8-6.7-6.3v-1.2c1.9-.4 3.5-1.8 3.9-3.7.5-.4.8-1 .8-1.7 0-.8-.4-1.6-1.1-2.2C16.6 5 14.8 3 12 3z" /></svg>
  ) : (
    <svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="8" r="4" /><path d="M4 20c0-4.4 3.6-7 8-7s8 2.6 8 7v1H4v-1z" /></svg>
  );
}

// Shortest signed distance from `active` to `i` around a circle of size
// `len` — this is what makes the deck fan out symmetrically left/right of
// the active card instead of always sliding one direction.
function circularOffset(i, active, len) {
  let diff = i - active;
  if (diff > len / 2) diff -= len;
  if (diff < -len / 2) diff += len;
  return diff;
}

// Index of the founder within `team`, so the carousel always opens on them
// regardless of where they sit in the data array. Falls back to the first
// card if no founder tag is found.
function founderIndex(list) {
  const i = list.findIndex((m) => m.tag && m.tag.toLowerCase() === "founder");
  return i === -1 ? 0 : i;
}

export default function TeamSection() {
  const len = team.length;
  const startIndex = founderIndex(team);

  const [active, setActive] = useState(startIndex);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(false);
  const timerRef = useRef(null);
  const sectionRef = useRef(null);

  const goTo = useCallback((i) => setActive(((i % len) + len) % len), [len]);
  const next = useCallback(() => goTo(active + 1), [active, goTo]);
  const prev = useCallback(() => goTo(active - 1), [active, goTo]);

  // Watch when the "Our Team" section actually enters the viewport. Every
  // time it does, jump back to the founder's card first — so no matter how
  // long it took the user to scroll here, or whether they scroll away and
  // back again, the founder is always the first thing they see.
  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(startIndex);
          setInView(true);
        } else {
          setInView(false);
        }
      },
      { threshold: 0.35 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [startIndex]);

  // Auto-advance every 5–10s; pausing (cursor over the card / a nav control)
  // stops it entirely rather than just delaying the next tick, and it
  // restarts cleanly whenever `active` changes or paused toggles off. It
  // also only runs while the section is in view, so it can't quietly
  // advance past the founder before the user ever sees the section.
  useEffect(() => {
    if (paused || !inView) return undefined;
    timerRef.current = setInterval(() => {
      setActive((a) => (a + 1) % len);
    }, AUTO_ADVANCE_MS);
    return () => clearInterval(timerRef.current);
  }, [paused, inView, len]);

  return (
    <section className="section" id="team" ref={sectionRef}>
      <div className="section-pad">
        <div className="section-head">
          <div className="section-tag"><div className="dot" /><span>LEADERSHIP &amp; ENGINEERING</span></div>
          <h2>The team behind Code Myth</h2>
          <p>A small, senior team — each owns a domain end to end, so your project always has a specialist on it, not a generalist spread thin.</p>
        </div>

        <Reveal
          as="div"
          className="team-carousel"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="team-carousel-stage">
            {team.map((m, i) => {
              const offset = circularOffset(i, active, len);
              const isActive = offset === 0;
              const abs = Math.abs(offset);
              const hidden = abs > 2;
              const translateX = offset * 260;
              const scale = Math.max(1 - abs * 0.14, 0.68);
              const blur = abs === 0 ? 0 : Math.min(abs * 2, 4);
              return (
                <div
                  key={m.name}
                  className={`team-slide${isActive ? " is-active" : ""}${m.tag ? " is-founder" : ""}`}
                  style={{
                    transform: `translate(-50%, -50%) translateX(${translateX}px) scale(${scale})`,
                    filter: blur ? `blur(${blur}px)` : "none",
                    zIndex: 10 - abs,
                    opacity: hidden ? 0 : 1 - abs * 0.28,
                    pointerEvents: isActive ? "auto" : "none",
                  }}
                  aria-hidden={!isActive}
                >
                  <div className="team-slide-top">
                    <div className="team-slide-avatar"><PersonIcon variant={m.icon} /></div>
                    <div className="team-slide-ring" aria-hidden="true"><span /></div>
                  </div>

                  <p className="team-slide-bio">{m.bio}</p>

                  <div className="team-slide-foot">
                    {m.tag && <div className="team-slide-tag">{m.tag}</div>}
                    <h3 className="team-slide-name">{m.name}</h3>
                    <div className="team-slide-domain">{m.domain}</div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="team-carousel-controls">
            <button
              type="button"
              className="team-nav-btn"
              aria-label="Previous team member"
              onClick={() => {
                prev();
                setPaused(false);
              }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
            </button>
            <button
              type="button"
              className="team-nav-btn"
              aria-label="Next team member"
              onClick={() => {
                next();
                setPaused(false);
              }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}