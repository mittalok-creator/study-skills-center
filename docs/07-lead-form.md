# The Admissions enquiry form — how it actually works

Added 2026-07-26, updated same day once a Supabase project became available.
This is the first form on the site that submits for real.

---

## 1. What it does now

`/admissions` has a working "Request a free demo" form
(`src/components/enquiry-form.tsx`). On submit:

1. **Primary — Supabase.** The data is inserted into a `leads` table in a
   dedicated Supabase project (`study-skills-center`, region `ap-south-1` /
   Mumbai, free tier — created this session with your approval). This is now
   the durable record and the thing that decides success/failure for the
   visitor. Client is `src/lib/supabase.ts`.
2. **Secondary, best-effort — FormSubmit.** The same data is also sent to
   `sscdelhi17@gmail.com` via FormSubmit as an immediate email nudge, so staff
   don't have to check a dashboard to notice a new lead. It runs in parallel
   and never blocks or overrides the Supabase outcome — see §4 below for why
   that matters.

This is a meaningfully better position than FormSubmit alone: leads are now
stored in a real, queryable database that only SSC can read, with
database-level validation as a second line of defence behind the client-side
checks. See §3 for the honest scorecard against what a full backend would do.

---

## 2. 🔴 KNOWN ISSUE — inserts are currently rejected by RLS (unresolved)

**The form does not work yet.** While verifying the Supabase wiring directly
(not through the site — via `curl` against the REST API, and via raw SQL in
the Supabase SQL editor), every insert attempt fails with:

```
{"code":"42501","message":"new row violates row-level security policy for table \"leads\""}
```

This happens **even when explicitly running as the `anon` role in a raw SQL
session** (`SET ROLE anon; INSERT INTO public.leads (...) VALUES (...);`),
which rules out the API layer, the API key format, and the proxy/network
issues seen earlier with FormSubmit — this is a database-level RLS problem,
confirmed independent of the website code.

**What's been verified so far:**
- The table exists with the expected columns and check constraints.
- `pg_policies` shows exactly one policy on `leads`: permissive, `INSERT`,
  role `{anon}`, `with_check: true` — which should allow this.
- Table-level grants include `INSERT` for `anon` (confirmed via
  `information_schema.role_table_grants`).
- `SET ROLE anon; SELECT current_user;` inside the same session correctly
  returns `anon` — the role switch itself works.
- The insert still fails immediately after that, in the same session.

**What hasn't been checked yet** (next steps, in order of likely cause):
1. `pg_class.relrowsecurity` / `relforcerowsecurity` on `public.leads` — confirm
   RLS is actually *enabled* the way `apply_migration` reported, not just that
   a policy exists. A policy with RLS not properly enabled, or enabled-but-not
   -forced in some edge case, can produce exactly this symptom.
2. Whether the `consent_must_be_given` or other CHECK constraints are somehow
   being mis-attributed as an RLS error — unlikely (Postgres uses a different
   SQLSTATE, `23514`, for check violations, and this is `42501`), but worth
   eliminating by testing an insert with every constraint trivially satisfied
   in isolation.
3. Dropping and recreating the policy from scratch in case something about
   the original `apply_migration` call didn't fully commit as reported.
4. Checking for a second, conflicting `leads`-like object (e.g. a view or a
   table in another schema in the search path) shadowing the intended table.

**Do not treat the "primary — Supabase" description in §1 as working until
this is resolved.** Right now, submitting the real form on the site will hit
the error/fallback UI (call/WhatsApp prompt) every time, because the
Supabase insert — the one that decides success — fails. This is safe (no
visitor sees a false "thank you", and FormSubmit still fires as before,
subject to its own §5 caveat) but the form is not yet delivering leads via
either path reliably.

---

## 3. What's real vs. what's a placeholder

| | State |
|---|---|
| Required-field + phone-format validation | Real, client-side, tested |
| Inline + summary error messages, focus-to-first-error | Real, tested |
| Honeypot spam field (`_honey`) | Real, tested — a filled honeypot short-circuits to success without sending anything |
| Database insert (Supabase) | **Blocked — see §2.** Table, schema and RLS policy exist; the policy is not yet behaving as configured. |
| Server-side validation | **Real, once §2 is fixed** — CHECK constraints (`student_name_not_blank`, `phone_not_blank`, `consent_must_be_given`, …) enforce the same rules in Postgres, independent of the client. This is new: a plain static site couldn't do this at all. |
| Delivery to SSC's inbox (FormSubmit) | Real, pending FormSubmit's own one-time activation — see §5 |
| Rate limiting / duplicate-submission blocking | **None.** The submit button disables itself during a single send, which stops accidental double-clicks, but nothing stops a script from submitting repeatedly. |
| WhatsApp/SMS staff notification | **Not implemented** — email only. |
| Lead storage / staff dashboard | **Real, once §2 is fixed** — rows land in Supabase's `leads` table, visible in the Supabase dashboard's Table Editor to anyone with project access. No custom dashboard UI exists yet; that's an R4 item. |

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
FormSubmit for the success signal at all. The Supabase insert is now what
decides success/failure; FormSubmit is fire-and-forget alongside it. Once §2
is fixed, a lead is durably recorded even during FormSubmit's activation
window, or if FormSubmit is ever slow, down, or rate-limits this project.

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
  `supabase.co`) were slow or reset in this sandbox, while identical requests
  via `curl` succeeded immediately — tracked to how this environment's
  outbound proxy is (or isn't) applied to a real browser process versus
  `curl`. Not expected to reproduce on GitHub Pages with real visitor
  browsers, which have no such intermediary.
- The RLS issue in §2 is not a networking artifact — it reproduces identically
  via direct SQL with no HTTP involved at all — and needs to be resolved
  before this form can be called done.
