"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft, ArrowUpRight, Plus, Minus,
  Code2, BrainCog, Globe2, Server,
  Sparkles, Bot, SearchCode, Plug, TestTube2, ShieldCheck,
  Rocket, Layers, Landmark, GraduationCap, HeartPulse, Building2,
  ClipboardList, Hammer, CheckCircle2, UploadCloud, LifeBuoy,
  Newspaper, Workflow,
} from "lucide-react";
import { relatedDetails } from "@/data/detailContent";
import { CONTACT } from "@/data/emergentContent";
import { Footer } from "@/components/emergent/Sections3";
import TermsModal from "@/components/TermsModal";
import { useModals } from "@/context/ModalsContext";

const ease = [0.22, 1, 0.36, 1];

// Same icon vocabulary used on the homepage cards, keyed by slug so each
// detail page opens with a visual that matches the card the person clicked.
const ICONS = {
  "full-stack-engineering": Code2, "ai-engineering": BrainCog, "web-experiences": Globe2, "api-and-backend-engineering": Server,
  "ai-applications": Sparkles, "ai-agents": Bot, "rag": SearchCode, "llm-integration": Plug, "automation": TestTube2, "ai-evaluation": ShieldCheck,
  startups: Rocket, saas: Layers, fintech: Landmark, edtech: GraduationCap, healthtech: HeartPulse, "internal-business-systems": Building2,
  scope: ClipboardList, build: Hammer, qa: CheckCircle2, deploy: UploadCloud, support: LifeBuoy,
  "solutions-startups": Rocket, "solutions-saas": Layers, "solutions-digital-products": Sparkles,
  "solutions-business-automation": Workflow, "solutions-ai-solutions": Bot, "solutions-internal-platforms": Building2,
};

const CATEGORY_GRADIENT = {
  capability: "from-orange-500/15 via-white to-white",
  ai: "from-violet-500/15 via-white to-white",
  industry: "from-emerald-500/15 via-white to-white",
  solution: "from-cm-accent/15 via-white to-white",
  process: "from-sky-500/15 via-white to-white",
  insight: "from-amber-500/15 via-white to-white",
  project: "from-rose-500/15 via-white to-white",
};

const CATEGORY_LABEL = {
  capability: "Engineering Capabilities",
  ai: "AI Capabilities",
  industry: "Industries",
  solution: "Solutions",
  process: "How We Work",
  insight: "Insights",
  project: "Project",
};

function FAQItem({ q, a, defaultOpen }) {
  const [open, setOpen] = useState(!!defaultOpen);
  return (
    <div className="border-b border-cm-border py-5">
      <button onClick={() => setOpen((o) => !o)} className="flex w-full items-center justify-between gap-6 text-left">
        <span className="font-display text-lg font-bold tracking-tight text-cm-text">{q}</span>
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-cm-border text-cm-text">
          {open ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
        </span>
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.35, ease }}
        className="overflow-hidden"
      >
        <p className="max-w-2xl pt-4 text-cm-muted">{a}</p>
      </motion.div>
    </div>
  );
}

