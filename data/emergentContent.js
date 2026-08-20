// Content for the redesigned homepage (emergent-inspired design).
// Real CodeMyth Technologies data — same contact details, email and phone
// numbers already wired into ContactSection / BaConsultModal's backend
// submission logic. This file is presentation data only.

export const CONTACT = {
  email: "info@codemyth.in",
  emailSecondary: "codemyth.technologies@gmail.com",
  phonePrimary: "+91 7397703202",
  phoneSecondary: "+91 9384279015",
  location: "Siruseri, Chennai — Remote worldwide",
  udyam: "UDYAM-PY-03-0057608",
  github: "https://github.com/codemythtechnologies",
  linkedin: "https://www.linkedin.com/company/code-myth-technologies",
};

export const NAV = [
  {
    label: "Services",
    title: "Capabilities",
    sectionId: "capabilities",
    items: [
      {
        title: "Full-Stack Engineering", desc: "End-to-end MERN web apps, built and deployed by us.",
        long: "We own the whole stack — data model, API, front end and the live domain — so nothing gets lost in a handoff between teams.",
        stack: ["React", "Node.js", "MongoDB", "Express"],
        steps: [
          { title: "Model the data", desc: "Schema and API contracts drafted against your real workflows, not a generic CRUD template." },
          { title: "Build in parallel", desc: "Front end and back end move together, with a shared API contract from day one." },
          { title: "Deploy & own it", desc: "We ship to your domain and stay attached for the first weeks of real traffic." },
        ],
      },
      {
        title: "AI Engineering", desc: "LLM assistants, chatbots and intelligent automation.",
        long: "LLM-powered assistants and automation, wrapped in the guardrails and evaluation tooling that keep them predictable once real users show up.",
        stack: ["OpenAI", "Claude API", "RAG", "Vector DB"],
        steps: [
          { title: "Define the task", desc: "Scope exactly what the model should — and shouldn't — be trusted to decide." },
          { title: "Ground it in your data", desc: "Retrieval over your own documents, not just the model's memory." },
          { title: "Evaluate before ship", desc: "Automated eval suites catch regressions before a prompt or model change reaches users." },
        ],
      },
      {
        title: "Web Development", desc: "Fast, high-converting sites that launch in days.",
        long: "Mobile-first sites with real motion and copy tuned to convert, built and live in days rather than months.",
        stack: ["Next.js", "Tailwind", "SEO", "A/B ready"],
        steps: [
          { title: "Wireframe fast", desc: "Structure and copy locked before visual polish starts." },
          { title: "Build with motion", desc: "Interactions and animation added with performance budgets in mind." },
          { title: "Launch & measure", desc: "Analytics and A/B hooks wired in from the first deploy." },
        ],
      },
      {
        title: "Backend Engineering", desc: "Scalable services and reliable core logic at scale.",
        long: "Core services designed to stay reliable as load grows, with the boring-but-critical parts — logging, retries, rate limits — handled up front.",
        stack: ["Node.js", "PostgreSQL", "Redis", "Docker"],
        steps: [
          { title: "Design for load", desc: "Data access patterns modelled against your expected scale, not just today's traffic." },
          { title: "Harden the core", desc: "Retries, idempotency and rate limiting built in, not bolted on after an incident." },
          { title: "Observe in production", desc: "Logging and alerting so issues surface before users report them." },
        ],
      },
      {
        title: "API Development", desc: "REST & GraphQL backends with auth and docs built in.",
        long: "Backends built to be integrated against confidently — documented, versioned, and secured from the first endpoint.",
        stack: ["REST", "GraphQL", "OpenAPI", "OAuth2"],
        steps: [
          { title: "Contract first", desc: "Endpoints designed and documented before implementation starts." },
          { title: "Secure by default", desc: "Auth, rate-limiting and input validation built into the base template." },
          { title: "Version deliberately", desc: "Breaking changes ship behind a version bump, never silently." },
        ],
      },
      {
        title: "Product Development", desc: "Idea to build-ready PRD with a dedicated analyst.",
        long: "A dedicated Business Analyst turns a raw idea into a build-ready PRD your dev team can execute from day one.",
        stack: ["Discovery", "PRD", "Roadmapping"],
        steps: [
          { title: "Validate the idea", desc: "Market sizing and problem validation before any spec gets written." },
          { title: "Write the PRD", desc: "A build-ready document engineers can estimate and execute against directly." },
          { title: "Roadmap the build", desc: "Phased milestones so you see something live early, not just at the end." },
        ],
      },
    ],
  },
  {
    label: "Solutions",
    title: "Solutions",
    sectionId: "business-analysis",
    items: [
      {
        title: "Startups", desc: "Ship an MVP fast without cutting engineering corners.",
        long: "Structured MVP roadmaps and go-to-market plans for founders preparing to build or raise — engineered to survive contact with real users.",
        stack: ["MVP scoping", "GTM", "Fundraise-ready"],
        slug: "solutions-startups",
      },
      {
        title: "SaaS", desc: "Multi-tenant products built to scale with your users.",
        long: "Multi-tenant, subscription-ready products engineered with the billing, permissions and scaling concerns SaaS teams hit early.",
        stack: ["Multi-tenant", "Billing", "RBAC"],
        slug: "solutions-saas",
      },
      {
        title: "Digital Products", desc: "Launch-ready products with real motion and craft.",
        long: "Consumer-grade polish — motion, typography and interaction detail — applied to products that need to feel finished on day one.",
        stack: ["Design systems", "Motion", "Next.js"],
        slug: "solutions-digital-products",
      },
      {
        title: "Business Automation", desc: "Automate the checks that eat whole afternoons.",
        long: "The recurring manual work — reconciliation, reporting, data entry — automated so your team spends time on judgement calls, not busywork.",
        stack: ["Workflow automation", "Integrations", "Alerts"],
        slug: "solutions-business-automation",
      },
      {
        title: "AI Solutions", desc: "AI woven into the product the right way.",
        long: "AI added where it demonstrably saves time or money — not as a bolt-on chatbot bubble in the corner of the screen.",
        stack: ["LLM integration", "RAG", "Evaluation"],
        slug: "solutions-ai-solutions",
      },
      {
        title: "Internal Platforms", desc: "Dashboards, admin panels and data tools.",
        long: "Internal dashboards and admin tools built for the people who'll use them daily — fast, unglamorous, and reliable.",
        stack: ["Admin panels", "Dashboards", "Role-based access"],
        slug: "solutions-internal-platforms",
      },
    ],
  },
  {
    label: "AI",
    title: "Engineering with intelligence",
    sectionId: "ai-era",
    items: [
      {
        title: "AI Engineering", desc: "AI treated as part of the engineering process.",
        long: "AI scaffolds builds, generates edge-case tests and automates QA — every AI-touched line still reviewed and merged by a human engineer.",
        stack: ["AI-assisted delivery", "Human review"],
        steps: [
          { title: "Generate", desc: "AI scaffolds boilerplate, tests and first-pass implementations." },
          { title: "Review", desc: "A senior engineer reviews and rewrites anything that doesn't meet the bar." },
          { title: "Ship", desc: "Only reviewed, tested code reaches production — AI sets the pace, engineers set the standard." },
        ],
      },
      {
        title: "AI Agents", desc: "Autonomous agents with guardrails and evaluation.",
        long: "Agents that take multi-step actions inside guardrails you define, with evaluation loops that catch drift before it reaches users.",
        stack: ["Tool use", "Guardrails", "Evaluation loops"],
        steps: [
          { title: "Define the guardrails", desc: "Exactly what the agent can and can't do, decided up front." },
          { title: "Give it tools", desc: "Scoped access to the systems it actually needs, nothing more." },
          { title: "Evaluate continuously", desc: "Ongoing eval runs to catch behaviour drift after launch." },
        ],
      },
      {
        title: "LLM Applications", desc: "Production LLM apps, predictable under real users.",
        long: "LLM apps engineered to stay predictable once real users — not test prompts — start hitting them.",
        stack: ["Prompt engineering", "Evaluation", "Observability"],
        steps: [
          { title: "Design the prompts", desc: "Structured prompting with tested fallbacks for edge cases." },
          { title: "Load test", desc: "Real-world input variety run through before launch, not just happy paths." },
          { title: "Monitor in prod", desc: "Ongoing observability so quality regressions get caught fast." },
        ],
      },
      {
        title: "RAG Systems", desc: "Citation-backed retrieval over your own data.",
        long: "Retrieval-augmented systems that ground answers in your own documents and cite their sources, instead of guessing from memory.",
        stack: ["Vector DB", "Chunking", "Citations"],
        steps: [
          { title: "Index your data", desc: "Chunking and embedding tuned to your document structure." },
          { title: "Retrieve with precision", desc: "Ranking tuned so the model sees the right context, not just any context." },
          { title: "Cite every answer", desc: "Responses link back to source documents so answers stay verifiable." },
        ],
      },
      {
        title: "AI Automation", desc: "Automate QA, testing and repetitive builds.",
        long: "AI-generated test suites and QA passes that catch bugs before your users do — reviewed, not blindly trusted.",
        stack: ["Test generation", "QA automation"],
        steps: [
          { title: "Generate coverage", desc: "AI drafts edge-case tests a human would take hours to enumerate." },
          { title: "Review the suite", desc: "Engineers prune and validate generated tests before they run in CI." },
          { title: "Run on every change", desc: "The suite gates every merge, catching regressions automatically." },
        ],
      },
      {
        title: "AI Integration", desc: "Drop intelligence into existing products.",
        long: "AI dropped into an existing product where it saves real time for real users, without a rebuild.",
        stack: ["API integration", "Incremental rollout"],
        steps: [
          { title: "Find the fit", desc: "The one workflow inside your existing product where AI clearly helps." },
          { title: "Integrate incrementally", desc: "Shipped behind a flag, rolled out gradually, measured as it goes." },
          { title: "Support long-term", desc: "Model and prompt updates maintained after launch, not left to drift." },
        ],
      },
    ],
  },
  {
    label: "Industries",
    title: "Industries",
    sectionId: "industries",
    items: [
      { title: "FinTech", desc: "Secure, compliant financial products.",
        long: "Secure, auditable financial products with the compliance and audit trail baked in from day one, not patched in after a review.",
        stack: ["Compliance", "Audit trails", "Encryption"] },
      { title: "HealthTech", desc: "Research tools and healthcare platforms.",
        long: "Research assistants and healthcare platforms — like Curalink, our AI medical research tool — built with the data-handling care the domain demands.",
        stack: ["HIPAA-aware", "Data privacy", "Research tooling"] },
      { title: "EdTech", desc: "Learning products that scale.",
        long: "Learning platforms and tools that stay fast and reliable as usage — and course catalogues — grow.",
        stack: ["Content delivery", "Progress tracking"] },
      { title: "SaaS", desc: "Subscription software done right.",
        long: "Subscription software with the multi-tenant, billing and permission foundations SaaS teams need from launch.",
        stack: ["Multi-tenant", "Billing", "Analytics"] },
      { title: "Startups", desc: "From idea to first 100 users.",
        long: "From a raw idea to your first 100 users — MVP scoping, build and launch without the engineering shortcuts that come back to bite you.",
        stack: ["MVP", "Go-to-market"] },
      { title: "Business Technology", desc: "Internal systems for real teams.",
        long: "Dashboards, admin panels and real-time data visualisation built for the operating teams who use them every day.",
        stack: ["Dashboards", "Internal tools"] },
    ],
  },
  {
    label: "Company",
    title: "Company",
    items: [
      { title: "About", desc: "Who we are and how we think.", sectionId: "ai-era" },
      { title: "Our Team", desc: "The senior team behind the build.", sectionId: "team" },
      { title: "Our Approach", desc: "How we work, from scope to support.", sectionId: "approach" },
      { title: "Projects", desc: "Real products, deployed and live.", sectionId: "work" },
      { title: "FAQ", desc: "Answers on process, pricing and scope.", sectionId: "faq" },
      { title: "Contact", desc: "Start a project or talk to us.", sectionId: "contact" },
    ],
  },
];

