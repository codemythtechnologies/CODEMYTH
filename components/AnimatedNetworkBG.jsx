"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";

/**
 * Decorative animated network background.
 *
 * Renders a fixed, deterministic set of nodes + connecting edges, with
 * small "pulse" dots traveling along a handful of edges. Purely
 * presentational — aria-hidden, pointer-events: none — meant to sit
 * absolutely positioned behind section content to fill otherwise-empty
 * dark/light backgrounds with subtle motion.
 *
 * IMPORTANT: the traveling dots are animated by translating a wrapping
 * <motion.g> (x/y transform), never by animating raw cx/cy on <circle>.
 * Framer Motion cannot interpolate SVG attribute pairs like cx/cy directly
 * on a keyframe array without emitting `undefined` — translating the
 * parent group avoids that class of bug entirely.
 *
 * Node positions are fixed (not Math.random) so server and client render
 * identically and there's no hydration mismatch.
 */

const NODES = [
  { x: 60, y: 40 }, { x: 220, y: 90 }, { x: 380, y: 30 }, { x: 520, y: 120 },
  { x: 660, y: 60 }, { x: 120, y: 200 }, { x: 300, y: 220 }, { x: 470, y: 260 },
  { x: 610, y: 210 }, { x: 40, y: 320 }, { x: 200, y: 360 }, { x: 360, y: 340 },
  { x: 540, y: 380 }, { x: 690, y: 330 }, { x: 90, y: 440 }, { x: 260, y: 470 },
  { x: 430, y: 450 }, { x: 600, y: 470 },
];

const EDGES = [
  [0, 1], [1, 2], [2, 3], [3, 4], [0, 5], [1, 6], [2, 6], [3, 7], [4, 8],
  [5, 6], [6, 7], [7, 8], [5, 9], [5, 10], [6, 11], [7, 12], [8, 13],
  [9, 10], [10, 11], [11, 12], [12, 13], [10, 14], [11, 15], [12, 16],
  [13, 17], [14, 15], [15, 16], [16, 17],
];

// Which edges get a traveling pulse dot, and their stagger delay.
const PULSES = [
  { edge: [0, 5], delay: 0 }, { edge: [5, 10], delay: 0.6 },
  { edge: [1, 6], delay: 1.4 }, { edge: [6, 11], delay: 2.1 },
  { edge: [3, 7], delay: 0.9 }, { edge: [7, 12], delay: 2.6 },
  { edge: [4, 8], delay: 1.8 }, { edge: [8, 13], delay: 3.2 },
  { edge: [10, 14], delay: 2.9 }, { edge: [12, 16], delay: 3.6 },
];

export default function AnimatedNetworkBG({
  variant = "dark",
  accent,
  className = "",
  style,
}) {
  const lineColor = variant === "dark" ? "rgba(255,255,255,0.08)" : "rgba(17,17,20,0.08)";
  const nodeColor = variant === "dark" ? "rgba(255,255,255,0.22)" : "rgba(17,17,20,0.16)";
  const pulseColor = accent || "var(--accent, #ff5500)";

  // Precompute edge deltas once.
  const pulseData = useMemo(
    () =>
      PULSES.map(({ edge: [a, b], delay }) => ({
        a: NODES[a],
        dx: NODES[b].x - NODES[a].x,
        dy: NODES[b].y - NODES[a].y,
        delay,
      })),
    []
  );

  return (
    <div
      aria-hidden="true"
      className={`animated-network-bg ${className}`}
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        zIndex: 0,
        pointerEvents: "none",
        ...style,
      }}
    >
      <svg
        viewBox="0 0 720 500"
        preserveAspectRatio="xMidYMid slice"
        style={{ width: "100%", height: "100%" }}
      >
        {EDGES.map(([a, b], i) => (
          <line
            key={`e-${i}`}
            x1={NODES[a].x}
            y1={NODES[a].y}
            x2={NODES[b].x}
            y2={NODES[b].y}
            stroke={lineColor}
            strokeWidth="1"
          />
        ))}

        {NODES.map((n, i) => (
          <motion.circle
            key={`n-${i}`}
            cx={n.x}
            cy={n.y}
            r={i % 3 === 0 ? 2.6 : 1.6}
            fill={nodeColor}
            animate={{ opacity: [0.35, 0.9, 0.35] }}
            transition={{
              duration: 3 + (i % 5),
              repeat: Infinity,
              ease: "easeInOut",
              delay: (i % 6) * 0.4,
            }}
          />
        ))}

        {pulseData.map((p, i) => (
          <motion.g
            key={`p-${i}`}
            initial={{ x: 0, y: 0, opacity: 0 }}
            animate={{ x: [0, p.dx], y: [0, p.dy], opacity: [0, 1, 0] }}
            transition={{
              duration: 2.4,
              delay: p.delay,
              repeat: Infinity,
              repeatDelay: 2.2,
              ease: "linear",
            }}
          >
            <circle cx={p.a.x} cy={p.a.y} r="2.4" fill={pulseColor} />
          </motion.g>
        ))}
      </svg>
    </div>
  );
}
