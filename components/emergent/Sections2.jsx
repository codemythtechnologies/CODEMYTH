"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Rocket, Layers, Landmark, GraduationCap, HeartPulse, Building2 } from "lucide-react";
import { PRODUCT_STEPS, INDUSTRIES, WORK, SHOWCASE, METRICS } from "@/data/emergentContent";
import { slugify } from "@/data/detailContent";
import { Reveal, SectionHeader, TechPill } from "./ui";
import { scrollToSection, useScrollSafeActive } from "@/lib/useSiteActions";

const ease = [0.22, 1, 0.36, 1];
const goContact = () => scrollToSection("contact");

// Each industry gets its own icon + accent gradient so the preview panel
// (and the row itself) are visually distinct instead of six identical dark
// cards that only differ by number.
const INDUSTRY_VISUALS = {
  rocket: { Icon: Rocket, accent: "#fb923c", gradient: "from-orange-500/25 via-ink-800 to-ink-800" },
  layers: { Icon: Layers, accent: "#38bdf8", gradient: "from-sky-500/20 via-ink-800 to-ink-800" },
  landmark: { Icon: Landmark, accent: "#34d399", gradient: "from-emerald-500/20 via-ink-800 to-ink-800" },
  graduation: { Icon: GraduationCap, accent: "#a78bfa", gradient: "from-violet-500/20 via-ink-800 to-ink-800" },
  pulse: { Icon: HeartPulse, accent: "#fb7185", gradient: "from-rose-500/20 via-ink-800 to-ink-800" },
  building: { Icon: Building2, accent: "#fbbf24", gradient: "from-amber-500/20 via-ink-800 to-ink-800" },
};

