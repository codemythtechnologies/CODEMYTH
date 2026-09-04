import { Bricolage_Grotesque, Plus_Jakarta_Sans } from "next/font/google";
import "./emergent.css";
import "./globals.css";
import { ToastProvider } from "@/context/ToastContext";
import { AuthProvider } from "@/context/AuthContext";
import { ModalsProvider } from "@/context/ModalsContext";

// Premium enterprise pairing: Bricolage Grotesque for display/headings
// (distinctive, editorial-tech feel — avoids the generic "Inter +
// Space Grotesk" look most AI-generated sites converge on) and Plus
// Jakarta Sans for body copy (high legibility, warm geometric sans).
// Both self-hosted at build time by next/font — no render-blocking
// third-party request, nothing leaked to Google on every page load.
const bricolageGrotesque = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-display-family",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans-family",
  display: "swap",
});

// IMPORTANT: NEXT_PUBLIC_SITE_URL should be set to https://www.codemyth.in
// in your deployment environment (Vercel/Firebase env vars). If it's ever
// missing, this now falls back to the real production domain instead of a
// fake placeholder — a missing env var previously meant every absolute URL
// generated from metadataBase (Open Graph images, canonical links, etc.)
// pointed at a domain that doesn't exist.
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.codemyth.in";

export const metadata = {
  // SEO fix: was 67 chars (Google/most tools recommend 30-60 so it doesn't
  // get truncated in search results). Trimmed while keeping brand + the
  // core value prop.
  title: "Code Myth Technologies — Full-Stack & AI Software Studio",
  description:
    "Remote IT services company delivering full stack web apps, AI-powered solutions, and custom software — fast, clean, production-ready.",
  metadataBase: new URL(SITE_URL),
  // SEO fix: page had no <link rel="canonical">, which SEOmator flagged as
  // a failed check — without it, search engines have no explicit signal
  // for which URL is the "real" one if the page is ever reachable via
  // multiple paths (http/https, with/without www, ?query params, etc.).
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Code Myth Technologies",
    description:
      "Remote IT services company delivering full stack web apps, AI-powered solutions, and custom software.",
    type: "website",
    url: SITE_URL,
    siteName: "Code Myth Technologies",
    images: [
      {
        url: "/logo.png",
        width: 246,
        height: 246,
        alt: "Code Myth Technologies logo",
      },
    ],
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

// Organization structured data (JSON-LD). This is the actual signal Google
// uses to associate a logo/brand with your site in organic search results
// (Knowledge Graph, sitelinks, etc.) — separate from and unrelated to a
// Google Business Profile logo, which only affects the Business
// Profile/Maps panel, not organic search branding.
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Code Myth Technologies",
  alternateName: "CMT",
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  email: "info@codemyth.in",
  telephone: "+91-7397703202",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Pondicherry",
    addressRegion: "Puducherry",
    addressCountry: "IN",
  },
  sameAs: [
    "https://www.linkedin.com/company/code-myth-technologies",
    "https://github.com/codemythtechnologies",
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${bricolageGrotesque.variable} ${plusJakartaSans.variable}`}>
      <head>
        {/* SEO fix: SEOmator's LCP check wants the largest-contentful-paint
            image (the navbar logo, rendered eager+fetchpriority=high in
            Navbar.jsx) explicitly preloaded so the browser starts
            fetching it before it even discovers the <img> tag in the
            DOM, rather than relying on fetchpriority alone. */}
        <link rel="preload" as="image" href="/logo-icon.webp" fetchPriority="high" />
        {/* SEO fix: AI/GEO "llms.txt Reference" check — the file existed
            at /llms.txt but nothing in the HTML pointed to it. This is
            the emerging convention (mirrors how <link rel="alternate"
            type="application/rss+xml"> advertises a feed). */}
        <link rel="llms.txt" href="/llms.txt" />
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body>
        {/* Accessibility fix: SEOmator flagged no skip-to-content link.
            Visually hidden until focused, so it doesn't affect layout but
            lets keyboard/screen-reader users jump straight past the nav. */}
        <a href="#main-content" className="skip-to-content">
          Skip to content
        </a>
        <ToastProvider>
          <AuthProvider>
            <ModalsProvider>{children}</ModalsProvider>
          </AuthProvider>
        </ToastProvider>
      </body>
    </html>
  );
}