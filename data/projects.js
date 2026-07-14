// Each project with a `url` gets a "Visit live site" link in its detail
// modal that opens in a new tab (target=_blank + rel=noopener noreferrer) —
// matching the "external content opens in a new tab" behavior you liked.
export const projects = [
  {
    key: "curalink",
    name: "Curalink — AI medical research assistant",
    status: "Live",
    statusClass: "",
    featured: true,
    summary: "Fetches 100+ research papers per query with citation-backed AI responses.",
    desc: [
      "Curalink helps researchers and clinicians query medical literature in plain English instead of wrestling with keyword search. It fetches 100+ relevant research papers per query and returns citation-backed AI answers, so every claim can be traced back to its source paper instead of being taken on faith.",
      "Under the hood it runs a local DeepSeek-R1 model through Ollama for reasoning, with a Node.js API layer that handles retrieval, ranking, and citation matching before anything reaches the React front end. Query history and saved research threads are stored in MongoDB so a session can be picked back up later.",
      "It was built for the AI era but engineered with production discipline — response caching, rate limiting, and graceful fallbacks when a source paper can't be fetched, so the tool stays usable even under real research workloads.",
    ],
    techs: ["React", "Node.js", "DeepSeek-R1", "MongoDB", "Ollama"],
    url: "https://curalink-ai-client.onrender.com/",
    image: "/assets/projects/curalink.png",
  },
  {
    key: "habit-tracker",
    name: "Habit Tracker — daily habit & streak app",
    status: "Live",
    statusClass: "",
    featured: true,
    summary: "A clean habit-tracking UI that helps users build and hold streaks on daily goals.",
    desc: [
      "A clean, focused habit-tracking interface that helps users set daily goals, log progress, and hold onto streaks without the clutter most habit apps pile on. The dashboard surfaces today's overview, weekly completion rate, and coverage progress at a glance, so the habit itself stays the focus, not the app.",
      "Built as a fast, mobile-friendly React app deployed on Vercel, with dedicated views for daily entry, analytics, and history so users can review long-term trends and not just today's check-in. Achievements and streak milestones are surfaced to keep motivation high over time.",
    ],
    techs: ["React", "Vercel"],
    url: "https://habit-tracker-model-ui.vercel.app/",
    image: "/assets/projects/habit-tracker.png",
  },
  {
    key: "nebula",
    name: "Nebula Glass — immersive experience",
    status: "Sample work",
    statusClass: "sample",
    featured: false,
    summary:
      "Interactive landing page with real-time animations and glassmorphism UI — built as a design/UI sample, not a client engagement.",
    desc: [
      "An interactive landing page built to showcase UI craft — real-time animations and a glassmorphism visual style, with layered depth and motion that responds to user interaction.",
      "This is a design/UI sample rather than a client project, used to demonstrate what we can build on the front end when a brand wants something more expressive than a standard landing page. Built entirely with vanilla HTML, CSS and JS to keep it lightweight and fast to load.",
    ],
    techs: ["HTML/CSS/JS", "Vercel"],
    url: "https://nebula-glass.vercel.app/",
    image: "/assets/projects/nebula.png",
  },
  {
    key: "slate-docs",
    name: "Slate Docs — AI document summarizer",
    status: "In development",
    statusClass: "dev",
    featured: false,
    summary: "Upload a PDF, get a clean summary and searchable Q&A powered by local LLMs.",
    desc: [
      "Upload a PDF and get a clean summary plus a searchable Q&A interface, powered by local LLMs so documents never leave your infrastructure — built for teams handling sensitive or proprietary files.",
      "A FastAPI backend handles document parsing and chunking, with Llama 3.1 running the summarization and question-answering, so answers stay grounded in the uploaded document instead of drifting into generic AI output.",
    ],
    techs: ["Python", "Llama 3.1", "FastAPI"],
    url: "",
    image: "/assets/projects/slate-docs.png",
  },
  {
    key: "flowboard",
    name: "FlowBoard — real-time analytics dashboard",
    status: "In development",
    statusClass: "dev",
    featured: false,
    summary: "Live metrics and event streaming for product teams who need answers in seconds, not hours.",
    desc: [
      "Live metrics and event streaming for product teams who need answers in seconds, not hours — real-time charts backed by a WebSocket event pipeline instead of slow scheduled reports.",
      "D3-powered visualizations sit on top of a PostgreSQL data layer, with a React front end that updates in place as new events stream in, so dashboards never need a manual refresh.",
    ],
    techs: ["React", "D3", "WebSocket", "PostgreSQL"],
    url: "",
    image: "/assets/projects/flowboard.png",
  },
];
