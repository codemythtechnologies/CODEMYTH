"use client";

import Link from "next/link";
import { Footer } from "@/components/emergent/Sections3";
import SmartImg from "@/components/emergent/SmartImg";

// Shared layout for the legal pages (Privacy Policy, Terms of Service).
// Deliberately simple/static — no client-only modal, so it's real,
// crawlable HTML that search engines and the SEOmator "About/Contact/
// Privacy/Terms link" checks can actually see, unlike the old
// button-triggered TermsModal.
export default function LegalPageShell({ title, updated, children }) {
  return (
    <div className="emergent-scope min-h-screen bg-paper text-cm-text">
      <header className="sticky top-0 z-40 border-b border-cm-border bg-paper shadow-[0_1px_0_0_rgba(0,0,0,0.04)]">
        <div className="mx-auto flex h-20 max-w-site items-center justify-between px-6 md:px-12 lg:px-16">
          <Link href="/" className="flex items-center gap-3">
            <SmartImg src="/logo-icon-dark.png" alt="Code Myth Technologies" width={910} height={333} loading="eager" className="h-8 w-auto" />
            <span className="flex flex-col leading-none">
              <span className="font-display text-lg font-extrabold tracking-tight text-cm-text">CodeMyth</span>
              <span className="mt-0.5 text-[12px] font-bold uppercase tracking-[0.2em] text-cm-muted">Technologies</span>
            </span>
          </Link>
          <Link href="/" className="text-sm font-semibold text-cm-muted transition-colors hover:text-cm-accent">
            ← Back to home
          </Link>
        </div>
      </header>

      <main id="main-content" className="mx-auto max-w-3xl px-6 py-20 md:px-0">
        <h1 className="font-display text-4xl font-extrabold tracking-tight text-cm-text md:text-5xl">{title}</h1>
        <p className="mt-3 text-sm text-cm-muted">Last updated: {updated}</p>
        <div className="legal-content mt-10 space-y-8">{children}</div>
      </main>

      <Footer />
    </div>
  );
}
