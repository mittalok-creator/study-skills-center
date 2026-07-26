# The Admissions enquiry form — how it actually works

Added 2026-07-26, updated same day: Supabase wired in, a real RLS bug found
and fixed. This is the first form on the site that submits for real.

---

## 1. What it does now

`/admissions` has a working "Request a free demo" form
(`src/components/enquiry-form.tsx`). On submit:

1. **Primary — Supabase.** The data is inserted into a `leads` table in a
   dedicated Supabase project (`study-skills-center`, region `ap-south-1` /
   Mumbai, free tier — created this session with your approval). This is the
   durable record and the thing that decides success/failure for the visitor.
   Client is `src/lib/supabase.ts`.
2. **Secondary, best-effort — FormSubmit.** The same data is also sent to
   `sscdelhi17@gmail.com` via FormSubmit as an immediate email nudge, so staff
   don't have to check a dashboard to notice a new lead. It runs in parallel
   and never blocks or overrides the Supabase outcome.

**Status: fixed and verified against the real API (§2). Not yet verified via
an actual browser in this build environment** — a sandbox-specific proxy issue
blocked that last check; see §2's final note for why that's not expected to
affect production.

---

## 2. RESOLVED — the RLS bug, root cause and fix

The insert was failing with `new row violates row-level security policy for
table "leads"` — reproduced via `curl` and via raw SQL, even when explicitly
running as the `anon` role. The policy, grants, and role membership all
checked out correctly on inspection, which made this genuinely puzzling for a
while.

**Root cause:** every diagnostic test used `RETURNING` — either `RETURNING
id` in raw SQL, or `Prefer: return=representation` in the `curl` calls (added
to see the inserted row back, which seemed like reasonable due diligence).
Postgres RLS treats `INSERT ... RETURNING` as requiring the row to also pass
a **SELECT** policy, not just the INSERT policy's `WITH CHECK`. This table
deliberately has no SELECT policy for `anon` — the entire point of the design
is that submitted leads can never be read back through the public API, only
via the Supabase dashboard. So every one of my own verification attempts was
tripping a real, working, intentional protection — the insert itself was
fine all along.

**Confirmed by removing `RETURNING` from the picture:**
```sql
set role anon;
insert into public.leads (student_name, parent_name, phone, consent, source)
values ('...', '...', '...', true, 'admissions_form');   -- no RETURNING
reset role;
-- succeeds
```
```
$ curl -X POST .../rest/v1/leads -H "Prefer: return=minimal" -d '{...}'
HTTP/2 201
```

**Why the app code was never actually broken:** the Supabase JS client's
`.insert(lead)` — used as-is in `enquiry-form.tsx`, with no `.select()`
chained after it — sends `Prefer: return=minimal` by default. It never asks
for the row back, so it never hits this RETURNING/RLS interaction. The bug
was entirely in how I was *testing* the fix, not in the fix itself.

**Load-bearing constraint going forward:** never chain `.select()` after this
`.insert()` call, and never add a SELECT policy for `anon` on this table, to
keep "leads can only be written, never read, through the public API" true.
If a future feature genuinely needs the inserted row back client-side (e.g.
to show a reference number), the correct fix is a `SECURITY DEFINER` Postgres
function called via RPC — not a broader SELECT grant.

Test rows created while diagnosing this (`RLS diag - no returning`,
`Curl Test - return minimal`) have been deleted from the table.

**What's still unverified:** an actual browser round-trip in this build
sandbox. Chromium here hit `ERR_PROXY_CONNECTION_FAILED` reaching
`*.supabase.co` even with the sandbox's proxy explicitly configured — the
same category of environment-specific networking issue seen earlier with
FormSubmit (`curl` to the same host succeeds instantly; only the
sandboxed browser process struggles). Production (GitHub Pages, real visitor
browsers, no intermediary proxy) has no equivalent hop. **Recommended: do one
real test submission on the live deployed site** and confirm the row appears
in the Supabase dashboard's Table Editor — that's the check this environment
couldn't complete.

---

## 3. What's real vs. what's a placeholder

| | State |
|---|---|
| Required-field + phone-format validation | Real, client-side, tested |
| Inline + summary error messages, focus-to-first-error | Real, tested |
| Honeypot spam field (`_honey`) | Real, tested — a filled honeypot short-circuits to success without sending anything |
| Database insert (Supabase) | **Fixed, verified via direct API call matching the JS client's exact request shape.** Real browser round-trip not verified in this sandbox — see §2. |
| Server-side validation | **Real** — CHECK constraints (`student_name_not_blank`, `phone_not_blank`, `consent_must_be_given`, …) enforce the same rules in Postgres, independent of the client. A plain static site couldn't do this at all. |
| Delivery to SSC's inbox (FormSubmit) | Real, secondary channel, pending FormSubmit's own one-time activation (§5) — no longer something a lead's safety depends on |
| Rate limiting / duplicate-submission blocking | **None.** The submit button disables itself during a single send, which stops accidental double-clicks, but nothing stops a script from submitting repeatedly. |
| WhatsApp/SMS staff notification | **Not implemented** — email only. |
| Lead storage / staff dashboard | **Real** — rows land in Supabase's `leads` table, visible in the Supabase dashboard's Table Editor to anyone with project access. No custom dashboard UI exists yet; that's an R4 item. |

---

## 4. Why Supabase decides success, not FormSubmit

FormSubmit **always answers HTTP 200**, including when it did *not* deliver
the message — confirmed by testing the real endpoint directly:

```
$ curl -X POST https://formsubmit.co/ajax/sscdelhi17@gmail.com ...
{"success":"false","message":"This form needs Activation. We've sent you an
email containing an 'Activate Form' link..."}
HTTP 200
```

An early version of this form checked `res.ok` alone and would have shown
*every* visitor a "thank you" page regardless of whether FormSubmit actually
delivered anything. Once Supabase was available, the fix wasn't just to parse
FormSubmit's response body more carefully — it was to stop depending on
FormSubmit for the success signal at all. The Supabase insert decides
success/failure; FormSubmit is fire-and-forget alongside it. A lead is
durably recorded even during FormSubmit's activation window, or if
FormSubmit is ever slow, down, or rate-limits this project.

---

## 5. FormSubmit's one-time activation (secondary channel only)

Still relevant for the email-notification side-channel, though no longer the
thing that determines whether a lead is lost: FormSubmit holds back the
*first* submission it ever receives for a new address and sends a one-time
"Activate Form" email instead of delivering it. Testing during development
already triggered that email to `sscdelhi17@gmail.com`. Worth clicking it at
some point so the email nudge works, but it is **not** blocking in the way it
would have been before Supabase was added.

---

## 6. Environment note

Two categories of connectivity issue showed up while building this, both
specific to the sandboxed build environment rather than the code:

- Browser-driven `fetch()` calls to third-party hosts (`formsubmit.co`,
  `supabase.co`) were slow, reset, or proxy-failed in this sandbox, while
  identical requests via `curl` succeeded immediately. Not expected to
  reproduce on GitHub Pages with real visitor browsers.
- The RLS issue in §2 was **not** a networking artifact — it reproduced
  identically via direct SQL with no HTTP involved — and has been fully
  root-caused and fixed, independent of the above.
