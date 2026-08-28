import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SolutionPageClient from "@/components/sections/solutions/SolutionPageClient";
import { getSolution } from "@/lib/solutions-data";

const solution = getSolution("unified-communications");

export const metadata: Metadata = {
  title: solution?.metaTitle,
  description: solution?.metaDescription,
};

export default function UnifiedCommunicationsPage() {
  if (!solution) notFound();
  return <SolutionPageClient solution={solution} />;
}
