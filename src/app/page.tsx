import Link from "next/link";
import { Container, Section, SectionHead, Button, Card, Badge, Eyebrow } from "@/components/ui";
import { HeroCollage } from "@/components/hero-collage";
import { MagneticButton, ScrollIndicator } from "@/components/motion/pieces";
import { CharHeading, Counter } from "@/components/motion/text";
import {
  site,
  divisions,
  academicPrograms,
  madsPrograms,
  whySSC,
  results,
  faqs,
  events,
  journey,
  countStats,
} from "@/content/site";
import { heroImage, galleryItems } from "@/lib/gallery";
import { asset } from "@/lib/asset";

export default function HomePage() {
  const featuredGallery = galleryItems.filter((_, i) => i % 7 === 0).slice(0, 8);

  return (
    <>
      {/* ============================= HERO ============================= */}
      <section
        id="hero"
        data-hero
        className="on-dark relative isolate flex min-h-[100svh] items-center overflow-hidden bg-navy-900 text-white"
      >
        {/* Animated background: drifting gradient + aurora blooms */}
        <div
          className="gradient-drift absolute inset-0 -z-20"
          aria-hidden="true"
          style={{ background: "linear-gradient(115deg,#0a1633 0%,#122552 40%,#0a1633 100%)" }}
        />
        <div
          className="aurora absolute -left-40 top-0 -z-10 h-[38rem] w-[38rem] rounded-full blur-[110px]"
          aria-hidden="true"
          style={{ background: "radial-gradient(circle,rgba(29,78,216,.55),transparent 68%)" }}
        />
        <div
          className="aurora absolute -right-32 bottom-0 -z-10 h-[32rem] w-[32rem] rounded-full blur-[120px]"
          aria-hidden="true"
          style={{ background: "radial-gradient(circle,rgba(201,162,39,.4),transparent 70%)", animationDelay: "-8s" }}
        />
        <div className="grain absolute inset-0 -z-10" aria-hidden="true" />

        {/* Floating photographs of the centre */}
        <HeroCollage />

        {/* Readability scrim. Vertical on mobile (text over cards), diagonal on
            desktop (text left, cards right). */}
        <div
          className="absolute inset-0 z-[2] lg:hidden"
          aria-hidden="true"
          style={{ background: "linear-gradient(185deg,rgba(10,22,51,.72) 0%,rgba(10,22,51,.86) 30%,rgba(10,22,51,.7) 66%,rgba(10,22,51,.9) 100%)" }}
        />
        <div
          className="absolute inset-0 z-[2] hidden lg:block"
          aria-hidden="true"
          style={{ background: "linear-gradient(100deg,rgba(10,22,51,.96) 0%,rgba(10,22,51,.88) 32%,rgba(10,22,51,.3) 58%,transparent 78%)" }}
        />

        <Container className="relative z-10 py-16">
          <div className="max-w-2xl">
            <Eyebrow tone="gold">Malviya Nagar, New Delhi</Eyebrow>

            <CharHeading
              className="display"
              style={{ fontSize: "var(--fs-display)" }}
              text={["Learning", "through", "experience"]}
              accentFrom={2}
              delay={0.25}
            />

            <p className="mt-5 max-w-xl text-lg text-white/80" data-hero-item>
              School tuition, competitive-exam coaching, and a studio for music, dance and art —
              all under one roof, in small batches, taught by people who notice your child.
            </p>

            <div className="mt-8 flex flex-wrap gap-3" data-hero-item>
              <MagneticButton href="/admissions" variant="gold">
                Book a free demo class
              </MagneticButton>
              <MagneticButton href="/courses" variant="ghost">
                Explore programmes
              </MagneticButton>
            </div>

            {/* Trust indicators */}
            <ul className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-white/60" data-hero-item>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-gold-300" aria-hidden="true" />
                Free demo class
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-gold-300" aria-hidden="true" />
                Online &amp; offline batches
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-gold-300" aria-hidden="true" />
                Printed study material
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-gold-300" aria-hidden="true" />
                6th Annual Day held
              </li>
            </ul>
          </div>
        </Container>

        <ScrollIndicator target="#statistics" />
      </section>

      {/* ========================== STATISTICS ========================== */}
      <Section id="statistics" className="border-b border-grey-200 !py-14">
        <Container>
          <dl className="grid grid-cols-2 gap-8 lg:grid-cols-4" data-stagger>
            {countStats.map((s) => (
              <div key={s.label}>
                <dt className="sr-only">{s.label}</dt>
                <dd>
                  <span className="display block text-5xl text-blue-600 sm:text-6xl">
                    <Counter value={s.value} decimals={s.decimals} suffix={s.suffix} />
                  </span>
                  <span className="mt-2 block text-xs uppercase tracking-[0.14em] text-grey-500">
                    {s.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </Section>

      {/* ========================== DIVISIONS =========================== */}
      <Section id="divisions">
        <Container>
          <SectionHead
            eyebrow="One centre, three schools"
            title="Everything a student needs, in one place"
            lead="Most families come for one thing and stay for another. That is the point of keeping academics, competitive exams and the arts under a single roof."
          />
          <ul className="grid gap-6 md:grid-cols-3" data-stagger>
            {divisions.map((d) => (
              <Card as="li" key={d.slug} className="lift flex flex-col">
                <Badge tone={d.accent === "gold" ? "gold" : "blue"}>{d.label}</Badge>
                <h3 className="display mt-4 text-2xl text-navy-900">{d.name}</h3>
                <p className="mt-3 flex-1 text-sm text-grey-600">{d.blurb}</p>
                <Link
                  href={d.href}
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 transition-all hover:gap-2.5"
                >
                  Explore <span aria-hidden="true">→</span>
                </Link>
              </Card>
            ))}
          </ul>
        </Container>
      </Section>

      {/* ====================== ACADEMIC PROGRAMMES ====================== */}
      <Section className="bg-grey-050">
        <Container>
          <SectionHead
            eyebrow="Tuition Centre"
            title="Academic programmes"
            lead="Classes I to XII, online and offline, in small batches — with printed study material and a free demo before you decide."
          />
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4" data-stagger>
            {academicPrograms.slice(0, 4).map((p) => (
              <Card as="li" key={p.slug} className="lift">
                <Badge tone="grey">{p.stage}</Badge>
                <h3 className="display mt-3 text-xl text-navy-900">{p.title}</h3>
                <p className="mt-2 text-sm text-grey-600">{p.summary}</p>
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {p.subjects.map((s) => (
                    <li key={s} className="rounded bg-white px-2 py-1 text-[11px] text-grey-600">
                      {s}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap items-center gap-3" data-reveal>
            <Button href="/courses" variant="secondary">
              All academic programmes
            </Button>
            <p className="text-sm text-grey-500">
              Also: English speaking, languages, mental maths and handwriting.
            </p>
          </div>
        </Container>
      </Section>

      {/* ====================== CREATIVE PROGRAMMES ====================== */}
      <Section className="on-dark relative overflow-hidden bg-navy-900 text-white">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={asset(heroImage("hero-mads"))}
          alt=""
          aria-hidden="true"
          loading="lazy"
          data-parallax="70"
          className="absolute inset-0 h-[118%] w-full object-cover opacity-20"
        />
        <div
          className="absolute inset-0"
          aria-hidden="true"
          style={{ background: "linear-gradient(100deg,#0a1633 34%,rgba(10,22,51,.68))" }}
        />
        <Container className="relative">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <Eyebrow tone="gold">MADS — Music &amp; Dance Studio</Eyebrow>
              <CharHeading
                as="h2"
                className="display"
                style={{ fontSize: "var(--fs-h2)" }}
                text={["The creative half", "of the centre"]}
              />
              <p className="mt-4 text-white/75" data-reveal>
                Dance, music, martial arts and fine art — taught in two separate batches, ages
                6–14 and 15-and-above including adults, so the pace fits the room.
              </p>
              <ul className="mt-7 flex flex-wrap gap-2" data-stagger>
                {madsPrograms.map((m) => (
                  <li key={m.slug} className="glass rounded-full px-3.5 py-1.5 text-sm text-white/90">
                    {m.title}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-3" data-hero-item>
                <MagneticButton href="/mads" variant="gold">
                  Visit MADS
                </MagneticButton>
                <MagneticButton href="/gallery" variant="ghost">
                  See the studio
                </MagneticButton>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3" data-stagger>
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
                    className={`h-48 w-full rounded-xl object-cover md:h-56 ${i % 3 === 0 ? "translate-y-4" : ""}`}
                  />
                ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* ============================ WHY SSC ============================ */}
      <Section>
        <Container>
          <SectionHead
            eyebrow="Why families choose SSC"
            title="What actually makes the difference"
            lead="Not slogans — the specific things parents tell us mattered when they decided."
          />
          <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3" data-stagger>
            {whySSC.map((w, i) => (
              <li key={w.title} className="border-t-2 border-blue-600 pt-5">
                <span className="display text-3xl text-grey-200">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-1 font-semibold text-navy-900">{w.title}</h3>
                <p className="mt-2 text-sm text-grey-600">{w.body}</p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* ========================= ACHIEVEMENTS ========================= */}
      <Section className="bg-blue-050">
        <Container>
          <SectionHead
            eyebrow="Achievements"
            title="Students who did the work"
            lead="Board results published with the student's school named alongside — because unattributed numbers mean nothing."
          />
          <div className="grid gap-8 lg:grid-cols-2">
            {[results.class12, results.class10].map((group) => (
              <div key={group.heading}>
                <h3 className="display text-xl text-navy-900">{group.heading}</h3>
                <p className="mt-1 text-sm text-grey-500">{group.subject}</p>
                <ul className="mt-5 space-y-2" data-stagger>
                  {group.students.map((s) => (
                    <li
                      key={s.name}
                      className="lift flex items-center justify-between gap-4 rounded-xl bg-white px-5 py-3.5 shadow-[var(--shadow-1)]"
                    >
                      <span>
                        <span className="block font-semibold text-navy-900">{s.name}</span>
                        <span className="block text-xs text-grey-500">{s.school}</span>
                      </span>
                      <span className="display shrink-0 text-2xl text-blue-600">
                        <Counter value={s.score} decimals={s.decimals} suffix={s.suffix} />
                      </span>
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

      {/* ======================= STUDENT JOURNEY ======================== */}
      <section className="relative overflow-hidden bg-navy-900 text-white on-dark">
        <div className="flex min-h-[100svh] flex-col justify-center py-20">
          <Container>
            <Eyebrow tone="gold">The student journey</Eyebrow>
            <CharHeading
              as="h2"
              className="display max-w-3xl"
              style={{ fontSize: "var(--fs-h2)" }}
              text={["From a first phone call", "to a result worth framing"]}
            />
          </Container>

          {/* Scrubbed horizontally on desktop; a normal scroller on smaller screens. */}
          <div
            data-hscroll
            className="mt-14 flex gap-6 overflow-x-auto px-[var(--gutter)] pb-4 lg:overflow-visible lg:pb-0"
          >
            {journey.map((step, i) => (
              <article
                key={step.title}
                className="glass w-[80vw] shrink-0 rounded-2xl p-8 sm:w-[26rem]"
              >
                <span className="display text-5xl text-gold-300">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="display mt-3 text-2xl">{step.title}</h3>
                <p className="mt-3 text-sm text-white/75">{step.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ============================ FACULTY =========================== */}
      <Section>
        <Container>
          <SectionHead
            eyebrow="The people"
            title="Taught by specialists"
            lead="Subject specialists for the senior classes, trained instructors for every creative discipline."
          />
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.1fr]">
            <div data-reveal>
              <ul className="space-y-4">
                {[
                  "Subject-specific teachers from Class VI upwards",
                  "Trained instructors for dance, music, art and Taekwon-Do",
                  "Taekwon-Do run with School of Self Defence, Federation-registered",
                  "Bharatnatyam certificate course with Saraswathy Natyalaya",
                ].map((t) => (
                  <li key={t} className="flex gap-3 text-sm text-grey-600">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-500" aria-hidden="true" />
                    {t}
                  </li>
                ))}
              </ul>
              <div className="mt-7">
                <Button href="/faculty" variant="secondary">
                  Meet the faculty
                </Button>
              </div>
              <p className="mt-5 rounded-lg border border-dashed border-gold-500 bg-gold-500/10 px-4 py-3 text-sm">
                <strong>Needs input from SSC:</strong> names, qualifications and consistent
                portraits for every teacher.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-3" data-stagger>
              {galleryItems
                .filter((g) => g.category === "events")
                .slice(0, 6)
                .map((g) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={g.src}
                    src={asset(g.src)}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    width={g.w}
                    height={g.h}
                    className="h-36 w-full rounded-xl object-cover md:h-40"
                  />
                ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* ============================ GALLERY =========================== */}
      <Section className="bg-grey-050">
        <Container>
          <SectionHead
            eyebrow="Life at the centre"
            title="A look inside"
            lead="Classrooms, the dance floor, chess boards, taekwondo belts and a great deal of paint."
          />
          <ul className="grid grid-cols-2 gap-3 md:grid-cols-4" data-stagger>
            {featuredGallery.map((g) => (
              <li key={g.src} className="overflow-hidden rounded-xl">
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
          <div className="mt-8" data-reveal>
            <Button href="/gallery" variant="secondary">
              Open the full gallery
            </Button>
          </div>
        </Container>
      </Section>

      {/* ========================= TESTIMONIALS ========================= */}
      <Section>
        <Container>
          <SectionHead eyebrow="In their words" title="What parents say" />
          <ul className="grid gap-6 md:grid-cols-3" data-stagger>
            {[0, 1, 2].map((i) => (
              <Card as="li" key={i} className="lift">
                <span className="display text-5xl leading-none text-grey-200" aria-hidden="true">
                  &ldquo;
                </span>
                <p className="mt-2 text-grey-600">
                  TODO — a real parent or student testimonial, with permission to publish their name.
                </p>
                <p className="mt-5 font-semibold text-navy-900">Name</p>
                <p className="text-sm text-grey-500">Relationship to the centre</p>
              </Card>
            ))}
          </ul>
        </Container>
      </Section>

      {/* ============================ EVENTS ============================ */}
      <Section className="bg-grey-050">
        <Container>
          <SectionHead eyebrow="What's on" title="Events & showcases" />
          <ul className="grid gap-6 md:grid-cols-3" data-stagger>
            {events.map((e) => (
              <Card as="li" key={e.slug} className="lift">
                <Badge tone="gold">{e.strap}</Badge>
                <h3 className="display mt-3 text-xl text-navy-900">{e.title}</h3>
                <p className="mt-2 text-sm font-medium text-blue-600">{e.date}</p>
                <p className="mt-2 text-sm text-grey-600">{e.description}</p>
              </Card>
            ))}
          </ul>
        </Container>
      </Section>

      {/* ============================== FAQ ============================= */}
      <Section>
        <Container className="max-w-3xl">
          <SectionHead eyebrow="Questions" title="Before you call" align="center" />
          <div className="divide-y divide-grey-200 border-y border-grey-200" data-reveal>
            {faqs.slice(0, 6).map((f) => (
              <details key={f.q} className="group py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-navy-900">
                  {f.q}
                  <span
                    aria-hidden="true"
                    className="shrink-0 text-blue-600 transition-transform duration-300 group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm text-grey-600">{f.a}</p>
              </details>
            ))}
          </div>
          <div className="mt-8 text-center" data-reveal>
            <Button href="/faq" variant="secondary">
              All questions
            </Button>
          </div>
        </Container>
      </Section>

      {/* ======================== ADMISSION CTA ========================= */}
      <Section className="on-dark relative overflow-hidden bg-navy-900 text-white">
        <div
          className="gradient-drift absolute inset-0"
          aria-hidden="true"
          style={{ background: "linear-gradient(115deg,#0a1633,#16255c,#0a1633)" }}
        />
        <div
          className="aurora absolute left-1/2 top-1/2 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[110px]"
          aria-hidden="true"
          style={{ background: "radial-gradient(circle,rgba(201,162,39,.32),transparent 70%)" }}
        />
        <Container className="relative text-center">
          <CharHeading
            as="h2"
            className="display mx-auto max-w-3xl"
            style={{ fontSize: "var(--fs-h2)" }}
            text={["Sit in on a class", "before you decide"]}
          />
          <p className="mx-auto mt-4 max-w-xl text-white/75" data-reveal>
            The demo class is free and there is no obligation. Call, message on WhatsApp, or send
            an enquiry and we will find a batch that fits.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3" data-reveal>
            <MagneticButton href="/admissions" variant="gold">
              Book a free demo
            </MagneticButton>
            <MagneticButton href={`tel:${site.primaryPhone}`} variant="ghost">
              Call {site.primaryPhone}
            </MagneticButton>
          </div>
        </Container>
      </Section>

      {/* ============================ CONTACT =========================== */}
      <Section>
        <Container>
          <SectionHead eyebrow="Find us" title="Come and see the centre" />
          <div className="grid gap-6 md:grid-cols-3" data-stagger>
            <Card className="lift">
              <h3 className="display text-xl text-navy-900">Call</h3>
              <ul className="mt-4 space-y-1.5">
                {site.phones.map((p) => (
                  <li key={p}>
                    <a href={`tel:${p}`} className="font-semibold text-blue-600">
                      {p}
                    </a>
                  </li>
                ))}
              </ul>
            </Card>
            <Card className="lift">
              <h3 className="display text-xl text-navy-900">Message</h3>
              <p className="mt-4">
                <a href={`mailto:${site.email}`} className="break-all font-semibold text-blue-600">
                  {site.email}
                </a>
              </p>
              <p className="mt-3">
                <a href={`https://wa.me/${site.whatsapp}`} className="font-semibold text-blue-600" rel="noopener noreferrer">
                  WhatsApp us →
                </a>
              </p>
            </Card>
            <Card className="lift">
              <h3 className="display text-xl text-navy-900">Visit</h3>
              <address className="mt-4 not-italic text-sm text-grey-600">
                {site.address.line1}
                <br />
                {site.address.line2}
                <br />
                {site.address.city} – {site.address.pin}
              </address>
            </Card>
          </div>
        </Container>
      </Section>
    </>
  );
}
