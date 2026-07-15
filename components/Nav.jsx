"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import BrandMark from "@/components/BrandMark";
import { useModals } from "@/context/ModalsContext";
import { useAuth, initialsFor } from "@/context/AuthContext";
import { scrollToSection, useSiteActions } from "@/lib/useSiteActions";

const SERVICE_LINKS = [
  { key: "fullstack", title: "Full stack development", sub: "MERN web apps, built and deployed by us" },
  { key: "ai", title: "AI integration", sub: "LLM assistants, chatbots & automation" },
  { key: "landing", title: "Landing pages", sub: "Fast, responsive, high-converting sites" },
  { key: "api", title: "API development", sub: "Scalable backends & REST APIs" },
];

const AI_ERA_LINKS = [
  { key: "pipeline", id: "ai-era-pipeline", title: "Delivery pipeline", sub: "How AI moves work from generate to ship" },
  { key: "metrics", id: "ai-era-metrics", title: "Speed & quality metrics", sub: "Time-to-production and defect capture rate" },
  { key: "principles", id: "ai-era-principles", title: "Our AI principles", sub: "Where we use AI — and where we don't" },
];

function flashHighlight(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.classList.remove("jump-highlight");
  void el.offsetWidth;
  el.classList.add("jump-highlight");
}

export default function Nav({ onOpenServiceDetail }) {
  const [scrolled, setScrolled] = useState(false);
  const [showToTop, setShowToTop] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDrop, setOpenDrop] = useState(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null); // FIX: lets the outside-click check below test click position directly instead of depending on stopPropagation
  const { openTerms, openPrivacy, openDeleteConfirm } = useModals();
  const { user, signOutUser } = useAuth();

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 20);
      setShowToTop(window.scrollY > 600);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // FIX: Next.js App Router hydrates React onto `document` itself, so
  // React's own delegated click handling lives on the same node this
  // listener is on. stopPropagation() on a wrapper div only stops an event
  // from reaching *other* elements — it can't stop a second listener that's
  // also registered directly on `document`. Previously that meant every
  // click on the profile avatar opened the menu and then this same listener
  // immediately closed it again in the same click. Checking the click
  // target against profileRef fixes that regardless of where React's root
  // event listener lives.
  useEffect(() => {
    function onDocClick(e) {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
      setOpenDrop(null);
    }
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  function go(id) {
    scrollToSection(id);
    setMobileOpen(false);
  }

  function openAiEraDetail(key) {
    const link = AI_ERA_LINKS.find((l) => l.key === key);
    const id = link?.id || "ai-era";
    scrollToSection(id);
    flashHighlight(id);
    setOpenDrop(null);
  }

  const initials = user ? initialsFor(user.displayName || user.email || "") : "?";

  return (
    <>
      <nav className={`nav${scrolled ? " scrolled" : ""}`}>
        <a href="#home" className="brand" onClick={(e) => { e.preventDefault(); go("home"); }}>
          <BrandMark />
          <div className="brand-lockup">
            <div className="brand-line1"><span className="b-code">CODE</span><span className="b-myth">MYTH</span></div>
            <div className="brand-line2">TECHNOLOGIES</div>
          </div>
        </a>

        <div className="nav-center">
          <div className={`nav-drop${openDrop === "services" ? " open" : ""}`} onClick={(e) => e.stopPropagation()}>
            <a
              href="#services"
              className="nav-drop-trigger"
              onClick={(e) => { e.preventDefault(); go("services"); }}
              onMouseEnter={() => setOpenDrop("services")}
            >
              Services
              <svg className="nav-caret" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
            </a>
            <div className="nav-dropdown" onMouseLeave={() => setOpenDrop(null)}>
              {SERVICE_LINKS.map((s) => (
                <button key={s.key} className="nav-drop-item" onClick={() => { onOpenServiceDetail(s.key); setOpenDrop(null); }}>
                  <b>{s.title}</b><small>{s.sub}</small>
                </button>
              ))}
            </div>
          </div>

          <div className={`nav-drop${openDrop === "ai-era" ? " open" : ""}`} onClick={(e) => e.stopPropagation()}>
            <a
              href="#ai-era"
              className="nav-drop-trigger"
              onClick={(e) => { e.preventDefault(); go("ai-era"); }}
              onMouseEnter={() => setOpenDrop("ai-era")}
            >
              The AI Era
              <svg className="nav-caret" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
            </a>
            <div className="nav-dropdown" onMouseLeave={() => setOpenDrop(null)}>
              {AI_ERA_LINKS.map((l) => (
                <button key={l.key} className="nav-drop-item" onClick={() => openAiEraDetail(l.key)}>
                  <b>{l.title}</b><small>{l.sub}</small>
                </button>
              ))}
            </div>
          </div>

          <a href="#business-analysis" onClick={(e) => { e.preventDefault(); go("business-analysis"); }}>Discovery</a>
          <a href="#approach" onClick={(e) => { e.preventDefault(); go("approach"); }}>Approach</a>
          <a href="#work" onClick={(e) => { e.preventDefault(); go("work"); }}>Work</a>
          <a href="#team" onClick={(e) => { e.preventDefault(); go("team"); }}>Our Team</a>
          <a href="#contact" onClick={(e) => { e.preventDefault(); go("contact"); }}>Contact</a>
        </div>

        <div className="nav-right">
          {!user && (
            <Link href="/signin" className="nav-signin">Sign in</Link>
          )}

          {user && (
            <div className="profile-wrap visible" ref={profileRef} onClick={(e) => e.stopPropagation()}>
              <button
                className="profile-avatar"
                aria-label="Account menu"
                aria-haspopup="true"
                aria-expanded={profileOpen}
                onClick={() => setProfileOpen((o) => !o)}
              >
                {user.photoURL ? <img src={user.photoURL} alt="" width={32} height={32} referrerPolicy="no-referrer" /> : <span>{initials}</span>}
              </button>
              <div className={`profile-menu${profileOpen ? " open" : ""}`} role="menu">
                <div className="profile-info">
                  <div className="profile-info-avatar">
                    {user.photoURL ? <img src={user.photoURL} alt="" width={40} height={40} referrerPolicy="no-referrer" /> : initials}
                  </div>
                  <div className="profile-info-text">
                    <div className="profile-info-name">{user.displayName || "Client"}</div>
                    <div className="profile-info-email">{user.email || ""}</div>
                  </div>
                </div>
                <button className="profile-menu-item" role="menuitem" onClick={() => { openPrivacy(); setProfileOpen(false); }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4.5 8-11V5l-8-3-8 3v6c0 6.5 8 11 8 11z" /></svg>
                  Privacy & data
                </button>
                <button className="profile-menu-item" role="menuitem" onClick={() => { openTerms(); setProfileOpen(false); }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" /></svg>
                  Terms & Conditions
                </button>
                <div className="profile-menu-divider" />
                <button className="profile-menu-item danger" role="menuitem" onClick={() => { openDeleteConfirm(); setProfileOpen(false); }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14H6L5 6" /><path d="M10 11v6M14 11v6" /><path d="M9 6V4h6v2" /></svg>
                  Delete account
                </button>
                <button className="profile-menu-item danger" role="menuitem" onClick={() => { signOutUser(); setProfileOpen(false); }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>
                  Log out
                </button>
              </div>
            </div>
          )}

          <button className="btn btn-primary" onClick={() => go("contact")}>Hire us</button>
          <button className="nav-toggle" aria-label="Open menu" onClick={() => setMobileOpen((o) => !o)}>
            {mobileOpen ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
            )}
          </button>
        </div>
      </nav>

      <div className={`nav-mobile-panel${mobileOpen ? " open" : ""}`}>
        <a onClick={() => go("services")}>Services</a>
        <a onClick={() => go("ai-era")}>The AI Era</a>
        <a onClick={() => go("business-analysis")}>Discovery</a>
        <a onClick={() => go("approach")}>Approach</a>
        <a onClick={() => go("work")}>Work</a>
        <a onClick={() => go("team")}>Our Team</a>
        <a onClick={() => go("contact")}>Contact</a>
        {!user ? (
          <Link href="/signin" className="nm-signin">Sign in</Link>
        ) : (
          <div>
            <div style={{ fontSize: 10, letterSpacing: 1.5, color: "var(--text-muted)", margin: "16px 0 4px", paddingTop: 14, borderTop: "0.5px solid var(--border)" }}>SIGNED IN AS</div>
            <div style={{ fontSize: 14, color: "var(--text-primary)", marginBottom: 10, wordBreak: "break-all" }}>{user.email}</div>
            <a onClick={() => { openPrivacy(); setMobileOpen(false); }}>Privacy & data</a>
            <a onClick={() => { openTerms(); setMobileOpen(false); }}>Terms & Conditions</a>
            <a onClick={() => { openDeleteConfirm(); setMobileOpen(false); }} style={{ color: "#ff8a75" }}>Delete account</a>
            <a onClick={() => { signOutUser(); setMobileOpen(false); }} style={{ color: "#ff8a75" }}>Log out</a>
          </div>
        )}
        <button className="btn btn-primary" onClick={() => go("contact")}>Hire us</button>
      </div>

      <button className={`to-top${showToTop ? " show" : ""}`} aria-label="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="19" x2="12" y2="5" /><polyline points="5 12 12 5 19 12" /></svg>
      </button>
    </>
  );
}