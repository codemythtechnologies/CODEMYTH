"use client";

import Navbar from "@/components/emergent/Navbar";
import { TrustBand } from "@/components/emergent/Sections1";
import { Process, WhyCodeMyth, Team, Footer } from "@/components/emergent/Sections3";
import TermsModal from "@/components/TermsModal";

// SEO fix: SEOmator's "About Page Link" check wants a real, dedicated
// About URL — an on-page anchor to the "Why CodeMyth" section wasn't
// enough (same root issue as Privacy/Terms before). This page reuses the
// real, already-live "Why CodeMyth", "Process", and "Team" sections
// rather than duplicating that content, so there's exactly one source of
// truth for it.
export default function AboutClient() {
  return (
    <div className="page-shell emergent-scope">
      <Navbar />
      <main id="main-content">
        <section className="px-6 pb-8 pt-40 md:px-12 lg:px-16">
          <div className="mx-auto max-w-site">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-cm-accent">About us</p>
            <h1 className="mt-4 max-w-3xl font-display text-4xl font-extrabold tracking-tight text-cm-text md:text-5xl">
              A remote-first engineering studio, built to ship real software.
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-cm-muted">
              Code Myth Technologies is a small, senior team building full-stack web apps, AI-powered products,
              and custom software for startups and growing businesses — engineering-first, AI-augmented, and
              hands-on with every client we work with.
            </p>
          </div>
        </section>
        <TrustBand />
        <Process />
        <WhyCodeMyth />
        <Team />
      </main>
      <Footer />
      <TermsModal />
    </div>
  );
}
