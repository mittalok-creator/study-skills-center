import { Container, Section, SectionHead, PageHero, Card, Badge, Button, TodoNote } from "@/components/ui";
import { madsPrograms, site } from "@/content/site";
import { heroImage, galleryItems } from "@/lib/gallery";
import { asset } from "@/lib/asset";

export const metadata = { title: "MADS — Music & Dance Studio" };

const groups = ["Dance", "Music", "Martial Arts", "Art", "Mind Sports"] as const;

export default function MadsPage() {
  return (
    <>
      <PageHero
        eyebrow="A unit of Study Skills Center"
        title="MADS — Music & Dance Studio"
        lead="Dance, music, martial arts and fine art. Ages 6–14 and 15-and-above, including adults, in separate batches."
        image={asset(heroImage("hero-mads"))}
      />

      <Section>
        <Container>
          <SectionHead eyebrow="Programmes" title="Eleven disciplines" lead="Free demo class across every programme — book before you commit." />
          {groups.map((group) => {
            const items = madsPrograms.filter((m) => m.group === group);
            if (!items.length) return null;
            return (
              <div key={group} className="mb-12">
                <h3 className="display mb-5 text-2xl text-navy-900">{group}</h3>
                <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" data-stagger>
                  {items.map((m) => {
                    const shot = galleryItems.find((g) => g.src.includes(m.image));
                    return (
                      <Card as="li" key={m.slug} className="overflow-hidden p-0">
                        {shot && (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={asset(shot.src)} alt="" aria-hidden="true" loading="lazy" width={shot.w} height={shot.h} className="h-48 w-full object-cover" />
                        )}
                        <div className="p-6">
                          <Badge tone="gold">{m.group}</Badge>
                          <h4 className="display mt-3 text-xl text-navy-900">{m.title}</h4>
                          {"note" in m && m.note ? <p className="mt-2 text-sm text-grey-600">{m.note}</p> : null}
                        </div>
                      </Card>
                    );
                  })}
                </ul>
              </div>
            );
          })}
          <TodoNote>Batch timings and fees for each MADS programme, plus instructor names per discipline.</TodoNote>
        </Container>
      </Section>

      <Section className="on-dark bg-navy-900 text-white">
        <Container className="text-center">
          <h2 className="display mx-auto max-w-2xl" style={{ fontSize: "var(--fs-h2)" }}>Try a class this week</h2>
          <p className="mx-auto mt-4 max-w-lg text-white/75">Every MADS programme starts with a free demo. Bring your child, or come yourself — the adult batch is separate.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href="/admissions" variant="gold">Book a free demo</Button>
            <Button href={`https://wa.me/${site.whatsapp}`} variant="ghost">WhatsApp us</Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
