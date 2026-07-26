import { Container, Section, SectionHead, PageHero } from "@/components/ui";
import { results } from "@/content/site";
import { heroImage, galleryItems } from "@/lib/gallery";
import { asset } from "@/lib/asset";
import { Counter } from "@/components/motion/text";

export const metadata = {
  title: "Results & Achievements",
  description:
    "Class X and Class XII board results published with the student's school named alongside, from Study Skills Center, Malviya Nagar.",
};

export default function AchievementsPage() {
  return (
    <>
      <PageHero
        eyebrow="Results"
        title="Students who did the work"
        lead="Board results published with the student's school named alongside."
        image={asset(heroImage("hero-academics"))}
      />

      {[results.class12, results.class10].map((group, gi) => (
        <Section key={group.heading} className={gi % 2 ? "bg-grey-050" : ""}>
          <Container>
            <SectionHead eyebrow={group.subject} title={group.heading} />
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" data-stagger>
              {group.students.map((s) => (
                <li key={s.name} className="rounded-2xl border border-grey-200 bg-white p-6 shadow-[var(--shadow-1)]">
                  <span className="display block text-4xl text-blue-600">
                    <Counter value={s.score} decimals={s.decimals} suffix={s.suffix} />
                  </span>
                  <span className="mt-2 block font-semibold text-navy-900">{s.name}</span>
                  <span className="block text-sm text-grey-500">{s.school}</span>
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      ))}

      <Section>
        <Container>
          <SectionHead eyebrow="Beyond the exam hall" title="Certificates, belts and stages" />
          <ul className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {galleryItems.filter((g) => ["events", "taekwondo"].includes(g.category)).slice(0, 8).map((g) => (
              <li key={g.src} className="overflow-hidden rounded-xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={asset(g.src)} alt="" aria-hidden="true" loading="lazy" width={g.w} height={g.h} className="h-44 w-full object-cover" />
              </li>
            ))}
          </ul>
          <p className="mt-8 rounded-lg border border-dashed border-gold-500 bg-gold-500/10 px-4 py-3 text-sm">
            <strong>Consent check:</strong> written consent should be on file for every named
            student and identifiable photograph before this page goes live.
          </p>
        </Container>
      </Section>
    </>
  );
}
