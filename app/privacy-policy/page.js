import PrivacyPolicyClient from "@/components/PrivacyPolicyClient";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.codemyth.in";

export const metadata = {
  title: "Privacy Policy — Code Myth Technologies",
  description:
    "How Code Myth Technologies collects, uses, and protects personal data from website visitors, client-portal users, and project clients.",
  alternates: {
    canonical: "/privacy-policy",
  },
  openGraph: {
    title: "Privacy Policy — Code Myth Technologies",
    description:
      "How Code Myth Technologies collects, uses, and protects personal data from website visitors, client-portal users, and project clients.",
    url: `${SITE_URL}/privacy-policy`,
    type: "website",
  },
};

export default function PrivacyPolicyPage() {
  return <PrivacyPolicyClient />;
}
