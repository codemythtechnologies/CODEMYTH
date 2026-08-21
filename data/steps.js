export const steps = [
  {
    num: "01",
    title: "Scope",
    duration: "Requirements & Planning · 3–4 days",
    icon: "search",
    intro:
      "We start with a free call to understand your goals, users, and constraints, then scope the project into a clear, fixed plan before any code is written. You'll get a written proposal covering deliverables, tech choices, timeline, and price — no surprises once work begins.",
    checklist: [
      "Requirements call scheduled",
      "Scope & timeline drafted",
      "Fixed-price quote sent",
      "Tech stack & architecture agreed upfront",
    ],
    footnote: "We also share past work and client references during this phase so you know exactly who you're working with.",
  },
  {
    num: "02",
    title: "Build",
    duration: "Data & Code Build · 2–4 weeks",
    icon: "code",
    intro:
      "Development happens in short weekly cycles. You get a staging link from day one so you can watch the product take shape in real time, leave feedback inline, and reprioritize what gets built next without waiting for a big reveal at the end.",
    checklist: ["Weekly demo call + async Slack updates", "Git history & commits visible to you throughout"],
    footnote: "You can also request a dedicated Discord or Slack channel for real-time updates and file sharing.",
    code: [
      { n: 1, text: "import { Router } from 'express'" },
      { n: 2, text: "// weekly build — cycle 03" },
      { n: 3, text: "router.post('/api/deploy', handler)" },
      { n: 4, text: "✓ staging.codemyth.dev updated" },
    ],
  },
  {
    num: "03",
    title: "Quality Assurance",
    duration: "2–5 days",
    icon: "check",
    intro:
      "Before anything reaches you, it goes through AI-generated test cases for edge conditions, automated regression checks, and a manual QA pass across real devices and browsers. Every AI-touched line is also read and signed off by a human engineer — nothing ships on autopilot.",
    checklist: [
      "AI-generated edge-case test suite",
      "Cross-device & cross-browser QA pass",
      "Manual review of every AI-touched line",
      "Performance & accessibility audit before sign-off",
    ],
    footnote: "We also run a security scan and dependency audit so you're not inheriting any hidden vulnerabilities.",
  },
  {
    num: "04",
    title: "Deploy",
    duration: "1 day",
    icon: "rocket",
    intro:
      "We deploy to production, connect your domain, and run a final smoke test before handing over the keys. You leave this stage with a live URL, full source access, and a short handover doc explaining how everything fits together.",
    metrics: [
      { value: "99.9%", label: "UPTIME TARGET" },
      { value: "<200ms", label: "AVG RESPONSE" },
      { value: "A+", label: "SECURITY GRADE" },
    ],
    footnote: "We also set up uptime monitoring and alerts so you're notified immediately if anything goes wrong post-launch.",
  },
  {
    num: "05",
    title: "Tech Support",
    duration: "Ongoing",
    icon: "support",
    intro:
      "Every project ships with a support window for bug fixes, and we're happy to stay on for ongoing feature work after launch. Most clients move to a light monthly retainer once the initial build is stable, so there's always someone who already knows the codebase on call.",
    checklist: [
      "30-day bug-fix window included",
      "Direct Slack/email access to your team",
      "Optional monthly retainer for upkeep",
      "Uptime monitoring & alerting set up before we hand over",
    ],
    footnote: "We also offer training sessions for your team so they feel comfortable extending the codebase themselves.",
  },
];
