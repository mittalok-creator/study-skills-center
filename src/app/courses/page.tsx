import Link from "next/link";
import { Container, Section, SectionHead, PageHero, Card, Badge, Button } from "@/components/ui";
import { academicPrograms, gradesPrograms, madsPrograms } from "@/content/site";
import { heroImage } from "@/lib/gallery";
import { asset } from "@/lib/asset";

export const metadata = { title: "Courses" };

export default function CoursesPage() {
  return (
    <>
      <PageHero
        eyebrow="Programmes"
        title="Everything taught at the centre"
        lead="School tuition for Classes I–XII, competitive-exam coaching, and eleven creative disciplines — with a free demo class across all of them."
        image={asset(heroImage("hero-academics"))}
      />

      <Section>
        <Container>
          <SectionHead eyebrow="Tuition Centre" title="Academic programmes" lead="Small batches, online and offline, with printed study material." />
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {academicPrograms.map((p) => (
              <Card as="li" key={p.slug} className="flex flex-col">
                <Badge tone="grey">{p.stage}</Badge>
                <h3 className="display mt-3 text-xl text-navy-900">{p.title}</h3>
                <p className="mt-2 flex-1 text-sm text-grey-600">{p.summary}</p>
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {p.subjects.map((s) => (
                    <li key={s} className="rounded bg-grey-050 px-2 py-1 text-[11px] text-grey-600">{s}</li>
                  ))}
                </ul>
                <Link href={`/courses/${p.slug}`} className="mt-5 text-sm font-semibold text-blue-600">
                  Details →
                </Link>
              </Card>
            ))}
          </ul>
        </Container>
      </Section>

      <Section className="bg-grey-050">
        <Container>
          <SectionHead eyebrow="Grades Career Institute" title="Competitive exams" lead="For students building towards engineering, medical and olympiad entrance." />
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {gradesPrograms.map((g) => (
              <Card as="li" key={g.title}>
                <h3 className="font-semibold text-navy-900">{g.title}</h3>
                <p className="mt-1 text-sm text-grey-600">{g.detail}</p>
              </Card>
            ))}
          </ul>
          <div className="mt-8"><Button href="/grades" variant="secondary">About Grades Career Institute</Button></div>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHead eyebrow="MADS" title="Creative programmes" lead="Ages 6–14 and 15-and-above, in separate batches." />
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {madsPrograms.map((m) => (
              <Card as="li" key={m.slug}>
                <Badge tone="gold">{m.group}</Badge>
                <h3 className="display mt-3 text-xl text-navy-900">{m.title}</h3>
                {"note" in m && m.note ? <p className="mt-2 text-sm text-grey-600">{m.note}</p> : null}
              </Card>
            ))}
          </ul>
          <div className="mt-8"><Button href="/mads" variant="secondary">Visit MADS</Button></div>
        </Container>
      </Section>
    </>
  );
}
