import type { Metadata } from "next";
import "lenis/dist/lenis.css";
import "./globals.css";
import { Header, Footer, MobileCTABar } from "@/components/chrome";
import { MotionProvider } from "@/components/motion/motion-provider";
import { CustomCursor, PageTransition } from "@/components/motion/pieces";
import { JsonLd } from "@/components/json-ld";
import { organizationJsonLd } from "@/lib/structured-data";
import { SITE_URL } from "@/lib/seo";
import { site } from "@/content/site";

const description =
  "Tuition for Classes I–XII, competitive exam coaching, and MADS music, dance and art classes in Malviya Nagar, New Delhi. Small batches, free demo class.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${site.name} — ${site.tagline} | Malviya Nagar, New Delhi`,
    template: `%s | ${site.name}`,
  },
  description,
  // TODO before public launch: remove this block and flip app/robots.ts —
  // see the comment there. Both gates must change together.
  robots: { index: false, follow: false },
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description,
    url: SITE_URL,
    locale: "en_IN",
    images: [{ url: "/images/brand/og-image.jpg", width: 1200, height: 630, alt: site.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description,
    images: ["/images/brand/og-image.jpg"],
  },
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
        <JsonLd data={organizationJsonLd()} />
      </head>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Header />
        <PageTransition>
          <main id="main">{children}</main>
        </PageTransition>
        <Footer />
        <MobileCTABar />
        <MotionProvider />
        <CustomCursor />
      </body>
    </html>
  );
}
