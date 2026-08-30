import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { InsightsIndexClient } from "@/components/sections/insights/InsightsPageClient";
import { getInsightsSection, ARTICLES } from "@/lib/insights-data";

const section = getInsightsSection("blog");

export const metadata: Metadata = {
  title: `${section?.title} | Connexxion Telecom`,
  description: section?.intro,
};

export default function BlogIndexPage() {
  if (!section) notFound();
  return <InsightsIndexClient section={section} articles={ARTICLES} />;
}
