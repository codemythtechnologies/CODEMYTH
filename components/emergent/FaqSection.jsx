"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { SectionHeader, Reveal } from "./ui";

const ease = [0.22, 1, 0.36, 1];

const FAQS = [
  {
    q: "What does CodeMyth actually build?",
    a: "Full-stack web apps, AI-powered products (chatbots, RAG assistants, automation), landing pages and internal dashboards — end to end. We own the data model, the API, the front end and the live domain, so there's no handoff gap between \"design\" and \"engineering\" teams. If a project needs a Business Analyst to turn a raw idea into a build-ready PRD first, we do that too, before a single line of code is written.",
  },
  {
    q: "How long does a typical project take?",
    a: "A focused landing page or MVP can ship in 1–3 weeks. A full-stack product with auth, a database and an admin panel usually runs 4–8 weeks depending on scope. AI-heavy builds (RAG systems, agents with evaluation loops) tend to add 1–2 weeks for testing and guardrails, because we don't ship an LLM feature we haven't load-tested against real-world input variety. You get a phased milestone plan up front, so you see something live early rather than waiting for one big-bang launch.",
  },
  {
    q: "Do you work fixed-price or hourly?",
    a: "Both — whichever fits the project. Well-scoped work (a defined feature set, a known MVP) usually goes fixed-price, so there are no surprises on either side. Ongoing work, retainers or anything genuinely exploratory (e.g. \"help us figure out where AI actually helps our workflow\") is billed hourly. We'll recommend whichever model reduces risk for your specific project during the first call.",
  },
  {
    q: "Can you start from just an idea, with no spec yet?",
    a: "Yes — that's exactly what our dedicated Business Analyst offering exists for. We validate the idea, size the market, and turn a raw concept into a build-ready PRD with a phased roadmap, before any engineering estimate is made. Founders who come to us pre-spec typically leave the first consult with a document their dev team (ours or someone else's) can actually execute against.",
  },
  {
    q: "What does the AI work actually involve?",
    a: "AI is treated as part of the engineering process, not a bolt-on chatbot bubble. Depending on the project that means: LLM assistants grounded in your own documents (RAG, with citations back to source), agents that take multi-step actions inside guardrails you define, or AI used internally to scaffold code and generate edge-case tests — every AI-touched line still reviewed and merged by a senior engineer. We run automated evaluation suites before any prompt or model change reaches production, so quality regressions get caught before your users see them.",
  },
  {
    q: "Who owns the code and the IP once we're done?",
    a: "You do, fully — source code, design assets and infrastructure access are handed over at project close. We don't hold code hostage behind an ongoing retainer. If you'd like us to keep maintaining or extending the product afterward, that's available separately, but it's never a condition of getting your own code.",
  },
  {
    q: "Do you sign NDAs before seeing project details?",
    a: "Yes, on request, before any specifics are discussed — we work with founders pre-fundraise and companies in regulated spaces (FinTech, HealthTech) often enough that this is a standard first step, not a special favour. Just mention it on the first call or in the contact form.",
  },
  {
    q: "What happens after launch — do you just disappear?",
    a: "No. We stay attached through the first weeks of real production traffic to catch anything that only shows up under real usage (load spikes, edge-case inputs, integration hiccups). After that, ongoing support and feature work is available on a retainer or per-request basis, whichever suits how actively the product keeps changing.",
  },
  {
    q: "Can you take over or extend an existing codebase?",
    a: "Yes — a good amount of our work is picking up a project mid-flight, whether that's a codebase another agency left unfinished or an internal tool your team has outgrown. We start with a short technical audit (architecture, dependencies, test coverage, obvious risk areas) before quoting any new work, so the estimate reflects what's actually there rather than a guess.",
  },
  {
    q: "What industries have you actually shipped in?",
    a: "Startups (MVP to first 100 users), SaaS (multi-tenant, billing, RBAC), FinTech (compliance and audit-trail-aware builds), HealthTech (including Curalink, our own AI medical research tool), EdTech and internal business systems for operating teams. Each industry section further down this page links through to a full write-up of how we approach that specific domain.",
  },
  {
    q: "Where is the team based, and do you work with clients outside India?",
    a: "We're a remote-first studio based in Siruseri, Chennai, and we work with clients worldwide — most communication happens async over email/Slack with a weekly video sync, adjusted to overlap with your timezone where possible. Response time on new enquiries is within 24 hours.",
  },
  {
    q: "How do we get started?",
    a: "Use the \"Start a Project\" button to book a free 30-minute consultation — no pressure, no obligation. Bring whatever you have (a one-line idea, a Figma file, an existing repo) and we'll tell you honestly whether it's ready to scope, needs a BA pass first, or needs something else entirely.",
  },
];

const FaqRow = ({ item, isOpen, onToggle, index }) => (
  <div className="border-b border-cm-border">
    <button
      onClick={onToggle}
      data-testid={`faq-item-${index}`}
      className="flex w-full items-center justify-between gap-6 py-6 text-left"
    >
      <span className="font-display text-lg font-bold tracking-tight text-cm-text md:text-xl">{item.q}</span>
      <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border transition-colors ${isOpen ? "border-cm-accent bg-cm-accent text-white" : "border-cm-border text-cm-muted"}`}>
        {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
      </span>
    </button>
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.35, ease }}
          className="overflow-hidden"
        >
          <p className="max-w-2xl pb-7 text-[15px] leading-relaxed text-cm-muted">{item.a}</p>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

export default function FaqSection() {
  const [open, setOpen] = useState(0);
  return (
    <section id="faq" className="bg-paper px-6 py-28 md:px-12 md:py-40 lg:px-16" data-testid="faq">
      <div className="mx-auto max-w-site">
        <SectionHeader eyebrow="FAQ" title={"Questions worth\nanswering up front."} className="mb-16" />
        <Reveal delay={0.1}>
          <div className="border-t border-cm-border">
            {FAQS.map((item, i) => (
              <FaqRow key={item.q} item={item} index={i} isOpen={open === i} onToggle={() => setOpen(open === i ? null : i)} />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
