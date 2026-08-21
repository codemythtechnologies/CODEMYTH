"use client";

import { useEffect, useRef } from "react";

const STACK = [
  "React", "Node.js", "MongoDB", "Python", "DeepSeek-R1", "Llama 3.1",
  "REST APIs", "Vercel", "Express", "PostgreSQL", "Tailwind", "Next.js",
];

export default function TechMarquee() {
  const trackRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    const viewport = track?.closest(".marquee");
    if (!track || !viewport) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const SPEED = 40; // px/sec, constant regardless of content length or screen width
    let setWidth = 0;
    let offset = 0;
    let paused = false;
    let lastTime = null;
    let rafId;

    function measure() {
      setWidth = track.scrollWidth / 2; // one "set" is half of the doubled track
    }

    function frame(time) {
      if (lastTime === null) lastTime = time;
      const dt = (time - lastTime) / 1000;
      lastTime = time;
      if (!paused && setWidth > 0) {
        offset -= SPEED * dt;
        if (offset <= -setWidth) offset += setWidth; // seamless wrap, never snaps
        track.style.transform = `translateX(${offset}px)`;
      }
      rafId = requestAnimationFrame(frame);
    }

    measure();
    if (!reduced) rafId = requestAnimationFrame(frame);

    const onEnter = () => (paused = true);
    const onLeave = () => (paused = false);
    viewport.addEventListener("mouseenter", onEnter);
    viewport.addEventListener("mouseleave", onLeave);
    viewport.addEventListener("focusin", onEnter);
    viewport.addEventListener("focusout", onLeave);

    let resizeTimer;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(measure, 150);
    };
    window.addEventListener("resize", onResize);

    const onVisibility = () => {
      if (!document.hidden) lastTime = null;
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(rafId);
      viewport.removeEventListener("mouseenter", onEnter);
      viewport.removeEventListener("mouseleave", onLeave);
      viewport.removeEventListener("focusin", onEnter);
      viewport.removeEventListener("focusout", onLeave);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <div className="hero-marquee-strip">
      <div className="stack-title">OUR TECH STACK</div>
      <div className="marquee">
        <div className="marquee-track" ref={trackRef}>
          {STACK.map((s) => (
            <span className="pill" key={`a-${s}`}>{s}</span>
          ))}
          {STACK.map((s) => (
            <span className="pill" key={`b-${s}`}>{s}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