export const TRUST = [
  "FULL-STACK ENGINEERING", "AI ENGINEERING", "PRODUCTION SYSTEMS", "DIGITAL PRODUCTS", "DIRECT COLLABORATION",
];

export const CAPABILITIES = [
  {
    no: "01", title: "Full-Stack Engineering",
    desc: "End-to-end web apps with the MERN stack, built and deployed by us — from data model to the live domain, with no handoff gaps between front end and back end.",
    tech: ["React", "Node.js", "MongoDB", "Express"],
    steps: [
      { title: "Model the data", desc: "Schema and API contracts drafted against your real workflows, not a generic CRUD template." },
      { title: "Build in parallel", desc: "Front end and back end move together against a shared API contract from day one." },
      { title: "Deploy & own it", desc: "We ship to your domain and stay attached through the first weeks of real traffic." },
      { title: "Instrument & monitor", desc: "Error tracking and performance monitoring wired in before launch, not added reactively after something breaks." },
    ],
    team: ["Full-Stack Developer", "DevOps", "QA"],
  },
  {
    no: "02", title: "AI Engineering",
    desc: "LLM-powered assistants, chatbots and intelligent automation, wrapped in the guardrails and evaluation tooling that keep them predictable once real users show up.",
    tech: ["OpenAI", "Claude API", "RAG", "Vector DB"],
    steps: [
      { title: "Define the task", desc: "Scope exactly what the model should — and shouldn't — be trusted to decide." },
      { title: "Ground it in your data", desc: "Retrieval over your own documents, not just the model's memory." },
      { title: "Evaluate before ship", desc: "Automated eval suites catch regressions before a prompt or model change reaches users." },
      { title: "Monitor real usage", desc: "Ongoing observability into live queries, so drift and edge cases surface fast instead of quietly accumulating." },
    ],
    team: ["AI & Full-Stack Developer", "QA · Testing"],
  },
  {
    no: "03", title: "Web Experiences",
    desc: "Fast, responsive, high-converting sites that launch in days — built mobile-first with real motion and copy that's tuned to convert, not just look nice.",
    tech: ["Next.js", "Tailwind", "SEO", "A/B ready"],
    steps: [
      { title: "Wireframe fast", desc: "Structure and copy locked before visual polish starts." },
      { title: "Build with motion", desc: "Interactions and animation layered in with performance budgets in mind." },
      { title: "Launch & measure", desc: "Analytics and A/B hooks wired in from the first deploy." },
      { title: "Iterate on real data", desc: "Copy and layout refined against actual visitor behaviour, not a single internal opinion." },
    ],
    team: ["Full-Stack Developer", "Business Analyst"],
  },
  {
    no: "04", title: "API & Backend Engineering",
    desc: "Scalable backends and REST APIs designed to grow with you, with documentation, auth and rate-limiting built in from day one instead of bolted on later.",
    tech: ["REST", "GraphQL", "PostgreSQL", "Docker"],
    steps: [
      { title: "Contract first", desc: "Endpoints designed and documented before implementation starts." },
      { title: "Harden the core", desc: "Auth, retries and rate-limiting built into the base template, not bolted on later." },
      { title: "Observe in production", desc: "Logging and monitoring set up by DevOps so issues surface before users report them." },
      { title: "Load-test before scale hits", desc: "Capacity checked against realistic traffic assumptions, not just a happy-path smoke test." },
    ],
    team: ["Java Developer", "DevOps", "Cybersecurity Analyst"],
  },
];

