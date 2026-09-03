import { DETAILS } from "@/data/detailContent";

// SEO fix: no sitemap.xml existed anywhere in the project. This builds
// one automatically from every /detail/[slug] entry plus the static
// top-level pages, so new detail entries are picked up without having to
// remember to update a hand-written sitemap.
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.codemyth.in";

export default function sitemap() {
  const now = new Date();

  const staticRoutes = [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/privacy-policy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/terms-of-service`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  const detailRoutes = Object.keys(DETAILS).map((slug) => ({
    url: `${SITE_URL}/detail/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...detailRoutes];
}
