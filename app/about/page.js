import AboutClient from "@/components/AboutClient";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.codemyth.in";

export const metadata = {
  title: "About — Code Myth Technologies",
  description:
    "Code Myth Technologies is a remote-first engineering studio building full-stack web apps, AI-powered products, and custom software for startups and growing businesses.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About — Code Myth Technologies",
    description:
      "Code Myth Technologies is a remote-first engineering studio building full-stack web apps, AI-powered products, and custom software for startups and growing businesses.",
    url: `${SITE_URL}/about`,
    type: "website",
  },
};

export default function AboutPage() {
  return <AboutClient />;
}
