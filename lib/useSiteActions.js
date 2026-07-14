"use client";

import { useCallback } from "react";
import { useToast } from "@/context/ToastContext";

export function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function useSiteActions() {
  const showToast = useToast();

  const copyEmail = useCallback(async () => {
    const email = "codemyth.technologies@gmail.com";
    try {
      await navigator.clipboard.writeText(email);
      showToast("Email copied", `${email} is on your clipboard.`, "success");
    } catch {
      showToast("Copy failed", `Please copy manually: ${email}`, "info");
    }
  }, [showToast]);

  return { scrollToSection, copyEmail };
}
