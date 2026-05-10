import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import CompanyOverview from "@/components/CompanyOverview";
import ServicesSection from "@/components/ServicesSection";
import StatsSection from "@/components/StatsSection";
import PartnersSection from "@/components/PartnersSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen" style={{ background: "#080c14" }}>
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <CompanyOverview />
        <ServicesSection />
        <StatsSection />
        <PartnersSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