export const AI_FLOW = ["USER", "APP", "DATA", "MODEL", "TOOLS", "AGENT", "EVAL", "PRODUCTION"];

export const AI_CAPS = [
  {
    no: "01", title: "AI Applications", desc: "Production LLM apps that stay predictable once real users arrive.",
    long: "Production LLM apps engineered to hold up once real, messy user input replaces clean test prompts.",
    stack: ["Prompt engineering", "Evaluation", "Observability"],
    steps: [
      { title: "Design the prompts", desc: "Structured prompting with tested fallbacks for edge cases." },
      { title: "Load test", desc: "Real-world input variety run through before launch, not just happy paths." },
      { title: "Monitor in prod", desc: "Ongoing observability so quality regressions get caught fast." },
      { title: "Iterate on real queries", desc: "Actual user prompts, not just the test set, shape what gets tuned next." },
    ],
  },
  {
    no: "02", title: "AI Agents", desc: "Autonomous agents with guardrails, tools and evaluation loops.",
    long: "Agents that take multi-step actions inside guardrails you define, with evaluation loops that catch drift before it reaches users.",
    stack: ["Tool use", "Guardrails", "Evaluation loops"],
    steps: [
      { title: "Define the guardrails", desc: "Exactly what the agent can and can't do, decided up front." },
      { title: "Give it tools", desc: "Scoped access to the systems it actually needs, nothing more." },
      { title: "Evaluate continuously", desc: "Ongoing eval runs to catch behaviour drift after launch." },
      { title: "Human escalation path", desc: "A defined handoff for anything the agent shouldn't resolve on its own." },
    ],
  },
  {
    no: "03", title: "RAG", desc: "Citation-backed retrieval — 100+ papers per query, grounded answers.",
    long: "Retrieval-augmented generation that grounds every answer in your own documents and cites its sources — built this way for Curalink, our medical research assistant.",
    stack: ["Vector DB", "Chunking", "Citations"],
    steps: [
      { title: "Index your data", desc: "Chunking and embedding tuned to your document structure." },
      { title: "Retrieve with precision", desc: "Ranking tuned so the model sees the right context, not just any context." },
      { title: "Cite every answer", desc: "Responses link back to source documents so answers stay verifiable." },
      { title: "Keep the index fresh", desc: "New and updated source documents get re-indexed on a schedule, not left stale." },
    ],
  },
  {
    no: "04", title: "LLM Integration", desc: "Drop intelligence into existing products where it saves real time.",
    long: "AI dropped into an existing product where it saves real time for real users, without a rebuild.",
    stack: ["API integration", "Incremental rollout"],
    steps: [
      { title: "Find the fit", desc: "The one workflow inside your existing product where AI clearly helps." },
      { title: "Integrate incrementally", desc: "Shipped behind a flag, rolled out gradually, measured as it goes." },
      { title: "Support long-term", desc: "Model and prompt updates maintained after launch, not left to drift." },
      { title: "Measure the time saved", desc: "The feature is judged against a concrete before/after metric, not a vibe." },
    ],
  },
  {
    no: "05", title: "Automation", desc: "AI-generated test suites and QA that catch bugs before your users.",
    long: "AI-generated test suites and QA passes that catch bugs before your users do — reviewed, not blindly trusted.",
    stack: ["Test generation", "QA automation"],
    steps: [
      { title: "Generate coverage", desc: "AI drafts edge-case tests a human would take hours to enumerate." },
      { title: "Review the suite", desc: "Engineers prune and validate generated tests before they run in CI." },
      { title: "Run on every change", desc: "The suite gates every merge, catching regressions automatically." },
      { title: "Prune stale tests", desc: "Coverage is kept meaningful over time instead of accumulating brittle, ignored tests." },
    ],
  },
  {
    no: "06", title: "AI Evaluation", desc: "Every AI-touched line is reviewed by a human engineer before merge.",
    long: "Every AI-touched line is reviewed by a human engineer before merge — AI sets the pace, engineers set the standard.",
    stack: ["Human review", "CI gating"],
    steps: [
      { title: "Flag AI-touched code", desc: "Every AI-generated diff is tagged for review, never silently merged." },
      { title: "Review against standard", desc: "A senior engineer checks it against the same bar as hand-written code." },
      { title: "Gate the merge", desc: "Nothing reaches main — or production — without that human sign-off." },
      { title: "Track the review bar", desc: "We track how often AI-touched code needs rework, so the process itself keeps improving." },
    ],
  },
];

