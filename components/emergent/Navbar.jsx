"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ArrowUpRight, Plus, Minus } from "lucide-react";
import { NAV } from "@/data/emergentContent";
import { scrollToSection } from "@/lib/useSiteActions";
import { useModals } from "@/context/ModalsContext";
import { useAuth, initialsFor } from "@/context/AuthContext";

const ease = [0.22, 1, 0.36, 1];

// Real CodeMyth Technologies logo mark (public/logo-icon.png, cropped to
// just the CMT emblem — no baked-in wordmark, since that rendered
// illegibly small at navbar height). "CodeMyth" is set as real HTML text
// next to it instead, so the brand name stays crisp at any size. Two
// colour variants of the icon: the as-designed white+orange mark for the
// transparent/dark state, and a dark-ink recolour for the frosted state.
const Logo = ({ dark }) => (
  <a
    href="#home"
    data-testid="nav-logo"
    onClick={(e) => { e.preventDefault(); scrollToSection("home"); }}
    className="flex shrink-0 items-center gap-2.5"
  >
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img
      src={dark ? "/logo-icon.png" : "/logo-icon-dark.png"}
      alt=""
      className="h-5 w-auto md:h-6"
    />
    <span className="flex flex-col leading-none">
      <span className="font-display text-base font-extrabold tracking-tight text-white md:text-lg">
        CodeMyth
      </span>
      <span className="mt-0.5 text-[8px] font-bold uppercase tracking-[0.28em] text-white/60 md:text-[9px]">
        Technologies
      </span>
    </span>
  </a>
);

