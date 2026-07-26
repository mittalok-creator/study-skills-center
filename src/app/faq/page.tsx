import { Container, Section, PageHero } from "@/components/ui";
import { faqs } from "@/content/site";
import { heroImage } from "@/lib/gallery";
import { asset } from "@/lib/asset";
import { JsonLd } from "@/components/json-ld";
import { faqJsonLd } from "@/lib/structured-data";

export const metadata = {
  title: "FAQ",
  description:
    "Answers to common questions about classes, batches, demo bookings and fees at Study Skills Center, Malviya Nagar.",
};

export default function FaqPage() {
  return (
    <>
      <JsonLd data={faqJsonLd()} />
      <PageHero eyebrow="Questions" title="Frequently asked" lead="If your question isn't here, call us — we would rather answer it properly." image={asset(heroImage("hero-about"))} />
      <Section>
        <Container className="max-w-3xl">
          <div className="divide-y divide-grey-200 border-y border-grey-200">
            {faqs.map((f) => (
              <details key={f.q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-semibold text-navy-900">
                  {f.q}
                  <span aria-hidden="true" className="shrink-0 text-blue-600 transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-grey-600">{f.a}</p>
              </details>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