export const PRODUCT_STEPS = ["Idea", "Validate", "Define", "Design", "Build", "Launch"];

export const INDUSTRIES = [
  {
    no: "01", title: "Startups", icon: "rocket",
    desc: "Structured MVP roadmaps and go-to-market plans for founders preparing to build or raise.",
    long: "From a raw idea to your first 100 users — MVP scoping, build and launch without the engineering shortcuts that come back to bite you at the next round.",
    stack: ["MVP scoping", "Go-to-market", "Fundraise-ready"],
    img: "https://images.unsplash.com/photo-1552664730-d307ca884978?crop=entropy&cs=srgb&fm=jpg&q=80&w=1200",
  },
  {
    no: "02", title: "SaaS", icon: "layers",
    desc: "Multi-tenant, subscription-ready products engineered to scale with your user base.",
    long: "Multi-tenant, subscription-ready products engineered with the billing, permissions and scaling concerns SaaS teams hit early — not months in.",
    stack: ["Multi-tenant", "Billing", "RBAC"],
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=srgb&fm=jpg&q=80&w=1200",
  },
  {
    no: "03", title: "FinTech", icon: "landmark",
    desc: "Secure, auditable financial products with the compliance baked in from day one.",
    long: "Secure, auditable financial products with the compliance and audit trail baked in from day one, not patched in after a security review.",
    stack: ["Compliance", "Audit trails", "Encryption"],
    img: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?crop=entropy&cs=srgb&fm=jpg&q=80&w=1200",
  },
  {
    no: "04", title: "EdTech", icon: "graduation",
    desc: "Learning platforms and tools that stay fast and reliable as usage grows.",
    long: "Learning platforms and tools that stay fast and reliable as usage — and course catalogues — grow well past launch numbers.",
    stack: ["Content delivery", "Progress tracking", "Scale"],
    img: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?crop=entropy&cs=srgb&fm=jpg&q=80&w=1200",
  },
  {
    no: "05", title: "HealthTech", icon: "pulse",
    desc: "Research assistants and healthcare platforms — like Curalink, our AI medical tool.",
    long: "Research assistants and healthcare platforms — like Curalink, our AI medical research tool — built with the data-handling care the domain demands.",
    stack: ["Data privacy", "Research tooling", "RAG"],
    img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?crop=entropy&cs=srgb&fm=jpg&q=80&w=1200",
  },
  {
    no: "06", title: "Internal Business Systems", icon: "building",
    desc: "Dashboards, admin panels and real-time data visualisation for operating teams.",
    long: "Dashboards, admin panels and real-time data visualisation built for the operating teams who use them every single day.",
    stack: ["Dashboards", "Admin panels", "Real-time data"],
    img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?crop=entropy&cs=srgb&fm=jpg&q=80&w=1200",
  },
];

