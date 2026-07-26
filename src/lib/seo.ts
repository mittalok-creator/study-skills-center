/**
 * Central place for the one thing SEO metadata needs that nothing else does:
 * a fully-qualified base URL. Page-relative links elsewhere in the app go
 * through `asset()` (basePath-aware); this is only for values that must be an
 * absolute URL wherever they end up — Open Graph images, canonical tags,
 * JSON-LD `url` fields, and the sitemap/robots routes.
 *
 * TODO before launch: point this at the real domain once SSC has one. Right
 * now it resolves to the GitHub Pages draft URL so link previews are correct
 * while this is still a review draft.
 */
export const SITE_URL = "https://mittalok-creator.github.io/study-skills-center";
