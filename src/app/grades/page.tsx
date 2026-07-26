import { Container, Section, SectionHead, PageHero, Card, Button, TodoNote } from "@/components/ui";
import { gradesPrograms, gradesRegistration, results, site } from "@/content/site";
import { heroImage } from "@/lib/gallery";
import { asset } from "@/lib/asset";
import { Counter } from "@/components/motion/text";

export const metadata = {
  title: "Grades Career Institute",
  description:
    "Grades Career Institute — JEE Main, JEE Advanced, NEET, Olympiads and Class VII–X foundation coaching. A unit of Study Skills Center.",
};

export default function GradesPage() {
  return (
    <>
      <PageHero
        eyebrow="A unit of Study Skills Center"
        title="Grades Career Institute"
        lead="JEE, NEET, Olympiads and foundation coaching — for students building towards engineering and medical entrance."
        image={asset(heroImage("hero-grades"))}
        logo={{ src: asset("/images/brand/grades-logo.jpg"), alt: "Grades Manager" }}
      />

      <Section>
        <Container>
          <SectionHead eyebrow="What we prepare for" title="Programmes" />
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" data-stagger>
            {gradesPrograms.map((g) => (
              <Card as="li" key={g.title}>
                <h3 className="display text-xl text-navy-900">{g.title}</h3>
                <p className="mt-2 text-sm text-grey-600">{g.detail}</p>
              </Card>
            ))}
          </ul>
          <TodoNote>Faculty for each stream, batch structure, test series details, fees and admission criteria.</TodoNote>
          <p className="mt-6 text-xs text-grey-500">
            {gradesRegistration.unitOf} · Udyam registered {gradesRegistration.udyam}
          </p>
        </Container>
      </Section>

      <Section className="bg-blue-050">
        <Container>
          <SectionHead eyebrow="Results" title={results.class12.heading} />
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3" data-stagger>
            {results.class12.students.map((s) => (
              <li key={s.name} className="rounded-xl bg-white px-5 py-4 shadow-[var(--shadow-1)]">
                <span className="display block text-3xl text-blue-600">
                  <Counter value={s.score} decimals={s.decimals} suffix={s.suffix} />
                </span>
                <span className="mt-1 block font-semibold text-navy-900">{s.name}</span>
                <span className="block text-xs text-grey-500">{s.school}</span>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section className="on-dark bg-navy-900 text-white">
        <Container className="text-center">
          <h2 className="display" style={{ fontSize: "var(--fs-h2)" }}>Talk to us about your target</h2>
          <p className="mx-auto mt-4 max-w-lg text-white/75">Tell us the exam and the year, and we will tell you honestly what preparation it takes.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href="/admissions" variant="gold">Enquire about a batch</Button>
            <Button href={`tel:${site.primaryPhone}`} variant="ghost">Call {site.primaryPhone}</Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
