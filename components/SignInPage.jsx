"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import BrandMark from "./BrandMark";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";

const EYE = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
);
const EYE_OFF = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.9 17.9A10.6 10.6 0 0 1 12 20c-7 0-11-8-11-8a19.4 19.4 0 0 1 4.2-5.4M9.9 4.2A9.7 9.7 0 0 1 12 4c7 0 11 8 11 8a19.4 19.4 0 0 1-2.6 3.7M14.1 14.1a3 3 0 1 1-4.2-4.2" /><line x1="1" y1="1" x2="23" y2="23" /></svg>
);
const GOOGLE_ICON = (
  <svg viewBox="0 0 24 24"><path fill="#EA4335" d="M12 10.2v3.9h5.5c-.24 1.3-1.7 3.8-5.5 3.8-3.3 0-6-2.7-6-6.1s2.7-6.1 6-6.1c1.9 0 3.2.8 3.9 1.5l2.7-2.6C16.9 3 14.7 2 12 2 6.9 2 2.7 6.1 2.7 11.2s4.2 9.2 9.3 9.2c5.4 0 9-3.8 9-9.1 0-.6-.1-1.1-.2-1.6H12z" /></svg>
);
const GITHUB_ICON = (
  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2.2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1.1-.8.1-.7.1-.7 1.2.1 1.9 1.3 1.9 1.3 1.1 1.9 2.9 1.3 3.6 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-6a4.6 4.6 0 0 1 1.3-3.2 4.3 4.3 0 0 1 .1-3.2s1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2a4.3 4.3 0 0 1 .1 3.2 4.6 4.6 0 0 1 1.3 3.2c0 4.7-2.8 5.7-5.5 6 .4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .3z" /></svg>
);

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function SignInPage() {
  const router = useRouter();
  const { user, signInWithGoogle, signInWithGithub, signUpWithEmail, signInWithEmail, sendReset } = useAuth();
  const showToast = useToast();

  const [tab, setTab] = useState("signin");
  const [redirecting, setRedirecting] = useState(false);
  const redirectStarted = useRef(false); // FIX: guards the effect below without being a dependency of it
  const [oauthBusy, setOauthBusy] = useState(false);

  const [si, setSi] = useState({ email: "", password: "", remember: false });
  const [siErrors, setSiErrors] = useState({});
  const [siBusy, setSiBusy] = useState(false);
  const [siShowPw, setSiShowPw] = useState(false);

  const [su, setSu] = useState({ name: "", email: "", password: "", confirm: "" });
  const [suErrors, setSuErrors] = useState({});
  const [suBusy, setSuBusy] = useState(false);
  const [suShowPw, setSuShowPw] = useState(false);
  const [suShowConfirm, setSuShowConfirm] = useState(false);

  // Mirrors the old site's onAuthStateChanged-driven redirect: as soon as a
  // session exists (fresh sign-in, or one already persisted from a prior
  // visit), show the success card and send them back to the homepage.
  //
  // FIX: previously this effect depended on `redirecting` state. Because the
  // effect itself called setRedirecting(true), that state change re-ran the
  // effect immediately and its cleanup (clearTimeout) cancelled the very
  // timer that was supposed to call router.push("/") — so the redirect never
  // fired. Using a ref instead of a dependency avoids that self-triggering
  // loop while keeping the exact same 1500ms delay and success-view timing.
  useEffect(() => {
    if (user && !redirectStarted.current) {
      redirectStarted.current = true;
      setRedirecting(true);
      const t = setTimeout(() => router.push("/"), 1500);
      return () => clearTimeout(t);
    }
  }, [user, router]);

  const strength = (() => {
    const v = su.password;
    let score = 0;
    if (v.length >= 6) score++;
    if (v.length >= 10 && /[0-9]/.test(v)) score++;
    if (/[A-Z]/.test(v) && /[^A-Za-z0-9]/.test(v)) score++;
    return score;
  })();

  async function handleOAuth(fn) {
    setOauthBusy(true);
    await fn();
    setOauthBusy(false);
  }

  async function handleSignIn(e) {
    e.preventDefault();
    const errs = {};
    if (!EMAIL_RE.test(si.email.trim())) errs.email = "Enter a valid email address";
    if (si.password.length < 6) errs.password = "Password must be at least 6 characters";
    setSiErrors(errs);
    if (Object.keys(errs).length) return;

    setSiBusy(true);
    const result = await signInWithEmail(si.email.trim(), si.password);
    setSiBusy(false);
    if (!result.ok) showToast("Error", result.error, "info");
  }

  async function handleSignUp(e) {
    e.preventDefault();
    const errs = {};
    if (su.name.trim().length < 2) errs.name = "Please enter your name";
    if (!EMAIL_RE.test(su.email.trim())) errs.email = "Enter a valid email address";
    if (su.password.length < 6) errs.password = "Use at least 6 characters";
    if (su.confirm !== su.password || su.confirm.length === 0) errs.confirm = "Passwords don't match";
    setSuErrors(errs);
    if (Object.keys(errs).length) return;

    setSuBusy(true);
    const result = await signUpWithEmail(su.name.trim(), su.email.trim(), su.password);
    setSuBusy(false);
    if (!result.ok) showToast("Error", result.error, "info");
  }

  function forgotPassword() {
    const email = si.email.trim();
    if (!EMAIL_RE.test(email)) {
      showToast("Password reset", "Enter your email above first, then try again.", "info");
      return;
    }
    sendReset(email);
  }

  return (
    <div className="signin-page">
      <div className="signin-top">
        <a href="/" className="brand">
          <BrandMark size={50} />
          <div className="brand-lockup">
            <div className="brand-line1"><span className="b-code">CODE</span><span className="b-myth">MYTH</span></div>
            <div className="brand-line2">TECHNOLOGIES</div>
          </div>
        </a>
        <a href="/" className="signin-back">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></svg>
          Back to site
        </a>
      </div>

      <div className="signin-wrap">
        <div className="signin-card">
          {!redirecting ? (
            <div className="signin-card-inner">
              <div className={`signin-tabs${tab === "signup" ? " signup" : ""}`}>
                <div className="signin-tab-indicator" />
                <button type="button" className={`signin-tab${tab === "signin" ? " active" : ""}`} onClick={() => setTab("signin")}>Sign in</button>
                <button type="button" className={`signin-tab${tab === "signup" ? " active" : ""}`} onClick={() => setTab("signup")}>Create account</button>
              </div>

              {tab === "signin" ? (
                <div className="signin-panel">
                  <div className="signin-card-head">
                    <h1>Welcome back</h1>
                    <p>Sign in to view project updates and message your team.</p>
                  </div>
                  <div className="oauth-row">
                    <button type="button" className="oauth-btn" disabled={oauthBusy} onClick={() => handleOAuth(signInWithGoogle)}>{GOOGLE_ICON}Google</button>
                    <button type="button" className="oauth-btn" disabled={oauthBusy} onClick={() => handleOAuth(signInWithGithub)}>{GITHUB_ICON}GitHub</button>
                  </div>
                  <div className="signin-divider"><span>OR CONTINUE WITH EMAIL</span></div>
                  <form onSubmit={handleSignIn} noValidate>
                    <div className={`field${siErrors.email ? " error" : ""}`}>
                      <label htmlFor="si-email">Email</label>
                      <input id="si-email" type="email" placeholder="you@company.com" autoComplete="email" value={si.email} onChange={(e) => setSi({ ...si, email: e.target.value })} />
                      <div className="field-err">{siErrors.email}</div>
                    </div>
                    <div className={`field${siErrors.password ? " error" : ""}`}>
                      <label htmlFor="si-password">Password</label>
                      <div className="input-wrap">
                        <input id="si-password" type={siShowPw ? "text" : "password"} placeholder="••••••••" autoComplete="current-password" value={si.password} onChange={(e) => setSi({ ...si, password: e.target.value })} />
                        <button type="button" className="pw-toggle" onClick={() => setSiShowPw((v) => !v)} aria-label="Toggle password visibility">{siShowPw ? EYE_OFF : EYE}</button>
                      </div>
                      <div className="field-err">{siErrors.password}</div>
                    </div>
                    <div className="row-between">
                      <label className="remember"><input type="checkbox" checked={si.remember} onChange={(e) => setSi({ ...si, remember: e.target.checked })} /> Remember me</label>
                      <button type="button" className="forgot" onClick={forgotPassword}>Forgot password?</button>
                    </div>
                    <button type="submit" className={`btn-submit${siBusy ? " loading" : ""}`} disabled={siBusy}>
                      <span className="spinner" /><span>Sign in</span>
                    </button>
                  </form>
                  <p className="switch-line">Don&apos;t have an account? <button type="button" onClick={() => setTab("signup")}>Create one</button></p>
                </div>
              ) : (
                <div className="signin-panel">
                  <div className="signin-card-head">
                    <h1>Create your account</h1>
                    <p>Set up client access to track your project with us.</p>
                  </div>
                  <div className="oauth-row">
                    <button type="button" className="oauth-btn" disabled={oauthBusy} onClick={() => handleOAuth(signInWithGoogle)}>{GOOGLE_ICON}Google</button>
                    <button type="button" className="oauth-btn" disabled={oauthBusy} onClick={() => handleOAuth(signInWithGithub)}>{GITHUB_ICON}GitHub</button>
                  </div>
                  <div className="signin-divider"><span>OR CONTINUE WITH EMAIL</span></div>
                  <form onSubmit={handleSignUp} noValidate>
                    <div className={`field${suErrors.name ? " error" : ""}`}>
                      <label htmlFor="su-name">Full name</label>
                      <input id="su-name" type="text" placeholder="Ada Lovelace" autoComplete="name" value={su.name} onChange={(e) => setSu({ ...su, name: e.target.value })} />
                      <div className="field-err">{suErrors.name}</div>
                    </div>
                    <div className={`field${suErrors.email ? " error" : ""}`}>
                      <label htmlFor="su-email">Email</label>
                      <input id="su-email" type="email" placeholder="you@company.com" autoComplete="email" value={su.email} onChange={(e) => setSu({ ...su, email: e.target.value })} />
                      <div className="field-err">{suErrors.email}</div>
                    </div>
                    <div className={`field${suErrors.password ? " error" : ""}`}>
                      <label htmlFor="su-password">Password</label>
                      <div className="input-wrap">
                        <input id="su-password" type={suShowPw ? "text" : "password"} placeholder="Create a password" autoComplete="new-password" value={su.password} onChange={(e) => setSu({ ...su, password: e.target.value })} />
                        <button type="button" className="pw-toggle" onClick={() => setSuShowPw((v) => !v)} aria-label="Toggle password visibility">{suShowPw ? EYE_OFF : EYE}</button>
                      </div>
                      <div className={`strength${strength > 0 ? ` w-${strength}` : ""}`}><i /><i /><i /></div>
                      <div className="field-err">{suErrors.password}</div>
                    </div>
                    <div className={`field${suErrors.confirm ? " error" : ""}`}>
                      <label htmlFor="su-confirm">Confirm password</label>
                      <div className="input-wrap">
                        <input id="su-confirm" type={suShowConfirm ? "text" : "password"} placeholder="Repeat your password" autoComplete="new-password" value={su.confirm} onChange={(e) => setSu({ ...su, confirm: e.target.value })} />
                        <button type="button" className="pw-toggle" onClick={() => setSuShowConfirm((v) => !v)} aria-label="Toggle password visibility">{suShowConfirm ? EYE_OFF : EYE}</button>
                      </div>
                      <div className="field-err">{suErrors.confirm}</div>
                    </div>
                    <button type="submit" className={`btn-submit${suBusy ? " loading" : ""}`} disabled={suBusy}>
                      <span className="spinner" /><span>Create account</span>
                    </button>
                  </form>
                  <p className="switch-line">Already have an account? <button type="button" onClick={() => setTab("signin")}>Sign in</button></p>
                </div>
              )}
            </div>
          ) : (
            <div className="success-view show">
              <div className="success-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
              </div>
              <h2>{`Welcome${user?.displayName ? `, ${user.displayName.split(" ")[0]}` : ""}!`}</h2>
              <p>Signed in as {user?.email}. Redirecting...</p>
              <div className="success-note">Your account is stored in Firestore. You&apos;ll be redirected in a moment.</div>
            </div>
          )}
        </div>
      </div>

      <p className="signin-foot-note">© {new Date().getFullYear()} Code Myth Technologies — UDYAM-PY-03-0057608</p>
    </div>
  );
}