export default function Navbar() {
  const [scrollProgress, setScrollProgress] = useState(0); // 0 → top, 1 → fully scrolled
  const [open, setOpen] = useState(null); // desktop mega menu label
  const [mobile, setMobile] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);
  const { openTerms, openPrivacy, openDeleteConfirm } = useModals();
  const { user, signOutUser } = useAuth();
  const router = useRouter();

  // Liquid-glass blend: instead of a hard on/off "scrolled" boolean, the
  // blur/opacity/border ramp up continuously over the first 120px of
  // scroll, so the nav's frosted edge visibly *blends* in as the user
  // starts scrolling rather than snapping between two fixed states.
  useEffect(() => {
    const onScroll = () => {
      const p = Math.min(window.scrollY / 120, 1);
      setScrollProgress(p);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrolled = scrollProgress > 0.5;

  // Nav items are mostly "pointers": clicking one scrolls to wherever that
  // group's content lives on the homepage, and the full write-up opens
  // when the person clicks the card/row itself inside that section (via a
  // Link to /detail/[slug]). Solutions items are the exception — they
  // don't have a matching homepage section, so they carry an explicit
  // `slug` and go straight to their own /detail page instead.
  function openNavItem(group, item) {
    setOpen(null);
    setMobileOpen(null);
    setMobile(false);
    if (item.slug) {
      router.push(`/detail/${item.slug}`);
      return;
    }
    scrollToSection(item.sectionId || group.sectionId);
  }

  useEffect(() => {
    document.documentElement.style.overflow = mobile ? "hidden" : "";
  }, [mobile]);

  useEffect(() => {
    function onDocClick(e) {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    }
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  // FIX: the pill background is now a permanent dark tint (see the inline
  // style above) rather than fading to a light frosted panel once scrolled,
  // so the white logo/text variant should stay active at every scroll
  // position instead of flipping to the dark-ink variant that used to
  // vanish against it.
  const dark = true;
  const initials = user ? initialsFor(user.displayName || user.email || "") : "?";

  function goContact() {
    setMobile(false);
    scrollToSection("contact");
  }

  return (
    <>
      <header data-testid="navbar" className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-4 sm:pt-4">
        <div
          onMouseLeave={() => setOpen(null)}
          className="relative mx-auto max-w-[1320px] rounded-full transition-[height] duration-500"
          style={{
            // True liquid-glass blend: blur, tint, border and shadow all
            // ramp up smoothly with scroll progress instead of snapping
            // between a transparent and a solid state — and because the
            // whole bar is a rounded-full "pill" (not an edge-to-edge
            // rectangle), the frosted glass reads as a floating oval
            // capsule once it appears, rather than a flat strip.
            //
            // Navbar blur effect: starts COMPLETELY TRANSPARENT at top,
            // gradually appears as you scroll down. At scrollProgress 0 (page top):
            // no blur, no background. As you scroll, blur and background fade in.
            // This keeps the hero design clean at the top, then the nav bar
            // solidifies as a frosted glass effect when scrolling.
            backdropFilter: `blur(${scrollProgress * 24}px) saturate(${100 + scrollProgress * 80}%)`,
            WebkitBackdropFilter: `blur(${scrollProgress * 24}px) saturate(${100 + scrollProgress * 80}%)`,
            background: `rgba(8, 9, 12, ${scrollProgress * 0.5})`,
            border: `1px solid rgba(255, 255, 255, ${scrollProgress * 0.2})`,
            boxShadow: `0 16px 40px -20px rgba(0,0,0,${scrollProgress * 0.6})`,
          }}
        >
        <div className={`mx-auto flex max-w-site items-center justify-between px-5 sm:px-7 lg:px-9 transition-all duration-500 ${scrolled ? "h-[62px]" : "h-[76px]"}`}>
          <Logo dark={dark} />

          <nav className="hidden items-center gap-1 lg:flex">
            {NAV.map((group) => (
              <button
                key={group.label}
                data-testid={`nav-${group.label.toLowerCase()}`}
                onMouseEnter={() => setOpen(group.label)}
                className={`group relative px-4 py-2 text-[15px] font-medium transition-colors ${
                  dark ? "text-white hover:text-white" : "text-cm-text hover:text-cm-text"
                }`}
              >
                {group.label}
                <span className={`absolute inset-x-4 bottom-1 h-px origin-left scale-x-0 bg-cm-accent transition-transform duration-300 ${open === group.label ? "scale-x-100" : "group-hover:scale-x-100"}`} />
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {!user && (
              <Link
                href="/signin"
                data-testid="nav-signin"
                className={`hidden text-sm font-semibold transition-colors md:inline-block ${dark ? "text-white hover:text-white" : "text-cm-text hover:text-cm-text"}`}
              >
                Sign in
              </Link>
            )}

            {user && (
              <div className="relative hidden md:block" ref={profileRef}>
                <button
                  onClick={(e) => { e.stopPropagation(); setProfileOpen((o) => !o); }}
                  aria-label="Account menu"
                  aria-haspopup="true"
                  aria-expanded={profileOpen}
                  className="grid h-10 w-10 place-items-center overflow-hidden rounded-full border border-cm-accent/40 bg-cm-accent/10 text-sm font-bold text-cm-accent"
                >
                  {user.photoURL ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={user.photoURL} alt="" width={40} height={40} referrerPolicy="no-referrer" className="h-full w-full object-cover" />
                  ) : (
                    initials
                  )}
                </button>
                <AnimatePresence>
                  {profileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.2 }}
                      role="menu"
                      className="absolute right-0 top-full mt-3 w-64 overflow-hidden rounded-2xl border border-cm-border bg-paper shadow-xl"
                    >
                      <div className="flex items-center gap-3 border-b border-cm-border p-4">
                        <div className="grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-full bg-cm-text/10 text-sm font-bold text-cm-text">
                          {user.photoURL ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={user.photoURL} alt="" width={40} height={40} referrerPolicy="no-referrer" className="h-full w-full object-cover" />
                          ) : (
                            initials
                          )}
                        </div>
                        <div className="min-w-0">
                          <div className="truncate text-sm font-bold text-cm-text">{user.displayName || "Client"}</div>
                          <div className="truncate text-xs text-cm-muted">{user.email || ""}</div>
                        </div>
                      </div>
                      <button role="menuitem" onClick={() => { openPrivacy(); setProfileOpen(false); }} className="block w-full px-4 py-3 text-left text-sm text-cm-text hover:bg-cm-text/5">
                        Privacy &amp; data
                      </button>
                      <button role="menuitem" onClick={() => { openTerms(); setProfileOpen(false); }} className="block w-full px-4 py-3 text-left text-sm text-cm-text hover:bg-cm-text/5">
                        Terms &amp; Conditions
                      </button>
                      <div className="border-t border-cm-border" />
                      <button role="menuitem" onClick={() => { openDeleteConfirm(); setProfileOpen(false); }} className="block w-full px-4 py-3 text-left text-sm font-semibold text-red-500 hover:bg-red-500/5">
                        Delete account
                      </button>
                      <button role="menuitem" onClick={() => { signOutUser(); setProfileOpen(false); }} className="block w-full px-4 py-3 text-left text-sm font-semibold text-red-500 hover:bg-red-500/5">
                        Log out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            <button
              onClick={goContact}
              data-testid="nav-contact-btn"
              className="group hidden h-11 items-center gap-2 rounded-full bg-cm-accent px-5 text-sm font-bold text-white transition-colors hover:bg-cm-accentHover md:inline-flex"
            >
              Start a Project
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
            <button
              onClick={() => setMobile(true)}
              data-testid="nav-mobile-open"
              className={`lg:hidden ${dark ? "text-white" : "text-cm-text"}`}
              aria-label="Open menu"
            >
              <Menu className="h-7 w-7" />
            </button>
          </div>
        </div>

        {/* Desktop mega menu — floats just below the pill nav as its own
            rounded panel, matching the capsule aesthetic. Items are
            pointers: clicking one scrolls to that content's section on
            the homepage rather than opening a detail page directly. */}
        <AnimatePresence>
          {open && (
            <motion.div
              key={open}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease }}
              onMouseEnter={() => setOpen(open)}
              className="absolute inset-x-0 top-full mt-3 hidden overflow-hidden rounded-3xl border border-cm-border/60 bg-paper/95 shadow-2xl backdrop-blur-xl lg:block"
              data-testid={`megamenu-${open.toLowerCase()}`}
            >
              <div className="mx-auto px-8 py-10 lg:px-10">
                <p className="mb-8 text-xs font-bold uppercase tracking-[0.24em] text-cm-muted">
                  {NAV.find((g) => g.label === open)?.title}
                </p>
                <div className="grid grid-cols-2 gap-x-10 gap-y-6 md:grid-cols-3">
                  {(() => {
                    const group = NAV.find((g) => g.label === open);
                    return group?.items.map((item) => (
                      <button
                        key={item.title}
                        onClick={() => openNavItem(group, item)}
                        className="group flex items-start justify-between gap-4 border-b border-transparent pb-4 text-left transition-colors hover:border-cm-border"
                      >
                        <div>
                          <span className="font-display text-lg font-bold tracking-tight text-cm-text transition-colors group-hover:text-cm-accent">
                            {item.title}
                          </span>
                          <p className="mt-1 max-w-xs text-sm text-cm-muted">{item.desc}</p>
                        </div>
                        <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-cm-muted transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-cm-accent" />
                      </button>
                    ));
                  })()}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        </div>
      </header>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {mobile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] flex flex-col bg-ink-900 text-white lg:hidden"
            data-testid="mobile-menu"
          >
            <div className="flex h-[84px] items-center justify-between px-6">
              <Logo dark />
              <button onClick={() => setMobile(false)} data-testid="nav-mobile-close" aria-label="Close menu" className="text-white">
                <X className="h-7 w-7" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-6 pb-10">
              {NAV.map((group) => (
                <div key={group.label} className="border-b border-white/10">
                  <button
                    onClick={() => setMobileOpen(mobileOpen === group.label ? null : group.label)}
                    className="flex w-full items-center justify-between py-5 font-display text-2xl font-bold tracking-tight text-white"
                  >
                    {group.label}
                    {mobileOpen === group.label ? <Minus className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
                  </button>
                  <AnimatePresence>
                    {mobileOpen === group.label && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease }}
                        className="overflow-hidden"
                      >
                        <div className="space-y-4 pb-6">
                          {group.items.map((item) => (
                            <button key={item.title} onClick={() => openNavItem(group, item)} className="block text-left text-white/60">
                              {item.title}
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
              <button
                onClick={goContact}
                data-testid="mobile-contact-btn"
                className="mt-8 flex h-14 w-full items-center justify-center gap-2 rounded-full bg-cm-accent font-bold text-white"
              >
                Start a Project <ArrowUpRight className="h-4 w-4" />
              </button>

              {!user ? (
                <Link
                  href="/signin"
                  onClick={() => setMobile(false)}
                  className="mt-4 flex h-14 w-full items-center justify-center gap-2 rounded-full border border-white/20 font-bold text-white"
                >
                  Sign in
                </Link>
              ) : (
                <div className="mt-8 border-t border-white/10 pt-6">
                  <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">Signed in as</div>
                  <div className="mt-1 break-all text-sm text-white/70">{user.email}</div>
                  <div className="mt-4 flex flex-col gap-3 text-sm">
                    <button onClick={() => { openPrivacy(); setMobile(false); }} className="text-left text-white/60">Privacy &amp; data</button>
                    <button onClick={() => { openTerms(); setMobile(false); }} className="text-left text-white/60">Terms &amp; Conditions</button>
                    <button onClick={() => { openDeleteConfirm(); setMobile(false); }} className="text-left font-semibold text-red-400">Delete account</button>
                    <button onClick={() => { signOutUser(); setMobile(false); }} className="text-left font-semibold text-red-400">Log out</button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
