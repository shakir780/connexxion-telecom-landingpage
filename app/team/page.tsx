import type { Metadata } from "next";
import TeamIndexClient from "@/components/sections/team/TeamIndexClient";

export const metadata: Metadata = {
  title: "Our Team | Connexxion Telecom",
  description:
    "The engineers, strategists and operators behind Connexxion Telecom — the people accountable for the networks and platforms our clients run on.",
};

export default function TeamPage() {
  return <TeamIndexClient />;
}
