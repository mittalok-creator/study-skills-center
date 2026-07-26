import { Container, Section, SectionHead, PageHero, Card, Button, TodoNote } from "@/components/ui";
import { site, divisions, whySSC, stats } from "@/content/site";
import { heroImage, galleryItems } from "@/lib/gallery";
import { asset } from "@/lib/asset";

export const metadata = { title: "About" };

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="A neighbourhood centre that grew three schools"
        lead="Study Skills Center began as a tuition centre in Malviya Nagar. Today it also runs a creative studio and a competitive-exam institute from the same address."
        image={asset(heroImage("hero-about"))}
      />

      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr]">
            <div>
              <SectionHead eyebrow="Our story" title="Learning through experience" />
              <div className="space-y-4 text-grey-600">
                <p>
                  TODO — SSC to supply the founding story: the year the centre opened, who started
                  it, and what it set out to do differently. This is the single most-read paragraph
                  on any institute website and it should be in your own words, not ours.
                </p>
                <p>
                  What we can say from the record: the centre operates from {site.address.full},
                  teaches Classes I to XII in small online and offline batches, and has held its
                  sixth Annual Day.
                </p>
              </div>
              <TodoNote>
                Founding year, founder name and background, teaching philosophy in your words, and
                the story behind the &ldquo;Learning Through Experience&rdquo; line.
              </TodoNote>
            </div>

            <dl className="grid grid-cols-2 gap-6 self-start rounded-2xl bg-grey-050 p-8">
              {stats.map((s) => (
                <div key={s.label}>
                  <dt className="sr-only">{s.label}</dt>
                  <dd>
                    <span className="display block text-3xl text-blue-600">{s.value}</span>
                    <span className="mt-1 block text-xs uppercase tracking-wider text-grey-500">{s.label}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </Container>
      </Section>

      <Section className="bg-grey-050">
        <Container>
          <SectionHead eyebrow="Structure" title="Three divisions, one address" />
          <ul className="grid gap-6 md:grid-cols-3" data-stagger>
            {divisions.map((d) => (
              <Card as="li" key={d.slug}>
                <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">{d.label}</p>
                <h3 className="display mt-2 text-2xl text-navy-900">{d.name}</h3>
                <p className="mt-3 text-sm text-grey-600">{d.blurb}</p>
              </Card>
            ))}
          </ul>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHead eyebrow="How we work" title="What we hold ourselves to" />
          <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3" data-stagger>
            {whySSC.map((w) => (
              <li key={w.title} className="border-t-2 border-blue-600 pt-5">
                <h3 className="font-semibold text-navy-900">{w.title}</h3>
                <p className="mt-2 text-sm text-grey-600">{w.body}</p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section className="bg-navy-900 on-dark text-white">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <SectionHead eyebrow="Visit us" title="Come and see the place" lead="The centre is a short walk from Malviya Nagar post office. Drop in, or book a demo class and sit at the back." tone="gold" />
              <Button href="/contact" variant="gold">Directions & contact</Button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {galleryItems.filter((g) => g.category === "academics").slice(0, 4).map((g) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={g.src} src={asset(g.src)} alt="" aria-hidden="true" loading="lazy" width={g.w} height={g.h} className="h-44 w-full rounded-xl object-cover" />
              ))}
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
