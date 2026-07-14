"use client";

import { useState } from "react";

// Simple wrapper around the logo image so every place that shows the
// brand mark (Nav, Footer, etc.) resizes it consistently from one spot.
// Drop your real logo file at /public/logo.png — this component points
// at it, and falls back to a lightweight "C" monogram if the file isn't
// there yet, so a missing asset never breaks the layout or throws a 404
// the user notices as a broken-image icon.
export default function BrandMark({ size = 44 }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        aria-hidden="true"
        style={{
          width: size,
          height: size,
          borderRadius: size * 0.22,
          background: "linear-gradient(160deg, var(--accent), var(--accent-dark))",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          fontFamily: "var(--font-display)",
          fontWeight: 700,
          color: "#fff",
          fontSize: size * 0.5,
        }}
      >
        C
      </div>
    );
  }

  return (
    <img
      src="/logo.png"
      alt="Code Myth Technologies"
      width={size}
      height={size}
      style={{ width: size, height: size, objectFit: "contain", flexShrink: 0 }}
      onError={() => setFailed(true)}
    />
  );
}
