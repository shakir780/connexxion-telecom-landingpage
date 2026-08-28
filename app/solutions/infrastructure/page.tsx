import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SolutionsIndexClient from "@/components/sections/solutions/SolutionsIndexClient";
import { SOLUTION_GROUPS, getSolutionsByGroup } from "@/lib/solutions-data";

const group = SOLUTION_GROUPS.find((g) => g.slug === "infrastructure");

export const metadata: Metadata = {
  title: `${group?.title} Solutions | Connexxion Telecom`,
  description: group?.intro,
};

export default function InfrastructurePage() {
  if (!group) notFound();
  return (
    <SolutionsIndexClient
      title={group.title}
      intro={group.intro}
      solutions={getSolutionsByGroup(group.slug)}
    />
  );
}
