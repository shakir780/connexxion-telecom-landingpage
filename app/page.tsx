import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/home/HeroSection";
import TrustLine from "@/components/sections/home/TrustLine";
import ServicesSection from "@/components/sections/home/ServicesSection";
import ProductsSection from "@/components/sections/home/ProductsSection";
import StatsSection from "@/components/sections/home/StatsSection";
import TestimonialsSection from "@/components/sections/home/TestimonialsSection";
import InsightsSection from "@/components/sections/home/InsightsSection";
import NewsletterSection from "@/components/sections/home/NewsletterSection";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen" style={{ background: "var(--bg)" }}>
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <TrustLine />
        <ProductsSection />
        <ServicesSection />
        <StatsSection />
        <TestimonialsSection />
        <InsightsSection />
        <NewsletterSection />
      </main>
      <Footer />
    </div>
  );
}
