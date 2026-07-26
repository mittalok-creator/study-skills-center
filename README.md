# Study Skills Center (SSC) & MADS — Website

Web presence for **Study Skills Center** — *Learning Through Experience* — Malviya Nagar,
New Delhi, and its divisions **MADS (Music & Dance Studio)** and **Grades Career Institute**.

> ## 🟡 This is a rough first draft, built for client review.
> Content, photography and fees are **not final**. Every page carries a draft banner.
> The site is `noindex` and must not be shared publicly or linked from anywhere.

---

## Viewing the draft

**Live preview:** enable GitHub Pages once and it deploys automatically on every push —
see [Deployment](#deployment) below.

**Run it locally:**

```bash
npm install
npm run dev          # http://localhost:3000
```

**Build the static site:**

```bash
npm run build        # outputs to ./out
npx serve out        # preview the production build
```

---

## What's in the draft

**16 routes, 26 static pages.** Every tab in the navigation is built.

| Route | State |
|---|---|
| `/` | Full home page — hero, three divisions, academics, MADS, why SSC, results, gallery, events, FAQ, CTA |
| `/about` | Structure + story placeholder |
| `/courses` · `/courses/[slug]` | Index + 8 generated course pages |
| `/mads` | Eleven creative disciplines, grouped |
| `/grades` | Competitive-exam division + results |
| `/faculty` | Layout only — **needs real people and portraits** |
| `/gallery` | 71 photos, filterable, lightbox |
| `/achievements` | Published board results |
| `/events` | Three real events with posters |
| `/testimonials` | Layout only — **needs real quotes** |
| `/blog` | Proposed editorial calendar |
| `/faq` · `/admissions` · `/fees` · `/contact` | Built, with open questions marked |
| `404` | Designed |

**Mobile navigation:** a persistent bottom bar — Home · Call · WhatsApp · Free demo — is
fixed on every page, so there is always a one-tap route back to the home page from anywhere
on the site.

Anything awaiting input from SSC is marked inline with a gold **"Needs input from SSC"**
note, so the review can be done by reading the site rather than a spreadsheet.

### Real, not invented
Every factual claim — address, phone numbers, subject lists, MADS disciplines, age
groups, board results, event details — was transcribed from SSC's own marketing posters
found in the photo batch. See [`docs/05-photo-inventory.md`](docs/05-photo-inventory.md) §3.
Unknowns are marked `TODO` rather than filled with plausible fiction.

---

## Known limitations in this draft

- **Photos are WhatsApp-compressed** (1600px ceiling). Fine as gallery tiles; not good
  enough for full-width heroes. Mitigated by keeping large images behind dark overlays.
- **Admissions form: wired to a real Supabase project** (`leads` table, RLS,
  server-side check constraints) with FormSubmit as a secondary email nudge.
  A real RLS bug was found and fixed during testing — root cause and fix in
  docs/07-lead-form.md §2. Verified against the live API directly; a full
  browser round-trip could not be verified in this sandbox (proxy artifact,
  not expected in production) — **do one real test submission after deploy**
  and confirm the row lands in the Supabase dashboard.
- **No CMS yet.** Content lives in `src/content/site.ts`.
- **Map is real now** — click-to-load Google Maps embed on Contact, no API key. See
  docs/06-seo-maps-favicon.md §4.
- **Consent not yet verified** for any photograph of a student — this now also applies to
  structured data, which omits named results for the same reason.
- **Site is blocked from indexing** (`robots.txt` disallows all, `noindex` on every page) —
  intentional while this is a draft. Flip instructions in docs/06-seo-maps-favicon.md §3.

---

## Motion

**Hero — floating photo collage.** Real photographs of the centre drift on a CSS animation
and parallax to the pointer on desktop. The layout differs by breakpoint on purpose: on
mobile the collage is a band at the top and the headline sits *below* it on solid navy,
because white display type over bright classroom photos was unreadable at any scrim
strength — the first two lines of the headline disappeared entirely. On desktop the collage
is full-bleed behind copy that occupies a deliberately clear left third. For a school, evidence that classes actually look
like this beats abstract shapes; an earlier WebGL version of procedural books, globes and
trophies was cut for looking cheap, which also removed ~230 kB of Three.js from the bundle.

**Character-by-character headings.** Every display heading assembles letter by letter with a
slight rotation, so it reads as writing rather than a generic fade. The full text stays
accessible via `aria-label`, with the per-character spans hidden from assistive tech —
otherwise a screen reader announces one letter at a time.

**Every number counts up.** Hero statistics and all twelve board results animate from zero,
with decimal support (93.6%, 92.4%) and prefix/suffix handling (96/100, 11+). Values are
rendered server-side at their final figure, so they are correct without JS.

**Everything else** (`src/components/motion/`): hero intro timeline, section and staggered
reveals, scrub parallax, pinned horizontal Student Journey on desktop with a snap carousel
on touch, magnetic buttons, custom cursor, page-transition wipe, glass hover, drifting
gradient and aurora backgrounds, animated scroll indicator, smooth scrolling.

**Mobile gets the full animation set** — most visitors are on a phone, so only genuinely
pointer-dependent effects (magnetic buttons, cursor parallax) are desktop-only.

### Two rules everything follows

1. **No CSS hides content.** Elements are visible in the stylesheet; GSAP sets the "from"
   state at runtime only where it will also animate it back. No-JS, print and
   reduced-motion always show the finished page.
2. **First-viewport content animates on load, never on scroll.** An element sitting below
   its own ScrollTrigger start point at load would otherwise stay at opacity 0 forever.

`npm run audit:motion` walks all 16 routes, scrolls each to the bottom, and fails if any
animated element is left under 0.9 opacity. `prefers-reduced-motion: reduce` disables the
whole layer and is verified the same way.

## Stack

Next.js 15 (App Router, static export) · React 19 · TypeScript strict · Tailwind CSS v4 ·
GSAP + ScrollTrigger · Lenis · Bebas Neue + Inter.

**Home: ~136 kB First Load JS** against a 180 kB budget, with no deferred 3D bundle behind
it — the same payload on mobile as on desktop.

```
src/
  app/          routes (one folder per page)
  components/   ui.tsx (primitives) · chrome.tsx (header/footer/CTA)
  content/      site.ts — all copy and data · media-manifest.json
  lib/          asset paths, gallery helpers
public/images/  gallery · hero · posters · brand
docs/           planning documents
```

---

## Deployment

A GitHub Actions workflow (`.github/workflows/deploy-preview.yml`) builds and publishes
to GitHub Pages on every push to the draft branch.

**One-time setup:** repository **Settings → Pages → Build and deployment → Source →
GitHub Actions**. Then re-run the workflow. The site appears at
`https://<owner>.github.io/study-skills-center/`.

---

## Planning documents

| Document | Purpose |
|---|---|
| [`docs/00-analysis-and-gaps.md`](docs/00-analysis-and-gaps.md) | Analysis of the original brief: gaps, contradictions, risks |
| [`docs/01-master-spec-v2.md`](docs/01-master-spec-v2.md) | Improved specification — tokens, budgets, routes, content model |
| [`docs/02-execution-roadmap.md`](docs/02-execution-roadmap.md) | Five-release plan with milestones and approval gates |
| [`docs/03-open-decisions.md`](docs/03-open-decisions.md) | Decisions needed, with defaults |
| [`docs/04-media-intake.md`](docs/04-media-intake.md) | How to send photos and video |
| [`docs/05-photo-inventory.md`](docs/05-photo-inventory.md) | Audit of the 96-photo batch |
| [`docs/06-seo-maps-favicon.md`](docs/06-seo-maps-favicon.md) | SEO metadata, structured data, sitemap/robots, real Maps embed, favicon |
| [`docs/07-lead-form.md`](docs/07-lead-form.md) | How the Admissions form works, and the one-time activation step needed before it delivers |

---

## Release plan

| Release | Outcome | Est. |
|---|---|---|
| **R0** | Foundations — tooling, design system, content model | 1.5–2 wks |
| **R1** | Marketing MVP → **live** | 4–5 wks |
| R2 | Faculty, gallery, testimonials, all course pages | 3–4 wks |
| R3 | 3D hero, scroll storytelling, blog, local SEO | 3–4 wks |
| R4 | Grounded AI assistant, staff lead dashboard | 3–4 wks |
| R5 | Student portal — separate approval gate | TBD |

This draft is a **preview of R1's shape**, produced early for feedback. It is not R1.
