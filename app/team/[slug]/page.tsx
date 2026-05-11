import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { TEAM_MEMBERS, getTeamMember } from "@/lib/team-data";
import TeamProfileClient from "@/components/TeamProfileClient";

/* Pre-render a static page for every team member at build time */
export function generateStaticParams() {
  return TEAM_MEMBERS.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const member = getTeamMember(slug);
  if (!member) return {};
  return {
    title: `${member.name} — ${member.title} | Connexxion Telecom`,
    description: member.tagline,
  };
}

export default async function TeamProfilePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const member = getTeamMember(slug);
  if (!member) notFound();
  return <TeamProfileClient member={member} />;
}
