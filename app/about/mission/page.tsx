import type { Metadata } from "next";
import MissionClient from "@/components/sections/about/MissionClient";

export const metadata: Metadata = {
  title: "Our Mission | Connexxion Telecom",
  description:
    "Why Connexxion Telecom exists, what we hold ourselves to, and the standards every engagement is measured against.",
};

export default function MissionPage() {
  return <MissionClient />;
}
