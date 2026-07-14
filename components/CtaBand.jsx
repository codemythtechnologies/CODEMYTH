"use client";

import { scrollToSection, useSiteActions } from "@/lib/useSiteActions";

export default function CtaBand() {
  const { copyEmail } = useSiteActions();

  return (
    <section className="section cta-band">
      <div className="section-tag" style={{ justifyContent: "center" }}><div className="dot" /><span>LET&apos;S TALK</span></div>
      <h2>Have a product idea? Let&apos;s make it <em style={{ color: "var(--accent)", fontStyle: "normal" }}>real</em>.</h2>
      <p>Free 30-minute consultation call. No pressure, no obligation — just a straight answer on scope and cost.</p>
      <div className="btn-row">
        <button className="btn btn-primary" onClick={() => scrollToSection("contact")}>Start a project</button>
        <button className="btn btn-ghost" onClick={copyEmail}>Email us directly</button>
      </div>
    </section>
  );
}
