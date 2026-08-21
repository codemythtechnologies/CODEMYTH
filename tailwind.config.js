/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./data/**/*.{js,jsx}",
  ],
  // Preflight (Tailwind's CSS reset) is intentionally OFF. This codebase has
  // a large amount of existing hand-written CSS in app/globals.css powering
  // pages/components outside the redesigned homepage (sign-in, modals,
  // account flows). Enabling preflight would silently reset margins,
  // headings, form elements, etc. site-wide and could break those untouched
  // screens. Utility classes (bg-ink-900, text-cm-accent, etc.) still work
  // exactly the same without it.
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {
      fontFamily: {
        // Mapped to the same next/font-loaded variables already set on
        // <html> in app/layout.js (Bricolage Grotesque / Plus Jakarta
        // Sans) — no extra font request, single source of truth.
        sans: ["var(--font-sans-family)", "sans-serif"],
        display: ["var(--font-display-family)", "sans-serif"],
      },
      colors: {
        ink: {
          900: "#0B0D10",
          800: "#12161C",
          700: "#1A1F27",
        },
        paper: "#F5F5F2",
        cm: {
          text: "#17191C",
          muted: "#6F747C",
          border: "#D9DCE0",
          accent: "#FF5500",
          accentHover: "#CC4400",
        },
      },
      maxWidth: { site: "1400px" },
    },
  },
  plugins: [],
};
