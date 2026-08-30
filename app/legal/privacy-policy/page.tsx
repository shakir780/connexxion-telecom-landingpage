import type { Metadata } from "next";
import LegalPageClient from "@/components/sections/legal/LegalPageClient";
import { PRIVACY_POLICY } from "@/lib/legal-data";

export const metadata: Metadata = {
  title: PRIVACY_POLICY.metaTitle,
  description: PRIVACY_POLICY.metaDescription,
};

export default function PrivacyPolicyPage() {
  return <LegalPageClient doc={PRIVACY_POLICY} />;
}
