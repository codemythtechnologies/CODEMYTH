"use client";

import Navbar from "@/components/emergent/Navbar";
import { Footer } from "@/components/emergent/Sections3";
import ContactSection from "@/components/ContactSection";
import TermsModal from "@/components/TermsModal";

// SEO fix: same story as About — the footer's "Contact" link pointed to
// an in-page anchor, which SEOmator's "Contact Page Link" check doesn't
// count as a real contact page. This reuses the actual, backend-wired
// ContactSection (posts to /api/contact) as its own dedicated page.
export default function ContactClient() {
  return (
    <div className="page-shell emergent-scope">
      <Navbar />
      <main id="main-content">
        <section className="px-6 pb-2 pt-40 md:px-12 lg:px-16">
          <div className="mx-auto max-w-site">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-cm-accent">Contact</p>
            <h1 className="mt-4 max-w-2xl font-display text-4xl font-extrabold tracking-tight text-cm-text md:text-5xl">
              Have an idea worth building?
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-cm-muted">
              Tell us a bit about the project and we’ll get back to you within one business day.
            </p>
          </div>
        </section>
        <ContactSection />
      </main>
      <Footer />
      <TermsModal />
    </div>
  );
}
