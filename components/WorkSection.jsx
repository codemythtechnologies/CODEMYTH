"use client";

import { useState } from "react";
import Reveal from "./Reveal";
import { projects } from "@/data/projects";

// Same split as the old static markup: the two "featured" projects are
// always visible, the rest live inside the collapsible "proj-more" panel
// that "View all projects" toggles open/closed.
export default function WorkSection({ onOpenProject }) {
  const [open, setOpen] = useState(false);
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  function ProjectCard(p) {
    return (
      <div
        key={p.key}
        className="proj"
        onClick={() => onOpenProject?.(p.key)}
        role="button"
        tabIndex={0}
        aria-label={`View ${p.name} project details`}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") onOpenProject?.(p.key);
        }}
      >
        <div className="proj-top">
          <h4>{p.name}</h4>
          <span className={`proj-status${p.statusClass ? ` ${p.statusClass}` : ""}`}>{p.status}</span>
        </div>
        <p>{p.summary}</p>
        <div className="proj-techs">
          {p.techs.map((t) => (
            <span className="proj-tech" key={t}>{t}</span>
          ))}
        </div>
      </div>
    );
  }

  return (
    <section className="section" id="work">
      <div className="work">
        <div className="work-left">
          <h2>Our recent work</h2>
          <p>Every project we build is deployed, live, and production-ready. We don't build demos — we build real products.</p>
          <button className="btn btn-ghost" onClick={() => setOpen((v) => !v)}>
            <span>{open ? "Show fewer projects" : "View all projects"}</span>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ width: 14, height: 14, transition: "transform .3s var(--ease)", transform: open ? "rotate(180deg)" : "none" }}
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
          <p style={{ marginTop: 16, fontSize: 11, color: "var(--text-muted)" }}>
            We&apos;ve also built internal dashboards, admin panels, and real-time data visualisation tools for clients across fintech, healthtech, and edtech.
          </p>
        </div>

        <div className="work-right">
          {featured.map((p, i) => (
            <Reveal as="div" key={p.key} delay={i * 0.08}>
              {ProjectCard(p)}
            </Reveal>
          ))}

          <div className={`proj-more${open ? " open" : ""}`}>
            {rest.map((p, i) => (
              <Reveal as="div" key={p.key} delay={i * 0.08}>
                {ProjectCard(p)}
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
