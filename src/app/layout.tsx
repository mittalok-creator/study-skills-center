import type { Metadata } from "next";
import "./globals.css";
import { Header, Footer, MobileCTABar } from "@/components/chrome";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: {
    default: `${site.name} — ${site.tagline} | Malviya Nagar, New Delhi`,
    template: `%s | ${site.name}`,
  },
  description:
    "Tuition for Classes I–XII, competitive exam coaching, and MADS music, dance and art classes in Malviya Nagar, New Delhi. Small batches, free demo class.",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <MobileCTABar />
      </body>
    </html>
  );
}
