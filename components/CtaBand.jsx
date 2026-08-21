"use client";

import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { scrollToSection, useSiteActions } from "@/lib/useSiteActions";
import { useToast } from "@/context/ToastContext";
import AnimatedNetworkBG from "./AnimatedNetworkBG";

const CONTACT_EMAILS = [
  { label: "Primary", value: "info@codemyth.in" },
  { label: "Secondary", value: "codemyth.technologies@gmail.com" },
];

export default function CtaBand() {
  const { copyEmail } = useSiteActions();
  const showToast = useToast();
  const [emailPickerOpen, setEmailPickerOpen] = useState(false);
  const [pickerPos, setPickerPos] = useState({ top: 0, left: 0 });
  const [mounted, setMounted] = useState(false);
  const btnRef = useRef(null);

  useEffect(() => setMounted(true), []);

  function togglePicker() {
    if (!emailPickerOpen && btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect();
      setPickerPos({
        top: rect.bottom + 10,
        left: rect.left + rect.width / 2,
      });
    }
    setEmailPickerOpen((v) => !v);
  }

  async function copySelectedEmail(email) {
    try {
      await navigator.clipboard.writeText(email);
      showToast("Email copied", email, "success");
    } catch {
      showToast("Couldn't copy", "Please copy the email manually.", "info");
    }
    setEmailPickerOpen(false);
  }

  const dropdown = emailPickerOpen && (
    <div
      role="listbox"
      aria-label="Choose an email to copy"
      style={{
        position: "fixed",
        top: pickerPos.top,
        left: pickerPos.left,
        transform: "translateX(-50%)",
        zIndex: 1000,
        minWidth: 260,
        background: "var(--surface-1)",
        border: "0.5px solid var(--border-strong)",
        borderRadius: "var(--radius-md)",
        padding: 6,
        boxShadow: "0 24px 48px -20px rgba(0, 0, 0, .75)",
        textAlign: "left",
      }}
    >
      {CONTACT_EMAILS.map((e) => (
        <button
          key={e.value}
          type="button"
          role="option"
          onClick={() => copySelectedEmail(e.value)}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            width: "100%",
            padding: "8px 10px",
            background: "transparent",
            border: "none",
            borderRadius: 6,
            cursor: "pointer",
            textAlign: "left",
            transition: "background .2s var(--ease)",
          }}
          onMouseEnter={(ev) => (ev.currentTarget.style.background = "var(--surface-2)")}
          onMouseLeave={(ev) => (ev.currentTarget.style.background = "transparent")}
        >
          <span style={{ fontSize: 10, letterSpacing: 0.4, textTransform: "uppercase", color: "var(--text-muted)" }}>{e.label}</span>
          <span style={{ fontSize: 13, color: "var(--text-primary)" }}>{e.value}</span>
        </button>
      ))}
    </div>
  );

  // Close the picker if the person clicks anywhere outside it.
  useEffect(() => {
    if (!emailPickerOpen) return;
    function onDocClick(e) {
      if (btnRef.current && !btnRef.current.contains(e.target)) {
        setEmailPickerOpen(false);
      }
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [emailPickerOpen]);

  return (
    <section className="section cta-band">
      <AnimatedNetworkBG variant="dark" />
      <div className="section-tag" style={{ justifyContent: "center" }}><div className="dot" /><span>LET&apos;S TALK</span></div>
      <h2>Have a product idea? Let&apos;s make it <em style={{ color: "var(--accent)", fontStyle: "normal" }}>real</em>.</h2>
      <p>Free 30-minute consultation call. No pressure, no obligation — just a straight answer on scope and cost.</p>
      <div className="btn-row" style={{ justifyContent: "center" }}>
        <button className="btn btn-primary" onClick={() => scrollToSection("contact")}>Start a project</button>
        <button ref={btnRef} type="button" className="btn btn-ghost" onClick={togglePicker} aria-expanded={emailPickerOpen} aria-haspopup="listbox">
          Email us directly
        </button>
      </div>

      {mounted && dropdown && createPortal(dropdown, document.body)}
    </section>
  );
}