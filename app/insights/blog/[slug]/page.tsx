import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { InsightsArticleClient } from "@/components/sections/insights/InsightsPageClient";
import { ARTICLES, getArticle, getInsightsSection } from "@/lib/insights-data";

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  return {
    title: article ? `${article.title} | Connexxion Telecom` : "Article",
    description: article?.excerpt,
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);
  const section = getInsightsSection("blog");
  if (!article || !section) notFound();

  return (
    <InsightsArticleClient
      section={section}
      title={article.title}
      meta={[article.category, article.readTime, article.date].filter(Boolean).join("  ·  ")}
      excerpt={article.excerpt}
      body={article.body}
      notPublishedNote={
        article.body
          ? undefined
          : "The full article is still being written. The summary above is what exists so far."
      }
    />
  );
}