// Attractive, brand-safe background art behind each industry panel — an
// original abstract composition (not stock photography, so nothing
// copyrighted) built from the industry's own icon repeated as a loose
// constellation plus a soft radial glow in its accent colour, unique per
// industry rather than a flat single-colour gradient.
const IndustryArt = ({ visualKey, img }) => {
  const v = INDUSTRY_VISUALS[visualKey] || {};
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Professional photography behind the copy. FIX: this used to be
          washed almost fully grey (opacity 0.28, mix-blend-luminosity
          stripping all colour) under a heavy dark gradient, so the photo
          was barely visible. It's now shown at full colour and much
          higher opacity, with only a light gradient at the bottom purely
          to keep the title/copy readable — plain, no icon clutter. */}
      {img && (
        <>
          <div
            className="absolute inset-0 bg-cover bg-center opacity-[0.85] transition-opacity duration-700 group-hover:opacity-100"
            style={{ backgroundImage: `url(${img})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/35 to-transparent" />
        </>
      )}
      <div className="absolute inset-0 opacity-40" style={{ background: `radial-gradient(120% 90% at 85% 10%, ${v.accent}22, transparent 60%)` }} />
    </div>
  );
};

/* 08 — PRODUCT DEVELOPMENT (timeline) */
export const ProductDevelopment = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 40%"] });
  const width = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  return (
    <section ref={ref} className="relative bg-paper px-6 py-28 md:px-12 md:py-40 lg:px-16" data-testid="product-development">
      <div className="mx-auto max-w-site">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-end">
          <SectionHeader eyebrow="Product Development" title={"From idea\nto production."} />
          <Reveal delay={0.1}>
            <p className="max-w-xl text-lg leading-relaxed text-cm-muted">
              A dedicated Business Analyst sits with you before a single line of code is written — validating the idea, sizing the market, and turning a raw concept into a build-ready PRD your dev team can execute from day one.
            </p>
          </Reveal>
        </div>

        <div className="relative mt-24">
          <div className="absolute left-0 right-0 top-4 h-px bg-cm-border" />
          <motion.div style={{ width }} className="absolute left-0 top-4 h-px bg-cm-accent" />
          <div className="grid grid-cols-2 gap-y-12 md:grid-cols-3 lg:grid-cols-6">
            {PRODUCT_STEPS.map((s, i) => (
              <motion.div
                key={s}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1, ease }}
                className="relative"
              >
                <span className="relative z-10 block h-2 w-2 rounded-full bg-cm-accent ring-4 ring-paper" />
                <p className="mt-6 font-display text-xs font-bold text-cm-accent">0{i + 1}</p>
                <h3 className="mt-1 font-display text-xl font-bold tracking-tight text-cm-text md:text-2xl">{s}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

/* 09 — INDUSTRIES (interactive rows) */
export const Industries = () => {
  const [active, onHover, setActive] = useScrollSafeActive(0);
  return (
    <section id="industries" className="bg-ink-900 px-6 py-28 text-white md:px-12 md:py-40 lg:px-16 grain relative" data-testid="industries">
      <div className="relative mx-auto max-w-site">
        <SectionHeader eyebrow="Industries" title={"Technology built\naround your business."} dark className="mb-16" />
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="border-t border-white/10">
            {INDUSTRIES.map((ind, i) => {
              return (
                <div key={ind.no} onMouseEnter={() => onHover(i)} className="group border-b border-white/10">
                  {/* FIX: dropped the little icon badge here per feedback —
                      the row now reads as plain number + title, no icon
                      clutter. The industry's icon/accent still drives the
                      colour-matched preview panel on the right. */}
                  <div className="flex w-full items-center gap-6 py-7">
                    <span className="font-display text-sm font-bold text-cm-accent">{ind.no}</span>
                    <div onClick={() => setActive(i)} className="flex-1 cursor-pointer text-left" data-testid={`industry-${i}`}>
                      <h3 className={`font-display text-2xl font-bold tracking-tight transition-colors md:text-4xl ${active === i ? "text-cm-accent" : "text-white group-hover:text-cm-accent"}`}>
                        {ind.title}
                      </h3>
                      <motion.div
                        initial={false}
                        animate={{ height: active === i ? "auto" : 0, opacity: active === i ? 1 : 0 }}
                        transition={{ duration: 0.35, ease }}
                        className="overflow-hidden"
                      >
                        <p className="block max-w-lg pt-3 text-sm text-white/70 md:text-base">{ind.desc}</p>
                        <Link href={`/detail/${slugify(ind.title)}`} className="mt-3 inline-flex items-center gap-1.5 text-sm font-bold text-cm-accent hover:underline">
                          Read the full write-up <ArrowUpRight className="h-3.5 w-3.5" />
                        </Link>
                      </motion.div>
                    </div>
                    <Link href={`/detail/${slugify(ind.title)}`} aria-label={`Full details on ${ind.title}`}>
                      <ArrowUpRight className="h-6 w-6 text-white/30 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-cm-accent" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="relative hidden overflow-hidden rounded-2xl border border-white/10 lg:block">
            {INDUSTRIES.map((ind, i) => (
              <motion.div
                key={ind.no}
                initial={false}
                animate={{ opacity: active === i ? 1 : 0 }}
                transition={{ duration: 0.5, ease }}
                className={`group absolute inset-0 flex flex-col justify-end bg-gradient-to-br p-10 ${(INDUSTRY_VISUALS[ind.icon] || {}).gradient || ""}`}
              >
                <div className="absolute inset-0 tech-grid opacity-30" />
                <IndustryArt visualKey={ind.icon} img={ind.img} />
                <span className="relative font-display text-[120px] font-black leading-none tracking-tighter text-white/5">{ind.no}</span>
                <div className="relative">
                  <h4 className="font-display text-3xl font-bold tracking-tight text-white">{ind.title}</h4>
                  <p className="mt-3 text-sm text-white/70">{ind.desc}</p>
                  <Link href={`/detail/${slugify(ind.title)}`} className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-cm-accent hover:underline">
                    Read the full write-up <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

/* 10 — SELECTED WORK */
export const SelectedWork = () => {
  const featured = WORK[0];
  const secondary = WORK.slice(1);

  return (
    <section id="work" className="bg-paper px-6 py-28 md:px-12 md:py-40 lg:px-16" data-testid="selected-work">
      <div className="mx-auto max-w-site">
        <SectionHeader eyebrow="Selected Work" title={"Built for\nthe real world."} className="mb-16" />

        <Reveal>
          <Link href={`/detail/${slugify(featured.title)}`} data-testid="work-featured" className="group mb-6 block w-full text-left">
            <div className="relative aspect-[16/8] w-full overflow-hidden rounded-2xl bg-ink-800">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={featured.img} alt={featured.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]" />
              <span className="absolute left-6 top-6 rounded-full bg-cm-accent px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">{featured.status}</span>
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-[1fr_auto] md:items-end">
              <div>
                <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-cm-muted">{featured.industry} · {featured.tag}</div>
                <h3 className="mt-2 font-display text-4xl font-extrabold tracking-tight text-cm-text transition-colors group-hover:text-cm-accent md:text-6xl">{featured.title}</h3>
                <p className="mt-3 max-w-2xl text-cm-muted md:text-lg">{featured.desc}</p>
                <div className="mt-4 flex flex-wrap gap-2">{featured.tech.map((t) => <TechPill key={t}>{t}</TechPill>)}</div>
              </div>
              <span className="inline-flex items-center gap-2 font-display font-bold text-cm-text group-hover:text-cm-accent transition-colors">View Case Study <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></span>
            </div>
          </Link>
        </Reveal>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {secondary.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.1}>
              <Link href={`/detail/${slugify(p.title)}`} data-testid={`work-secondary-${i}`} className="group block w-full text-left">
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-ink-800">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.img} alt={p.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]" />
                  <span className="absolute left-5 top-5 rounded-full bg-white/90 px-3 py-1 text-xs font-bold uppercase tracking-wider text-ink-900">{p.status}</span>
                </div>
                <div className="mt-5">
                  <div className="text-xs font-bold uppercase tracking-[0.2em] text-cm-muted">{p.industry} · {p.tag}</div>
                  <h3 className="mt-2 font-display text-2xl font-bold tracking-tight text-cm-text transition-colors group-hover:text-cm-accent md:text-3xl">{p.title}</h3>
                  <p className="mt-2 text-sm text-cm-muted">{p.desc}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

/* 11 — PROJECT SHOWCASE (horizontal scroll) */
export const Showcase = () => (
  <section className="bg-ink-900 py-28 text-white md:py-40 grain relative overflow-hidden" data-testid="showcase">
    <div className="mx-auto mb-14 max-w-site px-6 md:px-12 lg:px-16">
      <SectionHeader eyebrow="Project Showcase" title="Recent builds" dark />
    </div>
    <div className="no-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-6 md:px-12 lg:px-16">
      {SHOWCASE.map((p, i) => (
        <Link
          key={p.title}
          href={`/detail/${slugify(p.title)}`}
          data-testid={`showcase-${i}`}
          className="group w-[80vw] shrink-0 snap-start text-left sm:w-[440px]"
        >
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-white/10 bg-ink-800">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={p.img} alt={p.title} loading="lazy" className="h-full w-full object-cover opacity-90 transition-transform duration-700 ease-out group-hover:scale-105" />
          </div>
          <div className="mt-5">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-cm-accent">{p.cat}</span>
            <h3 className="mt-2 font-display text-2xl font-bold tracking-tight text-white">{p.title}</h3>
            <p className="mt-2 text-sm text-white/70">{p.desc}</p>
            <div className="mt-3 flex flex-wrap gap-2">{p.tech.map((t) => <TechPill key={t} dark>{t}</TechPill>)}</div>
          </div>
        </Link>
      ))}
      <button onClick={goContact} data-testid="showcase-start-yours" className="grid w-[60vw] shrink-0 snap-start place-items-center sm:w-[300px]">
        <span className="inline-flex items-center gap-2 font-display text-xl font-bold text-white transition-colors hover:text-cm-accent">Start yours <ArrowUpRight className="h-6 w-6" /></span>
      </button>
    </div>
  </section>
);

/* 12 — METRICS (animated counters) */
//
// Same family of bug as the section headings and Industries panel: this
// used framer-motion's `useInView` (IntersectionObserver-based) to gate the
// count-up animation behind scrolling into view. That never reliably fired
// in this codebase, so every counter was permanently stuck at 0 (0h, 0%, 0,
// 0%) no matter how long it sat on screen. Runs the count-up on mount now —
// same fix applied to Reveal/MaskLineInView — which guarantees the numbers
// actually appear instead of depending on an intersection callback.
const Counter = ({ value, suffix }) => {
  const [n, setN] = useState(0);
  useEffect(() => {
    let raf;
    const start = performance.now();
    const dur = 1600;
    const tick = (t) => {
      const p = Math.min((t - start) / dur, 1);
      setN(Math.floor((1 - Math.pow(1 - p, 3)) * value));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value]);
  return <span>{n}{suffix}</span>;
};

export const Metrics = () => (
  <section className="bg-ink-800 px-6 py-24 text-white md:px-12 md:py-32 lg:px-16" data-testid="metrics">
    <div className="mx-auto max-w-site">
      <div className="grid gap-y-12 md:grid-cols-2 lg:grid-cols-4">
        {METRICS.map((m, i) => (
          <Reveal key={m.no} delay={i * 0.08}>
            <div className="border-l border-white/10 pl-6">
              <span className="font-display text-xs font-bold text-cm-accent">{m.no}</span>
              <p className="mt-3 font-display text-6xl font-black tracking-tighter md:text-7xl">
                <Counter value={m.value} suffix={m.suffix} />
              </p>
              <p className="mt-2 text-sm font-bold uppercase tracking-[0.16em]">{m.label}</p>
              <p className="mt-2 max-w-[220px] text-sm text-white/60">{m.note}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);
