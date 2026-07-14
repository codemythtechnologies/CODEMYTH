"use client";

import { useRef } from "react";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import ServicesSection from "@/components/ServicesSection";
import ServiceDetailSection from "@/components/ServiceDetailSection";
import AiEraSection from "@/components/AiEraSection";
import BusinessAnalysisSection from "@/components/BusinessAnalysisSection";
import ApproachSection from "@/components/ApproachSection";
import StepModal from "@/components/StepModal";
import WorkSection from "@/components/WorkSection";
import ProjectModal from "@/components/ProjectModal";
import ServiceModal from "@/components/ServiceModal";
import StatsStrip from "@/components/StatsStrip";
import PromiseSection from "@/components/PromiseSection";
import TeamSection from "@/components/TeamSection";
import CtaBand from "@/components/CtaBand";
import ContactSection from "@/components/ContactSection";
import BaConsultModal from "@/components/BaConsultModal";
import TermsModal from "@/components/TermsModal";
import DeleteConfirmModal from "@/components/DeleteConfirmModal";
import Footer from "@/components/Footer";
import { useModals } from "@/context/ModalsContext";

export default function HomeClient() {
  const serviceDetailRef = useRef(null);
  const { openStepModal, openProjectDetail, openBAConsult, openServiceModal } = useModals();

  return (
    <div className="page-shell">
      <Nav onOpenServiceDetail={(key) => serviceDetailRef.current?.open(key)} />

      <main>
        <Hero />
        <ServicesSection
          onOpenServiceDetail={(key) => serviceDetailRef.current?.open(key)}
          onOpenServiceModal={openServiceModal}
        />
        <ServiceDetailSection ref={serviceDetailRef} />
        <AiEraSection />
        <BusinessAnalysisSection onOpenBAConsult={openBAConsult} />
        <ApproachSection onOpenStep={openStepModal} />
        <WorkSection onOpenProject={openProjectDetail} />
        <StatsStrip />
        <PromiseSection />
        <TeamSection />
        <CtaBand />
        <ContactSection />
      </main>

      <Footer year={new Date().getFullYear()} />

      <StepModal />
      <ProjectModal />
      <ServiceModal />
      <BaConsultModal />
      <TermsModal />
      <DeleteConfirmModal />
    </div>
  );
}
