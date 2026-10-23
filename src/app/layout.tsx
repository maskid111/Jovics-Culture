import type { Metadata, Viewport } from "next";
import { SiteHeader, SiteFooter, BottomNav } from "@/components/chrome";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Jovic’s Culture — Where Hygiene Meets Heritage",
    template: "%s | Jovic’s Culture",
  },
  description:
    "Discover thoughtful home cleaning, garment care, Culture Plus membership and home-care essentials at Jovic’s Culture. Frontend demonstration.",
  robots: { index: false, follow: false },
};
export const viewport: Viewport = {
  themeColor: "#0f3d2a",
  viewportFit: "cover",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <link
          rel="preload"
          href="/fonts/fraunces-latin-full-normal.woff2"
          as="font"
          type="font/woff2"
          crossOrigin=""
        />
        <link
          rel="preload"
          href="/fonts/manrope-latin-wght-normal.woff2"
          as="font"
          type="font/woff2"
          crossOrigin=""
        />
      </head>
      <body className="flex min-h-dvh flex-col antialiased">
        <a className="skip-link btn btn-primary" href="#main">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <BottomNav />
      </body>
    </html>
  );
}
