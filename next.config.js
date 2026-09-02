/** @type {import('next').NextConfig} */
// SEO fix: SEOmator flagged "No Content Security Policy found" and
// "HSTS present but missing includeSubDomains, missing preload". CSP
// below is intentionally permissive on `script-src`/`style-src` (the app
// uses inline styles via Tailwind's JIT + a couple of inline <script>
// JSON-LD blocks) but still removes the two riskiest defaults: it blocks
// framing (clickjacking) and restricts `object-src`/`base-uri`. Tighten
// further (e.g. nonces for inline scripts) if/when the inline JSON-LD in
// app/layout.js is moved to an external file.
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: https:",
  "font-src 'self' data:",
  "connect-src 'self' https://*.googleapis.com https://*.firebaseio.com https://identitytoolkit.googleapis.com",
  "frame-ancestors 'none'",
  "object-src 'none'",
  "base-uri 'self'",
].join("; ");

const securityHeaders = [
  { key: "Cross-Origin-Opener-Policy", value: "same-origin-allow-popups" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "Content-Security-Policy", value: csp },
  // includeSubDomains + preload close out the TLS-configuration warning.
  // NOTE: only submit to hstspreload.org once you're certain every
  // subdomain (if any) is permanently HTTPS-only — preload is very slow
  // to undo.
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
];

const nextConfig = {
  reactStrictMode: true,
  compress: true,
  images: {
    unoptimized: true,
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

module.exports = nextConfig;