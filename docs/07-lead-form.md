# The Admissions enquiry form — how it actually works

Added 2026-07-26. This is the first form on the site that submits for real.

---

## 1. What it does

`/admissions` now has a working "Request a free demo" form
(`src/components/enquiry-form.tsx`). Submissions go straight from the visitor's
browser to **FormSubmit** (`formsubmit.co`), a free third-party relay that
forwards the data to **sscdelhi17@gmail.com** by email — no account,
password or API key required on either side.

That constraint mattered: this site has no server (it's a static export on
GitHub Pages), and nobody building it can sign up for a service on SSC's
behalf. FormSubmit was chosen specifically because it needs neither.

---

## 2. ACTION NEEDED — one-time activation

**This is the one thing that must happen before the form is truly live.**

FormSubmit holds back the *first* submission it ever receives for a new email
address and sends a one-time confirmation email instead. I confirmed this by
testing directly against the real endpoint while building this (see §4) — my
test already triggered that email.

**Someone needs to check `sscdelhi17@gmail.com` (including Spam/Promotions)
for an email from FormSubmit with an "Activate Form" link, and click it.**
Until that happens, every submission — including a real visitor's — hits the
form's error/fallback state (a message asking them to call or WhatsApp
instead), not success. Nothing is broken; it's just waiting on that one click.

**After activating, do one real test submission yourself** and confirm the
email arrives. I could not do this last step myself — I have no access to
that inbox, and see §4 for why I also couldn't get a clean automated
end-to-end browser test of a *successful* submission.

---

## 3. What's real vs. what's a placeholder

| | State |
|---|---|
| Required-field + phone-format validation | Real, client-side, tested |
| Inline + summary error messages, focus-to-first-error | Real, tested |
| Honeypot spam field (`_honey`) | Real, tested — a filled honeypot short-circuits to success without sending anything |
| Delivery to SSC's inbox | Real, pending the one-time activation above |
| Server-side validation | **Not possible** — there is no server. Client-side validation is all that exists; a visitor with JavaScript disabled or a modified request could bypass it. |
| Rate limiting / duplicate-submission blocking | **None.** The submit button disables itself during a single send, which stops accidental double-clicks, but nothing stops a script from submitting repeatedly. FormSubmit has its own abuse limits upstream, out of this site's control. |
| WhatsApp/SMS staff notification | **Not implemented** — email only, to the one address above. |
| Lead storage / staff dashboard | **None** — this relay only emails; nothing is stored anywhere the site controls. |

This matches what a static, no-backend site can honestly deliver. R1's real
build (`docs/02-execution-roadmap.md`) replaces this with server-side
validation, a database, and multi-channel staff notification — this draft
version exists so the form isn't a dead end while that's built.

---

## 4. Why the response-checking logic looks the way it does

FormSubmit **always answers HTTP 200** — including when it did *not* deliver
the message. I found this by testing the real endpoint directly:

```
$ curl -X POST https://formsubmit.co/ajax/sscdelhi17@gmail.com ...
{"success":"false","message":"This form needs Activation. We've sent you an
email containing an 'Activate Form' link..."}
HTTP 200
```

The first version of this component checked `res.ok` (i.e. "did I get a 200")
and treated that as success. That's wrong — it would have shown *every*
visitor a "thank you" page while the very first real enquiry silently never
arrived. Fixed to check the JSON body's own `success` field instead
(`src/components/enquiry-form.tsx`), which is the only reliable signal
FormSubmit gives.

**What I could not fully verify:** a clean, fast, successful round-trip
submission from an actual browser. Two things stood in the way, both specific
to this build environment rather than the code:

- I have no access to `sscdelhi17@gmail.com`, so I can't click the activation
  link myself — meaning even a correct browser test would currently hit the
  "needs activation" response, not real success.
- Browser-driven requests to `formsubmit.co` in this sandbox took ~40 seconds
  and then reset, while the *identical* request made with `curl` succeeded in
  under a second. That gap tracks with this environment's outbound proxy
  (browsers and `curl` traverse it differently here) rather than anything
  about the form or FormSubmit — production (GitHub Pages, real browsers, no
  intermediary proxy) has no equivalent hop.

Net effect: the request/response contract is verified correct against the
real API; the error-fallback UI is verified to render correctly when a
submission fails for any reason (it did, for real, during this testing); the
one thing that needs a human is the activation click in §2, followed by one
real confirmation submission once the site is deployed for real.
