"use client";

import { useCallback, useState } from "react";
import { useToast } from "@/context/ToastContext";

export function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

// ---- Scroll-aware hover guard --------------------------------------------
// The "Industries" / "Capabilities" accordion rows expand on onMouseEnter
// so a mouse resting over a row previews it. That's the intended UX when
// the *mouse* moves under a still page — but when the *page* scrolls under
// a still mouse (clicking a nav/footer link that calls scrollToSection, or
// even an ordinary mouse-wheel scroll), the browser still fires
// mouseenter on every row that passes under the cursor. Each one expands
// and grows the section's height mid-scroll, which is exactly what reads
// as the scroll "getting stuck" on whatever row happens to pass under the
// cursor. Suppressing hover for a short window during/after any scroll
// means only a deliberately-resting mouse can trigger the expand, while a
// direct click always works immediately.
let lastScrollAt = 0;
if (typeof window !== "undefined") {
  window.addEventListener(
    "scroll",
    () => {
      lastScrollAt = Date.now();
    },
    { passive: true }
  );
}
const HOVER_GUARD_MS = 250;

export function useScrollSafeActive(initial = 0) {
  const [active, setActive] = useState(initial);
  const onHover = useCallback((i) => {
    if (Date.now() - lastScrollAt < HOVER_GUARD_MS) return;
    setActive(i);
  }, []);
  return [active, onHover, setActive];
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
