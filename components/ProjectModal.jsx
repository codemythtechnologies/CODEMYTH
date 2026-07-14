"use client";

import { useState } from "react";
import { useModals } from "@/context/ModalsContext";
import { projects } from "@/data/projects";

function ProjectVisual({ p }) {
  const [failed, setFailed] = useState(false);

  // In-development projects don't have a live UI to screenshot yet — show a
  // clear status message instead of an image (matches old site behavior).
  if (p.statusClass === "dev") {
    return (
      <div className="proj-modal-visual-fallback proj-modal-visual-dev">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><polyline points="12 7 12 12 15 15" /></svg>
        <span>This project is under development.<br />UI preview will be added once it ships.</span>
      </div>
    );
  }

  if (failed) {
    return (
      <div className="proj-modal-visual-fallback">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="M21 15l-5-5L5 21" /></svg>
        <span>Add {p.image.split("/").pop()} to the assets/projects folder<br />to show this project&apos;s UI here</span>
      </div>
    );
  }

  return (
    <>
      <img className="proj-modal-visual-bg" src={p.image} alt="" aria-hidden="true" />
      <div className="proj-modal-visual-scrim" />
      <img className="proj-modal-visual-fg" src={p.image} alt={`${p.name} — UI screenshot`} onError={() => setFailed(true)} />
    </>
  );
}

export default function ProjectModal() {
  const { projectKey, closeProjectDetail } = useModals();
  if (!projectKey) return null;
  const p = projects.find((x) => x.key === projectKey);
  if (!p) return null;

  return (
    <div className="modal-overlay open" onClick={(e) => { if (e.target === e.currentTarget) closeProjectDetail(); }}>
      <div className="modal-box proj-modal-box" role="dialog" aria-modal="true" aria-labelledby="project-modal-title">
        <div className="modal-head">
          <h3 id="project-modal-title">{p.name}</h3>
          <button className="modal-close" aria-label="Close" onClick={closeProjectDetail}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
          </button>
        </div>
        <div className="proj-modal-body">
          <div className="proj-modal-info">
            <div className="proj-modal-status-row">
              <span className={`proj-status${p.statusClass ? ` ${p.statusClass}` : ""}`}>{p.status}</span>
            </div>
            <h3>{p.name}</h3>
            {p.desc.map((para, i) => <p className="proj-modal-desc" key={i}>{para}</p>)}
            <div className="proj-modal-label">Tech stack</div>
            <div className="proj-modal-techs">{p.techs.map((t) => <span className="proj-tech" key={t}>{t}</span>)}</div>

            {p.url && (
              <a
                className="proj-modal-link"
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit live site
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </a>
            )}
          </div>
          <div className="proj-modal-visual">
            <ProjectVisual p={p} />
          </div>
        </div>
      </div>
    </div>
  );
}
