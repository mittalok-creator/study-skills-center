# SSC / MADS — Master Specification v2.0

Supersedes the v1.0 master prompt. Everything in v1.0 that was correct is carried forward;
everything vague has been made testable; everything missing has been added.

Provisional values are marked **[CONFIRM]** and are listed in `docs/03-open-decisions.md`.

---

## 1. Objective

Build the premier digital presence for **Study Skills Center (SSC)** — *Learning Through
Experience* — Malviya Nagar, New Delhi, and its creative division **MADS (Music & Dance
Studio)**.

The site is a **lead-generation instrument with flagship-grade craft**. Both halves of that
sentence are load-bearing: if it is beautiful and generates no enquiries, it failed; if it
generates enquiries and looks like every other coaching site, it also failed.

### Primary business goals, in priority order
1. Generate qualified enquiries (demo bookings, calls, WhatsApp conversations).
2. Establish SSC as the most credible institute in its catchment through evidence —
   results, faculty, and student work — not adjectives.
3. Rank first for local intent in Malviya Nagar and adjacent localities.
4. Give MADS a distinct creative identity without fragmenting the parent brand.
5. Reduce administrative load on staff (self-serve information, structured enquiries).

### Success criteria (measurable, replacing v1.0's)

**Business** — baseline captured at launch, targets at launch + 90 days **[CONFIRM]**
- Qualified enquiries per month
- Demo-booking completion rate (form starts → submissions)
- Share of enquiries arriving outside office hours (site doing work staff can't)
- Top-3 local pack presence for the priority keyword set

**Experience** — field data, mobile, 75th percentile
- LCP < 2.5s · INP < 200ms · CLS < 0.1
- Lighthouse (CI, mobile emulation, throttled): Performance ≥ 90, Accessibility ≥ 95,
  Best Practices ≥ 95, SEO 100
  *Note the deliberate change:* Performance ≥ 90 on mobile is the honest, enforceable
  number given a 3D-capable design. Desktop target remains ≥ 95. Field CWV is the real goal.
- Zero critical/serious axe-core violations on any route
- WCAG 2.2 AA conformance

**Engineering**
- 100% strict TypeScript, no `any` in application code, no suppressed type errors
- All CI gates green on every merge to `main`
- Per-route JavaScript budgets respected (§7)

---

## 2. Audiences and journeys

| Audience | Motivation | Decides on | Primary action |
|---|---|---|---|
| **Parent of a school student (primary decider)** | Marks, discipline, safety, proximity, fees | Evidence of results, faculty credentials, trust signals, transparent fees | Book a demo class / call |
| **Student, Class IX–XII** | Confidence, peer group, exam readiness | Vibe, relatability, results of people like them | Explore course, nudge parent |
| **Parent of a young child (MADS)** | Enrichment, expression, joy, safety | Atmosphere, teacher warmth, showcase footage | Book a trial class |
| **Adult / hobby learner (MADS: Zumba, guitar, vocals)** | Personal interest, schedule fit | Timings, pricing, low-friction entry | WhatsApp enquiry |
| **Prospective faculty** | Employment | Institute standing | Careers application |

Every page must answer: *who is this for, what do they need to believe, what do they do next.*

---

## 3. Information architecture

Slugs are final unless flagged. Routes marked **R1–R5** map to releases in the roadmap.

```
/                                     Home                                R1
/about                                About SSC                           R1
/about/faculty                        Faculty index                       R2
/about/faculty/[slug]                 Faculty profile                     R2
/about/achievements                   Results & achievements              R2
/courses                              All programmes                      R1
/courses/[slug]                       Course detail (SEO landing) ×18     R1 (top 6) / R2 (rest)
/mads                                 MADS division home                  R1
/mads/[slug]                          Creative programme detail           R2
/fees                                 Fees & schedules            [CONFIRM] R1
/admissions                           Admission process + application     R1
/admissions/book-a-demo               Demo booking                        R1
/gallery                              Gallery                             R2
/events                               Events & workshops                  R2
/blog                                 Blog index                          R3
/blog/[slug]                          Article                             R3
/testimonials                         Testimonials & success stories      R2
/faq                                  FAQ                                 R1
/contact                              Contact + map + directions          R1
/careers                              Careers                             R2
/legal/privacy                        Privacy policy                      R1
/legal/terms                          Terms of use                        R1
/legal/refund-policy                  Refund policy (if payments)         R1
/thank-you/[type]                     Conversion confirmation             R1
/coaching-in-[locality]               Local landing pages                 R3
/portal/*                             Student/parent portal               R5
/admin/*                              Staff dashboard                     R4/R5
404, 500                              Designed error states               R1
```

**Course slugs (academic):** `class-1-to-5`, `class-6-to-8`, `class-9-10`, `class-11-12`,
`competitive-exams`, `english-speaking`, `mental-maths`, `languages`
**Creative (MADS):** `dance`, `kathak`, `guitar`, `keyboard`, `vocal`, `taekwondo`,
`art-and-craft`, `drawing`, `painting`, `zumba`

Every course page carries: outcome promise · syllabus/curriculum outline · batch timings ·
fees or fee-enquiry CTA · faculty for that course · student results/work · FAQs (with
`FAQPage` schema) · `Course` structured data · related courses · conversion CTA.

### Home page composition (ordered)
Hero → Trust bar (years, students taught, results) → Academic programmes → MADS creative
programmes → Why SSC (differentiators, evidence-backed) → Results & achievements →
The SSC method / student journey → Faculty → Gallery teaser → Testimonials → FAQ →
Admission CTA → Contact & location → Footer

---

## 4. Brand & design system

### 4.1 Colour tokens — provisional, **[CONFIRM]** against the physical brand

```
--ssc-navy-900   #0A1633   Deep Navy — primary dark surface
--ssc-navy-700   #14224D
--ssc-blue-600   #1D4ED8   Royal Blue — primary brand / interactive
--ssc-blue-500   #3B62E8
--ssc-blue-050   #EEF3FF   Tint surface
--ssc-gold-500   #C9A227   Accent Gold
--ssc-white      #FFFFFF
--ssc-grey-050   #F6F7F9   Very Light Grey
--ssc-grey-500   #6B7280
--ssc-ink        #0B1220   Body text
--mads-accent    [CONFIRM]  MADS differentiator — one warm hue, see §4.2
```

**Contrast findings (computed, WCAG 2.x):**
- `--ssc-navy-900` on white ≈ **18:1** — passes AAA. Primary dark pairing.
- `--ssc-blue-600` on white ≈ **6.7:1** — passes AA for normal text, AAA for large.
- `--ssc-gold-500` on white ≈ **2.4:1** — **fails**. Gold must never carry text or icons on
  a light surface. Legitimate uses: on navy (≈7.4:1, passes AA), as a non-informational
  decorative rule/glow, or as a large-area fill with dark text on top.

This constraint is a design instruction, not a warning to be worked around. Every
foreground/background pairing added later must be contrast-tested; the token package ships
with an automated contrast test over the approved pair list.

### 4.2 Sub-brand strategy — MADS

MADS must feel like a *different room in the same building*: same grid, spacing, type
scale, motion physics and component library; differentiated by one accent hue, warmer
photography treatment, and looser editorial rhythm. Implemented as a `data-brand="mads"`
scope that re-points accent tokens — **not** a second design system.

### 4.3 Typography

Two families, self-hosted, `font-display: swap`, subset Latin (+ Devanagari if Hindi ships).

- **Display:** Bebas Neue **[CONFIRM — alternative: Space Grotesk]** — headlines only
- **Text:** Inter **[CONFIRM — alternative: Manrope]** — 400/500/600/700

Fluid scale, `clamp()`, 320px → 1440px viewport range:

```
--fs-display   clamp(3rem,    2rem + 5vw,     6.5rem)
--fs-h1        clamp(2.25rem, 1.6rem + 3.2vw, 4rem)
--fs-h2        clamp(1.75rem, 1.4rem + 1.8vw, 2.75rem)
--fs-h3        clamp(1.375rem,1.2rem + 0.9vw, 1.875rem)
--fs-body      clamp(1rem,    0.97rem + 0.15vw, 1.125rem)
--fs-small     0.875rem
```

Line length capped at 68ch for body copy. Line height 1.5 body / 1.1 display.

### 4.4 Spacing, grid, radius, elevation

- 4px base scale: `4 8 12 16 24 32 48 64 96 128 160`
- 12-column grid, gutters `clamp(16px, 4vw, 32px)`, max content width 1280px, wide 1440px
- Breakpoints: `sm 640 · md 768 · lg 1024 · xl 1280 · 2xl 1536`
- Radii: `4 8 12 20 999`
- Elevation: 4 tokenised shadows tuned for both light and dark surfaces — no ad-hoc shadows
- Glass surfaces: a single tokenised recipe (blur + border + tint); `backdrop-filter` used
  only where a solid fallback exists

### 4.5 Component inventory (the reusable core)

Button (primary/secondary/ghost/magnetic) · Link · Badge · Card (course/faculty/testimonial/
stat/event/article) · Section header · Accordion · Tabs · Dialog · Sheet · Carousel ·
Lightbox · Marquee · Form controls (input/select/textarea/checkbox/radio/date/phone) ·
Form field wrapper with error + hint · Toast · Breadcrumb · Pagination · Nav (desktop +
mobile) · Footer · Split-text reveal · Counter · Scroll indicator · Media (image/video) ·
Skeleton · Empty state · Sticky CTA bar (mobile)

Built on Shadcn UI + Radix primitives for accessibility-critical behaviour (dialog, tabs,
accordion, select). Do not hand-roll focus traps.

### 4.6 Motion system

Named, tokenised, and finite — not improvised per component.

```
--ease-out-quart  cubic-bezier(0.25, 1, 0.5, 1)     entrances
--ease-in-out     cubic-bezier(0.65, 0, 0.35, 1)    transforms
--ease-spring     GSAP elastic/back, sparingly       playful (MADS)
--dur-fast     150ms   hover, focus, micro
--dur-base     300ms   component transitions
--dur-slow     600ms   section reveals
--dur-cinema   1200ms  hero sequences only
```

Rules:
- Animate `transform` and `opacity` only. Any property that triggers layout is a bug.
- Section reveals: stagger ≤ 80ms, max 6 items, once per session (never re-animate on
  scroll-back).
- Every animated element has a defined final resting state that is correct without JS.
- `prefers-reduced-motion: reduce` → all non-essential motion off, Lenis disabled, 3D
  replaced with its static poster, autoplay video paused with visible controls. This is a
  **tested** path with its own Playwright suite, not a CSS afterthought.
- Scroll-jacking is forbidden. Lenis smooth scroll must not break keyboard navigation,
  in-page anchors, browser find-in-page, or focus scrolling.
- Horizontal scroll sections must be keyboard-operable and expose a visible affordance.

### 4.7 3D — scope and constraints

3D is a **progressive enhancement**, loaded only when all of: desktop-class viewport ·
fine pointer · `hardwareConcurrency ≥ 4` · not `prefers-reduced-motion` · not `save-data` ·
WebGL2 available.

- **Where:** Home hero (one hero composition), MADS hero variant. Nowhere else in R1–R3.
- **Fallback:** a high-quality pre-rendered still (or short looping video poster) of the
  same composition, which is what mobile and reduced-motion users see. The fallback is the
  LCP element and must be excellent on its own.
- **Budget:** ≤ 250 KB gzipped total for the 3D chunk including geometry and textures;
  draw calls ≤ 60; sustained 60fps on a 2022 mid-range laptop, ≥ 30fps floor with
  automatic quality degradation.
- **Technique:** instancing, compressed textures (KTX2/Basis), Draco-compressed geometry,
  `dpr` clamped to ≤ 2, render loop paused when off-screen or tab hidden.
- Concept direction (floating books, graduation forms, musical geometry, glass, particles,
  interactive lighting, mouse parallax, depth of field) is retained from v1.0 — **one**
  coherent idea executed superbly, not a catalogue of effects.

---

## 5. Content model

Single content platform **[CONFIRM: Sanity / Payload]** with these schemas. Content model
is authored **before** page build so no page is built against hardcoded data.

- **Course** — title, slug, division (SSC|MADS), category, summary, outcomes[], curriculum
  modules[], eligibility, batchTimings[], fee (or enquire-only flag), faculty[] (ref),
  media[], testimonials[] (ref), faqs[], SEO block, related[]
- **Faculty** — name, slug, role, qualifications[], experienceYears, subjects[], bio,
  portrait, socials, featured
- **Testimonial** — author, relationship (parent|student|alumnus), course (ref), quote,
  rating, media, consentOnFile (bool, required true to publish)
- **Achievement** — studentName, year, exam/competition, result, course (ref), photo,
  consentOnFile
- **GalleryItem** — asset (image|video), caption, category, event (ref), altText
  (**required**), consentOnFile, featured
- **Event** — title, slug, type, startsAt, endsAt, venue, description, media, registration
- **Post** — title, slug, excerpt, body (portable text), author (ref), tags[],
  publishedAt, cover, SEO block
- **FAQ** — question, answer, category, order
- **SiteSettings** — NAP, hours, phone numbers, WhatsApp number, socials, map coords,
  global CTAs, announcement bar

Cross-cutting: every schema has a `seo` object (title, description, ogImage) and a
`publishedAt`/draft state. `altText` and `consentOnFile` are **required fields, enforced at
the schema level** — the CMS must make it impossible to publish an un-consented photo of a
child or an image without alt text.

---

## 6. Features — specified

### 6.1 Lead capture (the core function)
- **Demo booking:** course, preferred timing, student name/class, parent name, phone
  (E.164, India default), consent checkbox with explicit purpose text
- **General enquiry** and **course-specific enquiry** (pre-filled context)
- **WhatsApp click-to-chat** with pre-composed, page-aware message (no API needed)
- **Click-to-call**, prominent on mobile, with a sticky mobile CTA bar
- Server-side validation (Zod), rate limiting per IP + per phone, Cloudflare Turnstile,
  honeypot field
- Destination: persist to DB **and** notify staff by email + WhatsApp/SMS **[CONFIRM]**
- Every submission redirects to a `/thank-you/[type]` page — this is what conversion
  tracking fires on
- Duplicate-submission protection; graceful degradation if notification delivery fails
  (the lead is never lost because an email bounced)

### 6.2 Maps & location
Static map image by default with a click-to-load interactive embed (an eagerly-loaded
Google Maps iframe is a measurable performance and privacy cost). Plus written directions,
nearest metro, and a directions deep-link.

### 6.3 Payments — **[CONFIRM: in or out of scope]**
If in scope: Razorpay/Cashfree/PayU, server-side order creation, webhook-verified
confirmation, receipt email, refund policy page, reconciliation view for staff. This
materially raises compliance scope; recommend **out of R1**.

### 6.4 AI — one assistant, grounded, in R4
Consolidate v1.0's four AI bullets into **one** assistant with three intents (course
guidance, FAQ, admission process):
- Answers grounded strictly in published CMS content (retrieval over the same source of
  truth the site renders)
