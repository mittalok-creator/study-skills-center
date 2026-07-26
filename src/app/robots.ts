import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

export const dynamic = "force-static";

/**
 * Disallows everything, on purpose, while this is a review draft — it mirrors
 * the `noindex, nofollow` set on every page's metadata (see layout.tsx).
 *
 * TODO before public launch: change `disallow: "/"` to `allow: "/"` here and
 * remove `robots: { index: false, follow: false }` from the root layout's
 * metadata. Both gates exist so a single missed step doesn't leak the draft
 * into search results — flip both together.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", disallow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
