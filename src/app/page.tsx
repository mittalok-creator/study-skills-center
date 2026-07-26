import Link from "next/link";
import {
  Container,
  Section,
  SectionHead,
  Button,
  Card,
  Badge,
  Eyebrow,
} from "@/components/ui";
import {
  site,
  divisions,
  academicPrograms,
  madsPrograms,
  stats,
  whySSC,
  results,
  faqs,
  events,
} from "@/content/site";
import { heroImage, galleryItems } from "@/lib/gallery";
import { asset } from "@/lib/asset";

export default function HomePage() {
  const featuredGallery = galleryItems.filter((_, i) => i % 7 === 0).slice(0, 8);

  return (
    <>
      {/* ---------------- HERO ---------------- */}
      <section className="on-dark relative isolate flex min-h-[88vh] items-center overflow-hidden bg-navy-900 text-white grain">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={asset(heroImage("hero-home"))}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 -z-10 h-full w-full object-cover opacity-40"
        />
        <div
          className="absolute inset-0 -z-10"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(120% 90% at 15% 20%, rgba(29,78,216,.45) 0%, transparent 55%), linear-gradient(115deg,#0a1633 30%, rgba(10,22,51,.75) 100%)",
          }}
        />
        <div
          className="float-slow absolute -right-24 top-24 -z-10 h-80 w-80 rounded-full blur-3xl"
          aria-hidden="true"
          style={{ background: "radial-gradient(circle, rgba(201,162,39,.35), transparent 70%)" }}
        />

        <Container className="relative py-24">
          <Eyebrow tone="gold">Malviya Nagar, New Delhi</Eyebrow>
          <h1 className="display max-w-5xl" style={{ fontSize: "var(--fs-display)" }}>
            Learning through
            <br />
            <span className="text-gold-300">experience</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-white/75">
            School tuition, competitive-exam coaching, and a studio for music, dance and art —
            all under one roof, in small batches, taught by people who notice your child.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <Button href="/admissions" variant="gold">
              Book a free demo class
            </Button>
            <Button href="/courses" variant="ghost">
              Explore programmes
            </Button>
          </div>

          <dl className="mt-14 grid max-w-3xl grid-cols-2 gap-x-6 gap-y-6 border-t border-white/15 pt-8 sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label}>
                <dt className="sr-only">{s.label}</dt>
                <dd>
                  <span className="display block text-3xl text-gold-300 sm:text-4xl">{s.value}</span>
                  <span className="mt-1 block text-xs uppercase tracking-wider text-white/60">
                    {s.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* ---------------- THREE DIVISIONS ---------------- */}
      <Section>
        <Container>
          <SectionHead
            eyebrow="One centre, three schools"
            title="Everything a student needs, in one place"
            lead="Most families come for one thing and stay for another. That is the point of keeping academics, competitive exams and the arts under a single roof."
          />
          <ul className="grid gap-6 md:grid-cols-3">
            {divisions.map((d) => (
              <Card as="li" key={d.slug} className="reveal flex flex-col">
                <Badge tone={d.accent === "gold" ? "gold" : "blue"}>{d.label}</Badge>
                <h3 className="display mt-4 text-2xl text-navy-900">{d.name}</h3>
                <p className="mt-3 flex-1 text-sm text-grey-600">{d.blurb}</p>
                <Link
                  href={d.href}
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:gap-2.5 transition-all"
                >
                  Explore <span aria-hidden="true">→</span>
                </Link>
              </Card>
            ))}
          </ul>
        </Container>
      </Section>

      {/* ---------------- ACADEMIC PROGRAMMES ---------------- */}
      <Section className="bg-grey-050">
        <Container>
          <SectionHead
            eyebrow="Tuition Centre"
            title="Academic programmes"
            lead="Classes I to XII, online and offline, in small batches — with printed study material and a free demo before you decide."
          />
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {academicPrograms.slice(0, 4).map((p) => (
              <Card as="li" key={p.slug} className="reveal">
                <Badge tone="grey">{p.stage}</Badge>
                <h3 className="display mt-3 text-xl text-navy-900">{p.title}</h3>
                <p className="mt-2 text-sm text-grey-600">{p.summary}</p>
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {p.subjects.map((s) => (
                    <li key={s} className="rounded bg-grey-050 px-2 py-1 text-[11px] text-grey-600">
                      {s}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button href="/courses" variant="secondary">
              All academic programmes
            </Button>
            <p className="text-sm text-grey-500">
              Also: English speaking, languages, mental maths and handwriting.
            </p>
          </div>
        </Container>
      </Section>

      {/* ---------------- MADS ---------------- */}
      <Section className="on-dark relative overflow-hidden bg-navy-900 text-white">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={asset(heroImage("hero-mads"))}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover opacity-20"
        />
        <div className="absolute inset-0" aria-hidden="true" style={{ background: "linear-gradient(100deg,#0a1633 35%,rgba(10,22,51,.7))" }} />
        <Container className="relative">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <Eyebrow tone="gold">MADS — Music & Dance Studio</Eyebrow>
              <h2 className="display" style={{ fontSize: "var(--fs-h2)" }}>
                The creative half of the centre
              </h2>
              <p className="mt-4 text-white/75">
                Dance, music, martial arts and fine art — taught in two separate batches, ages
                6–14 and 15-and-above including adults, so the pace fits the room.
              </p>
              <ul className="mt-7 flex flex-wrap gap-2">
                {madsPrograms.map((m) => (
                  <li
                    key={m.slug}
                    className="rounded-full border border-white/20 px-3.5 py-1.5 text-sm text-white/85"
                  >
                    {m.title}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href="/mads" variant="gold">
                  Visit MADS
                </Button>
                <Button href="/gallery" variant="ghost">
                  See the studio
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {["dance", "music", "taekwondo", "art"]
                .map((cat) => galleryItems.find((g) => g.category === cat))
                .filter((g): g is NonNullable<typeof g> => Boolean(g))
                .map((g, i) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={g.src}
                    src={asset(g.src)}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    width={g.w}
                    height={g.h}
                    className={`h-48 w-full rounded-xl object-cover md:h-56 ${
                      i % 3 === 0 ? "translate-y-4" : ""
                    }`}
                  />
                ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* ---------------- WHY SSC ---------------- */}
      <Section>
        <Container>
          <SectionHead
            eyebrow="Why families choose SSC"
            title="What actually makes the difference"
            lead="Not slogans — the specific things parents tell us mattered when they decided."
          />
          <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {whySSC.map((w, i) => (
              <li key={w.title} className="reveal border-t-2 border-blue-600 pt-5">
                <span className="display text-3xl text-grey-200">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-1 font-semibold text-navy-900">{w.title}</h3>
                <p className="mt-2 text-sm text-grey-600">{w.body}</p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* ---------------- RESULTS ---------------- */}
      <Section className="bg-blue-050">
        <Container>
          <SectionHead
            eyebrow="Results"
            title="Students who did the work"
            lead="Board results published with the student's school named alongside — because unattributed numbers mean nothing."
          />
          <div className="grid gap-8 lg:grid-cols-2">
            {[results.class12, results.class10].map((group) => (
              <div key={group.heading}>
                <h3 className="display text-xl text-navy-900">{group.heading}</h3>
                <p className="mt-1 text-sm text-grey-500">{group.subject}</p>
                <ul className="mt-5 space-y-2">
                  {group.students.map((s) => (
                    <li
                      key={s.name}
                      className="flex items-center justify-between gap-4 rounded-xl bg-white px-5 py-3.5 shadow-[var(--shadow-1)]"
                    >
                      <span>
                        <span className="block font-semibold text-navy-900">{s.name}</span>
                        <span className="block text-xs text-grey-500">{s.school}</span>
                      </span>
                      <span className="display shrink-0 text-2xl text-blue-600">{s.score}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="mt-8 rounded-lg border border-dashed border-gold-500 bg-gold-500/10 px-4 py-3 text-sm">
            <strong>Consent check before launch:</strong> these names and scores are transcribed
            from SSC&apos;s own published result posters. Written consent from each student or
            parent should be on file before they appear on the live site.
          </p>
        </Container>
      </Section>

      {/* ---------------- GALLERY TEASER ---------------- */}
      <Section>
        <Container>
          <SectionHead
            eyebrow="Life at the centre"
            title="A look inside"
            lead="Classrooms, the dance floor, chess boards, taekwondo belts and a great deal of paint."
          />
          <ul className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {featuredGallery.map((g) => (
              <li key={g.src} className="reveal overflow-hidden rounded-xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={asset(g.src)}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  width={g.w}
                  height={g.h}
                  className="h-44 w-full object-cover transition-transform duration-500 hover:scale-105 md:h-56"
                />
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <Button href="/gallery" variant="secondary">
              Open the full gallery
            </Button>
          </div>
        </Container>
      </Section>

      {/* ---------------- EVENTS ---------------- */}
      <Section className="bg-grey-050">
        <Container>
          <SectionHead eyebrow="What's on" title="Events & showcases" />
          <ul className="grid gap-6 md:grid-cols-3">
            {events.map((e) => (
              <Card as="li" key={e.slug} className="reveal">
                <Badge tone="gold">{e.strap}</Badge>
                <h3 className="display mt-3 text-xl text-navy-900">{e.title}</h3>
                <p className="mt-2 text-sm font-medium text-blue-600">{e.date}</p>
                <p className="mt-2 text-sm text-grey-600">{e.description}</p>
              </Card>
            ))}
          </ul>
        </Container>
      </Section>

      {/* ---------------- FAQ ---------------- */}
      <Section>
        <Container className="max-w-3xl">
          <SectionHead eyebrow="Questions" title="Before you call" align="center" />
          <div className="divide-y divide-grey-200 border-y border-grey-200">
            {faqs.slice(0, 6).map((f) => (
              <details key={f.q} className="group py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-navy-900">
                  {f.q}
                  <span
                    aria-hidden="true"
                    className="shrink-0 text-blue-600 transition-transform group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm text-grey-600">{f.a}</p>
              </details>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Button href="/faq" variant="secondary">
              All questions
            </Button>
          </div>
        </Container>
      </Section>

      {/* ---------------- CTA ---------------- */}
      <Section className="on-dark bg-navy-900 text-white">
        <Container className="text-center">
          <h2 className="display mx-auto max-w-3xl" style={{ fontSize: "var(--fs-h2)" }}>
            Sit in on a class before you decide
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-white/75">
            The demo class is free and there is no obligation. Call, message on WhatsApp, or send
            an enquiry and we will find a batch that fits.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href="/admissions" variant="gold">
              Book a free demo
            </Button>
            <Button href={`tel:${site.primaryPhone}`} variant="ghost">
              Call {site.primaryPhone}
            </Button>
          </div>
          <p className="mt-8 text-sm text-white/60">{site.address.full}</p>
        </Container>
      </Section>
    </>
  );
}
