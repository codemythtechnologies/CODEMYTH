"use client";

import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";

const ease = [0.22, 1, 0.36, 1];

// Scroll reveal wrapper
//
// NOTE ON WHY THIS ANIMATES ON MOUNT INSTEAD OF ON SCROLL:
// this was originally scroll-triggered (`whileInView`). After the blank-gap
// bug kept reappearing, I isolated it down to framer-motion's viewport/
// IntersectionObserver integration being unreliable in this project's
// specific component tree — confirmed by watching elements sit fully
// inside the viewport for 2+ seconds and never receive the "in view"
// callback. Rather than keep patching viewport margins/thresholds and
// risk a third round of blank sections, this (and MaskLineInView below)
// now animate in immediately on mount, the same reliable pattern the Hero
// headline already used (and which has never shown this bug). The visual
// trade-off is that offscreen content is already settled by the time you
// scroll to it instead of fading in as it arrives — a small aesthetic
// change in exchange for the animation never silently failing again.
export const Reveal = ({ children, delay = 0, y = 24, className = "" }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, ease, delay }}
  >
    {children}
  </motion.div>
);

// Masked line-by-line reveal for headings (runs immediately on mount)
export const MaskLine = ({ children, delay = 0, className = "" }) => (
  <span className="block overflow-hidden">
    <motion.span
      className={`block ${className}`}
      initial={{ y: "110%" }}
      animate={{ y: "0%" }}
      transition={{ duration: 1.1, ease, delay }}
    >
      {children}
    </motion.span>
  </span>
);

// Masked line-by-line reveal for section headings.
//
// ROOT CAUSE OF THE SITE-WIDE "BLANK HEADING" GAPS (see Reveal's comment
// above for the full story): this was scroll-triggered (`whileInView`) and
// framer-motion's viewport tracking never fired reliably for it inside this
// page's tree — the heading stayed clipped/invisible under `overflow-hidden`
// indefinitely, which is exactly the blank space reported under "How We
// Work", "Insights", "Industries", "Capabilities", "Product Development",
// etc. Switched to animate-on-mount (identical, proven-reliable pattern to
// `MaskLine`, which the Hero headline already used without issue) so the
// heading is guaranteed to render instead of depending on an intersection
// callback that doesn't consistently fire here.
export const MaskLineInView = ({ children, delay = 0, className = "" }) => (
  <span className="block overflow-hidden">
    <motion.span
      className={`block ${className}`}
      initial={{ y: "110%" }}
      animate={{ y: "0%" }}
      transition={{ duration: 0.9, ease, delay }}
    >
      {children}
    </motion.span>
  </span>
);

export const Eyebrow = ({ children, dark = false, className = "" }) => (
  <span
    className={`inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.24em] ${
      dark ? "text-white/50" : "text-cm-muted"
    } ${className}`}
  >
    <span className="h-px w-8 bg-cm-accent" />
    {children}
  </span>
);

export const PrimaryButton = ({ children, onClick, href, testid, className = "" }) => {
  const Comp = href ? "a" : "button";
  return (
    <Comp
      href={href}
      onClick={onClick}
      data-testid={testid}
      className={`group inline-flex h-14 items-center gap-3 rounded-full bg-cm-accent px-7 text-[15px] font-bold text-white transition-colors duration-300 hover:bg-cm-accentHover ${className}`}
    >
      {children}
      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
    </Comp>
  );
};

export const GhostButton = ({ children, onClick, href, dark = false, testid, className = "" }) => {
  const Comp = href ? "a" : "button";
  return (
    <Comp
      href={href}
      onClick={onClick}
      data-testid={testid}
      className={`group inline-flex h-14 items-center gap-3 rounded-full border px-7 text-[15px] font-bold transition-colors duration-300 ${
        dark
          ? "border-white/20 text-white hover:bg-white hover:text-ink-900"
          : "border-cm-text/20 text-cm-text hover:bg-cm-text hover:text-white"
      } ${className}`}
    >
      {children}
      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
    </Comp>
  );
};

export const SectionHeader = ({ eyebrow, title, dark = false, align = "left", className = "" }) => (
  <div className={`${align === "center" ? "text-center" : ""} ${className}`}>
    <Reveal>
      <Eyebrow dark={dark} className={align === "center" ? "justify-center" : ""}>{eyebrow}</Eyebrow>
    </Reveal>
    <h2
      className={`mt-6 font-display text-4xl font-extrabold leading-[0.95] tracking-tight md:text-6xl lg:text-7xl ${
        dark ? "text-white" : "text-cm-text"
      }`}
    >
      {title.split("\n").map((line, i) => (
        <MaskLineInView key={i} delay={i * 0.08}>{line}</MaskLineInView>
      ))}
    </h2>
  </div>
);

export const TechPill = ({ children, dark = false }) => (
  <span
    className={`inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-bold uppercase tracking-wider ${
      dark ? "border-white/15 text-white/60" : "border-cm-border text-cm-muted"
    }`}
  >
    {children}
  </span>
);

export const RowArrow = ({ className = "" }) => (
  <ArrowUpRight className={`h-6 w-6 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 ${className}`} />
);
