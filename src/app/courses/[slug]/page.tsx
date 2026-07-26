import { notFound } from "next/navigation";
import { Container, Section, SectionHead, PageHero, Button, Card, Badge, TodoNote } from "@/components/ui";
import { academicPrograms, site, faqs } from "@/content/site";
import { heroImage, galleryItems } from "@/lib/gallery";
import { asset } from "@/lib/asset";

export function generateStaticParams() {
  return academicPrograms.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = academicPrograms.find((p) => p.slug === slug);
  return { title: course?.title ?? "Course" };
}

export default async function CoursePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = academicPrograms.find((p) => p.slug === slug);
  if (!course) notFound();

  const related = academicPrograms.filter((p) => p.slug !== slug).slice(0, 3);
  const shots = galleryItems.filter((g) => g.category === "academics").slice(0, 3);

  return (
    <>
      <PageHero eyebrow={course.stage} title={course.title} lead={course.summary} image={asset(heroImage("hero-academics"))} />

      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <SectionHead eyebrow="Subjects covered" title="What's taught" />
              <ul className="flex flex-wrap gap-2">
                {course.subjects.map((s) => (
                  <li key={s} className="rounded-full bg-blue-050 px-4 py-2 text-sm font-medium text-blue-600">{s}</li>
                ))}
              </ul>

              <h3 className="display mt-12 text-2xl text-navy-900">How the batch runs</h3>
              <ul className="mt-4 space-y-3 text-sm text-grey-600">
                <li>• Small batches, available online and offline.</li>
                <li>• Printed study material prepared in-house.</li>
                <li>• A free demo class before you enrol.</li>
                <li>• TODO — batch timings, batch size, test schedule.</li>
              </ul>

              <TodoNote>
                Curriculum breakdown, batch timings, batch size, fee (or fee-on-enquiry), assessment
                pattern, and which faculty teach this programme.
              </TodoNote>

              <h3 className="display mt-12 text-2xl text-navy-900">Common questions</h3>
              <div className="mt-4 divide-y divide-grey-200 border-y border-grey-200">
                {faqs.slice(0, 4).map((f) => (
                  <details key={f.q} className="group py-4">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-navy-900">
                      {f.q}
                      <span aria-hidden="true" className="text-blue-600 transition-transform group-open:rotate-45">+</span>
                    </summary>
                    <p className="mt-3 text-sm text-grey-600">{f.a}</p>
                  </details>
                ))}
              </div>
            </div>

            <aside className="self-start rounded-2xl border border-grey-200 bg-grey-050 p-7">
              <p className="display text-xl text-navy-900">Book a free demo</p>
              <p className="mt-2 text-sm text-grey-600">Sit in on a {course.title} class before deciding. No fee, no obligation.</p>
              <div className="mt-5 flex flex-col gap-2">
                <Button href="/admissions">Book a demo class</Button>
                <Button href={`tel:${site.primaryPhone}`} variant="secondary">Call {site.primaryPhone}</Button>
              </div>
              <p className="mt-5 border-t border-grey-200 pt-4 text-xs text-grey-500">{site.address.full}</p>
            </aside>
          </div>

          <div className="mt-16 grid grid-cols-3 gap-3">
            {shots.map((g) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={g.src} src={asset(g.src)} alt="" aria-hidden="true" loading="lazy" width={g.w} height={g.h} className="h-52 w-full rounded-xl object-cover" />
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-grey-050">
        <Container>
          <SectionHead eyebrow="Also at SSC" title="Related programmes" />
          <ul className="grid gap-5 md:grid-cols-3" data-stagger>
            {related.map((p) => (
              <Card as="li" key={p.slug}>
                <Badge tone="grey">{p.stage}</Badge>
                <h3 className="display mt-3 text-xl text-navy-900">{p.title}</h3>
                <p className="mt-2 text-sm text-grey-600">{p.summary}</p>
              </Card>
            ))}
          </ul>
        </Container>
      </Section>
    </>
  );
}