export default function DetailPageClient({ entry }) {
  const { openTerms, openPrivacy } = useModals();
  const Icon = ICONS[entry.slug] || (entry.category === "insight" ? Newspaper : Sparkles);
  const related = relatedDetails(entry, 3);

  return (
    <div className="emergent-scope min-h-screen bg-paper">
      {/* Slim white header — distinct from the homepage's dark hero navbar
          since this page never sits over a dark section.
          FIX: this used to be bg-paper/90 (90% opaque), which let the
          giant hero heading beneath bleed through the header at the seam
          on scroll — especially visible in a fresh tab, where the page
          loads already showing that seam. A fully opaque background plus
          a real shadow (instead of relying on the blur alone) keeps the
          logo and "CodeMyth" wordmark clean at all times. */}
      <header className="sticky top-0 z-40 border-b border-cm-border bg-paper shadow-[0_1px_0_0_rgba(0,0,0,0.04)] backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-site items-center justify-between px-6 md:px-12 lg:px-16">
          <Link href="/" className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo-icon-dark.png" alt="Code Myth Technologies" className="h-8 w-auto" />
            <span className="flex flex-col leading-none">
              <span className="font-display text-lg font-extrabold tracking-tight text-cm-text">CodeMyth</span>
              <span className="text-[8px] font-bold uppercase tracking-[0.28em] text-cm-muted">Technologies</span>
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/" className="hidden items-center gap-2 text-sm font-bold text-cm-text/70 transition-colors hover:text-cm-accent sm:inline-flex">
              <ArrowLeft className="h-4 w-4" /> Back to site
            </Link>
            <a
              href="/#contact"
              className="inline-flex h-11 items-center gap-2 rounded-full bg-cm-accent px-5 text-sm font-bold text-white transition-colors hover:bg-cm-accentHover"
            >
              Start a Project <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className={`relative overflow-hidden bg-gradient-to-b px-6 pb-16 pt-16 md:px-12 md:pb-24 md:pt-24 lg:px-16 ${CATEGORY_GRADIENT[entry.category] || ""}`}>
        <div className="absolute inset-0 tech-grid opacity-[0.15]" />
        <div className="relative mx-auto max-w-site">
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease }} className="flex items-center gap-3">
            <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-cm-muted transition-colors hover:text-cm-accent sm:hidden">
              <ArrowLeft className="h-4 w-4" /> Back
            </Link>
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.24em] text-cm-accent">
              <span className="h-px w-6 bg-cm-accent" /> {entry.eyebrow || CATEGORY_LABEL[entry.category]}
            </span>
          </motion.div>

          <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.08, ease }}
                className="font-display text-5xl font-extrabold leading-[0.98] tracking-tight text-cm-text md:text-7xl"
              >
                {entry.title}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.16, ease }}
                className="mt-6 max-w-2xl text-lg leading-relaxed text-cm-muted md:text-xl"
              >
                {entry.tagline}
              </motion.p>
            </div>
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.2, ease }}
              className="grid h-20 w-20 shrink-0 place-items-center rounded-3xl border border-cm-border bg-white text-cm-accent shadow-sm"
            >
              <Icon className="h-9 w-9" />
            </motion.span>
          </div>
        </div>
      </section>

      {/* BODY */}
      <section className="px-6 py-16 md:px-12 md:py-24 lg:px-16">
        <div className="mx-auto grid max-w-site gap-16 lg:grid-cols-[1fr_320px]">
          <div>
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.5, ease }} className="space-y-5">
              <p className="text-lg leading-relaxed text-cm-text/80 md:text-xl">{entry.summary}</p>
              {entry.second && <p className="text-base leading-relaxed text-cm-muted md:text-lg">{entry.second}</p>}
              {entry.third && <p className="text-base leading-relaxed text-cm-muted md:text-lg">{entry.third}</p>}
            </motion.div>

            {!!entry.stack?.length && (
              <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, ease }} className="mt-10 flex flex-wrap gap-2">
                {entry.stack.map((t) => (
                  <span key={t} className="inline-flex items-center rounded-full border border-cm-border bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-cm-text/70">
                    {t}
                  </span>
                ))}
              </motion.div>
            )}

            {!!entry.steps?.length && (
              <div className="mt-16">
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-cm-muted">How we build it</p>
                <div className="mt-6 border-t border-cm-border">
                  {entry.steps.map((s, i) => (
                    <motion.div
                      key={s.title}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-60px" }}
                      transition={{ duration: 0.45, delay: i * 0.06, ease }}
                      className="grid grid-cols-[48px_1fr] gap-5 border-b border-cm-border py-7"
                    >
                      <span className="font-display text-xl font-black tracking-tighter text-cm-accent">0{i + 1}</span>
                      <div>
                        <h3 className="font-display text-xl font-bold tracking-tight text-cm-text md:text-2xl">{s.title}</h3>
                        <p className="mt-2 text-cm-muted">{s.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {!!entry.faqs?.length && (
              <div className="mt-16">
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-cm-muted">Frequently asked</p>
                <div className="mt-4 border-t border-cm-border">
                  {entry.faqs.map((f, i) => <FAQItem key={f.q} q={f.q} a={f.a} defaultOpen={i === 0} />)}
                </div>
              </div>
            )}
          </div>

          {/* SIDEBAR */}
          <div className="space-y-10">
            {!!entry.whoFor?.length && (
              <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, ease }} className="rounded-2xl border border-cm-border bg-white p-6">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-cm-muted">Who this is for</p>
                <ul className="mt-4 space-y-3">
                  {entry.whoFor.map((w) => (
                    <li key={w} className="flex items-start gap-2 text-sm text-cm-text/80">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cm-accent" /> {w}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}

            {!!entry.deliverables?.length && (
              <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, ease }} className="rounded-2xl border border-cm-border bg-white p-6">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-cm-muted">What you walk away with</p>
                <ul className="mt-4 space-y-3">
                  {entry.deliverables.map((w) => (
                    <li key={w} className="flex items-start gap-2 text-sm text-cm-text/80">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-cm-accent" /> {w}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}

            {!!entry.team?.length && (
              <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, ease }} className="rounded-2xl border border-cm-border bg-white p-6">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-cm-muted">Who works on this</p>
                <p className="mt-4 text-sm leading-relaxed text-cm-text/80">{entry.team.join(" · ")}</p>
              </motion.div>
            )}

            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, ease }} className="rounded-2xl bg-ink-900 p-6 text-white">
              <p className="font-display text-lg font-bold tracking-tight">Have a project like this?</p>
              <p className="mt-2 text-sm text-white/60">Free 30-minute consultation — no pressure, no obligation.</p>
              <a href="/#contact" className="mt-5 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-cm-accent text-sm font-bold text-white transition-colors hover:bg-cm-accentHover">
                Start a project <ArrowUpRight className="h-4 w-4" />
              </a>
              <a href={`mailto:${CONTACT.email}`} className="mt-3 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full border border-white/20 text-sm font-bold text-white transition-colors hover:bg-white hover:text-ink-900">
                Email us directly
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* RELATED */}
      {!!related.length && (
        <section className="border-t border-cm-border bg-white px-6 py-16 md:px-12 md:py-24 lg:px-16">
          <div className="mx-auto max-w-site">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-cm-muted">Related</p>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {related.map((r) => {
                const RIcon = ICONS[r.slug] || Sparkles;
                return (
                  <Link
                    key={r.slug}
                    href={`/detail/${r.slug}`}
                    className="group flex flex-col justify-between rounded-2xl border border-cm-border p-6 transition-colors hover:border-cm-accent/50"
                  >
                    <div className="flex items-center justify-between">
                      <RIcon className="h-6 w-6 text-cm-accent" />
                      <ArrowUpRight className="h-5 w-5 text-cm-text/30 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-cm-accent" />
                    </div>
                    <div className="mt-6">
                      <h3 className="font-display text-xl font-bold tracking-tight text-cm-text">{r.title}</h3>
                      <p className="mt-2 text-sm text-cm-muted">{r.tagline}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <Footer onOpenTerms={openTerms} onOpenPrivacy={openPrivacy} />
      <TermsModal />
    </div>
  );
}
