import LegalPageShell from "@/components/LegalPageShell";

const SECTIONS = [
  {
    h: "1. Acceptance of Terms",
    p: [
      "By accessing or using the Code Myth Technologies website and client portal, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.",
    ],
  },
  {
    h: "2. Use of Services",
    p: [
      "Our services are intended for business and professional use. You agree to use Code Myth Technologies services only for lawful purposes and in a manner that does not infringe the rights of others or restrict their use of the platform. You must not misuse or attempt to gain unauthorised access to any part of our systems.",
    ],
  },
  {
    h: "3. Account Responsibility",
    p: [
      "You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorised use of your account. Code Myth Technologies will not be liable for any loss resulting from unauthorised use of your account.",
    ],
  },
  {
    h: "4. Intellectual Property",
    p: [
      "All content on this website — including text, graphics, logos, code, and design — is the intellectual property of Code Myth Technologies and is protected under applicable copyright and trademark law. You may not reproduce, distribute, or create derivative works without our prior written consent.",
    ],
  },
  {
    h: "5. Project Work & Deliverables",
    p: [
      "Work delivered under a client agreement is governed by the individual project contract signed between Code Myth Technologies and the client. Ownership of deliverables transfers to the client only upon receipt of full payment as specified in the project agreement.",
    ],
  },
  {
    h: "6. Limitation of Liability",
    p: [
      "Code Myth Technologies shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of, or inability to use, our services. Our total liability in any matter arising out of or related to these terms shall not exceed the fees paid by you in the three months preceding the claim.",
    ],
  },
  {
    h: "7. Termination",
    p: [
      "We reserve the right to suspend or terminate your account access if you violate these terms or engage in conduct we determine to be harmful to other users or our business. You may terminate your account at any time using the account deletion option in your profile.",
    ],
  },
  {
    h: "8. Changes to These Terms",
    p: [
      "We may update these Terms of Service from time to time. Continued use of our services after any changes constitutes your acceptance of the revised terms. We will make reasonable efforts to notify registered users of significant changes.",
    ],
  },
  {
    h: "9. Governing Law",
    p: [
      "These Terms of Service are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in Chennai, Tamil Nadu, India.",
    ],
  },
  {
    h: "10. Contact",
    p: [
      "For any questions about these terms, contact us at info@codemyth.in or through the contact form on our website. MSME Registration: UDYAM-PY-03-0057608.",
    ],
  },
];

export default function TermsOfServiceClient() {
  return (
    <LegalPageShell title="Terms of Service" updated="2 September 2026">
      <p className="text-[15px] leading-relaxed text-cm-muted">
        These Terms of Service (“Terms”) govern your access to and use of the Code Myth Technologies website,
        client portal, and related services. Please read them carefully. This page — rather than a pop-up — is the
        canonical, linkable version of our terms.
      </p>
      {SECTIONS.map((s) => (
        <section key={s.h}>
          <h2 className="font-display text-xl font-bold tracking-tight text-cm-text">{s.h}</h2>
          {s.p.map((para, i) => (
            <p key={i} className="mt-2 text-[15px] leading-relaxed text-cm-muted">
              {para}
            </p>
          ))}
        </section>
      ))}
    </LegalPageShell>
  );
}
