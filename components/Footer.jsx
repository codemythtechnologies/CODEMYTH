"use client";

import Link from "next/link";
import BrandMark from "./BrandMark";
import Reveal from "./Reveal";
import { scrollToSection, useSiteActions } from "@/lib/useSiteActions";

export default function Footer({ year }) {
  const { copyEmail } = useSiteActions();

  return (
    <Reveal as="footer" className="footer" y={28} duration={0.7}>
      <div className="footer-top">
        <div className="footer-brand">
          <a href="#home" className="brand" onClick={(e) => { e.preventDefault(); scrollToSection("home"); }}>
            <BrandMark size={60} />
            <div className="brand-lockup">
              <div className="brand-line1"><span className="b-code">CODE</span><span className="b-myth">MYTH</span></div>
              <div className="brand-line2">TECHNOLOGIES</div>
            </div>
          </a>
          <p>A remote-first IT studio building full stack apps, AI-powered tools, and custom software — engineered for the AI era, shipped with production discipline.</p>
        </div>

        <div className="footer-col">
          <h5>COMPANY</h5>
          <a href="#services" onClick={(e) => { e.preventDefault(); scrollToSection("services"); }}>Services</a>
          <a href="#business-analysis" onClick={(e) => { e.preventDefault(); scrollToSection("business-analysis"); }}>Discovery</a>
          <a href="#approach" onClick={(e) => { e.preventDefault(); scrollToSection("approach"); }}>Approach</a>
          <a href="#work" onClick={(e) => { e.preventDefault(); scrollToSection("work"); }}>Work</a>
          <a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection("contact"); }}>Contact</a>
        </div>

        <div className="footer-col">
          <h5>SERVICES</h5>
          <a href="#services" onClick={(e) => { e.preventDefault(); scrollToSection("services"); }}>Full stack development</a>
          <a href="#services" onClick={(e) => { e.preventDefault(); scrollToSection("services"); }}>AI integration</a>
          <a href="#services" onClick={(e) => { e.preventDefault(); scrollToSection("services"); }}>Landing pages</a>
          <a href="#services" onClick={(e) => { e.preventDefault(); scrollToSection("services"); }}>API development</a>
        </div>

        <div className="footer-col">
          <h5>GET STARTED</h5>
          <button type="button" onClick={() => scrollToSection("contact")}>Start a project</button>
          <button type="button" onClick={copyEmail}>Copy our email</button>
          <Link href="/signin">Client sign in</Link>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="f-left">CODE MYTH TECHNOLOGIES — UDYAM-PY-03-0057608</div>
        <div className="f-right">© <span>{year}</span> Code Myth Technologies, Chennai, India — Remote worldwide. All rights reserved.</div>
      </div>
    </Reveal>
  );
}
