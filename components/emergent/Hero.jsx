"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import ParticleField from "./ParticleField";
import CodeWorkspaceBG from "./CodeWorkspaceBG";
import { MaskLine } from "./ui";
import { scrollToSection } from "@/lib/useSiteActions";

const ease = [0.22, 1, 0.36, 1];

const fadeUp = (delay) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, ease, delay },
});

export default function Hero() {
  return (
    // FIX/NEW: the hero now has a real, bordered "device frame" around the
    // whole block (m-3/m-4 inset + rounded corners + border), matching the
    // bordered video look in the reference screenshot, and the old side
    // code panel has been replaced by CodeWorkspaceBG — a full-bleed,
    // continuously animated code-editor/terminal/AI-copilot mockup that
    // fills the entire hero as a "video-style" background instead of a
    // small corner widget.
    <section id="home" className="relative min-h-[92vh] overflow-hidden bg-ink-900 text-white grain m-3 rounded-[28px] border border-white/15 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6)] sm:m-4 sm:rounded-[32px]" data-testid="hero">
      {/* The animated workspace — sits at the very back. */}
      <div className="absolute inset-0">
        <CodeWorkspaceBG />
      </div>
      <div className="absolute inset-0 z-[1] opacity-40">
        <ParticleField density={40} />
      </div>

      {/* Legibility scrim: a permanent (not scroll-dependent) gradient +
          blur wash so the nav pill and headline always sit on enough
          contrast, regardless of how busy the workspace mockup gets
          underneath — this is the fix for the logo/nav becoming hard to
          read against background content. Strongest directly behind the
          nav and the headline column, fading out toward the right/bottom
          so the workspace itself stays visible as a "video". */}
      <div className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-b from-ink-900/92 via-ink-900/55 to-ink-900/30" />
      <div className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-r from-ink-900/80 via-ink-900/20 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 top-0 z-[2] h-40 bg-gradient-to-b from-ink-900 to-transparent backdrop-blur-[2px] sm:h-48" />
      <div className="pointer-events-none absolute -left-40 top-1/3 z-[2] h-[520px] w-[520px] rounded-full bg-cm-accent/10 blur-[120px]" />

      <div className="relative z-10 mx-auto flex min-h-[92vh] max-w-site flex-col justify-center px-6 pt-32 pb-20 md:px-12 lg:px-16">
        <div className="max-w-3xl">
          <motion.div {...fadeUp(0.2)} className="mb-8 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.24em] text-white/50">
            <span className="h-px w-8 bg-cm-accent" /> CodeMyth Technologies
          </motion.div>

          {/* FIX: this was `text-[13vw]` on mobile — a viewport-relative
              size that looks fine on a narrow 375px phone (~49px) but
              balloons past 80px+ on the wider phones/phablets just below
              the `sm` breakpoint, well past the 92px it tops out at on
              desktop. clamp() keeps it in a sane 34–52px band on every
              phone width instead of scaling unbounded with viewport
              width. */}
          <h1 className="font-display text-[clamp(34px,9vw,52px)] font-extrabold leading-[0.92] tracking-tighter sm:text-6xl md:text-7xl lg:text-[92px]">
            <MaskLine delay={0.3}>Build software</MaskLine>
            <MaskLine delay={0.42}>that moves your</MaskLine>
            <MaskLine delay={0.54} className="text-cm-accent">business forward.</MaskLine>
          </h1>

          <motion.p {...fadeUp(0.9)} className="mt-8 max-w-xl text-lg leading-relaxed text-white/70">
            Full-stack engineering, AI systems and digital products — built for real-world production. A senior, remote-first studio shipping code that&apos;s actually used.
          </motion.p>

          <motion.div {...fadeUp(1.05)} className="mt-10 flex flex-wrap items-center gap-4">
            <button onClick={() => scrollToSection("contact")} data-testid="hero-cta-primary" className="group inline-flex h-14 items-center gap-3 rounded-full bg-cm-accent px-7 text-[15px] font-bold text-white transition-colors hover:bg-cm-accentHover">
              Start a Project <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1.5" />
            </button>
            <button onClick={() => scrollToSection("work")} data-testid="hero-cta-secondary" className="group inline-flex h-14 items-center gap-3 rounded-full border border-white/20 px-7 text-[15px] font-bold text-white backdrop-blur-sm transition-colors hover:bg-white hover:text-ink-900">
              Explore Our Work <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1.5" />
            </button>
          </motion.div>

          <motion.div {...fadeUp(1.2)} className="mt-12 flex flex-wrap gap-x-8 gap-y-2 text-sm text-white/50">
            <span>Response within 24h</span>
            <span className="hidden sm:inline">·</span>
            <span>NDA-friendly</span>
            <span className="hidden sm:inline">·</span>
            <span>Fixed-price or hourly</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
