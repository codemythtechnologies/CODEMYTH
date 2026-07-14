"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

// Drop-in replacement for the old `.reveal` / IntersectionObserver pattern.
// Wrap any element: <Reveal><div className="team-card">...</div></Reveal>
//
// IMPORTANT: a large part of globals.css (donut arcs, bar-fills, trend lines,
// the BA dashboard mock bars) is written against a plain `.in-view` class on
// the revealed element — that's how the original hand-rolled IntersectionObserver
// used to drive the SVG/CSS draw-in animations (stroke-dasharray, width, scaleY…).
// Framer Motion's `whileInView` only ever animates opacity/transform via inline
// styles, so those CSS rules were never firing. We keep 100% of the original
// Framer Motion behaviour (nothing removed) and additionally mirror the
// "entered viewport" moment onto a real `in-view` class, so every pre-existing
// chart animation in globals.css lights back up automatically — no CSS rewrite
// needed, no markup removed.
//
// Any extra props (role, tabIndex, aria-*, onClick, id, style, onKeyDown…)
// are forwarded straight through to the underlying motion element, so Reveal
// stays a fully transparent wrapper — nothing consuming it has to change.
export default function Reveal({
  children,
  delay = 0,
  y = 40,
  duration = 0.7,
  amount = 0.2,
  className = "",
  as = "div",
  style,
  ...rest
}) {
  const reduce = useReducedMotion();
  const Comp = motion[as] || motion.div;
  const [inView, setInView] = useState(false);

  const composedClassName = `${className}${inView ? " in-view" : ""}`.trim();

  return (
    <Comp
      className={composedClassName}
      style={style}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount, margin: "-80px" }}
      onViewportEnter={() => setInView(true)}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      {...rest}
    >
      {children}
    </Comp>
  );
}
