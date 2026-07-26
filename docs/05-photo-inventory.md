# Photo Inventory — batch 1

Source: Google Drive → `SSC Website Assets/Photo Gallery/`
Analysed: 2026-07-26 · **96 files**, all JPEG
Per-file data: [`photo-inventory.csv`](photo-inventory.csv)

---

## 1. Technical condition

Every file in this batch arrived via WhatsApp (`WhatsApp Image 2026-07-25 at …`),
and the measurements confirm what that implies.

| Measure | Value |
|---|---|
| Files | 96 |
| Max long edge | **1600 px** (25 files sit exactly on this cap) |
| Median long edge | 1280 px |
| Under 1200 px long edge | 32 files (33%) |
| Smallest | 497 × 496 px |
| Average file size | ~220 KB |
| Orientation | 61 landscape · 27 portrait · 8 square |
| Exact duplicates | 0 |
| Near-duplicates | 1 pair (refs 42 & 76) |
| Corrupt / unreadable | 0 |

**1600 px is WhatsApp's compression ceiling, not a camera resolution.** An original
phone photo is 3000–4000 px and 2–8 MB. These are re-encoded copies at roughly a
twentieth of the original data.

### What that means in practice

| Use | Verdict |
|---|---|
| Gallery grid tiles | ✅ Fine — displayed at 300–400 px wide |
| Card and section thumbnails | ✅ Fine |
| Section background bands | ⚠️ Usable at low opacity behind a dark overlay, which is how the draft uses them |
| Full-width homepage hero | ❌ Visibly soft on a laptop, worse on retina/4K |
| Faculty portraits | ❌ Not consistent enough in framing or quality |
| Print / banners | ❌ Not enough pixels |

The draft site works around this: every large image sits behind a navy gradient at
20–40% opacity, where softness doesn't read. That is a mitigation, not a fix.

**To fix it:** re-send the same photos from the phone or camera that took them, via
Drive upload rather than WhatsApp — or re-export from Google Photos with *Original
quality* selected instead of *Storage saver*.

---

## 2. What's in the batch

Categorised by reviewing all 96 images as contact sheets.

| Category | Count | Notes |
|---|---|---|
| Art & craft | 15 | Strongest set — children holding finished work, good expressions |
| Dance | 15 | Studio, Zumba, Kathak, Bollywood, stage performances |
| Academics | 11 | Classrooms, exam hall, small-group teaching |
| Events | 12 | Closing ceremonies, prize-giving, Diwali, parent audiences |
| Chess | 8 | Well-lit, clear activity |
| Taekwon-Do | 6 | Belts, group line-ups, certificates |
| Music | 4 | Guitar and keyboard classes — **thinnest category** |
| **Marketing posters** | **18** | Not photos — see §3 |
| Logos | 2 | SSC circular seal, MADS circular mark |
| Unusable | 5 | Phone screenshots, near-black frames, collage-of-collages |

**71 photographs selected** for the draft gallery, plus 6 used as section
backgrounds and 2 brand marks.

### Gaps worth filling
- **Music** — only 4 usable images across guitar, keyboard and vocal
- **Faculty portraits** — none. Every teacher card in the draft is a placeholder
- **Building exterior / reception** — one distant shot only; nothing that says "this
  is the front door"
- **Adult batches** — nothing showing the 15+/adult MADS students
- **Hero-grade wide shots** — none at usable resolution

---

## 3. Unexpected find: the posters are a content goldmine

18 of the 96 files are SSC's own printed and social marketing material. They turned
out to be the most valuable items in the batch, because they carry facts nobody had
written down for this project yet. **Every factual claim on the draft site is
transcribed from these**, not invented:

- **Full NAP:** P-9, LGF, P-Block, Malviya Nagar, New Delhi – 110017 (near the post
  office); phones 8800688555, 011-49401934, 9899299900; `sscdelhi17@gmail.com`;
  `www.studyskillscenter.in`
- **A third division nobody mentioned** — **Grades Career Institute / Grades Manager**
  (`gradescareer.com`, `gradesmanager.com`), covering JEE Main, JEE Advanced, NEET,
  Olympiads and Class VII–X foundation. The original brief described SSC and MADS
  only. This materially changes the information architecture.
- **Full academic subject lists** per class group (I–V, VI–VIII, IX–X, XI–XII), plus
  English speaking, languages (French, German, Spanish, Sanskrit), mental maths and
  handwriting
- **MADS specifics:** eleven disciplines, and the batch split — **ages 6–14 and
  15-and-above including adults, taught separately**
- **Bharatnatyam** runs as a certificate course under Saraswathy Natyalaya with
  Nisha Saraswathy — a named partnership not in the brief
- **Taekwon-Do** is in association with School of Self Defence, with Taekwondo
  Federation registration and belt/competition training
- **Published board results** — twelve named students with scores and schools
- **Events:** Art Exhibition (21 June 2026), the sixth Annual Day & Summer Camp
  closing ceremony, Summer Camp 2026
- **Both logos**, as flat raster images

The posters are kept in `public/images/posters/` and used on the Events page. They
are **not** in the gallery — a gallery of your own advertising looks like filler.

---

## 4. Consent — blocking before launch

Almost every photograph shows identifiable children. Under India's DPDP Act 2023,
publishing them needs verifiable parental consent, and the draft is built so this
cannot be forgotten: the CMS schema will make `consentOnFile` a required field.

**Two things are needed from SSC:**

1. **Which event(s) is this batch from?** Everything carries a 2026-07-25 WhatsApp
   download date, which tells us nothing about when the photos were taken. Without
   event attribution the gallery cannot be organised or consent-tracked.
2. **Was consent taken?** Record it per event in
   [`media-consent-tracker.csv`](media-consent-tracker.csv). Blanket consent for an
   event is usually enough.

The twelve named students on the results poster need the same check. They appear in
the draft only because SSC already published them; that is not the same as consent to
appear on a website, and both the Results and Achievements pages carry a visible
warning to that effect.

---

## 5. Recommended next actions

| # | Action | Owner | Why |
|---|---|---|---|
| 1 | Confirm event names/dates for this batch | SSC | Unblocks gallery structure and consent |
| 2 | Confirm consent status per event | SSC | Blocks public launch |
| 3 | Re-send originals (not via WhatsApp) | SSC | Only way to get hero-grade imagery |
| 4 | Book a half-day photo shoot | SSC | Faculty portraits, exterior, hero shots, adult batches |
| 5 | Shoot more music-class photos | SSC | Only 4 exist; guitar/keyboard/vocal are sold on the site |
| 6 | Confirm Grades Career Institute's place in the brand | SSC | It is a whole division the brief omitted |

Items 1 and 2 are the blocking ones. Items 3–5 determine how good the site can look.
