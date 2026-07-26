# Open Decisions — needed from you

Ordered by urgency. **§A and §B block the start of R0.** Everything else has a stated
default I will proceed with if you don't have a preference — I'm not going to stall the
build on a question that has a sensible answer.

---

## §A — Blocking: scope and content

**A1. Do you approve the release structure?**
Specifically: marketing site live at ~week 7, with the Student Portal and Admin Dashboard
carved out into a separately-approved R5 (possibly bought rather than built). This is the
single biggest change I'm proposing to your original prompt.

**A2. Who owns content, and by when?**
For each of: course syllabi, batch timings, fees, faculty bios + photographs, student
results/achievements, testimonials (with consent), gallery photos/videos, About copy.
Without this the build stalls at M1.2. *Nothing else on this list matters as much as this one.*

**A3. Photography.** Professional shoot, or existing photos? If existing — resolution and
consent status? Stock imagery is not viable for a local institute claiming premium
positioning.

**A4. Fees on the site — published, ranges, or enquiry-only?**
Affects `/fees`, every course page, and conversion design. Published fees convert better
and filter better; enquiry-only preserves negotiating room.

**A5. Are online fee payments in scope?**
Recommendation: **no for R1.** It adds a payment gateway, refund policy, reconciliation and
compliance surface for little launch-stage benefit.

---

## §B — Blocking: brand

**B1. Exact brand colours.** I have provisional hex values in spec §4.1. I need the real
ones, or approval to proceed with mine. Note the finding: **Accent Gold on white fails
contrast (~2.4:1)** and can only be used on dark surfaces or as non-informational
decoration.

**B2. Logo files** — SVG for SSC and MADS, plus any usage rules.

**B3. Typeface pair.** Five were listed; two should ship.
Recommendation: **Bebas Neue** (display) + **Inter** (text) — Bebas gives the cinematic
poster feel, Inter is the most legible workhorse at Indian mobile screen sizes.
Alternative pairing: Space Grotesk + Manrope for a softer, more contemporary feel.

**B4. How different should MADS look?** My recommendation: same system, one accent hue,
warmer photography. Confirm, or tell me you want a stronger separation.

---

## §C — Technical (defaults stated, not blocking)

| # | Decision | Default I'll take |
|---|---|---|
| C1 | Hosting | **Vercel** — best Next.js 15 support, preview deploys, edge CDN |
| C2 | CMS | **Sanity** — best editor UX for non-technical staff, strong image pipeline. *Payload if you want it self-hosted and DB-native.* |
| C3 | Database (leads, later portal) | **Supabase Postgres** — auth included, useful for R5 |
| C4 | Video hosting | **Cloudflare Stream** or **Mux** — self-hosted MP4 in the gallery will break the performance target |
| C5 | Transactional email | **Resend** |
| C6 | Bot protection | **Cloudflare Turnstile** (free, no accessibility penalty) |
| C7 | Analytics | **GA4** + Search Console, consent-gated, no behavioural tags on child-facing pages |
| C8 | Lead notification | Email + WhatsApp to a staff number; DB is the source of truth |
| C9 | AI model | Claude — grounded retrieval over CMS content, cost-capped |
| C10 | Motion library | **GSAP + ScrollTrigger primary**; Framer Motion only where Radix/Shadcn requires it |

---

## §D — Business & operational

**D1. Domain and DNS access** — what is the domain, and who controls the registrar?
Needed before launch week, not on launch day.

**D2. Google Business Profile** — claimed already? This is the highest-ROI SEO asset for a
Malviya Nagar institute and should be started in week 1.

**D3. WhatsApp Business API** — do you want true automation (R5, needs Meta Business
verification + template approval, has per-message cost), or is click-to-chat sufficient?
Click-to-chat ships in R1 and covers most of the value.

**D4. Success targets.** What does a good month look like — enquiries, demos booked,
admissions? Without a number, "success" is unmeasurable and R2–R4 priorities are guesswork.

**D5. Legal review.** Who reviews the privacy policy, consent language, and DPDP posture
for minors' data? I'll draft; a lawyer should approve before launch.

**D6. Hindi content** — any Hindi pages or keyword targeting? Affects font subsetting and
content planning. Default: English-only UI, revisit after launch data.

**D7. Post-launch ownership** — who at SSC updates the CMS, and who owns the site after
handover? Determines how much training and documentation R1 needs.

---

## What I need right now to start

Minimum viable answer set: **A1, A2, B1, B2, B3.** Everything else I can default and revisit.

Give me those five and I'll begin R0/M0.1.
