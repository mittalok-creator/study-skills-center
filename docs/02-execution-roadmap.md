# Execution Roadmap — SSC / MADS

Derived from `01-master-spec-v2.md`. Structured as **five independently shippable
releases**, replacing v1.0's 11-phase monolith.

**Estimating assumption:** one focused development track (me, driven by you at a steady
pace) at roughly 25–30 productive hours/week, with content and approvals supplied by SSC
without long stalls. Content delays are the single most likely cause of slippage — they are
called out per milestone. Ranges are honest, not padded.

**Guiding principle:** the marketing site goes live early and starts producing enquiries
while the deeper features are still being built. Nothing waits for everything.

---

## Timeline at a glance

| Release | Outcome | Est. duration | Cumulative |
|---|---|---|---|
| **R0** Foundations | Repo, tooling, design system, content model | 1.5–2 weeks | wk 2 |
| **R1** Marketing MVP → **LIVE** | Home, courses, MADS, admissions, contact, legal | 4–5 weeks | wk 7 |
| **R2** Depth & CMS content | Faculty, gallery, testimonials, achievements, events, all courses | 3–4 weeks | wk 11 |
| **R3** Signature craft | 3D hero, scroll storytelling, blog, local SEO pages | 3–4 weeks | wk 15 |
| **R4** AI assistant + staff tools | Grounded assistant, lead dashboard | 3–4 weeks | wk 19 |
| **R5** Portal (separate approval gate) | Student/parent portal, WhatsApp automation | Re-estimated after discovery | — |

**Public launch: end of R1, around week 7.** R2–R4 ship continuously to a live site.

---

## R0 — Foundations
*Goal: everything that would be expensive to change later is decided and encoded.*

### M0.1 — Project & pipeline (2–3 days)
- Next.js 15 + React 19 + TypeScript strict scaffold; folder architecture per spec §11
- ESLint (incl. `jsx-a11y`) + Prettier + conventional commits + Husky
- GitHub Actions: typecheck, lint, unit, build
- Vercel **[CONFIRM]** project, staging + preview deploys, env var scaffolding
- Sentry, uptime monitoring
- `CLAUDE.md` + `README` with architecture and conventions

**Exit:** empty app deploys to staging on merge; every CI gate green and blocking.

### M0.2 — Design system (4–5 days)
- Colour tokens with an **automated contrast test** over the approved pairing list
- Fluid type scale, spacing, grid, radii, elevation, glass recipe — all CSS variables
- MADS `data-brand` scope
- Motion tokens + `prefers-reduced-motion` infrastructure
- Core primitives: Button, Link, Card, Section, Container, Media, Form controls, Nav,
  Footer, Accordion, Dialog, Tabs, Toast, Breadcrumb
- Storybook-style `/dev/kitchen-sink` route rendering every component in every state
- axe + Lighthouse CI wired to that route

- Logo assets derived from the supplied SSC and MADS marks: full lockup, compact,
  monogram/favicon, light + dark variants, clear-space and minimum-size rules

**Exit:** kitchen-sink route is axe-clean, keyboard-complete, correct at 320/768/1024/1440,
and correct in reduced-motion.
**Blocked on:** the SSC and MADS logo files — the palette is extracted from them.
Typefaces are locked (Bebas Neue + Inter). M0.1 is not blocked and can start first.

### M0.3 — Content model & pipeline (3–4 days)
- CMS provisioned **[CONFIRM]**; all schemas from spec §5 implemented
- `altText` and `consentOnFile` enforced as required fields at schema level
- Typed CMS client, generated types, preview mode, ISR revalidation webhook
- Image pipeline + video provider account
- Seeded with real content for 3 courses and 3 faculty as a proof

**Exit:** a content editor can change a course in the CMS and see it live on staging
without a developer.

> **Parallel track starting now (owned by SSC, not blocking R0):** content collection,
> photography brief, Google Business Profile claim, Meta Business verification for
> WhatsApp, domain/DNS access. These have external lead times — start them in week 1.

---

## R1 — Marketing MVP → **PUBLIC LAUNCH**
*Goal: a live site that generates enquiries. Every page in R1 is conversion-capable.*

### M1.1 — Global shell & home (7–9 days)
- Navigation (desktop + mobile), footer, announcement bar, mobile sticky CTA
- Home: hero (2D cinematic version — **3D deferred to R3**), trust bar, academic
  programmes, MADS teaser, why SSC, results, method, faculty teaser, testimonials teaser,
  FAQ, admission CTA, contact
- Section reveal animations (GSAP), split-text hero, counters
- Designed 404 and 500

**Exit:** home passes all CI gates; LCP < 2.5s on throttled mobile; every CTA works.
**Note:** building the hero without 3D first is deliberate — it guarantees the fallback
experience (which mobile users get permanently) is excellent rather than an afterthought.

### M1.2 — Courses & MADS (7–9 days)
- `/courses` index with filtering
- Course detail template + **top 6 course pages** with full real content, `Course` schema,
  per-course FAQs and CTAs
- `/mads` division home with brand scope applied
- `/fees` **[CONFIRM structure]**

**Exit:** each course page is independently rankable and independently converts.
**Risk:** blocked on real syllabus/fee/timing content.

### M1.3 — Conversion & compliance (5–6 days)
- `/admissions`, `/admissions/book-a-demo`, `/contact`, `/faq`
- Form stack: Zod validation, rate limiting, Turnstile, honeypot, DB persistence,
  email + WhatsApp/SMS staff notification, failure-safe lead capture
