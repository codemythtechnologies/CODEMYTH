"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { baConsultSchema } from "@/lib/schemas";
import { useModals } from "@/context/ModalsContext";
import { useToast } from "@/context/ToastContext";

export default function BaConsultModal() {
  const { baConsultOpen, closeBAConsult } = useModals();
  const showToast = useToast();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(baConsultSchema), defaultValues: { message: "" } });

  const messageLen = (watch("message") || "").length;

  if (!baConsultOpen) return null;

  async function onSubmit(values) {
    try {
      const res = await fetch("/api/ba-consult", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      showToast(`Thanks, ${data.firstName || "there"}!`, "Our BA team will reach out within 24 hours.", "success");
      reset();
      closeBAConsult();
    } catch (err) {
      showToast("Couldn't send that", err.message, "info");
    }
  }

  return (
    <div className="modal-overlay ba-consult-overlay open" onClick={(e) => { if (e.target === e.currentTarget) closeBAConsult(); }}>
      <div className="modal-box ba-consult-box" role="dialog" aria-modal="true" aria-labelledby="baConsultModalTitle">
        <div className="modal-head">
          <h3 id="baConsultModalTitle">Consultation Request</h3>
          <button className="modal-close" onClick={closeBAConsult} aria-label="Close">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
          </button>
        </div>
        <div className="modal-body">
          <p>Tell us about your project and a Business Analyst from our team will get back to you within 24 hours.</p>
          <form id="baConsultForm" onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="hp-field" aria-hidden="true">
              <label htmlFor="ba-company-web">Company website</label>
              <input id="ba-company-web" type="text" tabIndex={-1} autoComplete="off" {...register("company_website")} />
            </div>

            <div className="field-row">
              <div className={`field${errors.name ? " error" : ""}`}>
                <label htmlFor="ba-name">Your name</label>
                <input id="ba-name" type="text" placeholder="Ada Lovelace" autoComplete="name" {...register("name")} />
                <div className="field-err">{errors.name?.message}</div>
              </div>
              <div className={`field${errors.email ? " error" : ""}`}>
                <label htmlFor="ba-email">Work email</label>
                <input id="ba-email" type="email" placeholder="you@company.com" autoComplete="email" {...register("email")} />
                <div className="field-err">{errors.email?.message}</div>
              </div>
            </div>

            <div className="field-row">
              <div className="field">
                <label htmlFor="ba-company">Company (optional)</label>
                <input id="ba-company" type="text" placeholder="Company name" autoComplete="organization" {...register("company")} />
              </div>
              <div className="field">
                <label htmlFor="ba-phone">Phone (optional)</label>
                <input id="ba-phone" type="tel" placeholder="+1 555 000 0000" autoComplete="tel" {...register("phone")} />
              </div>
            </div>

            <div className="field">
              <label htmlFor="ba-need">What do you need help with?</label>
              <select id="ba-need" {...register("need")}>
                <option value="URS / FRS / PQ / IQ documentation">Documentation</option>
                <option value="Agile delivery & sprint planning">Agile delivery &amp; sprint planning</option>
                <option value="Dashboarding & reporting">Dashboarding &amp; reporting</option>
                <option value="SAP integration & process mapping">SAP integration &amp; process mapping</option>
                <option value="Something else">Others</option>
              </select>
            </div>

            <div className={`field${errors.message ? " error" : ""}`}>
              <label htmlFor="ba-message">Project details</label>
              <textarea id="ba-message" maxLength={500} placeholder="What are you working on, and what's the timeline?" {...register("message")} />
              <div className="char-count"><span>{messageLen}</span>/500</div>
              <div className="field-err">{errors.message?.message}</div>
            </div>

            {/* FIX: submit button moved inside the <form> — it previously lived in
                .modal-foot below, connected only via the cross-element form="baConsultForm"
                attribute, which was unreliable and caused the button to intermittently
                do nothing when clicked. */}
            <button type="submit" className="ba-consult-submit" disabled={isSubmitting}>
              <span>{isSubmitting ? "Sending…" : "Request consultation"}</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}