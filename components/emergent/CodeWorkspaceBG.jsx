"use client";

import { useEffect, useRef, useState } from "react";

// Full-bleed "code workspace" mockup that sits behind the hero's nav and
// headline. Two things changed from the original version:
//
// 1. It's docked to the RIGHT side of the hero (the open space next to the
//    headline column) instead of running edge-to-edge under the text.
// 2. The code/terminal panes are a real typewriter, not a looping scroll.
//    Characters are revealed one at a time via a JS-driven reveal loop; a
//    line is pushed into `lines` exactly once when it finishes typing and
//    is never shown again — older lines are trimmed off the top of the
//    array as new ones are typed in below, so nothing "replays".
//
// Purely decorative: aria-hidden and pointer-events-none throughout so it
// never intercepts clicks or gets read out by a screen reader.

const FILES = [
  { name: "app", type: "folder", open: true },
  { name: "deploy.ts", type: "file", active: true },
  { name: "agent.py", type: "file" },
  { name: "schema.prisma", type: "file" },
  { name: "rag", type: "folder" },
  { name: "eval.suite.ts", type: "file" },
  { name: "docker-compose.yml", type: "file" },
];

const TABS = ["deploy.ts", "agent.py", "eval.suite.ts", "schema.prisma"];

// A long, varied pool so the typewriter runs for a couple of minutes
// before it has to loop back to the top — by then everything from the
// first pass has long since scrolled out of the visible window.
const CODE_POOL = [
  { i: 0, t: [["kw", "export async function"], ["fn", " deploy"], ["p", "() {"]] },
  { i: 1, t: [["kw", "const"], ["p", " build = "], ["kw", "await"], ["fn", " run"], ["s", '("next build")'], ["p", ";"]] },
  { i: 1, t: [["cm", "// type-check + lint on every commit"]] },
  { i: 1, t: [["kw", "await"], ["fn", " verify"], ["p", "(build."], ["v", "artifacts"], ["p", ");"]] },
  { i: 1, t: [["kw", "const"], ["p", " ai = "], ["kw", "await"], ["fn", " evalSuite"], ["s", '("rag-prod")'], ["p", ";"]] },
  { i: 1, t: [["kw", "if"], ["p", " (ai."], ["v", "passRate"], ["p", " < "], ["n", "0.98"], ["p", ") "], ["kw", "throw"], ["p", " "], ["kw", "new"], ["cl", " Error"], ["p", "();"]] },
  { i: 1, t: [["kw", "return"], ["fn", " ship"], ["p", "(build, { "], ["v", "domain"], ["p", ": "], ["s", '"prod"'], ["p", " });"]] },
  { i: 0, t: [["p", "}"]] },
  { i: 0, t: [["p", ""]] },
  { i: 0, t: [["kw", "export async function"], ["fn", " runAgent"], ["p", "(task: "], ["cl", "Task"], ["p", ") {"]] },
  { i: 1, t: [["kw", "const"], ["p", " tools = "], ["fn", "scopeTools"], ["p", "(task."], ["v", "allowlist"], ["p", ");"]] },
  { i: 1, t: [["kw", "const"], ["p", " plan = "], ["kw", "await"], ["fn", " planner"], ["p", ".run(task, { tools });"]] },
  { i: 1, t: [["kw", "for"], ["p", " ("], ["kw", "const"], ["p", " step "], ["kw", "of"], ["p", " plan.steps) {"]] },
  { i: 2, t: [["kw", "await"], ["fn", " guardrail"], ["p", ".check(step);"]] },
  { i: 2, t: [["kw", "await"], ["fn", " execute"], ["p", "(step);"]] },
  { i: 1, t: [["p", "}"]] },
  { i: 0, t: [["p", "}"]] },
  { i: 0, t: [["p", ""]] },
  { i: 0, t: [["kw", "class"], ["cl", " RagPipeline"], ["p", ":"]] },
  { i: 1, t: [["kw", "def"], ["fn", " __init__"], ["p", "(self, "], ["v", "index"], ["p", "):"]] },
  { i: 2, t: [["kw", "self"], ["p", "."], ["v", "index"], ["p", " = "], ["v", "index"]] },
  { i: 1, t: [["kw", "def"], ["fn", " retrieve"], ["p", "(self, "], ["v", "query"], ["p", ", k="], ["n", "8"], ["p", "):"]] },
  { i: 2, t: [["kw", "hits"], ["p", " = self."], ["v", "index"], ["p", "."], ["fn", "search"], ["p", "(query, k)"]] },
  { i: 2, t: [["kw", "return"], ["p", " ["], ["v", "h"], ["p", " for "], ["v", "h"], ["p", " in hits "], ["kw", "if"], ["p", " h."], ["v", "score"], ["p", " > "], ["n", "0.72"], ["p", "]"]] },
  { i: 0, t: [["p", ""]] },
  { i: 0, t: [["kw", "model"], ["cl", " Deployment"], ["p", " {"]] },
  { i: 1, t: [["v", "id"], ["p", "        "], ["cl", "String"], ["p", "   @id @default(cuid())"]] },
  { i: 1, t: [["v", "status"], ["p", "    "], ["cl", "Status"], ["p", "   @default(QUEUED)"]] },
  { i: 1, t: [["v", "evalScore"], ["p", " "], ["cl", "Float"], ["p", "    @map(\"eval_score\")"]] },
  { i: 0, t: [["p", "}"]] },
  { i: 0, t: [["p", ""]] },
  { i: 0, t: [["v", "services"], ["p", ":"]] },
  { i: 1, t: [["v", "api"], ["p", ":"]] },
  { i: 2, t: [["v", "build"], ["p", ": ."]] },
  { i: 2, t: [["v", "ports"], ["p", ": [\"3000:3000\"]"]] },
  { i: 2, t: [["v", "depends_on"], ["p", ": [db, redis]"]] },
  { i: 1, t: [["v", "worker"], ["p", ":"]] },
  { i: 2, t: [["v", "command"], ["p", ": "], ["s", "queue:process --concurrency=4"]] },
];

