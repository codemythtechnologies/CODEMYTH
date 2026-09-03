import TermsOfServiceClient from "@/components/TermsOfServiceClient";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.codemyth.in";

export const metadata = {
  title: "Terms of Service — Code Myth Technologies",
  description:
    "The terms and conditions governing use of the Code Myth Technologies website, client portal, and project engagements.",
  alternates: {
    canonical: "/terms-of-service",
  },
  openGraph: {
    title: "Terms of Service — Code Myth Technologies",
    description:
      "The terms and conditions governing use of the Code Myth Technologies website, client portal, and project engagements.",
    url: `${SITE_URL}/terms-of-service`,
    type: "website",
  },
};

export default function TermsOfServicePage() {
  return <TermsOfServiceClient />;
}
