# Media Intake — how to send photos and videos

For the hundreds of event photos and landing-page imagery.

**Route: Google Drive.** It is already connected to this session — I can read your Drive
directly, so anything you put in the folders below I can inspect, curate, and later bulk-load
into the CMS without you doing it twice. Do **not** put photos in the git repository:
it bloats the repo permanently and images belong in a media pipeline, not in version control.

---

## 1. Folder structure to create

Create one folder in My Drive named **`SSC-Website-Media`**, with this tree:

```
SSC-Website-Media/
├── 01-events/
│   ├── 2025-12-20_annual-day/
│   ├── 2025-11-14_childrens-day/
│   ├── 2026-03-08_mads-dance-recital/
│   └── …one folder per event, named YYYY-MM-DD_event-name
├── 02-classrooms-and-campus/       teaching in progress, labs, library, reception, exterior
├── 03-faculty/                     one folder per teacher, folder named after them
├── 04-students-and-results/        toppers, prize-giving, certificates
├── 05-mads/
│   ├── dance/  kathak/  guitar/  keyboard/  vocal/  taekwondo/
│   ├── art-and-craft/  drawing/  painting/  zumba/
├── 06-hero-and-landing/            see §4 — different rules apply
├── 07-video/
└── 08-logos-and-brand/             SSC + MADS logo source files
```

**The folder name is the metadata.** With hundreds of files, this is the difference between
a gallery I can build in two days and one that takes two weeks of asking you "where was
this taken?". A photo in `01-events/2025-12-20_annual-day/` already tells me its event,
date and category. A photo in a flat dump tells me nothing.

Date unknown? Use `YYYY_event-name` or `undated_event-name`. Approximate is fine — blank
is not.

---

## 2. Three rules that matter more than everything else

### 2.1 Send originals. Never send photos through WhatsApp.

WhatsApp re-compresses images hard and caps them around 1600px on the long edge. A photo
that has been through WhatsApp is permanently degraded — it cannot be recovered, and it
will look soft and blocky in a full-width hero on a retina screen. The same applies to
photos pasted into a document or downloaded from Instagram/Facebook.

Upload from the **camera or phone that took them**, straight to Drive.

If you are using Google Photos to sync, check that it is set to **"Original quality"** and
not "Storage saver" — storage saver compresses too.

### 2.2 Do not resize, crop, or compress anything yourself.

Send the largest files you have. The build pipeline generates every size and format
(AVIF/WebP, multiple widths, art-directed crops) automatically from the original. Every
pixel you remove before sending is a pixel I cannot get back — and hand-cropped images
usually end up the wrong aspect ratio for the layout anyway.

Large files are not a problem. Slow uploads are a one-time cost; bad source images are permanent.

### 2.3 Consent for photographs of children.

Any recognisable student's photograph on a public website needs consent from a parent or
guardian on record. This is not optional formality — your students are minors, and India's
DPDP Act 2023 sets a higher bar for children's personal data.

Practically, this is how it will work:
- The CMS will **refuse to publish** a gallery image without a `consentOnFile` flag ticked.
  I am building that constraint in deliberately so it cannot be forgotten under deadline
  pressure.
- Use `media-consent-tracker.csv` (in this folder) to track which shoots/events have signed
  consent. One row per event is usually enough if you took blanket consent for that event.
- Where consent is missing or uncertain, photos are still useful — as **non-identifying**
  images: hands on a keyboard, a wide shot from behind, a classroom from the back, close-up
  of artwork or a certificate with the name blurred. Put these in the same folder and I will
  select for them.
- Faculty photographs need the teacher's consent too, which is usually simpler.

I am not giving you legal advice — your lawyer should approve the consent wording before
launch. But the build is structured so compliance is possible rather than a retrofit.

---

## 3. What actually gets used — curate less, not more

Of several hundred photos, roughly **60–120** will appear on the site. Volume is not the
constraint; quality is. A premium site with 40 excellent photographs beats one with 300
mediocre ones, and every extra image is weight the gallery has to carry.

**Strongly favour:**
- Candid moments over posed rows — a child mid-laugh in class beats a lineup facing camera
- Faces engaged in the activity, not looking at the lens
- Teachers teaching, students working, hands doing things
- Natural light, uncluttered backgrounds
- Genuine emotion at prize-givings and performances
- Wide establishing shots of the space, shot straight-on

**Avoid sending:**
- Blurry, dark, or heavily flash-lit shots
- Screenshots of photos
- Anything with a date-stamp burned in
- Group photos where everyone is small and unrecognisable
- Photos with other institutes' branding visible
- Near-duplicates — pick your favourite of each burst

I will do the final selection and tell you where the gaps are. If something important has
no good photograph, that is an argument for the professional shoot (§5).

---

## 4. Landing-page and hero imagery — different rules

Folder `06-hero-and-landing/`. These are the large, full-bleed images behind headlines.
They have requirements ordinary gallery photos do not:

- **Horizontal, and wide.** Minimum 3000px on the long edge; 4000px+ preferred.
- **Empty space for text.** A hero image needs a calm region — sky, wall, blurred
  background — where a headline can sit legibly. A perfectly composed photo with a face
  dead-centre is unusable as a hero.
- **Works cropped square.** It will be cropped hard on mobile portrait. Keep the subject
  away from the extreme edges.
- **Dark enough, or light enough, consistently.** Text needs contrast against it.

If you have a photo you specifically want as the homepage hero, put it in this folder and
say so — hero selection is a design decision I will want to make with you rather than for you.

---

## 5. Professional shoot — my recommendation

You will almost certainly need one. Existing photographs from events tend to be phone shots
in difficult light, which is fine for a gallery and not fine for a homepage hero that has to
carry a premium positioning in the first two seconds.

A half-day shoot covering: exterior and reception, two or three classes in session, each
MADS discipline, individual faculty portraits against a consistent background, and three or
four hero-grade wide shots would cover the entire site. Faculty portraits in particular
need to be consistent — mismatched selfies on a faculty page undermine credibility more
than no photos at all.

Worth booking during R0/R1 so the images exist before the pages that need them.

---

## 6. Video

Folder `07-video/`. Send originals, not WhatsApp forwards. Useful: performance clips,
a classroom snippet, a parent testimonial spoken to camera.

Video will be served through a streaming provider (Cloudflare Stream or Mux), never as
self-hosted MP4 — a few unoptimised videos in the gallery would breach the performance
budget on their own. Length matters: 15–45 second clips are far more usable than a
20-minute annual-day recording. If you only have the long recording, send it and note the
timestamps worth cutting.

---

## 7. What I do once files are in Drive

1. Inventory and audit everything — resolution, quality, duplicates, gaps
2. Curate a shortlist per page and per gallery category, for your approval
3. Flag anything with a consent question before it goes anywhere near the site
4. Write alt text for every selected image (required by the CMS, and an SEO asset)
5. Bulk-import into the CMS media library with category, event and date metadata attached
6. Generate the derivative sizes and formats through the image pipeline

You upload once. You do not need to name files individually, tag anything, or resize
anything — the folder structure carries the meaning.

---

## 8. Quick start

If you want to start uploading tonight, this is enough:

1. Create `SSC-Website-Media` in Drive
2. Inside it, create a folder per event with a date in the name
3. Drag the **original** photos in from the device that took them
4. Tell me it's uploading

Structure can be refined later. Getting the originals off phones and out of WhatsApp is the
part that cannot be undone later.
