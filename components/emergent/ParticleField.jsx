"use client";

import { useRef, useEffect } from "react";

// Canvas particle network — used in hero (dark) and final CTA.
export default function ParticleField({ color = "255,85,0", density = 70, className = "" }) {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let raf;
    let running = true;
    let w, h, dpr;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Small screens are the ones most likely to feel scroll jank from a
    // handful of these canvases all running at once, so they get a much
    // lighter particle count instead of the full desktop density.
    const isSmall = window.innerWidth < 768;
    const effectiveDensity = isSmall ? Math.min(density, 22) : density;

    const nodes = [];
    const init = () => {
      dpr = Math.min(window.devicePixelRatio || 1, isSmall ? 1.5 : 2);
      w = canvas.offsetWidth;
      h = canvas.offsetHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(effectiveDensity, Math.floor((w * h) / 14000));
      nodes.length = 0;
      for (let i = 0; i < count; i++) {
        nodes.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.25,
          vy: (Math.random() - 0.5) * 0.25,
          r: Math.random() * 1.6 + 0.6,
        });
      }
    };

    const draw = () => {
      if (!running) {
        raf = requestAnimationFrame(draw);
        return;
      }
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
        for (let j = i + 1; j < nodes.length; j++) {
          const m = nodes[j];
          const dx = n.x - m.x;
          const dy = n.y - m.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 130) {
            ctx.strokeStyle = `rgba(${color},${(1 - dist / 130) * 0.16})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(m.x, m.y);
            ctx.stroke();
          }
        }
        ctx.fillStyle = `rgba(${color},0.5)`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };

    init();
    if (reduce) {
      draw();
      cancelAnimationFrame(raf);
    } else {
      draw();
    }
    const onResize = () => init();
    window.addEventListener("resize", onResize);

    // Only spend CPU on the physics/redraw loop while the canvas is
    // actually visible. With several of these mounted down the page at
    // once, letting off-screen instances keep running their O(n²)
    // distance checks every frame was the main source of the scroll
    // stutter — pausing them here fixes that without changing how any of
    // them look on screen.
    const observer = new IntersectionObserver(
      ([entry]) => { running = entry.isIntersecting; },
      { rootMargin: "200px 0px" }
    );
    observer.observe(canvas);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      observer.disconnect();
    };
  }, [color, density]);

  return <canvas ref={ref} className={`h-full w-full ${className}`} data-testid="particle-field" />;
}
