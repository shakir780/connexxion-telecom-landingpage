import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { InsightsArticleClient } from "@/components/sections/insights/InsightsPageClient";
import {
  CASE_STUDY_SUBJECTS,
  getCaseStudySubject,
  getInsightsSection,
} from "@/lib/insights-data";

export function generateStaticParams() {
  return CASE_STUDY_SUBJECTS.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const subject = getCaseStudySubject(slug);
  return {
    title: subject
      ? `${subject.service} Case Study | Connexxion Telecom`
      : "Case Study",
    description: subject
      ? `Case study coverage of Connexxion Telecom's ${subject.service} work.`
      : undefined,
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const subject = getCaseStudySubject(slug);
  const section = getInsightsSection("case-studies");
  if (!subject || !section) notFound();

  /* No invented client story here. Someone who clicked "View Case Study" from
     a service wants to know about that service, so the page says where the
     write-up stands and offers the direct route instead. */
  return (
    <InsightsArticleClient
      section={section}
      title={subject.service}
      meta="Case study"
      notPublishedNote={`We have not published a case study for ${subject.service} yet — client work is only written up once the client has agreed to it. If you want to know how we have handled this elsewhere, ask and we will talk you through it.`}
    />
  );
}