- Hard refusals + human handoff for fees, seat availability, dates, and anything not in
  source
- Visible AI disclosure; no impersonation of staff
- Rate limited, cost-capped, transcripts logged with retention policy and consent notice
- Escalation hands off to WhatsApp/phone with conversation context
- **WhatsApp automation deferred** to R5, contingent on Meta Business verification and
  template approval started at the beginning of R2.

### 6.5 Student Portal & Admin — R5, separate spec
Not specified here. Requires its own discovery: roles, entities, workflows, and a
build-vs-buy decision against existing school-management SaaS. Treated as a distinct
product with a distinct approval gate.

---

## 7. Performance budgets (enforced in CI)

Per route, gzipped, excluding fonts:

| Route class | JS | CSS | Images (initial viewport) |
|---|---|---|---|
| Home | ≤ 180 KB (+250 KB deferred 3D chunk) | ≤ 30 KB | ≤ 250 KB |
| Course / content pages | ≤ 130 KB | ≤ 30 KB | ≤ 200 KB |
| Gallery | ≤ 160 KB | ≤ 30 KB | ≤ 300 KB initial, virtualised thereafter |
| Forms | ≤ 120 KB | ≤ 30 KB | — |

Fonts ≤ 120 KB total across all faces and weights.

Techniques: React Server Components by default (`"use client"` only at interaction leaves) ·
`next/dynamic` for all animation/3D/heavy client code · `next/image` with AVIF+WebP and
correct `sizes` · explicit dimensions on every media element (CLS) · `next/font` self-hosted
with preload of the display face only · route-level code splitting · streaming with
Suspense · ISR/static generation for all content pages · video via a streaming provider
**[CONFIRM: Mux / Cloudflare Stream]**, never self-hosted MP4 in the gallery.