export const WORK = [
  {
    title: "Curalink", tag: "AI medical research assistant", status: "Live",
    desc: "Fetches 100+ research papers per query with citation-backed AI responses — a production research assistant for medical teams.",
    tech: ["React", "Node.js", "DeepSeek-R1", "MongoDB", "Ollama"],
    industry: "HealthTech",
    img: "https://images.unsplash.com/photo-1666886573301-b5d526cfd518?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600",
  },
  {
    title: "FlowBoard", tag: "Real-time analytics dashboard", status: "In development",
    desc: "Live metrics and event streaming for product teams who need answers in seconds, not hours.",
    tech: ["React", "D3", "WebSocket", "PostgreSQL"],
    industry: "SaaS",
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600",
  },
  {
    title: "Slate Docs", tag: "AI document summarizer", status: "In development",
    desc: "Upload a PDF, get a clean summary and searchable Q&A powered by local LLMs.",
    tech: ["Python", "Llama 3.1", "FastAPI"],
    industry: "Productivity",
    img: "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600",
  },
];

// Full write-ups behind the navbar's "Solutions" dropdown. These are
// engagement models / packages (how we work with a given kind of team),
// distinct from INDUSTRIES above (which is the domain vertical itself).
// Each one gets its own dedicated page at /detail/solutions-{slug} — see
// solutionEntries in data/detailContent.js.
export const SOLUTIONS = [
  {
    no: "01", title: "Startups", icon: "rocket",
    desc: "Ship an MVP fast without cutting the engineering corners that come back to bite you at your next raise.",
    long: "Most startup engagements start the same way: a validated idea, a deadline, and not enough in-house engineering bandwidth to hit it safely. We slot in as your build team — moving fast without skipping the schema decisions, auth model or test coverage that a technical co-founder or an investor's diligence call will actually check.",
    second: "Pricing is runway-aware: fixed-price for a well-scoped MVP, or a monthly retainer if you need an ongoing build partner through your first few releases. Either way, you get a single senior owner, not a rotating pool of contractors learning your codebase on your dime.",
    stack: ["MVP scoping", "Fundraise-ready architecture", "Weekly demos", "Runway-aware pricing"],
    steps: [
      { title: "Discovery sprint", desc: "One focused week to turn the idea into a scoped, build-ready MVP definition — what ships in v1, what waits." },
      { title: "Build in public increments", desc: "Weekly demo builds on a staging URL, so you're watching progress in real time, not waiting for a big reveal." },
      { title: "Launch-ready hardening", desc: "Auth, error handling and basic monitoring added before the public launch — not left as 'fix it later'." },
      { title: "First-users iteration window", desc: "2–4 weeks of fast follow-up fixes once real users start touching the product, included as standard." },
    ],
    team: ["Business Analyst", "Full-Stack Developer", "QA · Testing"],
  },
  {
    no: "02", title: "SaaS", icon: "layers",
    desc: "Multi-tenant, subscription-ready products engineered to survive customer #1 through customer #10,000.",
    long: "SaaS products hit the same wall at different sizes: tenant data isolation, billing edge cases, and permissions that were fine for 5 customers but fall over at 500. We design those foundations up front — not as a rebuild eighteen months in — so the architecture that ships on day one is still the architecture you're running at scale.",
    second: "Every SaaS build includes a real billing integration (Stripe or your provider of choice), role-based access control, and a data model that keeps tenants cleanly isolated from the first migration onward.",
    stack: ["Multi-tenant architecture", "Stripe / billing", "RBAC & permissions", "Usage-based metering"],
    steps: [
      { title: "Design for tenants", desc: "Data isolation and permission boundaries modelled in at the schema level, before any UI is built." },
      { title: "Wire up billing", desc: "Subscription tiers, usage-based metering and dunning/failed-payment handling integrated from the start." },
      { title: "Build the admin surface", desc: "Internal tooling for support and ops to manage tenants, without touching the database directly." },
      { title: "Load-test before scale hits", desc: "Query and index review against realistic tenant volume, so growth doesn't surface a rewrite." },
    ],
    team: ["Full-Stack Developer", "Backend Engineer", "QA · Testing"],
  },
  {
    no: "03", title: "Digital Products", icon: "sparkles",
    desc: "Consumer-grade products that feel finished on launch day, not a 'v1 with rough edges'.",
    long: "For consumer-facing products, the bar isn't just 'it works' — it's motion, typography and interaction detail that reads as intentional rather than default. We build a design system once and reuse it everywhere, so every screen feels like part of the same product instead of a patchwork of one-off components.",
    second: "Cross-device QA — real devices, not just a resized browser window — happens before launch, so 'looks great on my laptop' never becomes a support ticket from a user on an older phone.",
    stack: ["Design systems", "Motion design", "Next.js", "Cross-device QA"],
    steps: [
      { title: "Craft the design system", desc: "Typography, spacing, colour and component rules defined once, so the whole product feels coherent." },
      { title: "Add real motion", desc: "Interaction and transition detail that signals quality without adding perceptible load-time cost." },
      { title: "Build responsively first", desc: "Layouts built and tested across breakpoints as we go, not patched for mobile at the end." },
      { title: "Ship launch-ready", desc: "Real-device QA and performance passes before launch — a beta tag is never used as an excuse for bugs." },
    ],
    team: ["Full-Stack Developer", "QA · Testing"],
  },
  {
    no: "04", title: "Business Automation", icon: "workflow",
    desc: "Turn the recurring manual work eating your team's afternoons into a workflow that runs itself.",
    long: "Reconciliation spreadsheets, copy-pasted reports, manual data entry between two systems that don't talk to each other — most operations teams are running two or three of these on repeat every week. We map the actual process first, then automate the repetitive part while keeping a human explicitly in the loop for anything that genuinely needs judgement.",
    second: "The goal isn't to remove people from the workflow — it's to stop them from spending their afternoon on work a script can do reliably, so they can spend it on the exceptions that actually need a human decision.",
    stack: ["Workflow automation", "System integrations", "Alerting", "Audit logging"],
    steps: [
      { title: "Map the real workflow", desc: "We shadow the actual manual process — not the documented version — before proposing what to automate." },
      { title: "Automate the repeatable part", desc: "Rules-based or AI-assisted automation for the steps that don't need a human judgement call." },
      { title: "Alert on exceptions", desc: "Anything outside the expected pattern routes to a human, with full context, instead of failing silently." },
      { title: "Log everything", desc: "Every automated action is logged and auditable, so trust in the system builds instead of eroding." },
    ],
    team: ["Backend Engineer", "Full-Stack Developer"],
  },
  {
    no: "05", title: "AI Solutions", icon: "bot",
    desc: "AI woven into the workflow it actually helps — not a chatbot bubble bolted onto the corner of your screen.",
    long: "Most 'add AI to our product' requests actually have one or two specific workflows in mind, once you dig past the first conversation. We find that leverage point, integrate the model natively into the existing flow your users already know, and wrap it in the evaluation and fallback behaviour that keeps a bad model response from ever reaching a user unchecked.",
    second: "You'll get a concrete evaluation suite — pass rate, hallucination rate, latency — that runs before every prompt or model change ships, so quality regressions get caught in staging, not in a user's support ticket.",
    stack: ["LLM integration", "RAG", "Evaluation suites", "Guardrails & fallbacks"],
    steps: [
      { title: "Find the leverage point", desc: "We identify the one or two workflows where AI genuinely moves the needle, not a wishlist of every possible use." },
      { title: "Ground it in your data", desc: "Retrieval over your own documents where relevant, so answers are grounded instead of guessed from memory." },
      { title: "Integrate natively", desc: "AI woven directly into the flow users already use, not a separate chat window bolted on top." },
      { title: "Guard the output", desc: "Evaluation and graceful fallbacks so a low-confidence response degrades safely instead of misleading a user." },
    ],
    team: ["AI & Full-Stack Developer", "QA · Testing"],
  },
  {
    no: "06", title: "Internal Platforms", icon: "building",
    desc: "Dashboards and admin tools built for the people who'll actually use them every day.",
    long: "Internal software has a different bar than a public-facing product: nobody's evaluating it on a landing page, they're using it eight hours a day to get their job done. We build it fast, unglamorous and reliable — clarity and speed over flash — and shaped around how your operators actually work, not a generic admin-panel template.",
    second: "Because the people who use it daily are the ones giving feedback, internal tools we build tend to sharpen fast after launch — small, high-leverage iterations rather than a big annual overhaul.",
    stack: ["Admin panels", "Dashboards", "Role-based access", "Internal APIs"],
    steps: [
      { title: "Talk to the operators", desc: "We sit with the team who'll use this daily before designing anything, not just the manager who requested it." },
      { title: "Build the core tool", desc: "Fast, boring-in-a-good-way internal software — every screen optimised for the task it's used for." },
      { title: "Wire in permissions", desc: "Role-based access so the right people see the right data, without a shared login or spreadsheet workaround." },
      { title: "Iterate on real usage", desc: "Weekly feedback loop with actual users once it's live, so the tool gets sharper the more it's used." },
    ],
    team: ["Full-Stack Developer", "Backend Engineer"],
  },
];

