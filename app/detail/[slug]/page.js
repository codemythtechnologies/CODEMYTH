import { notFound } from "next/navigation";
import { DETAILS } from "@/data/detailContent";
import DetailPageClient from "@/components/DetailPageClient";

export async function generateStaticParams() {
  return Object.keys(DETAILS).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const entry = DETAILS[params.slug];
  if (!entry) return { title: "Not found — Code Myth Technologies" };
  return {
    title: `${entry.title} — Code Myth Technologies`,
    description: entry.tagline,
  };
}

export default function DetailPage({ params }) {
  const entry = DETAILS[params.slug];
  if (!entry) notFound();
  return <DetailPageClient entry={entry} />;
}
