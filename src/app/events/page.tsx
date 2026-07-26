import { Container, Section, PageHero, Card, Badge, TodoNote } from "@/components/ui";
import { events } from "@/content/site";
import { posterImage, heroImage } from "@/lib/gallery";
import { asset } from "@/lib/asset";

export const metadata = {
  title: "Events",
  description:
    "Annual Day, Summer Camp and the student Art Exhibition at Study Skills Center, Malviya Nagar.",
};

export default function EventsPage() {
  return (
    <>
      <PageHero eyebrow="What's on" title="Events & showcases" lead="Annual days, summer camp closings and exhibitions of student work." image={asset(heroImage("hero-gallery"))} />
      <Section>
        <Container>
          <ul className="grid gap-8 md:grid-cols-3" data-stagger>
            {events.map((e) => (
              <Card as="li" key={e.slug} className="overflow-hidden p-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={asset(posterImage(e.poster))} alt={`${e.title} poster`} loading="lazy" className="w-full object-cover" />
                <div className="p-6">
                  <Badge tone="gold">{e.strap}</Badge>
                  <h2 className="display mt-3 text-2xl text-navy-900">{e.title}</h2>
                  <dl className="mt-3 space-y-1 text-sm">
                    <div className="flex gap-2"><dt className="text-grey-500">Date</dt><dd className="font-medium text-navy-900">{e.date}</dd></div>
                    <div className="flex gap-2"><dt className="text-grey-500">Time</dt><dd className="font-medium text-navy-900">{e.time}</dd></div>
                    <div className="flex gap-2"><dt className="text-grey-500">Venue</dt><dd className="font-medium text-navy-900">{e.venue}</dd></div>
                  </dl>
                  <p className="mt-3 text-sm text-grey-600">{e.description}</p>
                </div>
              </Card>
            ))}
          </ul>
          <TodoNote>Confirmed dates and times for Annual Day and Summer Camp, plus any events already planned for the coming year.</TodoNote>
        </Container>
      </Section>
    </>
  );
}
