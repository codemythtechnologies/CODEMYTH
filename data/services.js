export const services = [
  {
    key: "fullstack",
    num: "01",
    icon: "fullstack",
    title: "Full stack development",
    summary:
      "End-to-end web apps with the MERN stack, built and deployed by us — from data model to the live domain, with no handoff gaps between front end and back end.",
    tags: ["React", "Node.js", "MongoDB", "Express"],
    detailTitle: "Full stack development",
    detailBody:
      "We design the data model first, then build front end and back end together in the same weekly cycle so nothing gets out of sync. MERN by default; we'll match your existing stack if you have one.",
    metrics: [
      { value: "1–2", label: "WEEKS TO MVP" },
      { value: "REST", label: "+ SOCKETS" },
      { value: "100%", label: "OWNED CODE" },
    ],
    footnote:
      "We also handle deployments, CI/CD, and staging environments — so your app is always one click away from production.",
  },
  {
    key: "ai",
    num: "02",
    icon: "ai",
    title: "AI integration",
    summary:
      "LLM-powered assistants, chatbots, and intelligent automation, wrapped in the guardrails and evaluation tooling that keep them predictable once real users show up.",
    tags: ["OpenAI", "Claude API", "RAG", "Vector DB"],
    detailTitle: "AI integration",
    detailBody:
      "We start by picking the smallest model that hits your accuracy bar — not the biggest one available — then wrap it with guardrails, evaluation sets, and fallback logic so it behaves predictably in production.",
    checklist: [
      "Model & provider selection against your budget",
      "Prompt design + evaluation dataset",
      "Guardrails for hallucination & cost control",
    ],
    footnote:
      "We also set up monitoring dashboards so you can see exactly how many tokens are being used and at what cost — no surprise bills.",
  },
  {
    key: "landing",
    num: "03",
    icon: "landing",
    title: "Landing pages",
    summary:
      "Fast, responsive, high-converting sites that launch in days — built mobile-first with real motion and copy that's tuned to convert, not just look nice.",
    tags: ["Next.js", "Tailwind", "SEO", "A/B ready"],
    detailTitle: "Landing pages",
    detailBody:
      "Copy and layout come before code. We draft the message hierarchy, get your sign-off on a single static mockup, then build it responsive-first with real animations — live in days, not weeks.",
    metrics: [
      { value: "2–5", label: "DAYS TO LAUNCH" },
      { value: "95+", label: "LIGHTHOUSE SCORE" },
      { value: "1", label: "ROUND OF REVISIONS" },
    ],
    footnote:
      "We also include basic SEO setup, meta tags, and analytics integration so you can start tracking conversions from day one.",
  },
  {
    key: "api",
    num: "04",
    icon: "api",
    title: "API development",
    summary:
      "Scalable backends and REST APIs designed to grow with you, with documentation, auth, and rate-limiting built in from day one instead of bolted on later.",
    tags: ["REST", "GraphQL", "PostgreSQL", "Docker"],
    detailTitle: "API development",
    detailBody:
      "We design the schema and write the docs before the first endpoint exists, then build with versioning and rate limits in from day one — so the API you ship in month one doesn't break the client you add in month six.",
    code: [
      { n: 1, k: "GET", s: "/v1/projects/:id" },
      { n: 2, c: "// versioned, rate-limited, documented" },
      { n: 3, k: "200", s: "OK — 42ms" },
      { n: 4, c: "✓ OpenAPI spec auto-generated" },
    ],
    footnote:
      "We also include a Postman collection and sample client code so your frontend team can start integrating immediately.",
  },
];

export const pipeline = [
  { title: "Generate", text: "Scaffold features & boilerplate with AI pair-programming", icon: "generate" },
  { title: "Test", text: "AI-generated test suites cover edge cases humans miss", icon: "test" },
  { title: "Review", text: "A human engineer reviews every AI-touched line before merge", icon: "review" },
  { title: "Ship", text: "Staged rollout to production with monitoring from day one", icon: "ship" },
  { title: "Monitor", text: "Uptime, error, and performance alerts stay on after handover", icon: "monitor" },
];
