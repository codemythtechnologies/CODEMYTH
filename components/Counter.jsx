"use client";

import { useEffect, useState } from "react";

// NOTE: not currently rendered anywhere in the live page tree, but fixed
// for consistency with the rest of the codebase — this had the same
// unreliable `useInView`-gated animation (stuck at 0 forever) found and
// fixed in Metrics/BusinessAnalysisSection. Runs on mount instead.
export default function Counter({ target, suffix = "" }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const step = Math.max(1, Math.round(target / 40));
    let cur = 0;
    let raf;
    const tick = () => {
      cur = Math.min(target, cur + step);
      setValue(cur);
      if (cur < target) raf = requestAnimationFrame(tick);
    };
    tick();
    return () => cancelAnimationFrame(raf);
  }, [target]);

  return (
    <span>
      {value}
      {suffix && <span className="suffix">{suffix}</span>}
    </span>
  );
}
