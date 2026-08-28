import type { Metadata } from "next";
import WhyUsClient from "@/components/sections/about/WhyUsClient";

export const metadata: Metadata = {
  title: "Why Us? | Connexxion Telecom",
  description:
    "Why organisations choose Connexxion Telecom: platforms built in-house, one accountable party for the whole stack, a staffed 24/7/365 NOC, and engineers on the ground nationwide.",
};

export default function WhyUsPage() {
  return <WhyUsClient />;
}
