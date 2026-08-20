"use client";

import { useState } from "react";
import Link from "next/link";
import Marquee from "react-fast-marquee";
import { motion } from "framer-motion";
import { ArrowUpRight, Code2, BrainCog, Globe2, Server, Sparkles, Bot, SearchCode, Plug, TestTube2, ShieldCheck } from "lucide-react";
import { TRUST, CAPABILITIES, AI_FLOW, AI_CAPS } from "@/data/emergentContent";
import { slugify } from "@/data/detailContent";
import { Reveal, SectionHeader, Eyebrow, TechPill } from "./ui";
import { scrollToSection } from "@/lib/useSiteActions";

const ease = [0.22, 1, 0.36, 1];
const goContact = () => scrollToSection("contact");

const CAP_ICONS = [Code2, BrainCog, Globe2, Server];
const AI_CAP_ICONS = [Sparkles, Bot, SearchCode, Plug, TestTube2, ShieldCheck];

/* 03 — TRUST BAND */
export const TrustBand = () => (
  <section className="border-y border-cm-border bg-paper py-8" data-testid="trust-band">
    <Marquee gradient gradientColor="#F5F5F2" gradientWidth={80} speed={40} pauseOnHover>
      {TRUST.concat(TRUST).map((t, i) => (
        <span key={i} className="mx-10 inline-flex items-center gap-10 font-display text-xl font-bold tracking-tight text-cm-text md:text-2xl">
          {t} <span className="h-1.5 w-1.5 rounded-full bg-cm-accent" />
        </span>
      ))}
    </Marquee>
  </section>
);

/* 04 — WHAT WE DO */
export const WhatWeDo = () => (
  <section className="relative bg-paper px-6 py-28 md:px-12 md:py-40 lg:px-16" data-testid="what-we-do">
    <div className="mx-auto max-w-site">
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
        <div>
          <Reveal><Eyebrow>What We Do</Eyebrow></Reveal>
          <h2 className="mt-6 font-display text-5xl font-extrabold leading-[0.95] tracking-tighter text-cm-text md:text-7xl">
            We build<br />what comes<br /><span className="text-cm-accent">next.</span>
          </h2>
        </div>
        <div className="relative border-l border-cm-border pl-8 md:pl-12">
          <motion.span
            className="absolute left-0 top-0 w-px bg-cm-accent"
            initial={{ height: 0 }} animate={{ height: "100%" }}
            transition={{ duration: 1.2, ease, delay: 0.3 }}
          />
          <Reveal>
            <p className="text-xl leading-relaxed text-cm-text md:text-2xl">
              CodeMyth is a remote-first IT studio delivering full-stack web apps, AI-powered products and custom software — fast, clean and production-ready.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-cm-muted">
              Every engagement ends with something deployed and live — not a prototype gathering dust in a repo. A small, senior team, each owning a domain end to end, so your project always has a specialist on it. MSME registered in India, NDA-friendly, and remote worldwide.
            </p>
          </Reveal>
        </div>
      </div>
    </div>
  </section>
);

