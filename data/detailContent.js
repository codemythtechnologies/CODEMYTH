import { CAPABILITIES, AI_CAPS, INDUSTRIES, SOLUTIONS, PROCESS, INSIGHTS, WORK, SHOWCASE } from "./emergentContent";

export function slugify(title) {
  return title
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// FAQs are templated per category so every detail page ships with real,
// relevant Q&A instead of a blank section — still specific to the item
// because the title/category are interpolated in. Expanded well beyond
// the original 2–3 questions per category: because every detail page
// pulls from the same bank, deepening it here is what actually deepens
// every single page across the site at once, rather than hand-writing
// near-duplicate copy 30+ times over.
function faqsFor(category, title) {
  const banks = {
    capability: [
      { q: `Do you only offer ${title} as a standalone engagement?`, a: "No — most projects combine this with one or two other capabilities. We scope the exact mix on a short discovery call before any contract is signed, so you're never paying for work you don't need." },
      { q: "How is AI used in this work?", a: "AI scaffolds boilerplate, drafts edge-case tests and speeds up repetitive parts of the build. Every AI-touched line is still reviewed and merged by a senior engineer before it ships — AI sets the pace, the engineer sets the standard." },
      { q: "What does pricing usually look like?", a: "Fixed-price for well-scoped builds, hourly for ongoing or open-ended work. You'll get a number before we start, not after, and any scope change is flagged with its cost impact before we act on it." },
      { q: "Who actually writes the code?", a: "A named senior engineer owns this capability end to end for your project — not a rotating pool of contractors. You'll know exactly who's building your product and can talk to them directly." },
      { q: "Do you work with an existing codebase, or only greenfield builds?", a: "Both. A large share of our work is extending or rescuing an existing codebase — we start with a short technical audit so estimates reflect the code as it actually is, not as it's assumed to be." },
      { q: "What tooling and stack do you default to?", a: "It depends on the project, but we lean toward proven, well-supported tooling over the newest framework of the month — the goal is something your team (or ours) can maintain confidently for years, not just demo well on day one." },
      { q: "How do you handle testing?", a: "Unit and integration tests are written alongside the feature, not bolted on afterward, and AI-generated edge-case tests are reviewed by an engineer before they're trusted in CI." },
      { q: "What do I actually receive at the end of the engagement?", a: "Working, deployed software in your own repository and infrastructure — plus documentation, environment access and a short handover call so your team (or ours, if we continue supporting it) can pick it up confidently." },
    ],
    ai: [
      { q: "How do you keep the model's output reliable?", a: "Structured prompting, retrieval grounding where relevant, and an evaluation suite that runs before every change ships — plus a human review gate on anything user-facing." },
      { q: "Can this work with our existing product?", a: "Usually yes. Most AI work is integrated into an existing codebase rather than built as a separate app, wired in behind a feature flag so it can roll out gradually and get rolled back instantly if something's off." },
      { q: "What happens if the model gets something wrong?", a: "We design fallbacks and guardrails up front — the goal is that a bad model response degrades gracefully (a clear 'I'm not sure', a human handoff) rather than silently misleading a user." },
      { q: "Which model providers do you work with?", a: "We're not tied to one vendor — OpenAI, Anthropic's Claude and open-weight models are all in regular use, chosen per task based on cost, latency and quality trade-offs rather than brand preference." },
      { q: "How do you measure whether the AI feature is actually working?", a: "A concrete evaluation suite specific to the task — pass rate, hallucination rate, latency — run before every prompt or model change ships, not just a subjective 'looks good' check." },
      { q: "Is our data used to train any models?", a: "No. Your data is used to ground retrieval and evaluate outputs for your own product; it isn't sent off for third-party model training." },
      { q: "What's the realistic timeline for an AI feature like this?", a: "A focused AI feature can often reach a working staging version in 1–3 weeks; agentic or multi-tool workflows typically take longer because the evaluation loop takes more iteration to get trustworthy." },
      { q: "Do you handle the ongoing cost of model usage?", a: "We help you estimate and monitor token/API cost as part of the build, and design prompts and retrieval to keep it proportionate to the value the feature delivers." },
    ],
    industry: [
      { q: `Have you shipped ${title} products before?`, a: "Yes — this is one of our core verticals, with live and in-progress builds you can see in our project showcase, not just a services page listing." },
      { q: "Do you handle compliance and data-handling requirements?", a: "We scope any regulatory or data-handling requirements during discovery and design the architecture around them from day one, not as a retrofit after a security review flags a gap." },
      { q: "How long does a typical build take?", a: "Most builds land in 2–6 weeks depending on scope, with a working staging build visible from week one so you're never waiting blind for a big reveal." },
      { q: "Do we need a technical co-founder to work with you?", a: "No — many clients in this space are non-technical founders or operators. Our Business Analyst phase exists specifically to translate your domain knowledge into a spec our engineers can build from." },
      { q: "Can you work alongside our existing in-house team?", a: "Yes, this is common — we typically slot in on the areas your team doesn't have bandwidth or specific expertise for, with clear API/interface boundaries so both teams can move independently." },
      { q: "What happens if our requirements are still fuzzy?", a: "That's normal at this stage — the discovery and scoping phase exists to turn a fuzzy idea into a concrete, build-ready plan before any code gets written." },
      { q: "Do you sign NDAs before discussing details?", a: "Yes, as standard practice for any serious conversation in this space — happy to sign yours or share ours." },
    ],
    process: [
      { q: "What if our requirements change mid-project?", a: "Scope changes happen — we flag the impact on timeline and cost transparently rather than silently absorbing or ignoring it, so you can make an informed call on whether to proceed." },
      { q: "Do we get access to the build before launch?", a: "Yes, staging access is standard from early in the Build phase, so you can review progress continuously instead of waiting for a big reveal at the very end." },
      { q: "What happens after launch?", a: "The Support phase is ongoing — monitoring, fast turnaround on fixes, and feeding real usage data into what gets prioritised next, rather than the team disappearing the day it ships." },
      { q: "How much of my time does this phase require?", a: "It varies by phase, but we're deliberate about not over-scheduling you — short, focused check-ins rather than long recurring meetings that eat into your week." },
      { q: "Who's our main point of contact?", a: "A single named lead throughout the engagement, so you're never re-explaining context to a different person every week." },
      { q: "Can we skip this phase if we're in a hurry?", a: "Some phases can be compressed, but skipping them outright tends to cost more time later — we'll always tell you honestly if a shortcut is likely to bite you down the line." },
    ],
    insight: [
      { q: "Is this how every project actually runs?", a: "Yes — this reflects our real day-to-day process, not a marketing simplification. Ask us for specifics on any project and we'll walk you through it in as much detail as you want." },
      { q: "Can I read more like this?", a: "This is one of a small set of field notes we publish — get in touch and we're happy to talk through any of it in more depth, including specific numbers and examples." },
      { q: "Does this apply to small projects too, or only larger engagements?", a: "The same principles apply regardless of size — a two-week landing page project gets the same review discipline as a multi-month platform build, just scaled to fit." },
    ],
    project: [
      { q: "Is this project open for reference calls?", a: "For live, shipped work we're often happy to make an introduction or share more detail on a call — just ask." },
      { q: "Could you build something similar for us?", a: "Most new projects start from a pattern like this one, then get adapted to your specific data, users and constraints — nothing here is a rigid template." },
      { q: "How long did this take to build and launch?", a: "Timelines vary by scope, but the pattern is consistent: a working staging build within the first couple of weeks, then iteration against real usage rather than a single big-bang launch." },
    ],
    solution: [
      { q: `Is ${title} a fixed package, or does it get customised?`, a: "It's a starting model, not a rigid package — we scope the exact mix of work to your specific stage and constraints on a short discovery call before anything is signed." },
      { q: "How is this different from your Services/Capabilities offerings?", a: "Capabilities are the individual engineering skillsets (full-stack, AI, backend, etc). Solutions describe how those capabilities come together for a specific kind of team or goal — the engagement shape, not just the technical work." },
      { q: "What does pricing usually look like for this?", a: "Fixed-price for a well-scoped build, or a monthly retainer for ongoing/open-ended work. You'll get a number before we start, and any scope change is flagged with its cost impact before we act on it." },
      { q: "How quickly can we get started?", a: "Most engagements begin with a discovery call within a few days of first contact, and a scoped plan within a week after that — we don't run a lengthy sales process before you see real progress." },
      { q: "Do you work with early-stage teams that don't have a technical co-founder?", a: "Yes — this is common. Our Business Analyst phase exists specifically to translate a founder's domain knowledge into a build-ready spec, without requiring in-house technical leadership." },
      { q: "Can this integrate with tools or systems we already use?", a: "In most cases, yes — we design around your existing stack and integrations rather than asking you to rip and replace what already works." },
      { q: "What happens after the initial build ships?", a: "Ongoing support is available on the same terms as the build phase — monitoring, fixes and iteration based on real usage, not a hard stop the day it launches." },
      { q: "Do you sign NDAs before discussing specifics?", a: "Yes, as standard practice — happy to sign yours or share ours before any detailed conversation." },
    ],
  };
  return banks[category] || banks.capability;
}

// "Who this is for" bullets, same shared-bank approach as the FAQs above —
// expanded from 2–3 short bullets to a fuller, more specific list per
// category so the sidebar on every detail page carries real substance.
function whoForCategory(category) {
  const map = {
    capability: [
      "Founders shipping a first product and want it built right the first time",
      "Teams replacing a fragile legacy system that's started costing more to maintain than rebuild",
      "Companies scaling past their MVP and hitting the limits of what got them here",
      "Product leads who need a senior owner for this specific piece, not a generalist spread thin",
      "Teams that tried an agency or freelancer before and got burned by scope creep or ghosting",
    ],
    ai: [
      "Teams with a clear AI use case, not just a hunch that they 'should have AI somewhere'",
      "Products with an existing user base to layer AI into, where the workflow already exists",
      "Founders who want AI without the hype — a feature that measurably saves time, not a demo gimmick",
      "Teams that tried building this in-house and hit reliability or evaluation problems",
      "Companies that need guardrails and audit trails around AI output, not just a raw model call",
    ],
    industry: [
      "Founders building in this space who want a partner that already understands the domain",
      "Operators replacing manual/legacy tooling that's slowing the team down",
      "Teams preparing for a fundraise or scale-up who need production-grade software, not a prototype",
      "Non-technical founders who need a translation layer between domain knowledge and a build-ready spec",
      "Companies expanding into this vertical from an adjacent one",
    ],
    process: [
      "Anyone curious how a CodeMyth engagement actually runs before committing to anything",
      "Teams evaluating whether we're the right fit against other studios or an in-house build",
      "Founders who've been burned by vague timelines or scope creep before",
      "Operations leads who need to know exactly what's expected of their team at each phase",
    ],
    insight: ["Founders and engineering leads thinking about how AI fits into their own delivery process", "Anyone evaluating how we think about the work before reaching out", "Teams comparing how different studios talk about AI versus how they actually use it"],
    project: ["Teams in a similar space looking for a reference build", "Founders sizing up what a comparable engagement might look like for them", "Anyone deciding between building this in-house or bringing in outside help"],
    solution: [
      "Founders or teams who recognise this exact shape of problem in their own work",
      "Teams evaluating whether an outside build partner fits better than hiring in-house right now",
      "Operators who've outgrown a spreadsheet, template or DIY tool that used to be enough",
      "Anyone who wants a concrete engagement model before committing to a longer conversation",
      "Teams that tried this in-house or with another studio and hit a wall on scope, quality or timeline",
    ],
  };
  return map[category] || map.capability;
}

// A further, more concrete layer of depth per category — what you
// actually walk away with, and how the phase is typically timeboxed.
// Rendered as two extra sidebar blocks on every detail page.
function deliverablesFor(category) {
  const map = {
    capability: ["A scoped, written plan before any code is written", "Working software deployed to your own domain/infra", "Tests covering the core flows, not just the happy path", "Documentation and a recorded handover walkthrough", "2 weeks of post-launch support included as standard"],
    ai: ["A written spec of exactly what the model is — and isn't — trusted to decide", "An evaluation suite that runs before every prompt/model change ships", "Guardrails and fallback behaviour for low-confidence responses", "Observability into real usage once it's live", "A rollback plan if quality regresses after a change"],
    industry: ["A domain-specific build plan, not a generic template", "Compliance and data-handling requirements designed in from the architecture up", "A live, working build within the first weeks", "A support plan sized to your team's actual capacity", "Reference points from comparable builds in the same vertical"],
    process: ["Clear visibility into what's happening at every point in the phase", "A named point of contact for the whole engagement", "Staging access as soon as there's something to look at", "Transparent flagging of any scope or timeline impact", "A defined handoff at the end of the phase"],
    insight: ["An honest account of how the work actually happens, not a simplified pitch", "Specific, concrete examples rather than abstractions"],
    project: ["A working reference for what a comparable build looks like", "Specific technologies and timelines you can benchmark against"],
    solution: ["A discovery-call scope tailored to your actual stage, not a generic package", "A single named senior owner for the engagement, start to finish", "Weekly visibility into progress — staging builds, not status-update emails", "A clear, upfront number before any work starts, fixed-price or retainer", "A support window built into the engagement after launch, not billed as a surprise add-on"],
  };
  return map[category] || map.capability;
}

function buildEntry({ category, sectionId, title, eyebrow, desc, long, second, third, stack, steps, team, no, metaRight, slugOverride }) {
  const slug = slugOverride || slugify(title);
  return [
    slug,
    {
      slug,
      category,
      sectionId,
      no,
      eyebrow,
      title,
      tagline: desc,
      summary: long || desc,
      second,
      third:
        third ||
        "We're deliberately not the studio that quotes you a number and disappears until the deadline. Expect short, regular check-ins, staging access from early on, and a straight answer any time something turns out to be harder — or easier — than it looked at the start. If a piece of this isn't the right fit for your team, we'll say so directly rather than stretching the engagement to fill a quarter.",
      stack: stack || [],
      steps: steps || [],
      team: team || [],
      whoFor: whoForCategory(category),
      deliverables: deliverablesFor(category),
      faqs: faqsFor(category, title),
      metaRight,
    },
  ];
}

const capabilityEntries = CAPABILITIES.map((c) =>
  buildEntry({
    category: "capability", sectionId: "capabilities", no: c.no,
    eyebrow: "Engineering Capabilities", title: c.title, desc: c.desc,
    long: c.desc,
    second: "We treat this the same way we treat every capability: scoped honestly up front, built by the senior engineer who owns it end to end, and shipped with the tests and monitoring that keep it reliable after launch — not just on demo day.",
    stack: c.tech, steps: c.steps, team: c.team,
  })
);

const aiCapEntries = AI_CAPS.map((c) =>
  buildEntry({
    category: "ai", sectionId: "ai-capabilities", no: c.no,
    eyebrow: "AI Capabilities", title: c.title, desc: c.desc, long: c.long,
    second: "AI sets the pace here, but engineers set the standard — every model output that reaches a real user has passed through an evaluation step and, for anything consequential, a human review gate.",
    stack: c.stack, steps: c.steps,
    team: ["AI & Full-Stack Developer", "QA · Testing"],
  })
);

const industryEntries = INDUSTRIES.map((ind) =>
  buildEntry({
    category: "industry", sectionId: "industries", no: ind.no,
    eyebrow: "Industries", title: ind.title, desc: ind.desc, long: ind.long,
    second: `Every ${ind.title} engagement starts with the same discipline: understand the real workflow before writing a spec, design for the compliance and scale realities of the space, and ship something a real user touches in the first few weeks — not just a demo.`,
    stack: ind.stack,
    steps: [
      { title: "Understand the domain", desc: `We learn how ${ind.title.toLowerCase()} teams actually work before proposing a build.` },
      { title: "Design for the constraints", desc: "Compliance, scale and data-handling needs specific to the space are built in from the architecture up." },
      { title: "Ship and iterate", desc: "A live build in the first weeks, refined against real usage rather than assumptions." },
    ],
    team: ["Business Analyst", "Full-Stack Developer", "QA · Testing"],
  })
);

// Solutions = engagement models (how we work with a given kind of team),
// distinct from Industries above (the domain vertical itself) — each gets
// its own page, namespaced with a "solutions-" slug so e.g. "Startups"
// here never collides with the Industries "Startups" detail page.
const solutionEntries = SOLUTIONS.map((s) =>
  buildEntry({
    category: "solution", sectionId: "business-analysis", no: s.no,
    slugOverride: `solutions-${slugify(s.title)}`,
    eyebrow: "Solutions", title: s.title, desc: s.desc, long: s.long,
    second: s.second,
    stack: s.stack, steps: s.steps, team: s.team,
  })
);

const processEntries = PROCESS.map((p) =>
  buildEntry({
    category: "process", sectionId: "approach", no: p.no,
    eyebrow: "How We Work", title: p.title, desc: p.meta, long: p.long || p.meta,
    second: "This phase isn't a black box — you'll know exactly what's happening, who's doing it, and what happens next at every point along the way.",
    steps: p.steps, metaRight: p.meta,
  })
);

const insightEntries = INSIGHTS.map((a) =>
  buildEntry({
    category: "insight", sectionId: "insights", no: undefined,
    eyebrow: `${a.cat} · ${a.date}`, title: a.title, desc: a.desc, long: a.long,
    second: "We publish these because most of what's written about software delivery and AI is either pure hype or pure cynicism — this is just an honest account of how we actually work.",
    steps: a.steps,
  })
);

const workEntries = WORK.map((p) =>
  buildEntry({
    category: "project", sectionId: "work", no: undefined,
    eyebrow: `${p.industry} · ${p.tag}`, title: p.title, desc: p.desc, long: p.desc,
    second: `${p.title} is ${p.status === "Live" ? "live in production today" : "currently in active development"}. It was built the same way every CodeMyth project is: scoped honestly, built by a senior owner end to end, and shipped with real monitoring — not left as a prototype.`,
    stack: p.tech,
    steps: [
      { title: "Scope & validate", desc: "The core workflow mapped and validated before a line of code was written." },
      { title: "Build the core", desc: "Front end, back end and data layer built in parallel by the owning engineer." },
      { title: "Ship & measure", desc: "Deployed with monitoring in place, then iterated against real usage." },
    ],
  })
);

const showcaseEntries = SHOWCASE.filter((p) => !WORK.some((w) => w.title === p.title)).map((p) =>
  buildEntry({
    category: "project", sectionId: "showcase", no: undefined,
    eyebrow: p.cat, title: p.title, desc: p.desc, long: p.desc,
    second: "One of the recent builds from our project showcase — a real engagement, not a concept mockup.",
    stack: p.tech,
    steps: [
      { title: "Scope & validate", desc: "The core workflow mapped and validated before a line of code was written." },
      { title: "Build the core", desc: "Front end, back end and data layer built in parallel by the owning engineer." },
      { title: "Ship & measure", desc: "Deployed with monitoring in place, then iterated against real usage." },
    ],
  })
);

export const DETAILS = Object.fromEntries([
  ...capabilityEntries,
  ...aiCapEntries,
  ...industryEntries,
  ...solutionEntries,
  ...processEntries,
  ...insightEntries,
  ...workEntries,
  ...showcaseEntries,
]);

export function getDetail(slug) {
  return DETAILS[slug] || null;
}

export function relatedDetails(entry, count = 3) {
  if (!entry) return [];
  return Object.values(DETAILS)
    .filter((d) => d.category === entry.category && d.slug !== entry.slug)
    .slice(0, count);
}