export const SHOWCASE = [
  { title: "Curalink", cat: "HealthTech · AI", desc: "Citation-backed medical research assistant.", tech: ["React", "DeepSeek-R1"], img: "https://images.unsplash.com/photo-1582560469781-1965b9af903d?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200" },
  { title: "Habit Tracker", cat: "Consumer", desc: "A clean habit-tracking UI for daily streaks.", tech: ["React", "Vercel"], img: "https://images.unsplash.com/photo-1580894908361-967195033215?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200" },
  { title: "Nebula Glass", cat: "Design Sample", desc: "Immersive landing page with real-time animations and glassmorphism.", tech: ["HTML/CSS/JS"], img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200" },
  { title: "Slate Docs", cat: "AI · Productivity", desc: "PDF summariser with searchable Q&A on local LLMs.", tech: ["Python", "Llama 3.1"], img: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200" },
  { title: "FlowBoard", cat: "SaaS · Analytics", desc: "Real-time metrics and event streaming dashboard.", tech: ["React", "D3", "WebSocket"], img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200" },
];

export const METRICS = [
  { no: "01", value: 24, suffix: "h", label: "Response Time", note: "No waiting weeks for a reply." },
  { no: "02", value: 92, suffix: "%", label: "Caught Pre-Launch", note: "Defects found in AI-assisted QA, not by users." },
  { no: "03", value: 4, suffix: "", label: "Core Services", note: "Full-stack, AI, web and API engineering." },
  { no: "04", value: 100, suffix: "%", label: "Owned Code", note: "Remote-first delivery, code is fully yours." },
];

export const PROCESS = [
  {
    no: "01", title: "Scope", meta: "Requirements & Planning · 3–4 days",
    long: "We turn a conversation into a written plan — requirements, scope boundaries and a realistic timeline — before anyone writes a line of code.",
    steps: [
      { title: "Discovery call", desc: "We ask the questions that surface what's actually needed, not just what's assumed." },
      { title: "Written scope", desc: "A document you can hold us to, with clear boundaries on what's in and out." },
      { title: "Timeline & team", desc: "Who's on it and when you'll see the first build, agreed up front." },
      { title: "Sign-off", desc: "Nothing moves to Build until you've read and agreed the written scope — no verbal-only understandings." },
    ],
  },
  {
    no: "02", title: "Build", meta: "Data & Code Build · 2–4 weeks",
    long: "The core engineering phase — data model, back end and front end built in parallel by the senior team that scoped the project.",
    steps: [
      { title: "Weekly check-ins", desc: "Short, honest updates — no waiting a month to find out where things stand." },
      { title: "Staging access", desc: "You can click through the real build as it's being made, not just a mockup." },
      { title: "AI-assisted, human-reviewed", desc: "AI scaffolds the boring parts; a senior engineer reviews every line." },
      { title: "Scope changes flagged early", desc: "If something shifts mid-build, you hear about the timeline/cost impact immediately, not at the deadline." },
    ],
  },
  {
    no: "03", title: "QA", meta: "Quality Assurance · 2–5 days",
    long: "A dedicated pass across devices, edge cases and failure states before anything goes live — 92% of defects are caught here, not by your users.",
    steps: [
      { title: "Automated test suite", desc: "AI-generated edge-case tests, reviewed and run in CI." },
      { title: "Manual walkthrough", desc: "A human clicks through every flow the way a real user would." },
      { title: "Fix & re-verify", desc: "Nothing ships until the re-test passes clean." },
      { title: "Cross-device pass", desc: "Real device/browser combinations checked, not just desktop Chrome at 100% zoom." },
    ],
  },
  {
    no: "04", title: "Deploy", meta: "Go live · 1 day",
    long: "A single, low-drama go-live day — domain, hosting and monitoring already wired up before the switch is flipped.",
    steps: [
      { title: "Pre-flight checklist", desc: "DNS, SSL, environment variables and backups verified before cutover." },
      { title: "Go live", desc: "Deployed to your domain with a rollback plan ready, just in case." },
      { title: "Watch the first hours", desc: "We stay online while real traffic hits it for the first time." },
      { title: "Handover", desc: "Access, documentation and a walkthrough recording so your team isn't dependent on ours to make small changes." },
    ],
  },
  {
    no: "05", title: "Support", meta: "Tech Support · Ongoing",
    long: "The team that built it stays reachable after launch — for bug fixes, small iterations, and the questions that only come up once real users show up.",
    steps: [
      { title: "Monitoring", desc: "Errors and performance issues surfaced before they become a support ticket." },
      { title: "Fast turnaround", desc: "Small fixes and tweaks handled quickly, not queued for weeks." },
      { title: "Plan the next iteration", desc: "Real usage data feeds directly into what gets built next." },
      { title: "Flexible engagement", desc: "Retainer or per-request, whichever matches how actively the product keeps changing." },
    ],
  },
];

export const WHY = [
  { no: "01", title: "Engineering First", desc: "Every engagement ends with something deployed and live — not a prototype gathering dust in a repo. We ship code that's actually used." },
  { no: "02", title: "AI-Augmented", desc: "We reach for LLMs and automation only where they genuinely save you time and money. AI is a force multiplier, not a crutch." },
  { no: "03", title: "Direct Collaboration", desc: "No layers of account managers — you talk directly to the people writing your code. Decisions happen in hours, not weeks." },
];

export const TEAM = [
  { name: "Vigneshwar R", role: "Founder · AI & Full-Stack Developer", spec: "Leads product direction and engineering — from system architecture to shipping AI-powered features end to end.", img: "https://images.unsplash.com/photo-1610563166150-b34df4f3bcd6?crop=entropy&cs=srgb&fm=jpg&q=85&w=800" },
  { name: "Srinivasan B", role: "Quality Assurance · Testing", spec: "Owns quality across every release — QA planning plus manual and automated suites that catch regressions before production.", img: "https://images.unsplash.com/photo-1536148935331-408321065b18?crop=entropy&cs=srgb&fm=jpg&q=85&w=800" },
  { name: "Ashwin G", role: "Business Analyst · Quality Control", spec: "Turns client requirements into clear, audit-ready documentation while overseeing quality control checks on scope and standard.", img: "https://images.unsplash.com/photo-1575089976121-8ed7b2a54265?crop=entropy&cs=srgb&fm=jpg&q=85&w=800" },
  { name: "Polanath M", role: "DevOps · Developer", spec: "Builds and maintains the delivery pipeline — CI/CD, deployments and monitoring — so releases stay fast and uptime stays high.", img: "https://images.pexels.com/photos/3861959/pexels-photo-3861959.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { name: "Suba Sri S", role: "Cybersecurity Analyst", spec: "Reviews every build for security gaps — dependency audits, access controls and hardening — so nothing ships with hidden risk.", img: "https://images.pexels.com/photos/9574516/pexels-photo-9574516.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { name: "Harishini V", role: "QA · Operations Analyst", spec: "Bridges quality and operations — running QA checks against every release while keeping delivery workflows on track.", img: "https://images.unsplash.com/photo-1580894908361-967195033215?crop=entropy&cs=srgb&fm=jpg&q=85&w=800" },
  { name: "Keerthi", role: "Java Developer", spec: "Builds robust backend services in Java — clean, well-tested code that keeps core application logic reliable at scale.", img: "https://images.pexels.com/photos/89724/pexels-photo-89724.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { name: "Bhuvaneshwari", role: "Senior HR & People Operations", spec: "Leads hiring, onboarding, policy and culture so the studio scales with the right people in the right roles.", img: "https://images.unsplash.com/photo-1582560469781-1965b9af903d?crop=entropy&cs=srgb&fm=jpg&q=85&w=800" },
];

export const INSIGHTS = [
  {
    cat: "AI", date: "Field Notes", title: "Software is being rebuilt around AI. We build with it, not around it.",
    desc: "AI has moved from novelty to infrastructure. We treat it as part of the engineering process — not a bolt-on chatbot feature.",
    long: "AI has moved from novelty to infrastructure. We treat it as part of the engineering process itself — scaffolding builds, generating edge-case tests, and automating QA — with a human reviewing and merging every line. AI sets the pace, engineers set the standard.",
    steps: [
      { title: "Scaffold with AI", desc: "First-pass implementations, tests and boilerplate generated fast." },
      { title: "Review like always", desc: "Every AI-touched line held to the same bar as hand-written code." },
      { title: "Ship what's proven", desc: "Only reviewed, evaluated code reaches production." },
    ],
  },
  {
    cat: "Engineering", date: "Playbook", title: "Real products, not demos: shipping code that's actually used.",
    desc: "Every engagement ends with something deployed and live. Here's how a small, senior team moves at the pace of a much larger one.",
    long: "Every engagement ends with something deployed and live — not a prototype gathering dust in a repo. A small, senior team, each owning a domain end to end, moving at the pace of a much larger one because there's no handoff friction between roles.",
    steps: [
      { title: "Own the domain end to end", desc: "One senior engineer per area, not a rotating cast of specialists." },
      { title: "Ship early and often", desc: "Something live within the first sprint, not just at the very end." },
      { title: "Support after launch", desc: "The team that built it stays attached for the first weeks in production." },
    ],
  },
  {
    cat: "Product", date: "For Founders", title: "From a raw idea to a build-ready PRD in 2–3 weeks.",
    desc: "A dedicated Business Analyst validates the idea, sizes the market and turns a concept into documentation your dev team can execute.",
    long: "A dedicated Business Analyst sits with you before a single line of code is written — validating the idea, sizing the market, and turning a raw concept into a build-ready PRD your dev team can execute from day one.",
    steps: [
      { title: "Validate the idea", desc: "Market sizing and problem validation before any spec gets written." },
      { title: "Write the PRD", desc: "A build-ready document engineers can estimate and execute against directly." },
      { title: "Hand off clean", desc: "Your dev team — or ours — starts building with zero ambiguity." },
    ],
  },
  {
    cat: "QA", date: "Playbook", title: "92% of defects caught before launch — here's the pass that does it.",
    desc: "A dedicated QA phase across devices, edge cases and failure states, running before every deploy rather than after a user complains.",
    long: "Most defects don't show up in a demo — they show up on a real device, on a slow connection, with a user doing something nobody scripted for. Our QA phase exists specifically to find those before launch, combining AI-generated edge-case tests with a manual, human walkthrough of every flow.",
    steps: [
      { title: "Generate edge cases", desc: "AI drafts the inputs and states a human would take hours to enumerate by hand." },
      { title: "Walk every flow manually", desc: "A person clicks through the product the way a real, occasionally careless user would." },
      { title: "Fix, then re-verify", desc: "Nothing ships until the same test that failed passes clean on a second pass." },
    ],
  },
  {
    cat: "Delivery", date: "Field Notes", title: "Fixed-price or hourly — how we decide, and why it matters to you.",
    desc: "The pricing model isn't just admin — it changes who carries the risk of scope changing mid-project. Here's how we choose.",
    long: "Fixed-price and hourly aren't interchangeable labels for the same work — they change who absorbs the cost when a project's scope shifts. Well-defined work goes fixed-price so you get budget certainty; genuinely exploratory work goes hourly so you're not paying a padded buffer for uncertainty that may never materialise. We recommend the model that reduces risk for your specific project, not the one that's easiest for us to bill.",
    steps: [
      { title: "Scope it honestly first", desc: "We won't quote fixed-price on something that isn't actually scoped yet — that's how projects blow their budget." },
      { title: "Match the model to the risk", desc: "Clear deliverables → fixed price. Open-ended exploration → hourly, with a budget ceiling you set." },
      { title: "Flag changes as they happen", desc: "A scope change mid-project gets its cost/timeline impact stated plainly, before we act on it." },
    ],
  },
];
