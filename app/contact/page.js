import ContactClient from "@/components/ContactClient";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.codemyth.in";

export const metadata = {
  title: "Contact — Code Myth Technologies",
  description:
    "Get in touch with Code Myth Technologies to discuss a full-stack, AI, or custom software project. We reply within one business day.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact — Code Myth Technologies",
    description:
      "Get in touch with Code Myth Technologies to discuss a full-stack, AI, or custom software project. We reply within one business day.",
    url: `${SITE_URL}/contact`,
    type: "website",
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