CI fails the build on: budget regression, Lighthouse below threshold, or a new axe
violation.

---

## 8. Accessibility — WCAG 2.2 AA

- Semantic landmarks, one `h1` per page, correct heading order
- Full keyboard operability; visible focus indicators meeting 2.2's focus-appearance
  criteria; skip-to-content link
- Target size ≥ 24×24px (2.2 AA); touch targets ≥ 44px on mobile
- Forms: label-input association, `aria-describedby` errors, error summary on submit,
  errors announced, no colour-only error signalling
- Images: meaningful alt (enforced in CMS), decorative marked `alt=""`
- Video: captions; no autoplay with sound
- Contrast: 4.5:1 text / 3:1 large text and UI components (see §4.1 gold constraint)
- Dialogs and menus via Radix; focus return on close
- Reduced-motion path tested end-to-end
- Manual screen-reader pass (NVDA + VoiceOver) on all R1 routes before launch
- Automated axe-core in CI on every route — necessary, not sufficient

---

## 9. SEO

**Technical:** dynamic per-route metadata · canonical URLs · `sitemap.xml` (generated from
CMS) · `robots.txt` · OpenGraph + Twitter cards with per-route generated OG images ·
breadcrumbs (markup + schema) · clean slugs · no orphan pages · correct 404/301 handling.

