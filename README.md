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
- **Forms don't submit.** Layout and validation structure only.
- **No CMS yet.** Content lives in `src/content/site.ts`.
- **Map is a placeholder** with a click-out to Google Maps.
- **Consent not yet verified** for any photograph of a student.

---

## Motion & 3D

**Interactive 3D hero** — React Three Fiber. A floating cluster of procedurally built
objects: a stack of books, mortarboard with tassel, wireframe glass globe, trophy, quaver,
piano keys, and three abstract glass forms, over a drifting particle field. Interactive
lighting tracks the pointer, the whole group parallaxes to the mouse, and fog stands in for
depth of field. No model or HDR files — everything is generated in-scene, so it works
offline and under a strict CSP.

**Capability-gated.** The 3D chunk only loads on desktop, with a fine pointer, ≥4 cores,
≥4 GB memory, WebGL2, no save-data and no reduced-motion preference. Everyone else gets the
poster image, which is the LCP element on those devices. Rendering stops entirely once the
hero scrolls out of view.

**GSAP + Lenis motion layer** (`src/components/motion/`):
hero intro timeline · split-line headline reveals · section and staggered reveals ·
animated counters · scrub parallax · pinned horizontal scroll for the Student Journey ·
magnetic buttons · custom cursor · page-transition wipe · glass hover · drifting gradients
and aurora blooms · animated scroll indicator · smooth scrolling.

**The rule everything follows:** no CSS hides content. Elements are visible in the
stylesheet; GSAP sets the "from" state at runtime only when it will also animate it back.
Hero content plays on a load timeline, never a scroll trigger — anything in the first
viewport that waits for a ScrollTrigger can sit at its "from" state forever if it falls
below the trigger point. An automated audit walks all 16 routes, scrolls each to the
bottom, and fails if any animated element is left below 0.9 opacity.

`prefers-reduced-motion: reduce` disables the entire layer — no 3D, no Lenis, no reveals —
and is verified in the same audit.

## Stack

Next.js 15 (App Router, static export) · React 19 · TypeScript strict · Tailwind CSS v4 ·
GSAP + ScrollTrigger · Lenis · Three.js + React Three Fiber + Drei · Bebas Neue + Inter.

**Home: ~137 kB First Load JS** against a 180 kB budget. The ~230 kB gzipped 3D bundle is a
separate deferred chunk that most visitors never download.

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
