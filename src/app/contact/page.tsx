import { Container, Section, SectionHead, PageHero, Card, Button, TodoNote } from "@/components/ui";
import { site } from "@/content/site";
import { heroImage } from "@/lib/gallery";
import { asset } from "@/lib/asset";

export const metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <>
      <PageHero eyebrow="Contact" title="Come and see the centre" lead={site.address.full} image={asset(heroImage("hero-about"))} />
      <Section>
        <Container>
          <div className="grid gap-8 lg:grid-cols-3">
            <Card>
              <h2 className="display text-xl text-navy-900">Call</h2>
              <ul className="mt-4 space-y-2">
                {site.phones.map((p) => (
                  <li key={p}><a href={`tel:${p}`} className="text-lg font-semibold text-blue-600">{p}</a></li>
                ))}
              </ul>
            </Card>
            <Card>
              <h2 className="display text-xl text-navy-900">Message</h2>
              <p className="mt-4"><a href={`mailto:${site.email}`} className="font-semibold text-blue-600 break-all">{site.email}</a></p>
              <div className="mt-4"><Button href={`https://wa.me/${site.whatsapp}`} variant="secondary">WhatsApp us</Button></div>
            </Card>
            <Card>
              <h2 className="display text-xl text-navy-900">Visit</h2>
              <address className="mt-4 not-italic text-grey-600">
                {site.address.line1}<br />{site.address.line2}<br />{site.address.city} – {site.address.pin}
              </address>
              <p className="mt-3 text-sm text-grey-500">Opening hours: {site.hours}</p>
            </Card>
          </div>

          <div className="mt-12">
            <SectionHead eyebrow="Finding us" title="Location" />
            <div className="flex aspect-[21/9] w-full items-center justify-center rounded-2xl border border-dashed border-grey-200 bg-grey-050 text-center">
              <div className="p-8">
                <p className="font-semibold text-navy-900">Map placeholder</p>
                <p className="mt-2 max-w-md text-sm text-grey-500">
                  In the live build this is a static map image that loads an interactive Google Map
                  only when clicked — an always-on embed costs measurable performance and privacy.
                </p>
                <div className="mt-4">
                  <Button href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.mapQuery)}`} variant="secondary">
                    Open in Google Maps
                  </Button>
                </div>
              </div>
            </div>
            <TodoNote>Exact opening hours, nearest metro station and written walking directions from the post office.</TodoNote>
          </div>
        </Container>
      </Section>
    </>
  );
}
