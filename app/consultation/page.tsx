import type { Metadata } from "next";
import ConsultationClient from "@/components/sections/consultation/ConsultationClient";

export const metadata: Metadata = {
  title: "Book a Free Consultation | Connexxion Telecom",
  description:
    "Tell us about your organization and solutions needs — Connexxion Telecom will reach out to schedule your free consultation.",
};

export default function ConsultationPage() {
  return <ConsultationClient />;
}
