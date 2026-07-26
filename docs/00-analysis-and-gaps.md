# Analysis & Gap Report — SSC / MADS Master Prompt v1.0

Reviewed: `Ultimate_Claude_Code_Master_Prompt_SSC_MADS1.md` (v1.0)
Date: 2026-07-26
Status: **Analysis only — no code written.**

---

## 1. Verdict in one paragraph

The prompt is a strong *aesthetic brief* and a weak *product specification*. It describes
how the site should feel with unusual clarity, and says almost nothing about what the site
must **do**, who it must **serve**, what **content** fills it, what **data** it stores, or
how anyone will know it **worked**. As written it would produce a beautiful, empty,
unmaintainable shell — and roughly 30–40% of the listed scope (Student Portal, Admin
Dashboard, four AI features, five CMSes, WhatsApp automation) is backend product work that
the document treats as a bullet point. The single highest-value change is to **split this
into releases**, ship the lead-generating marketing site first, and treat the portal as a
separate product with its own spec.

The rest of this document is the detailed list of what is missing, what is internally
inconsistent, and what is technically at risk.

---

## 2. Blocking gaps — work cannot start without these

### 2.1 There is no content

Not one line of real copy, no photographs, no faculty names or bios, no fee structure, no
course syllabi, no testimonials, no achievement records, no logo file. A "premium,
editorial, emotion-driven" site is 70% content quality. Lorem ipsum in a cinematic layout
looks worse than plain text with real substance.

**Required before Phase 3 (any page build):** a content inventory naming, for every page,
who writes it, who approves it, and by when. See `docs/03-open-decisions.md` §A.

### 2.2 There is no data or backend architecture

The document lists "Blog CMS, Faculty CMS, Gallery CMS, Testimonials CMS, News CMS",
"Student Portal", "Admin Dashboard", "Online admission" and "Demo booking" — every one of
these needs persistence, auth, and an admin surface, and none is specified. Open questions
with no default answer:

- Headless CMS (Sanity / Payload / Strapi) or database-backed custom admin?
- Database and hosting (Supabase / Neon / Planetscale / self-hosted Postgres)?
- Where do submitted leads go — DB, email, Google Sheet, CRM, WhatsApp?
- File/image storage and CDN?

Building five "CMSes" as separate hand-rolled admin screens is the wrong shape. One
content platform with five schemas is the right shape.

### 2.3 "Student Portal" and "Admin Dashboard" are undefined and enormous

These two bullets, unpacked, could mean: enrolment records, attendance, timetables, fee
invoices and receipts, payment reconciliation, homework/assignment distribution, test
scores and report cards, parent communication, batch and teacher scheduling, staff
payroll. That is a school-ERP product — comparable in effort to the entire marketing site,
possibly larger, and with far higher correctness stakes (a wrong fee balance is a real
dispute with a real parent).

**Recommendation:** carve it out. Ship the marketing site first. Write a separate spec for
the portal, or evaluate buying an existing school-management SaaS and linking to it.

### 2.4 Minors' personal data — legal exposure

SSC's students are children. Any portal, admission form, or AI chat that collects a
student's name, age, school, phone number, photograph, or performance data is processing
children's personal data under India's **Digital Personal Data Protection Act, 2023**,
whose implementation rules have been phasing in — the Act requires verifiable parental
consent for processing a child's data and restricts tracking and behavioural advertising
directed at children.

This has direct build consequences:
- Consent capture (parent/guardian, verifiable, logged, revocable) on every form.
- No third-party marketing/behavioural pixels firing on pages aimed at children.
- Data retention and deletion policy; a documented way to honour a deletion request.
- Gallery photos of identifiable minors need a signed media-consent record per child.

I am not a lawyer and the rules' commencement schedule should be confirmed with counsel
before launch. But the build must be structured so compliance is *possible* — retrofitting
consent architecture after launch is painful.

### 2.5 No success metric that matters to the business

"Lighthouse >95" is a proxy, not an outcome. The site exists to fill batches. Missing
entirely: target enquiries per month, cost per lead, demo-booking conversion rate, call
volume, local search ranking for "coaching classes Malviya Nagar" and equivalents. Without
these, no one can tell whether the project succeeded, and there is no basis for deciding
what to build next.

---

## 3. Internal contradictions and technical risk

### 3.1 The performance target conflicts with the technology list

