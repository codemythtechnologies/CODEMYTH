"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

export default function Counter({ target, suffix = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
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
  }, [inView, target]);

  return (
    <span ref={ref}>
      {value}
      {suffix && <span className="suffix">{suffix}</span>}
    </span>
  );
}
