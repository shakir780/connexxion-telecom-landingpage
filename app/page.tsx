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
      {/* Solid here too. The hero is a photo carousel whose scrim is tuned
          per-slide for the copy column, not for the bar: the lightest slide
          sits at 0.18 in light mode, and the transparent nav's white link
          text is not readable against it. */}
      <Navbar solid />
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