The stack mandates Three.js + React Three Fiber + Drei + GSAP + Framer Motion + Lenis +
Lottie, and simultaneously demands Lighthouse Performance > 95. A minimal R3F scene costs
roughly 100–200 KB gzipped of JavaScript before any of your own code, plus GPU cost and
main-thread time. On the mid-range Android devices that dominate the Indian market, a
WebGL hero and a 95 mobile performance score are close to mutually exclusive.

**Resolution (recommended):** 3D is a *desktop, high-power, opt-in* progressive
enhancement. Mobile and reduced-motion users get a pre-rendered poster/video-frame version
of the same composition. Performance budgets are enforced in CI, and the 3D bundle is
dynamically imported behind a capability check (pointer type, `deviceMemory`,
`hardwareConcurrency`, `prefers-reduced-motion`, save-data).

### 3.2 GSAP and Framer Motion are redundant

Shipping both means two animation runtimes, two mental models, and duplicate bytes.
**Recommendation:** GSAP + ScrollTrigger as the primary system (it is stronger at scroll
choreography and timelines, which is most of what the brief asks for); Framer Motion only
if a Shadcn/Radix component already depends on it. Do not hand-write the same effect twice.

### 3.3 Five typefaces is not a type system

Bebas Neue, Sora, Inter, Manrope and Space Grotesk are all listed as "preferred". Loading
five families is a performance and coherence failure. **Recommendation:** one display face
(Bebas Neue *or* Space Grotesk) + one text face (Inter *or* Manrope) — two families, three
to four weights, self-hosted and subset to Latin + Devanagari if Hindi copy is used.
(All five are open-licensed via Google Fonts, so licensing is not the constraint; taste and
bytes are.)

### 3.4 The phase order guarantees rework

The mandated workflow puts CMS at Phase 7, SEO at Phase 8, performance at Phase 9 and
accessibility at Phase 10 — all *after* pages are built in Phase 4.

- Building 15+ pages with hardcoded content, then introducing a CMS, means rewriting every
  page's data layer.
- Accessibility and semantic structure retrofitted at Phase 10 means re-authoring markup
  written in Phase 4.
- Performance retrofitted at Phase 9 means undoing animation decisions from Phase 5.

**Resolution:** content model precedes page build; a11y, SEO and performance are *gates on
every phase*, enforced in CI, not phases of their own. A dedicated audit at the end is
still valuable — as verification, not as first contact.

### 3.5 "Fast (<95 Lighthouse across categories)"

Written as *less than* 95 in the Success Criteria, and *greater than* 95 in the Performance
section. Assumed to be a typo for >95. More importantly, Lighthouse lab scores are noisy
and gameable; the real target should be **field Core Web Vitals** at the 75th percentile on
mobile: LCP < 2.5s, INP < 200ms, CLS < 0.1. Lab scores become a CI regression guard, not the
goal.

### 3.6 AI features are named, not specified

"AI Course Advisor / FAQ / Admission Assistant / WhatsApp Lead Assistant" — four distinct
products in four bullets. Unspecified: model and provider, cost ceiling, rate limiting,
abuse handling, conversation storage (and its DPDP implications), escalation to a human,
and — critically — **grounding**. An assistant that invents a fee amount, a batch timing,
or an admission deadline damages a real business's credibility with real parents.

Minimum viable guardrails: answers retrieved from an approved content source, refusal +
human handoff outside that source, no commitments on price/seat/date, full transcript
logging, and a visible "AI assistant" disclosure.

### 3.7 The WhatsApp assistant is a procurement task, not a coding task

"AI WhatsApp Lead Assistant" requires the WhatsApp Business Platform: Meta Business
verification, a registered number, pre-approved message templates for business-initiated
messages, adherence to the customer-service reply window, and per-conversation pricing.
Approval timelines are outside our control and have historically taken days to weeks.
**Start this early or descope it** — do not discover it in Phase 7.

### 3.8 Scope vs. any plausible timeline

15 top-level sections + ~18 dedicated course pages + 5 content types + 4 AI features +
portal + admin dashboard + bespoke 3D + Awwwards-grade art direction. There is no timeline
in the document, which conceals the problem. Realistically this is a multi-month programme;
attempting it as one undifferentiated push means nothing is live for months and the
business gets zero leads in the meantime.

---

## 4. Missing requirements — checklist

