import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { navigation, academicPrograms } from "@/content/site";

export const dynamic = "force-static";

/**
 * Generated at build time from the same content the site itself renders from
 * (`navigation`, `academicPrograms`) — a route added to one shows up in the
 * other without separate upkeep.
 *
 * Currently blocked from being crawled by robots.ts while this is a draft;
 * see the TODO there for what flipping to launch requires.
 */
// next.config.ts sets trailingSlash: true, so every real route except home
// is served as e.g. /about/, not /about. Sitemap URLs need to match exactly —
// a mismatch here doesn't break anything, but it is the kind of harmless-looking
// inconsistency that shows up as a "duplicate URL" warning in Search Console.
function withTrailingSlash(path: string): string {
  return path === "/" || path === "" ? "" : path.endsWith("/") ? path : `${path}/`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes = navigation.map((item) => ({
    url: `${SITE_URL}${withTrailingSlash(item.href)}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: item.href === "/" ? 1 : 0.7,
  }));

  const courseRoutes = academicPrograms.map((p) => ({
    url: `${SITE_URL}/courses/${p.slug}/`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...courseRoutes];
}