**Structured data:** `EducationalOrganization` + `LocalBusiness` (site-wide) · `Course` +
`CourseInstance` (course pages) · `Person` (faculty) · `FAQPage` · `Event` · `Article` ·
`BreadcrumbList` · `ImageObject` (gallery) · aggregate rating only where genuine reviews
exist. All validated against Rich Results Test before launch.

**Local (highest ROI, absent from v1.0):** Google Business Profile claimed and fully
populated · NAP consistency between site, GBP and directories · locality landing pages ·
embedded reviews · local keyword research in English and Hindi · directory citations.

**Content:** keyword-mapped course pages (one primary intent each), a blog calendar aimed
at parent questions ("how to prepare for Class 10 boards", "is Kathak good for young
children"), internal linking model from blog → course → conversion.

---

## 10. Analytics & measurement

- GA4 **[CONFIRM]** with a defined event taxonomy — not default pageviews only:
  `demo_form_start`, `demo_form_submit`, `enquiry_submit`, `whatsapp_click`, `call_click`,
  `course_page_view`, `fee_view`, `gallery_open`, `video_play`, `ai_chat_start`,
  `ai_chat_handoff`
- Conversions defined on `/thank-you/*` and on click-to-call/WhatsApp
- Google Search Console + Bing Webmaster
- Consent-gated loading; **no behavioural/advertising tags on pages aimed at children** (§DPDP)
- Real-user CWV collection
- Sentry for errors; uptime monitoring with alerting
- A simple monthly report the SSC team can actually read

---

## 11. Engineering standards

**Stack (confirmed from v1.0, with the §3.2 change):** Next.js 15 (App Router) · React 19 ·
TypeScript strict · Tailwind CSS · Shadcn UI + Radix · GSAP + ScrollTrigger (primary
motion) · Framer Motion (only where a dependency requires it) · React Three Fiber + Drei +
Three.js (deferred chunk) · Lenis · Lucide · Lottie (sparingly, `.lottie` format only).

**Repository:** feature-based structure — `app/` routes, `components/ui` primitives,
`components/sections` compositions, `lib/` utilities, `content/` CMS client and schemas,
`styles/` tokens, `types/`. Path aliases. No component over ~200 lines. No prop-drilling
past two levels.

**Quality gates (CI, blocking):** `tsc --noEmit` · ESLint (with `jsx-a11y`) · Prettier ·
Vitest unit tests for `lib/` and form validation · Playwright e2e for every conversion path
and the reduced-motion path · axe-core on all routes · Lighthouse CI · bundle-size budget ·
`npm audit` / Dependabot.

**Security:** strict CSP (the 3D and analytics chunks must be CSP-compatible — verify
early) · standard security headers · all secrets in env, never committed · env var
documentation · server-side validation on every input · authz checked on every mutation ·
no PII in logs or analytics.

**Process:** conventional commits · PR per milestone with a self-review against the phase's
Definition of Done · staging environment with preview deploys · no direct pushes to `main`.

**Definition of Done (every increment):** types pass · lint passes · tests written and
passing · axe clean · budgets respected · responsive at 320/768/1024/1440 · keyboard path
verified · reduced-motion verified · content from CMS not hardcoded · SEO metadata present ·
self-review recorded in the PR.

---

## 12. Non-goals (explicit)

To protect the release plan, these are **out of scope** unless separately approved:
multi-language UI (Hindi content pages may be added; a full i18n UI layer is not R1–R4) ·
native mobile apps · live-class video delivery · LMS/assignment grading · payroll ·
inventory · public-facing student rankings.

---

## 13. Preserved rules from v1.0

Never produce template-quality output. Never use placeholder-quality UI. Keep components
reusable. Maintain clean folder architecture. Use strict TypeScript. Comment only where
necessary. Refactor continuously. Self-review after every phase, identify weaknesses,
refactor before moving forward. Think like a product team delivering a flagship digital
experience, not a conventional educational website.