### Product & content
- [ ] Target audiences named (parent-decider vs. student-user vs. adult hobby learner) with distinct journeys
- [ ] Primary conversion action defined and ranked (demo booking? call? WhatsApp? form?)
- [ ] Fees / pricing page — currently absent, and it is one of the two most-visited pages on any coaching site
- [ ] Batch timings & schedule information
- [ ] Content inventory + owner + deadline per page
- [ ] Photography and video plan (real students require consent; stock photography undermines "premium local institute")
- [ ] Brand assets: logo files (SVG), exact hex values, usage rules
- [ ] Tone-of-voice guide (the brief says "editorial" without defining the voice)

### Pages absent from the structure
- [ ] Fees / Pricing
- [ ] Privacy Policy, Terms of Use, Refund & Cancellation Policy (mandatory if payments are taken)
- [ ] Careers / Work with us (faculty hiring is a real need for a coaching centre)
- [ ] 404 and 500 pages (a "cinematic" site with a default 404 is a tell)
- [ ] Search / sitemap page
- [ ] Individual faculty detail pages (SEO value; currently only a Faculty index is implied)
- [ ] Location/landing pages for local SEO ("Coaching in Malviya Nagar", nearby localities)
- [ ] Thank-you / confirmation pages (needed for conversion tracking)

### Engineering
- [ ] Hosting, domain, DNS, SSL, staging environment, preview deploys
- [ ] CI/CD: typecheck, lint, unit, e2e, a11y scan, Lighthouse CI, bundle-size budget
- [ ] Testing strategy and tooling (Vitest, Playwright, axe-core, visual regression)
- [ ] Error monitoring and uptime alerting (Sentry or equivalent)
- [ ] Analytics stack + event taxonomy + consent gating
- [ ] Form abuse protection (rate limiting, Turnstile/hCaptcha, honeypot) and transactional email provider
- [ ] Image pipeline (AVIF/WebP, responsive sizes, CDN) and **video hosting** — a gallery with self-hosted MP4s will destroy the performance target
- [ ] Security: CSP and security headers, dependency scanning, secrets management, authz model
- [ ] Browser/device support matrix
- [ ] Backup and disaster recovery for any user data
- [ ] Environment variable and secrets documentation

### Standards & process
- [ ] Accessibility standard named (recommend **WCAG 2.2 level AA**) with the animation-heavy design explicitly reconciled against it
- [ ] Definition of Done per phase, with testable acceptance criteria
- [ ] Performance budgets in kilobytes and milliseconds, per route
- [ ] Localisation decision (Hindi copy? Hindi keywords? Devanagari subsetting?)
- [ ] Handover: CMS training for SSC staff, runbook, maintenance owner after launch

### SEO — the biggest omission
The SEO section lists generic technical items and completely misses that **this is a local
business**. For a coaching centre in Malviya Nagar, local search will out-perform every
other channel:
- [ ] Google Business Profile claimed, categorised, populated, review flow
- [ ] `LocalBusiness` / `EducationalOrganization` + `Course` + `FAQPage` + `Event` structured data
- [ ] NAP (name/address/phone) consistency across the site and directories
- [ ] Keyword research for actual local intent, in English and Hindi
- [ ] Review generation and display strategy

---

## 5. What is genuinely good in v1.0 and should be preserved

- The ambition level and the refusal to accept template output — this is the right bar.
- The reference set (Apple / Stripe / Linear / Vercel) is coherent and achievable.
- Insisting on strict TypeScript, reusable components, and continuous refactoring.
- `prefers-reduced-motion` respect stated up front rather than as an afterthought.
- Per-course dedicated SEO pages — correct instinct, high commercial value.
- The self-review-after-each-phase discipline.

These carry forward unchanged into the v2 specification.

---

## 6. Recommended shape of the work

| | v1.0 as written | Recommended |
|---|---|---|
| Delivery | One 11-phase monolith | 5 releases, each independently shippable |
| First live date | After Phase 11 | End of Release 1 (marketing MVP) |
| 3D | Mandatory everywhere | Desktop progressive enhancement, budgeted |
| CMS | Phase 7 | Content model before page build |
| A11y / SEO / Perf | Phases 8–10 | CI gates on every merge |
| Portal & Admin | One bullet | Separate product, separate spec, Release 5 or buy |
| AI | Four bullets | One grounded assistant in Release 4, others deferred |
| Success | Lighthouse >95 | Field CWV + leads/month + local ranking |

Detailed release plan: `docs/02-execution-roadmap.md`.
Improved specification: `docs/01-master-spec-v2.md`.
Decisions I need from you: `docs/03-open-decisions.md`.
