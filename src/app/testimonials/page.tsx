import { Container, Section, PageHero, Card, TodoNote } from "@/components/ui";
import { testimonials } from "@/content/site";
import { heroImage } from "@/lib/gallery";
import { asset } from "@/lib/asset";

export const metadata = { title: "Testimonials" };

export default function TestimonialsPage() {
  return (
    <>
      <PageHero eyebrow="In their words" title="Testimonials" lead="What parents and students say about the centre." image={asset(heroImage("hero-about"))} />
      <Section>
        <Container>
          <ul className="grid gap-6 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <Card as="li" key={i}>
                <span className="display text-5xl leading-none text-grey-200" aria-hidden="true">&ldquo;</span>
                <p className="mt-2 text-grey-600">{t.quote}</p>
                <p className="mt-5 font-semibold text-navy-900">{t.author}</p>
                <p className="text-sm text-grey-500">{t.relation}</p>
              </Card>
            ))}
          </ul>
          <TodoNote>
            Real testimonials with the parent or student&apos;s permission to publish their name.
            Three to six strong, specific quotes beat twenty generic ones — ask what they were
            worried about before joining and what changed.
          </TodoNote>
        </Container>
      </Section>
    </>
  );
}
