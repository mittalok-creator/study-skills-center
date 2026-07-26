import { Container, Section, SectionHead, PageHero, Card, Button, TodoNote } from "@/components/ui";
import { site, academicPrograms } from "@/content/site";
import { heroImage } from "@/lib/gallery";
import { asset } from "@/lib/asset";

export const metadata = {
  title: "Fees",
  description:
    "How fees work at Study Skills Center, and what batch timings and modes are available for each programme.",
};

export default function FeesPage() {
  return (
    <>
      <PageHero eyebrow="Fees" title="Fees & batch timings" lead="One of the two most-visited pages on any coaching website — worth getting right." image={asset(heroImage("hero-about"))} />
      <Section>
        <Container>
          <SectionHead eyebrow="Decision needed" title="Published fees, or enquiry only?" lead="Both work. They just convert differently, and the page is built differently for each." />
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <h3 className="display text-xl text-navy-900">Option A — publish the fees</h3>
              <p className="mt-3 text-sm text-grey-600">
                Fewer enquiries, but better ones. Parents self-qualify before calling, so staff spend
                less time on people who were never going to enrol. Also earns trust: a centre that
                hides its price reads as expensive.
              </p>
            </Card>
            <Card>
              <h3 className="display text-xl text-navy-900">Option B — fees on enquiry</h3>
              <p className="mt-3 text-sm text-grey-600">
                More enquiries, more staff time, and room to price by batch or offer a sibling
                discount. Works better if fees vary a lot between programmes.
              </p>
            </Card>
          </div>

          <h3 className="display mt-14 text-2xl text-navy-900">Draft structure — if fees are published</h3>
          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-grey-200">
                  <th scope="col" className="py-3 pr-4 font-semibold text-navy-900">Programme</th>
                  <th scope="col" className="py-3 pr-4 font-semibold text-navy-900">Batch timing</th>
                  <th scope="col" className="py-3 pr-4 font-semibold text-navy-900">Mode</th>
                  <th scope="col" className="py-3 font-semibold text-navy-900">Fee</th>
                </tr>
              </thead>
              <tbody>
                {academicPrograms.slice(0, 5).map((p) => (
                  <tr key={p.slug} className="border-b border-grey-200">
                    <td className="py-3 pr-4 font-medium text-navy-900">{p.title}</td>
                    <td className="py-3 pr-4 text-grey-500">TODO</td>
                    <td className="py-3 pr-4 text-grey-500">Online / Offline</td>
                    <td className="py-3 text-grey-500">TODO</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <TodoNote>
            Decide published vs. enquiry-only, then supply fees and batch timings per programme.
            If payments are ever taken online, a refund policy page becomes mandatory.
          </TodoNote>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/admissions">Ask about fees</Button>
            <Button href={`tel:${site.primaryPhone}`} variant="secondary">Call {site.primaryPhone}</Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
