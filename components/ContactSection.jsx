"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, contactClientSchema } from "@/lib/schemas";
import { useToast } from "@/context/ToastContext";
import { useSiteActions } from "@/lib/useSiteActions";
import Reveal from "./Reveal";

export default function ContactSection() {
  const showToast = useToast();
  const { copyEmail } = useSiteActions();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(contactClientSchema), defaultValues: { stage: "", need: "", message: "" } });

  const messageLen = (watch("message") || "").length;

  async function onSubmit(values) {
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      showToast(`Thanks, ${data.firstName || "there"}!`, "We'll reply within 24 hours.", "success");
      reset();
    } catch (err) {
      showToast("Couldn't send that", err.message, "info");
    }
  }

  return (
    <section className="section" id="contact">
      <div className="contact">
        <Reveal className="contact-left">
          <h2>Let&apos;s build something together</h2>
          <p>Tell us about your project. We respond within 24 hours and offer a free consultation call.</p>

          <div className="contact-info">
            <button type="button" className="contact-item clickable" onClick={copyEmail}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16v16H4z" opacity="0" /><path d="M22 6l-10 7L2 6" /><rect x="2" y="4" width="20" height="16" rx="2" /></svg>
              codemyth.technologies@gmail.com
            </button>
            <div className="contact-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
              Siruseri, Chennai — Remote worldwide
            </div>
            <div className="contact-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
              Response within 24 hours
            </div>
            <div className="contact-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" /></svg>
              UDYAM-PY-03-0057608
            </div>
          </div>

          <div className="social-row">
            <a className="icon-btn" href="mailto:codemyth.technologies@gmail.com" aria-label="Email"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 16, height: 16 }}><rect x="2" y="4" width="20" height="16" rx="2" /><path d="M22 6l-10 7L2 6" /></svg></a>
            <a className="icon-btn" href="https://github.com/codemythtechnologies" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 16, height: 16 }}><path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2.2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1.1-.8.1-.7.1-.7 1.2.1 1.9 1.3 1.9 1.3 1.1 1.9 2.9 1.3 3.6 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-6a4.6 4.6 0 0 1 1.3-3.2 4.3 4.3 0 0 1 .1-3.2s1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2a4.3 4.3 0 0 1 .1 3.2 4.6 4.6 0 0 1 1.3 3.2c0 4.7-2.8 5.7-5.5 6 .4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .3z" /></svg></a>
            <a className="icon-btn" href="https://www.linkedin.com/company/code-myth-technologies" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 16, height: 16 }}><path d="M20.4 20.4h-3.5v-5.6c0-1.3 0-3-1.9-3s-2.1 1.5-2.1 3v5.6H9.4V9h3.4v1.6h.1c.5-.9 1.6-1.9 3.3-1.9 3.6 0 4.2 2.4 4.2 5.4v6.3zM5.3 7.4a2 2 0 1 1 0-4 2 2 0 0 1 0 4zM7 20.4H3.6V9H7v11.4z" /></svg></a>
          </div>
        </Reveal>

        <Reveal as="form" className="contact-form" onSubmit={handleSubmit(onSubmit)} noValidate delay={0.1}>
          {/*
            Honeypot field.
            IMPORTANT: this must be invisible to real users AND to browser
            autofill heuristics. A previous version used a visible label
            "Company website" + a CSS-hidden wrapper class — Chrome/Edge
            autofill still matched on that label text (it sits right next
            to real Name/Email fields) and silently filled it in, which
            made the SERVER'S honeypot check reject the submission and
            return a fake "ok: true" (see route.js) — so users saw a
            success toast but nothing was ever saved or emailed.
            Fix: move the field off-screen with real positioning (autofill
            engines respect actual visibility, not just CSS classes) and
            avoid any label/name/id containing "company" or "website".
          */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              left: "-9999px",
              top: "-9999px",
              height: 0,
              width: 0,
              overflow: "hidden",
            }}
          >
            <label htmlFor="cf-hp">Leave this field empty</label>
            <input
              id="cf-hp"
              name="hp_check"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              {...register("company_website")}
            />
          </div>

          <Reveal as="div" className="field-row" delay={0.14}>
            <div className={`field${errors.name ? " error" : ""}`}>
              <label htmlFor="cf-name">Your name</label>
              <input id="cf-name" type="text" placeholder="Ada Lovelace" autoComplete="name" {...register("name")} />
              <div className="field-err">{errors.name?.message}</div>
            </div>
            <div className={`field${errors.email ? " error" : ""}`}>
              <label htmlFor="cf-email">Your email</label>
              <input id="cf-email" type="email" placeholder="you@company.com" autoComplete="email" {...register("email")} />
              <div className="field-err">{errors.email?.message}</div>
            </div>
          </Reveal>

          <Reveal as="div" className="field-row" delay={0.2}>
            <div className="field">
              <label htmlFor="cf-stage">Startup stage</label>
              <select id="cf-stage" {...register("stage")}>
                <option value="">Select a stage (optional)</option>
                <option value="idea">Just an idea</option>
                <option value="validating">Validating / early research</option>
                <option value="mvp">Building an MVP</option>
                <option value="launched">Launched, looking to grow</option>
              </select>
            </div>
            <div className="field">
              <label htmlFor="cf-need">What do you need?</label>
              <select id="cf-need" {...register("need")}>
                <option value="">Select an option (optional)</option>
                <option value="ba-product">Project Consultation</option>
                <option value="full-stack">Full Stack Development</option>
                <option value="ai">AI Integration</option>
                <option value="landing">Landing Page / Website</option>
                <option value="not-sure">Others</option>
              </select>
            </div>
          </Reveal>

          <Reveal as="div" className={`field${errors.message ? " error" : ""}`} delay={0.26}>
            <label htmlFor="cf-message">Tell us about your project</label>
            <textarea id="cf-message" placeholder="What are you building, and what's the timeline?" maxLength={500} {...register("message")} />
            <div className="char-count"><span>{messageLen}</span>/500</div>
            <div className="field-err">{errors.message?.message}</div>
          </Reveal>

          <button type="submit" className="btn btn-primary" style={{ width: "100%", padding: 13 }} disabled={isSubmitting}>
            <span>{isSubmitting ? "Sending…" : "Send message"}</span>
          </button>
        </Reveal>
      </div>
    </section>
  );
}