const LOG_POOL = [
  "next build — compiled successfully in 1.8s",
  "type-check passed · 0 errors",
  "AI eval suite · rag-prod · 98.6% pass rate",
  "docker build codemyth/api:latest",
  "migrations applied · 0 pending",
  "deployed → codemyth.in (prod)",
  "healthcheck /api/status · 200 OK",
  "cache warmed · 1,204 keys",
  "agent eval · guardrail suite · 100% pass",
  "rollout complete · 0 restarts",
];

const TOK_CLASS = {
  kw: "text-[#c586c0]", fn: "text-[#dcdcaa]", s: "text-[#ce9178]", cm: "text-[#6a9955]",
  v: "text-[#9cdcfe]", n: "text-[#b5cea8]", cl: "text-[#4ec9b0]", p: "text-white/70",
};

// How many characters a source line contains, across all its tokens.
const lineLength = (line) => line.t.reduce((sum, [, str]) => sum + str.length, 0);

// Slice a line's tokens down to the first `count` characters, preserving
// per-token colouring for the visible portion.
const sliceTokens = (tokens, count) => {
  let remaining = count;
  const out = [];
  for (const [cls, str] of tokens) {
    if (remaining <= 0) break;
    if (str.length <= remaining) {
      out.push([cls, str]);
      remaining -= str.length;
    } else {
      out.push([cls, str.slice(0, remaining)]);
      remaining = 0;
    }
  }
  return out;
};

const CodeLine = ({ indent, tokens, caret, settled }) => (
  <div
    className={`whitespace-nowrap font-mono text-[11px] leading-[1.85] sm:text-[12px] ${settled ? "cw-line-in" : ""}`}
    style={{ paddingLeft: `${indent * 16}px` }}
  >
    {tokens.map(([k, v], idx) => (
      <span key={idx} className={TOK_CLASS[k]}>{v}</span>
    ))}
    {caret && <span className="cw-caret text-white/70">▍</span>}
  </div>
);

