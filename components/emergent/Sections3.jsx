"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Mail } from "lucide-react";
import ParticleField from "./ParticleField";
import { PROCESS, WHY, TEAM, INSIGHTS, CONTACT } from "@/data/emergentContent";
import { slugify } from "@/data/detailContent";
import { Reveal, SectionHeader, Eyebrow } from "./ui";
import { scrollToSection } from "@/lib/useSiteActions";

const ease = [0.22, 1, 0.36, 1];
const goContact = () => scrollToSection("contact");

const GithubIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.09 3.29 9.4 7.86 10.93.57.1.79-.25.79-.55 0-.27-.01-1.16-.02-2.11-3.2.7-3.88-1.36-3.88-1.36-.52-1.34-1.28-1.69-1.28-1.69-1.04-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.18 1.18a11 11 0 0 1 2.9-.39c.98 0 1.97.13 2.9.39 2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.77.11 3.06.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.39-5.25 5.67.41.36.78 1.06.78 2.14 0 1.55-.01 2.79-.01 3.17 0 .3.21.66.8.55C20.71 21.39 24 17.08 24 12c0-6.35-5.15-11.5-12-11.5Z" />
  </svg>
);

const LinkedinIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z" />
  </svg>
);

/* 13 — HOW WE WORK */
export const Process = () => (
  <section id="approach" className="bg-paper px-6 py-28 md:px-12 md:py-40 lg:px-16" data-testid="process">
    <div className="mx-auto max-w-site">
      <SectionHeader eyebrow="How We Work" title={"From scope\nto support."} className="mb-16" />
      <div className="relative border-t border-cm-border">
        {PROCESS.map((p, i) => (
          <Reveal key={p.no} delay={i * 0.06}>
            <Link
              href={`/detail/${slugify(p.title)}`}
              data-testid={`process-${i}`}
              className="group grid w-full grid-cols-[60px_1fr] items-baseline gap-6 border-b border-cm-border py-8 text-left md:grid-cols-[100px_1fr_1fr_32px]"
            >
              <span className="font-display text-2xl font-black tracking-tighter text-cm-accent md:text-4xl">{p.no}</span>
              <h3 className="font-display text-3xl font-bold tracking-tight text-cm-text transition-colors group-hover:text-cm-accent md:text-5xl">{p.title}</h3>
              <p className="col-span-2 text-cm-muted md:col-span-1 md:text-right md:text-lg">{p.meta}</p>
              <ArrowUpRight className="hidden h-6 w-6 text-cm-text/30 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-cm-accent md:block" />
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

/* 14 — WHY CODEMYTH */
export const WhyCodeMyth = () => (
  <section className="bg-ink-900 px-6 py-28 text-white md:px-12 md:py-40 lg:px-16 grain relative" data-testid="why-codemyth">
    <div className="relative mx-auto max-w-site">
      <SectionHeader eyebrow="Why CodeMyth" title="Why CodeMyth?" dark className="mb-20" />
      <div className="grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 md:grid-cols-3">
        {WHY.map((w, i) => (
          <motion.div
            key={w.no}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.1, ease }}
            className="flex flex-col justify-between gap-16 bg-ink-900 p-8 md:p-10"
          >
            <span className="font-display text-sm font-bold text-cm-accent">{w.no}</span>
            <div>
              <h3 className="font-display text-3xl font-extrabold tracking-tight text-white md:text-4xl">{w.title}</h3>
              <p className="mt-4 text-white/70">{w.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

/* 15 — TEAM */
export const Team = () => (
  <section id="team" className="bg-paper px-6 py-28 md:px-12 md:py-40 lg:px-16" data-testid="team">
    <div className="mx-auto max-w-site">
      <SectionHeader eyebrow="Leadership & Engineering" title={"The people\nbehind the build."} className="mb-16" />
      <div className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-4">
        {TEAM.map((m, i) => (
          <Reveal key={m.name} delay={(i % 4) * 0.06}>
            <div className="group" data-testid={`team-${i}`}>
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-cm-border">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={m.img} alt={m.name} loading="lazy" className="h-full w-full object-cover grayscale transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0" />
              </div>
              <h3 className="mt-4 font-display text-xl font-bold tracking-tight text-cm-text transition-transform duration-300 group-hover:translate-x-1">{m.name}</h3>
              <p className="mt-1 text-sm font-bold text-cm-accent">{m.role}</p>
              <p className="mt-2 text-sm text-cm-muted">{m.spec}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

/* 16 — INSIGHTS */
export const Insights = () => (
  <section className="bg-paper px-6 pb-28 md:px-12 md:pb-40 lg:px-16" data-testid="insights">
    <div className="mx-auto max-w-site">
      <SectionHeader eyebrow="Insights" title="Field notes." className="mb-14" />
      <div className="border-t border-cm-border">
        {INSIGHTS.map((a, i) => (
          <Reveal key={a.title} delay={i * 0.08}>
            <Link
              href={`/detail/${slugify(a.title)}`}
              data-testid={`insight-${i}`}
              className="group grid w-full grid-cols-1 items-start gap-4 border-b border-cm-border py-10 text-left md:grid-cols-[180px_1fr_40px] md:gap-10"
            >
              <div className="text-xs font-bold uppercase tracking-[0.2em] text-cm-muted">
                <span className="text-cm-accent">{a.cat}</span> · {a.date}
              </div>
              <div>
                <h3 className="font-display text-2xl font-bold tracking-tight text-cm-text transition-colors group-hover:text-cm-accent md:text-4xl">{a.title}</h3>
                <p className="mt-3 max-w-2xl text-cm-muted md:text-lg">{a.desc}</p>
              </div>
              <ArrowUpRight className="hidden h-6 w-6 shrink-0 justify-self-end text-cm-text/40 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-cm-accent md:block" />
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

/* 17 — FINAL CTA */
export const FinalCTA = () => (
  <section className="relative overflow-hidden bg-ink-900 px-6 py-32 text-white md:px-12 md:py-48 lg:px-16 grain" data-testid="final-cta">
    <div className="absolute inset-0 z-0 opacity-60"><ParticleField density={50} /></div>
    <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cm-accent/10 blur-[140px]" />
    <div className="relative z-10 mx-auto max-w-site text-center">
      <Reveal><Eyebrow dark className="justify-center">Let&apos;s Talk</Eyebrow></Reveal>
      <h2 className="mt-8 font-display text-5xl font-extrabold leading-[0.95] tracking-tighter md:text-8xl">
        Have an idea<br /><span className="text-cm-accent">worth building?</span>
      </h2>
      <Reveal delay={0.15}><p className="mx-auto mt-8 max-w-xl text-lg text-white/60">Let&apos;s turn it into something real. Free 30-minute consultation — no pressure, no obligation.</p></Reveal>
      <Reveal delay={0.25}>
        <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
          <button onClick={goContact} data-testid="cta-start" className="group inline-flex h-14 items-center gap-3 rounded-full bg-cm-accent px-8 text-[15px] font-bold text-white transition-colors hover:bg-cm-accentHover">
            Start a Project <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </button>
          <a href={`mailto:${CONTACT.email}`} target="_blank" rel="noopener noreferrer" data-testid="cta-talk" className="group inline-flex h-14 items-center gap-3 rounded-full border border-white/20 px-8 text-[15px] font-bold text-white transition-colors hover:bg-white hover:text-ink-900">
            Talk to us <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </a>
        </div>
      </Reveal>
    </div>
  </section>
);

/* 18 — FOOTER */
export const Footer = ({ onOpenTerms, onOpenPrivacy }) => {
  // Footer links are pointers, same as the nav mega-menus: clicking one
  // scrolls back up to where that content is actually listed on the page
  // (its section on the homepage) rather than jumping straight to a full
  // detail page. The person sees it in context first, then opens the full
  // write-up themselves via that section's own "Read more" link.
  const cols = [
    {
      head: "Services", sectionId: "capabilities",
      links: ["Full-Stack Engineering", "AI Engineering", "Web Experiences", "API & Backend Engineering"],
    },
    {
      head: "Solutions", sectionId: "industries",
      links: ["Startups", "SaaS", "FinTech", "HealthTech"],
    },
    {
      head: "Company",
      links: [
        { label: "About", sectionId: "ai-era" },
        { label: "Work", sectionId: "work" },
        { label: "Approach", sectionId: "approach" },
        { label: "Team", sectionId: "team" },
        { label: "FAQ", sectionId: "faq" },
        { label: "Contact", sectionId: "contact" },
      ],
    },
  ];

  return (
    <footer className="bg-ink-900 px-6 pb-10 pt-24 text-white md:px-12 lg:px-16" data-testid="footer">
      <div className="mx-auto max-w-site">
        <div className="grid gap-12 border-b border-white/10 pb-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo-icon.png" alt="" className="h-6 w-auto" />
              <span className="flex flex-col leading-none">
                <span className="font-display text-base font-extrabold tracking-tight text-white">CodeMyth</span>
                <span className="mt-0.5 text-[8px] font-bold uppercase tracking-[0.28em] text-white/50">Technologies</span>
              </span>
            </div>
            <p className="mt-5 max-w-xs text-sm text-white/70">Remote-first IT studio building full-stack web apps, AI products and custom software — fast, clean, production-ready.</p>
            <p className="mt-4 text-xs text-white/30">MSME Registered · India · {CONTACT.udyam}</p>
          </div>
          {cols.map((c) => (
            <div key={c.head}>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/40">{c.head}</p>
              <ul className="mt-5 space-y-3">
                {c.links.map((l) => {
                  const label = typeof l === "string" ? l : l.label;
                  const sectionId = typeof l === "string" ? c.sectionId : l.sectionId;
                  return (
                    <li key={label}>
                      <button onClick={() => scrollToSection(sectionId)} className="text-left text-sm text-white/60 transition-colors hover:text-cm-accent">
                        {label}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/40">Connect</p>
            <ul className="mt-5 space-y-3">
              <li><a href={`mailto:${CONTACT.email}`} className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-cm-accent transition-colors"><Mail className="h-4 w-4" /> Email</a></li>
              <li><a href={CONTACT.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-cm-accent transition-colors"><LinkedinIcon className="h-4 w-4" /> LinkedIn</a></li>
              <li><a href={CONTACT.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-cm-accent transition-colors"><GithubIcon className="h-4 w-4" /> GitHub</a></li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col items-start justify-between gap-4 pt-8 md:flex-row md:items-center">
          <p className="text-sm text-white/40">© {new Date().getFullYear()} CodeMyth Technologies. All rights reserved.</p>
          <div className="flex gap-6 text-sm text-white/40">
            <button onClick={onOpenPrivacy} className="hover:text-white transition-colors">Privacy</button>
            <button onClick={onOpenTerms} className="hover:text-white transition-colors">Terms</button>
          </div>
        </div>
      </div>
    </footer>
  );
};
