import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function TeamLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen" style={{ background: "var(--bg)" }}>
      {/* No photographic hero on any team page, so the bar keeps its panel
          treatment from the first paint rather than starting transparent and
          fading in on scroll. */}
      <Navbar solid />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
