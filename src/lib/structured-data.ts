import { site, faqs, academicPrograms } from "@/content/site";
import { SITE_URL } from "@/lib/seo";

/**
 * Site-wide EducationalOrganization + LocalBusiness markup, rendered once in
 * the root layout. Every value here traces back to `site.ts`, which in turn
 * traces back to SSC's own posters (see docs/05-photo-inventory.md §3) — no
 * field is a guess. `openingHoursSpecification` and `aggregateRating` are
 * deliberately omitted: hours are still a TODO in site.ts, and there is no
 * verified review count to publish.
 */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "@id": `${SITE_URL}/#organization`,
    name: site.name,
    alternateName: site.shortName,
    slogan: site.tagline,
    url: SITE_URL,
    logo: `${SITE_URL}/images/brand/ssc-logo.jpg`,
    image: `${SITE_URL}/images/brand/ssc-logo.jpg`,
    email: site.email,
    telephone: `+91${site.primaryPhone}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: `${site.address.line1}, ${site.address.line2}`,
      addressLocality: site.address.city,
      postalCode: site.address.pin,
      addressCountry: "IN",
    },
  };
}

/**
 * FAQPage markup for /faq, built from the same `faqs` array the page renders
 * — the visible content and the structured data can never drift apart because
 * there is only one source for both.
 */
export function faqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

/**
 * Course markup for a single academic-programme page. Fee and time-of-year
 * fields are omitted rather than guessed — `hasCourseInstance` needs a real
 * schedule, which is still a TODO in the content model.
 */
export function courseJsonLd(slug: string) {
  const course = academicPrograms.find((p) => p.slug === slug);
  if (!course) return null;
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: course.title,
    description: course.summary,
    provider: {
      "@type": "EducationalOrganization",
      name: site.name,
      sameAs: SITE_URL,
    },
    url: `${SITE_URL}/courses/${course.slug}`,
  };
}

/**
 * BreadcrumbList for any two-level page (e.g. Home > Courses > Class IX–X).
 * `trail` excludes Home — it is prepended automatically.
 */
export function breadcrumbJsonLd(trail: Array<{ name: string; path: string }>) {
  const items = [{ name: "Home", path: "" }, ...trail];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}
