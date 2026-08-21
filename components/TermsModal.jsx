"use client";

import { useEffect, useRef } from "react";
import { useModals } from "@/context/ModalsContext";

export default function TermsModal() {
  const { termsOpen, scrollToData, closeTerms } = useModals();
  const bodyRef = useRef(null);

  useEffect(() => {
    if (termsOpen && scrollToData && bodyRef.current) {
      const anchor = bodyRef.current.querySelector("#terms-data-section");
      anchor?.scrollIntoView({ block: "start" });
    }
  }, [termsOpen, scrollToData]);

  if (!termsOpen) return null;

  return (
    <div className="modal-overlay open" onClick={(e) => { if (e.target === e.currentTarget) closeTerms(); }}>
      <div className="modal-box" role="dialog" aria-modal="true" aria-labelledby="termsModalTitle">
        <div className="modal-head">
          <h3 id="termsModalTitle">Terms &amp; Conditions</h3>
          <button className="modal-close" onClick={closeTerms} aria-label="Close">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
          </button>
        </div>
        <div className="modal-body" ref={bodyRef}>
          <h4>1. Acceptance of Terms</h4>
          <p>By accessing or using the Code Myth Technologies website and client portal, you agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our services.</p>

          <h4>2. Use of Services</h4>
          <p>Our services are intended for business and professional use. You agree to use Code Myth Technologies services only for lawful purposes and in a manner that does not infringe the rights of others or restrict their use of the platform. You must not misuse or attempt to gain unauthorised access to any part of our systems.</p>

          <h4>3. Account Responsibility</h4>
          <p>You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorised use of your account. Code Myth Technologies will not be liable for any loss resulting from unauthorised use of your account.</p>

          <h4>4. Intellectual Property</h4>
          <p>All content on this website — including text, graphics, logos, code, and design — is the intellectual property of Code Myth Technologies and is protected under applicable copyright and trademark law. You may not reproduce, distribute, or create derivative works without our prior written consent.</p>

          <h4>5. Project Work &amp; Deliverables</h4>
          <p>Work delivered under a client agreement is governed by the individual project contract signed between Code Myth Technologies and the client. Ownership of deliverables transfers to the client only upon receipt of full payment as specified in the project agreement.</p>

          <h4>6. Limitation of Liability</h4>
          <p>Code Myth Technologies shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of, or inability to use, our services. Our total liability in any matter arising out of or related to these terms shall not exceed the fees paid by you in the three months preceding the claim.</p>

          <h4 id="terms-data-section">7. Your Data</h4>
          <p>When you create an account, we collect your name, email address, and profile information to provide our services. This data is stored securely in Firebase (Google) infrastructure. We do not sell your personal data to third parties. You may request deletion of your account and associated data at any time using the &quot;Delete account&quot; option in your profile menu.</p>

          <h4>8. Termination</h4>
          <p>We reserve the right to suspend or terminate your account access if you violate these terms or engage in conduct we determine to be harmful to other users or our business. You may terminate your account at any time using the account deletion option in your profile.</p>

          <h4>9. Changes to Terms</h4>
          <p>We may update these Terms and Conditions from time to time. Continued use of our services after any changes constitutes your acceptance of the revised terms. We will make reasonable efforts to notify registered users of significant changes.</p>

          <h4>10. Governing Law</h4>
          <p>These Terms and Conditions are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in Chennai, Tamil Nadu, India.</p>

          <h4>11. Contact</h4>
          <p>For any questions about these terms, please contact us at codemyth.technologies@gmail.com or through the contact form on our website. MSME Registration: UDYAM-PY-03-0057608.</p>
        </div>
        <div className="modal-foot">
          <button onClick={closeTerms}>Got it, close</button>
        </div>
      </div>
    </div>
  );
}
