import { Container, Section, SectionHead, PageHero, Card, Button, TodoNote } from "@/components/ui";
import { site } from "@/content/site";
import { heroImage } from "@/lib/gallery";
import { asset } from "@/lib/asset";
import { MapEmbed } from "@/components/map-embed";

export const metadata = {
  title: "Contact",
  description:
    "Call, WhatsApp or visit Study Skills Center at P-9, LGF, P-Block, Malviya Nagar, New Delhi 110017.",
};

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
            <MapEmbed query={site.mapQuery} label={`${site.name} — ${site.address.full}`} />
            <TodoNote>Exact opening hours, nearest metro station and written walking directions from the post office.</TodoNote>
          </div>
        </Container>
      </Section>
    </>
  );
}
