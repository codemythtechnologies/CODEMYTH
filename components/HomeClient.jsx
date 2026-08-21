"use client";

import Navbar from "@/components/emergent/Navbar";
import Hero from "@/components/emergent/Hero";
import { TrustBand, WhatWeDo, Capabilities, AIEngineering, AICapabilities } from "@/components/emergent/Sections1";
import { ProductDevelopment, Industries, SelectedWork, Showcase, Metrics } from "@/components/emergent/Sections2";
import { Process, WhyCodeMyth, Team, Insights, FinalCTA, Footer } from "@/components/emergent/Sections3";
import FaqSection from "@/components/emergent/FaqSection";
import BusinessAnalysisSection from "@/components/BusinessAnalysisSection";
import ContactSection from "@/components/ContactSection";
import BaConsultModal from "@/components/BaConsultModal";
import TermsModal from "@/components/TermsModal";
import DeleteConfirmModal from "@/components/DeleteConfirmModal";
import { useModals } from "@/context/ModalsContext";

export default function HomeClient() {
  const { openBAConsult, openTerms, openPrivacy } = useModals();

  return (
    <div className="page-shell emergent-scope">
      <Navbar />

      <main>
        <Hero />
        <TrustBand />
        <WhatWeDo />
        <Capabilities />
        <AIEngineering />
        <AICapabilities />

        {/* Dedicated Business Analyst / PM offering — real backend-wired
            consult request flow (BaConsultModal -> /api/ba-consult).
            Kept fully intact, only its surrounding sections were restyled. */}
        <BusinessAnalysisSection onOpenBAConsult={openBAConsult} />

        <ProductDevelopment />
        <Industries />
        <SelectedWork />
        <Showcase />
        <Metrics />
        <Process />
        <WhyCodeMyth />
        <Team />
        <Insights />
        <FaqSection />
        <FinalCTA />

        {/* Real contact form — posts to /api/contact. Untouched. */}
        <ContactSection />
      </main>

      <Footer onOpenTerms={() => openTerms()} onOpenPrivacy={openPrivacy} />

      <BaConsultModal />
      <TermsModal />
      <DeleteConfirmModal />
    </div>
  );
}
