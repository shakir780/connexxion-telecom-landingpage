import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin · Connexxion Telecom",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex-1 min-h-screen" style={{ background: "var(--bg)", color: "var(--text-1)" }}>
      {children}
    </div>
  );
}