- WhatsApp click-to-chat, click-to-call, static-then-interactive map
- `/thank-you/[type]` pages
- Privacy policy, terms, refund policy **[legal review required]**
- Consent capture with parental-consent path for under-18 data
- Analytics + event taxonomy + consent gating

**Exit:** end-to-end Playwright test proves a submitted enquiry reaches staff; consent is
recorded; conversion events fire.

### M1.4 — Launch hardening (4–5 days)
- Full a11y pass incl. manual screen-reader testing on every R1 route
- Performance pass against §7 budgets; CWV verified on a real mid-range Android
- SEO: sitemap, robots, canonicals, OG images, structured data validated
- Security headers + CSP; secrets audit
- Cross-browser/device matrix pass
- Content proofread; DNS cutover; GSC/GA verification; staff CMS training + runbook

**🚩 MILESTONE: PUBLIC LAUNCH — approval gate**

---

## R2 — Depth & CMS content
*Goal: the evidence layer — the pages that convert sceptical parents.*

### M2.1 — People & proof (6–8 days)
Faculty index + profile pages (`Person` schema) · Achievements/results · Testimonials with
consent enforcement · Careers.

### M2.2 — Gallery & events (6–8 days)
Masonry gallery, categories, lightbox, virtualised infinite scroll, streamed video,
smooth zoom · Events index + detail with `Event` schema and registration.
*Watch:* the gallery is the biggest performance risk in the project — budgets are hard gates.

### M2.3 — Remaining course pages (4–5 days)
The other 12 academic + creative programme pages with full content and schema.

**Exit:** the site is content-complete. **Start Meta/WhatsApp verification here if not already done.**

---

## R3 — Signature craft
*Goal: the Awwwards-grade layer, added only once substance exists.*

### M3.1 — 3D hero (6–8 days)
One coherent 3D composition, capability-gated, dynamically imported, ≤250 KB gzipped,
Draco/KTX2 compressed, quality auto-degradation, paused off-screen. Static poster fallback
(already shipped in R1) remains the mobile/reduced-motion path.
**Hard rule:** if budgets or CWV regress, the 3D does not ship. The fallback is already good.

### M3.2 — Scroll storytelling & micro-interaction (5–6 days)
Page transitions, scroll-driven narrative sections, magnetic buttons, cursor interactions,
SVG morphing, horizontal scroll where meaningful — each individually justified, each
keyboard-safe, each reduced-motion-safe.

### M3.3 — Blog & local SEO (4–5 days)
Blog index + article template + `Article` schema + author pages · locality landing pages ·
internal linking model · initial editorial calendar.

**Exit:** field CWV still within targets *after* the craft layer. Verified, not assumed.

---

## R4 — AI assistant & staff tooling

### M4.1 — Grounded assistant (7–9 days)
Retrieval over published CMS content · three intents (course guidance, FAQ, admissions) ·
hard refusal + human handoff on fees/seats/dates · AI disclosure · rate limiting and cost
caps · transcript logging with retention policy · WhatsApp/phone escalation with context ·
adversarial testing against hallucination before exposure.

### M4.2 — Staff lead dashboard (5–7 days)
Authenticated staff view of enquiries: status, assignment, notes, export, basic funnel
reporting. Deliberately narrow — this is *not* the school ERP.

---

## R5 — Student Portal & WhatsApp automation — **separate approval gate**

Not estimated. Requires its own discovery phase (1–2 weeks) covering roles and permissions,
entity model, workflows, DPDP-compliant handling of minors' data, and an explicit
**build-vs-buy** evaluation against existing school-management SaaS. WhatsApp Business
automation lands here, contingent on Meta verification and template approval completed
earlier.

**Recommendation:** do not commit to R5 scope until R1 is live and you have three months of
real usage data telling you what parents and staff actually need.

---

## Cross-cutting, every release

These are **not phases** — they are conditions of merge, running from day one:
performance budgets · axe-core clean · WCAG 2.2 AA · SEO metadata and schema · strict types ·
tests for every conversion path · self-review against Definition of Done recorded in each PR.

This is the most important structural change from v1.0, where accessibility, SEO and
performance were phases 8–10 and would have forced the rewrite of everything built in
phase 4.

---

## Top risks

| Risk | Impact | Mitigation |
|---|---|---|
| **Content not ready** | Blocks R1 — most likely cause of slip | Content inventory with named owners and dates, agreed before M1.1. Build templates against seeded real content, never lorem ipsum. |
| **3D vs. mobile performance** | Core tension in the brief | 3D deferred to R3, capability-gated, hard budget, fallback shipped first and shipped good. |
| **Gallery weight** | CWV regression after launch | Virtualisation, streamed video, budget as blocking CI gate. |
| **Minors' data / DPDP** | Legal, reputational | Consent architecture in R1, enforced at CMS schema level, legal review before launch. |
| **AI hallucinating fees or seats** | Direct reputational damage | Grounded retrieval, hard refusals, human handoff, adversarial testing. |
| **WhatsApp API approval delay** | Blocks a headline feature | Start Meta verification in R0/R2, long before it is needed. Click-to-chat covers R1. |
| **Scope creep from portal into R1** | Launch never happens | Portal behind an explicit approval gate, separate spec. |
| **Photography quality** | Undermines "premium" positioning | Professional shoot booked during R0/R1; stock imagery of Indian students in a Delhi institute reads as fake. |

---

## Approval gates

1. **Now** — approve this roadmap and answer `03-open-decisions.md` §A/§B (blocking R0)
2. **End of R0** — design system and content model sign-off before page building
3. **End of R1** — launch approval
4. **End of R3** — 3D ships only if budgets hold
5. **Before R5** — portal build-vs-buy decision
