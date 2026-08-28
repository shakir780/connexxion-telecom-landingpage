import type { Metadata } from "next";
import { Suspense } from "react";
import ConsultationClient from "@/components/sections/consultation/ConsultationClient";

export const metadata: Metadata = {
  title: "Book a Consultation | Connexxion Telecom",
  description:
    "Book a free consultation with Connexxion Telecom. Tell us what you are working on and we will come back within one business day with an engineer, not a script.",
};

export default function ConsultationPage() {
  // ConsultationClient reads ?topic= to preselect the category, and
  // useSearchParams opts the tree below it out of prerendering — the boundary
  // keeps that contained instead of pushing the whole route client-side.
  return (
    <Suspense>
      <ConsultationClient />
    </Suspense>
  );
}