/* 05 — ENGINEERING CAPABILITIES (interactive rows) */
export const Capabilities = () => {
  const [active, setActive] = useState(0);
  return (
    <section id="capabilities" className="bg-paper px-6 pb-28 md:px-12 md:pb-40 lg:px-16" data-testid="capabilities">
      <div className="mx-auto max-w-site">
        <SectionHeader eyebrow="Capabilities" title={"Engineering\ncapabilities"} className="mb-16" />
        <div className="border-t border-cm-border">
          {CAPABILITIES.map((c, i) => {
            const Icon = CAP_ICONS[i % CAP_ICONS.length];
            return (
              <motion.div
                key={c.no}
                onMouseEnter={() => setActive(i)}
                onClick={() => setActive(i)}
                data-testid={`capability-${i}`}
                className="group block w-full cursor-pointer border-b border-cm-border text-left"
                animate={{ backgroundColor: active === i ? "rgba(23,25,28,0.02)" : "rgba(0,0,0,0)" }}
              >
                <div className="grid grid-cols-1 items-center gap-4 px-2 py-8 md:grid-cols-[80px_1fr_auto] md:gap-8 md:py-10">
                  <span className="font-display text-sm font-bold text-cm-accent">{c.no}</span>
                  <div>
                    <h3 className="font-display text-3xl font-bold tracking-tight text-cm-text transition-colors group-hover:text-cm-accent md:text-5xl">
                      {c.title}
                    </h3>
                    <motion.div
                      initial={false}
                      animate={{ height: active === i ? "auto" : 0, opacity: active === i ? 1 : 0 }}
                      transition={{ duration: 0.4, ease }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-2xl pt-4 text-cm-muted md:text-lg">{c.desc}</p>
                      <div className="flex flex-wrap gap-2 pt-4">
                        {c.tech.map((t) => <TechPill key={t}>{t}</TechPill>)}
                      </div>
                      <Link href={`/detail/${slugify(c.title)}`} className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-cm-accent hover:underline">
                        Read the full write-up <ArrowUpRight className="h-3.5 w-3.5" />
                      </Link>
                    </motion.div>
                  </div>
                  <Link href={`/detail/${slugify(c.title)}`} aria-label={`Full details on ${c.title}`} className="hidden md:block">
                    <ArrowUpRight className="h-8 w-8 text-cm-text transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-cm-accent" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

/* 06 — AI ENGINEERING (dark flow diagram) */
export const AIEngineering = () => (
  <section className="relative overflow-hidden bg-ink-900 px-6 py-28 text-white md:px-12 md:py-40 lg:px-16 grain" id="ai-era" data-testid="ai-engineering">
    <div className="absolute inset-0 tech-grid opacity-40" />
    <div className="pointer-events-none absolute right-0 top-1/4 h-[400px] w-[400px] rounded-full bg-cm-accent/10 blur-[130px]" />
    <div className="relative mx-auto max-w-site">
      <div className="grid gap-12 lg:grid-cols-2 lg:items-end">
        <div>
          <Reveal><Eyebrow dark>The AI Era</Eyebrow></Reveal>
          <h2 className="mt-6 font-display text-5xl font-extrabold leading-[0.95] tracking-tighter md:text-7xl">
            Engineering<br /><span className="text-cm-accent">with intelligence.</span>
          </h2>
        </div>
        <Reveal delay={0.1}>
          <p className="max-w-xl text-lg leading-relaxed text-white/60">
            AI has moved from novelty to infrastructure. We treat it as part of the engineering process itself — scaffolding builds, generating edge-case tests, and automating QA. A human reviews and merges every line. AI sets the pace, engineers set the standard.
          </p>
        </Reveal>
      </div>

      <div className="mt-20 rounded-2xl border border-white/10 bg-white/[0.02] p-8 md:p-12">
        <p className="mb-10 text-xs font-bold uppercase tracking-[0.24em] text-white/40">AI-assisted delivery pipeline</p>
        <div className="flex flex-wrap items-center gap-y-8">
          {AI_FLOW.map((step, i) => (
            <span key={step} className="contents">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08, ease }}
                className="group flex flex-col items-center gap-3"
              >
                <span className="flex h-14 min-w-[56px] items-center justify-center rounded-xl border border-white/15 bg-ink-800 px-3 font-display text-[11px] font-bold tracking-wide text-white/70 transition-colors group-hover:border-cm-accent group-hover:text-white md:h-16 md:min-w-[64px] md:px-4 md:text-xs whitespace-nowrap">
                  {step}
                </span>
              </motion.div>
              {i < AI_FLOW.length - 1 && (
                <motion.div
                  className="mx-2 h-px flex-1 min-w-[16px] origin-left bg-gradient-to-r from-cm-accent/60 to-white/10 md:mx-3"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.4, delay: 0.4 + i * 0.08, ease }}
                />
              )}
            </span>
          ))}
        </div>
        <div className="mt-12 grid gap-8 border-t border-white/10 pt-10 md:grid-cols-3">
          {[
            ["~1.8 wks", "Typical 4-week feature build, AI-assisted"],
            ["92%", "Defects caught pre-launch, not by users"],
            ["100%", "AI-touched lines reviewed by an engineer"],
          ].map(([v, l]) => (
            <div key={l}>
              <p className="font-display text-4xl font-extrabold tracking-tight text-cm-accent md:text-5xl">{v}</p>
              <p className="mt-2 text-sm text-white/50">{l}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

/* 07 — AI CAPABILITIES (bento dark) */
export const AICapabilities = () => (
  <section className="relative bg-ink-800 px-6 pb-28 pt-4 text-white md:px-12 md:pb-40 lg:px-16" data-testid="ai-capabilities">
    <div className="mx-auto max-w-site">
      <SectionHeader eyebrow="AI Capabilities" title={"What we build\nwith AI"} dark className="mb-16" />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {AI_CAPS.map((c, i) => {
          const Icon = AI_CAP_ICONS[i % AI_CAP_ICONS.length];
          return (
            <Reveal key={c.no} delay={i * 0.05}>
              <Link
                href={`/detail/${slugify(c.title)}`}
                data-testid={`ai-cap-${i}`}
                className="group relative flex h-full min-h-[220px] w-full flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-ink-900 p-8 text-left transition-colors hover:border-cm-accent/50"
              >
                <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-cm-accent/0 blur-2xl transition-all duration-500 group-hover:bg-cm-accent/15" />
                <div className="flex items-center justify-between">
                  <span className="font-display text-sm font-bold text-cm-accent">{c.no}</span>
                  <Icon className="h-5 w-5 text-white/25 transition-colors group-hover:text-cm-accent" />
                </div>
                <div>
                  <h3 className="font-display text-2xl font-bold tracking-tight text-white md:text-3xl">{c.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/70">{c.desc}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-cm-accent opacity-0 transition-opacity group-hover:opacity-100">
                    Full details <ArrowUpRight className="h-3.5 w-3.5" />
                  </span>
                </div>
                <ArrowUpRight className="absolute right-6 top-6 h-5 w-5 text-white/0 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-cm-accent" />
              </Link>
            </Reveal>
          );
        })}
      </div>
    </div>
  </section>
);
