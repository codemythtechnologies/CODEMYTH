// SEO fix: the site had no robots.txt at all (SEOmator's AI Bot Access
// check noted "No robots.txt available to check"). This generates one at
// build time and serves it at /robots.txt — standard Next.js App Router
// metadata route, works the same whether deployed on the Node server or
// exported statically.
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.codemyth.in";

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/signin"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
