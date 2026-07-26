import { Container, Section, SectionHead, PageHero, Card, TodoNote } from "@/components/ui";
import { galleryItems, heroImage } from "@/lib/gallery";
import { asset } from "@/lib/asset";

export const metadata = { title: "Faculty" };

const placeholders = [
  { role: "Academics — Senior Secondary", subject: "Physics, Chemistry, Maths" },
  { role: "Academics — Middle School", subject: "Science, Maths, SST" },
  { role: "Academics — Primary", subject: "All subjects" },
  { role: "MADS — Dance", subject: "Kathak, Western, Bollywood" },
  { role: "MADS — Music", subject: "Guitar, Keyboard, Vocal" },
  { role: "MADS — Taekwon-Do", subject: "Belt & competition training" },
  { role: "MADS — Art", subject: "Drawing, Painting, Craft" },
  { role: "Grades Career Institute", subject: "JEE / NEET" },
];

export default function FacultyPage() {
  const shots = galleryItems.filter((g) => g.category === "events");
  return (
    <>
      <PageHero eyebrow="The people" title="Faculty" lead="Subject specialists for the senior classes, trained instructors for every creative discipline." image={asset(heroImage("hero-about"))} />
      <Section>
        <Container>
          <SectionHead eyebrow="Draft structure" title="How this page will work" lead="Each teacher gets a portrait, qualifications, years of experience, the subjects they teach, and their own page for search." />
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {placeholders.map((p, i) => {
              const shot = shots[i % shots.length];
              return (
                <Card as="li" key={p.role} className="overflow-hidden p-0">
                  <div className="relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={asset(shot.src)} alt="" aria-hidden="true" loading="lazy" className="h-56 w-full object-cover grayscale" />
                    <span className="absolute inset-0 flex items-center justify-center bg-navy-900/55 text-xs font-semibold uppercase tracking-wider text-white">
                      Photo needed
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="font-semibold text-navy-900">Teacher name</h3>
                    <p className="text-xs uppercase tracking-wider text-blue-600">{p.role}</p>
                    <p className="mt-2 text-sm text-grey-600">{p.subject}</p>
                  </div>
                </Card>
              );
            })}
          </ul>
          <TodoNote>
            Names, qualifications, years of experience, subjects and a consistent portrait for every
            teacher. Mismatched selfies hurt credibility more than no photos — this is the strongest
            argument for a short professional shoot.
          </TodoNote>
        </Container>
      </Section>
    </>
  );
}
