# SEO, Maps & Favicon — addon batch

Added 2026-07-26. Everything here needed no content from SSC and is already live in the
draft build.

---

## 1. Favicon & brand icons

Generated from the SSC roundel (currently the phone-screenshot crop — see
`docs/03-open-decisions.md` §A-NEXT for the still-outstanding request for the original file):

- `src/app/favicon.ico` — 16/24/32/48/64px, browser tab icon
- `src/app/icon.png` — 32px, transparent corners, modern browsers
- `src/app/apple-icon.png` — 180px, solid navy background (iOS fills transparent corners
  with black, so this variant can't be transparent)

Next.js's file-convention icons wire these in automatically — no metadata code needed, and
they inherit the site's `basePath` correctly (verified: `/study-skills-center/favicon.ico`
in the GitHub Pages build, `/favicon.ico` in a plain local build).

**MADS and Grades Career Institute logos** were also received as clean source files (not
screenshots) and are now used on their respective page heroes and the home page's MADS
section — replacing a rough phone-screenshot crop that had been standing in for MADS.

---

## 2. Search & social metadata

Every page now has a real `description`, not just a `title` — see the per-page `metadata`
export in each `src/app/*/page.tsx`. Descriptions are one sentence, factual, and specific
to that page's content.

**Open Graph + Twitter Card** are set site-wide in the root layout, with a generated share
image (`public/images/brand/og-image.jpg`, 1200×630) — the SSC mark, wordmark and division
list on a navy/gold background. This is what shows up when the link is pasted into
WhatsApp, iMessage or Twitter/X.

**Structured data (JSON-LD)**, `src/lib/structured-data.ts`:
- `EducationalOrganization` — site-wide, in the root layout. Name, address, phone, email,
  logo. `openingHoursSpecification` and `aggregateRating` are deliberately omitted: hours
  are still a content TODO, and there is no verified review count to publish.
- `FAQPage` — on `/faq`, generated from the same `faqs` array the page renders, so the
  visible content and the structured data can never drift apart.
- `Course` — on each `/courses/[slug]` page, from that course's own data.

**Not yet added:** `BreadcrumbList` (helper function exists in `structured-data.ts`, not
wired into any page yet) and `Event` schema for `/events` — two of the three events still
have `TODO` dates, and publishing a guessed date in machine-readable markup is worse than
not publishing one. Add both once real event dates and a page hierarchy are settled — R2/R3
work, not blocking.

**Consent note:** the twelve named students on the results pages are *not* included in any
structured data, on the same consent-pending basis already flagged for the visible content
(`docs/04-media-intake.md` §2.3, `docs/05-photo-inventory.md` §4). Structured data is more
machine-discoverable than a normal page, which is exactly why the same caution applies.

---

## 3. Sitemap & robots

`src/app/sitemap.ts` and `src/app/robots.ts` — Next's file-convention metadata routes,
generating `/sitemap.xml` and `/robots.txt` at build time from the same `navigation` and
`academicPrograms` arrays the site itself renders from. A route added to one shows up in
the other with no separate list to maintain.

**Both are set to block everything right now**, on purpose:

```
User-Agent: *
Disallow: /
```

This mirrors the `robots: { index: false, follow: false }` already set on every page — the
site is a review draft and must not be indexed or crawled. Both gates need to change
together before public launch:

1. `src/app/robots.ts` — `disallow: "/"` → `allow: "/"`
2. `src/app/layout.tsx` — remove the `robots: { index: false, follow: false }` line

Both are marked with a `TODO` comment at the exact line to change.

---

## 4. Real Google Maps embed

`src/components/map-embed.tsx`, used on `/contact`.

Click-to-load, not always-on — an iframe that loads on every page visit costs a third-party
connection, cookies and render time nobody asked for (this was already the plan in
`docs/01-master-spec-v2.md` §6.2; this just implements it). Default state is a static card
with the address and two buttons: **Load interactive map** (mounts the real Google Maps
iframe, no API key needed) and **Open in Google Maps** (deep-link, always available).

Verified: clicking "Load interactive map" mounts the iframe with the correct query URL.
Map tiles don't render in this sandboxed build environment (no route to Google's tile
servers), but the URL construction is correct and will resolve normally on a real network.

---

## 5. A finding worth knowing about: your Google Business Profile

Resolving the Google Business share link you sent surfaced your listing's registered name:

> **"Study Skills Center TUTIONS | GK | French | ACTIVITIES | Taekwondo | Guitar | Keyboard
> | Dance"**

That's keyword-stuffing the business name field — a common but explicit violation of
Google's Business Profile guidelines, and profiles get suspended for it. It's a separate,
higher-priority fix from anything in this codebase (it lives in Google's system, not this
repo), so it's not something I changed, but it's worth correcting directly in Google
Business Profile — rename to just **"Study Skills Center"** and let the categories field
(already supported by GBP) carry "Tutoring", "Dance school", "Music school" etc. instead of
stuffing them into the name.

I did not attempt to scrape further details (hours, rating, review count) from the profile
— Google's search results are blocked at the network level in this environment, and
scraping Google Search results at all sits close to a line I'd rather not cross without you
asking for it directly. If you want that data reflected on the site (particularly opening
hours, still a `TODO` throughout), the fastest path is you copying it from your own GBP
dashboard.