// Generic "typewriter over a pool" reducer: types one pool item at a time,
// commits it once finished, trims the visible buffer, then moves on. Used
// for both the editor pane (structured code lines) and the terminal
// (plain strings) via the `toTokens` adapter.
function useTypewriter(pool, { maxVisible, toTokens, minDelay, maxDelay, holdMs }) {
  const [lines, setLines] = useState([]);
  const [typing, setTyping] = useState({ tokens: [], indent: 0 });
  const poolIdx = useRef(0);
  const charIdx = useRef(0);
  const buffer = useRef([]);

  useEffect(() => {
    let mounted = true;
    let timer;

    const tick = () => {
      if (!mounted) return;
      const item = pool[poolIdx.current % pool.length];
      const { tokens, indent } = toTokens(item);
      const total = lineLength({ t: tokens });

      charIdx.current += 1;

      if (charIdx.current >= total) {
        // Line finished typing — commit it exactly once, trim the buffer
        // so old lines fall away instead of ever being redrawn.
        buffer.current = [...buffer.current, { key: `${poolIdx.current}-${Date.now()}`, indent, tokens }].slice(-maxVisible);
        setLines(buffer.current);
        setTyping({ tokens: [], indent: 0 });
        poolIdx.current += 1;
        charIdx.current = 0;
        timer = setTimeout(tick, total === 0 ? holdMs * 0.5 : holdMs);
      } else {
        setTyping({ tokens: sliceTokens(tokens, charIdx.current), indent });
        timer = setTimeout(tick, minDelay + Math.random() * (maxDelay - minDelay));
      }
    };

    timer = setTimeout(tick, 500);
    return () => {
      mounted = false;
      clearTimeout(timer);
    };
    // Pool/adapters are static for the lifetime of this component.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { lines, typing };
}

export default function CodeWorkspaceBG() {
  const editor = useTypewriter(CODE_POOL, {
    // High enough that even the tallest viewports (ultra-wide / tall
    // laptop screens) always have enough buffered lines to reach the
    // bottom of the pane — see the bottom-anchored container below.
    maxVisible: 60,
    toTokens: (item) => ({ tokens: item.t, indent: item.i }),
    minDelay: 14,
    maxDelay: 38,
    holdMs: 260,
  });

  const terminal = useTypewriter(LOG_POOL, {
    maxVisible: 7,
    toTokens: (str) => ({ tokens: [["p", str]], indent: 0 }),
    minDelay: 8,
    maxDelay: 16,
    holdMs: 900,
  });

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 select-none overflow-hidden bg-[#0d0f13]">
      {/* Ambient base — full bleed, sits behind everything including the
          docked panel, so the left/headline side still feels "alive"
          without any literal editor chrome competing with the text. */}
      <div className="absolute inset-0 tech-grid opacity-40" />
      <div className="absolute inset-0" style={{ background: "radial-gradient(120% 90% at 50% 0%, rgba(255,85,0,0.10), transparent 55%)" }} />

      {/* The actual "code workspace" window — docked to the right side,
          in the open space next to the headline, rather than spanning
          full width underneath it. */}
      <div className="absolute inset-y-0 right-0 flex w-full flex-col overflow-hidden border-l border-white/10 bg-[#0d0f13]/70 opacity-[0.95] sm:w-[68%] md:w-[60%] lg:w-[54%] xl:w-[50%]">
        {/* Window chrome + tab strip */}
        <div className="flex items-center gap-3 border-b border-white/10 bg-white/[0.03] px-4 py-2.5 sm:px-6">
          <span className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]/70" />
          </span>
          <div className="ml-2 flex gap-1 overflow-hidden">
            {TABS.map((t) => (
              <span
                key={t}
                className={`whitespace-nowrap rounded-t px-3 py-1 font-mono text-[10px] sm:text-[11px] ${
                  t === "deploy.ts" ? "border-b-2 border-cm-accent bg-white/[0.06] text-white/80" : "text-white/35"
                }`}
              >
                {t}
              </span>
            ))}
          </div>
          <span className="ml-auto hidden items-center gap-1.5 rounded-full border border-white/10 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.18em] text-emerald-300/80 sm:flex">
            <span className="cw-pulse h-1.5 w-1.5 rounded-full bg-emerald-400" /> live build
          </span>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* File tree */}
          <div className="hidden w-[168px] shrink-0 border-r border-white/10 bg-white/[0.015] px-3 py-4 lg:block">
            {FILES.map((f) => (
              <div
                key={f.name}
                className={`mb-1.5 truncate rounded px-2 py-1 font-mono text-[11px] ${
                  f.active ? "bg-cm-accent/15 text-cm-accent" : f.type === "folder" ? "text-white/45" : "text-white/30"
                }`}
                style={{ paddingLeft: f.type === "file" ? "20px" : "8px" }}
              >
                {f.type === "folder" ? (f.open ? "▾ " : "▸ ") : ""}{f.name}
              </div>
            ))}
          </div>

          {/* Editor — real typewriter window, full height of the pane.
              The code stack is bottom-anchored (justify-end) so it always
              fills the pane edge-to-edge with no dead space underneath —
              new lines are typed in at the bottom and push older ones up,
              exactly like a real editor/terminal. Older lines are cropped
              off the top with overflow-hidden (no scrollbar, no blur) —
              a soft fade mask only kicks in on the top few pixels, so it
              stays invisible until a line actually reaches the top edge
              and needs to exit; there is nothing to fade at the start. */}
          <div className="flex flex-1 flex-col px-5 py-5 sm:px-8 sm:py-8">
            <div
              className="flex h-full flex-col justify-end overflow-hidden pr-2"
              style={{
                WebkitMaskImage: "linear-gradient(to bottom, transparent, #000 28px)",
                maskImage: "linear-gradient(to bottom, transparent, #000 28px)",
              }}
            >
              {editor.lines.map((line, idx) => (
                <CodeLine key={line.key} indent={line.indent} tokens={line.tokens} settled={idx === editor.lines.length - 1} />
              ))}
              {editor.typing.tokens.length > 0 && (
                <CodeLine indent={editor.typing.indent} tokens={editor.typing.tokens} caret />
              )}
            </div>
          </div>

          {/* Minimap */}
          <div className="hidden w-6 shrink-0 border-l border-white/10 bg-white/[0.02] py-5 xl:block">
            {Array.from({ length: 22 }).map((_, i) => (
              <div key={i} className="mx-auto mb-1 h-[3px] rounded-full bg-white/10" style={{ width: `${30 + ((i * 37) % 60)}%` }} />
            ))}
          </div>
        </div>

        {/* Terminal — same typewriter pattern, streaming a build/deploy
            log a line at a time. */}
        <div className="hidden h-[110px] shrink-0 flex-col justify-end overflow-hidden border-t border-white/10 bg-black/50 px-5 py-4 sm:px-8 md:flex">
          {terminal.lines.map((line, idx) => (
            <div key={line.key} className={`flex items-center gap-2 font-mono text-[11px] leading-[1.9] text-white/50 ${idx === terminal.lines.length - 1 ? "cw-line-in" : ""}`}>
              <span className="text-emerald-400/80">✓</span>{line.tokens[0][1]}
            </div>
          ))}
          {terminal.typing.tokens.length > 0 && (
            <div className="flex items-center gap-2 font-mono text-[11px] leading-[1.9] text-white/50">
              <span className="text-emerald-400/80">✓</span>{terminal.typing.tokens[0][1]}
              <span className="cw-caret text-white/50">▍</span>
            </div>
          )}
        </div>

        {/* Status bar */}
        <div className="hidden items-center gap-4 border-t border-white/10 bg-white/[0.03] px-5 py-1.5 font-mono text-[9px] uppercase tracking-wider text-white/30 sm:flex sm:px-8">
          <span className="flex items-center gap-1.5"><span className="cw-pulse h-1.5 w-1.5 rounded-full bg-emerald-400" /> main</span>
          <span>AI eval 98.6%</span>
          <span className="hidden md:inline">0 errors · 0 warnings</span>
          <span className="ml-auto flex items-center gap-2">
            deploying
            <span className="h-1 w-24 overflow-hidden rounded-full bg-white/10">
              <span className="cw-progress block h-full rounded-full bg-cm-accent" />
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}
