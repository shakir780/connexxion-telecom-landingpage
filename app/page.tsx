import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import CompanyOverview from "@/components/CompanyOverview";
import ServicesSection from "@/components/ServicesSection";
import StatsSection from "@/components/StatsSection";
import TeamSection from "@/components/TeamSection";
import PartnersSection from "@/components/PartnersSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen" style={{ background: "var(--bg)" }}>
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <CompanyOverview />
        <ServicesSection />
        <StatsSection />
        <TeamSection />
        <PartnersSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
