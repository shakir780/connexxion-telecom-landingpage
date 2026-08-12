import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_TITLE = "Connexxion Telecom — Next-Generation Connectivity";
const SITE_DESCRIPTION =
  "Enterprise-grade telecommunications infrastructure. Ultra-low latency, 99.99% uptime, and global reach across 180+ countries.";

/* Relative image paths in metadata need an absolute base or the build fails.
   Set NEXT_PUBLIC_SITE_URL in the deploy environment — the fallback is only a
   guess from the contact address and will produce wrong share URLs if the
   site lives anywhere else. */
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://connexxiontelecom.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  openGraph: {
    type: "website",
    siteName: "Connexxion Telecom",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: "/",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Connexxion Telecom & Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/images/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
