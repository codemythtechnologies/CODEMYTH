"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";

const ModalsContext = createContext(null);

function lockScroll(locked) {
  if (typeof document === "undefined") return;
  document.body.style.overflow = locked ? "hidden" : "";
}

export function ModalsProvider({ children }) {
  const [termsOpen, setTermsOpen] = useState(false);
  const [scrollToData, setScrollToData] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [baConsultOpen, setBaConsultOpen] = useState(false);
  const [stepIndex, setStepIndex] = useState(null); // 0-4 or null
  const [projectKey, setProjectKey] = useState(null);
  const [serviceKey, setServiceKey] = useState(null);

  const openTerms = useCallback((scrollTo = false) => {
    setScrollToData(scrollTo);
    setTermsOpen(true);
  }, []);
  const closeTerms = useCallback(() => setTermsOpen(false), []);
  const openPrivacy = useCallback(() => openTerms(true), [openTerms]);

  const openDeleteConfirm = useCallback(() => setDeleteConfirmOpen(true), []);
  const closeDeleteConfirm = useCallback(() => setDeleteConfirmOpen(false), []);

  const openBAConsult = useCallback(() => setBaConsultOpen(true), []);
  const closeBAConsult = useCallback(() => setBaConsultOpen(false), []);

  const openStepModal = useCallback((idx) => setStepIndex(idx), []);
  const closeStepModal = useCallback(() => setStepIndex(null), []);

  const openProjectDetail = useCallback((key) => setProjectKey(key), []);
  const closeProjectDetail = useCallback(() => setProjectKey(null), []);

  const openServiceModal = useCallback((key) => setServiceKey(key), []);
  const closeServiceModal = useCallback(() => setServiceKey(null), []);

  const anyOpen =
    termsOpen || deleteConfirmOpen || baConsultOpen || stepIndex !== null || projectKey !== null || serviceKey !== null;

  useEffect(() => {
    lockScroll(anyOpen);
  }, [anyOpen]);

  useEffect(() => {
    function onKeydown(e) {
      if (e.key === "Escape") {
        closeTerms();
        closeDeleteConfirm();
        closeStepModal();
        closeBAConsult();
        closeProjectDetail();
        closeServiceModal();
      }
    }
    document.addEventListener("keydown", onKeydown);
    return () => document.removeEventListener("keydown", onKeydown);
  }, [closeTerms, closeDeleteConfirm, closeStepModal, closeBAConsult, closeProjectDetail, closeServiceModal]);

  return (
    <ModalsContext.Provider
      value={{
        termsOpen,
        scrollToData,
        openTerms,
        closeTerms,
        openPrivacy,
        deleteConfirmOpen,
        openDeleteConfirm,
        closeDeleteConfirm,
        baConsultOpen,
        openBAConsult,
        closeBAConsult,
        stepIndex,
        openStepModal,
        closeStepModal,
        projectKey,
        openProjectDetail,
        closeProjectDetail,
        serviceKey,
        openServiceModal,
        closeServiceModal,
      }}
    >
      {children}
    </ModalsContext.Provider>
  );
}

export function useModals() {
  const ctx = useContext(ModalsContext);
  if (!ctx) throw new Error("useModals must be used inside <ModalsProvider>");
  return ctx;
}
