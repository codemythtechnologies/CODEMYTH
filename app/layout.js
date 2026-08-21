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
  title: "Code Myth Technologies — Building legendary code for the modern web",
  description:
    "Remote IT services company delivering full stack web apps, AI-powered solutions, and custom software — fast, clean, production-ready.",
  metadataBase: new URL(SITE_URL),
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
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body>
        <ToastProvider>
          <AuthProvider>
            <ModalsProvider>{children}</ModalsProvider>
          </AuthProvider>
        </ToastProvider>
      </body>
    </html>
  );
}