# Code Myth Technologies — Next.js rebuild

This is the modern-stack (Next.js 14 App Router) rebuild of the original
static `index.html` / `index.css` / `index.js` site. Same UI, same
copy, same animations and modal behavior — but routed through React
components, with the contact/BA-consult forms and account deletion moved
server-side for real security instead of client-side Firestore writes and
an exposed EmailJS key.

## Project structure

```
app/
  layout.js            Fonts (next/font), <head> metadata, provider tree
  page.js              Renders <HomeClient />
  globals.css          Ported 1:1 from the old index.css
  api/
    contact/route.js         POST — contact form
    ba-consult/route.js      POST — business-analysis consult form
    account/delete/route.js POST — verified account deletion

components/            All UI, one file per section/modal
  HomeClient.jsx        Assembles every section + modal for the page
  Nav.jsx, Hero.jsx, ServicesSection.jsx, ServiceDetailSection.jsx,
  AiEraSection.jsx, BusinessAnalysisSection.jsx, ApproachSection.jsx,
  WorkSection.jsx, StatsStrip.jsx, Counter.jsx, PromiseSection.jsx,
  TeamSection.jsx, CtaBand.jsx, ContactSection.jsx, Footer.jsx,
  Reveal.jsx (scroll-reveal wrapper), TechMarquee.jsx, BrandMark.jsx
  StepModal.jsx, ProjectModal.jsx, BaConsultModal.jsx, TermsModal.jsx,
  DeleteConfirmModal.jsx

context/
  AuthContext.jsx       Firebase auth state + account deletion call
  ModalsContext.jsx     Which modal/step/project is open
  ToastContext.jsx      Toast notifications

data/
  services.js, steps.js, projects.js, team.js   Plain content data

lib/
  firebaseClient.js     Browser-side Firebase (auth only)
  firebaseAdmin.js      Server-only Firebase Admin SDK (Firestore + Auth)
  mailer.js             Nodemailer SMTP sender used by the API routes
  rateLimit.js          In-memory sliding-window limiter for the forms
  schemas.js            zod validation schemas
  useSiteActions.js     scrollToSection + copyEmail helpers

public/assets/projects/  Drop project screenshots here (see below)
public/logo.png          Drop your logo file here

_reference-old-site/     The original index.html / index.js, kept only
                          for side-by-side comparison — not used by the app.
```

## What was missing and has been added

- **`components/WorkSection.jsx`** — this was imported by `HomeClient.jsx`
  but not included in your upload. It's been rebuilt from the old
  `#work` section markup: two featured project cards always shown, the
  rest inside a collapsible panel toggled by "View all projects", each
  card opening `ProjectModal` on click.
- **`app/layout.js`** / **`app/page.js`** — the App Router entry points.
  `layout.js` loads Space Grotesk + Inter via `next/font/google` (replacing
  the old render-blocking Google Fonts `<link>` tag) and wraps the tree in
  `ToastProvider` → `AuthProvider` → `ModalsProvider`.
- **`package.json`**, **`next.config.js`**, **`jsconfig.json`** — scaffold
  so the app actually builds and the `@/` import alias used in every file
  resolves correctly.
- **`.env.local.example`** — every `process.env.*` referenced in `lib/`
  and `app/api/`, documented in one place.
- **`.gitignore`**, this **README.md**.

## Setup

```bash
npm install
cp .env.local.example .env.local   # fill in real values
npm run dev
```

Add your assets:
- `public/logo.png` — used by `BrandMark.jsx` in the nav and footer.
- `public/assets/projects/*.png` — screenshots referenced by `data/projects.js`
  (`curalink.png`, `habit-tracker.png`, `nebula.png`, `slate-docs.png`,
  `flowboard.png`). Projects without an image get a styled fallback.

## Security changes vs. the old site (as requested)

- **Contact / BA-consult forms**: previously the browser called EmailJS and
  Firestore directly with credentials visible in page source. Now the
  browser only calls your own `/api/contact` and `/api/ba-consult` routes,
  which validate input with zod, rate-limit by IP (5 requests / 10 min),
  and only then write to Firestore and send mail server-side.
- **Account deletion**: previously `deleteUser(auth.currentUser)` ran
  client-side and broke on `auth/requires-recent-login`. Now the browser
  sends its Firebase ID token to `/api/account/delete`, which verifies it
  with the Admin SDK before deleting the Firestore profile and the Auth
  user — deletion can't be forged and can be rate-limited/audited.
- **HTTP headers**: `next.config.js` now sets `X-Content-Type-Options`,
  `X-Frame-Options`, `Referrer-Policy`, and `Permissions-Policy` on every
  response, in addition to the `Cross-Origin-Opener-Policy` you already
  had in `firebase.json`.
- **"Co-founder" tag**: removed from Srinivasan B's card in `data/team.js`
  per your earlier request — name, domain, and bio are unchanged.

## About `firebase.json`

Your existing `firebase.json` configures **static** Firebase Hosting
(`"public": "."`), which only serves plain files. This project now has
server-side API routes (`app/api/**`) and uses `next/image`-style SSR, so
a plain static host can no longer run it as-is. Two options:

1. **Deploy to Vercel** (simplest — Next.js's native platform, zero config,
   free tier fine for a studio site). `firebase.json` is not used at all in
   this path; keep Firebase only for Auth/Firestore.
2. **Keep Firebase Hosting** via Firebase's Next.js web-frameworks
   integration (`firebase deploy` builds and deploys the App Router app
   through Cloud Functions/Cloud Run automatically). Run
   `firebase init hosting` and pick "Next.js" when prompted — it will
   rewrite `firebase.json` for you; don't hand-edit the old static config.

Either way, the COOP header from your original `firebase.json` is now also
enforced by `next.config.js`, so nothing is lost if you move off Firebase
Hosting entirely.

## Functional checklist (parity with the old site)

- [x] Smooth-scroll nav, dropdowns, mobile menu, scroll-to-top, sign-in state
- [x] Hero + animated tech marquee
- [x] Services grid → per-service detail section
- [x] AI-era section, business-analysis section + consult modal
- [x] Approach steps + step modal
- [x] Work section (rebuilt) → project detail modal, "visit live site" opens
      in a new tab (`target="_blank" rel="noopener noreferrer"`)
- [x] Stats strip with animated counters (`Counter.jsx`, in-view triggered)
- [x] Promise section, team grid (co-founder tag removed), CTA band
- [x] Contact form → `/api/contact`
- [x] Terms/privacy modal, delete-account confirm modal → `/api/account/delete`
- [x] Toasts for success/error feedback everywhere a form/action completes
