import type { Metadata } from "next";
import CompanyOverviewClient from "@/components/sections/about/CompanyOverviewClient";

export const metadata: Metadata = {
  title: "Company Overview | Connexxion Telecom",
  description:
    "Connexxion Telecom is an Abuja-based technology company building the platforms, networks and managed services that Nigerian institutions run on.",
};

export default function CompanyOverviewPage() {
  return <CompanyOverviewClient />;
}
