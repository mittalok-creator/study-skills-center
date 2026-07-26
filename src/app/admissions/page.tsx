import { Container, Section, SectionHead, PageHero, Button, Card, TodoNote } from "@/components/ui";
import { site } from "@/content/site";
import { heroImage } from "@/lib/gallery";
import { asset } from "@/lib/asset";
import { EnquiryForm } from "@/components/enquiry-form";

export const metadata = {
  title: "Admissions",
  description:
    "How admission works at Study Skills Center — book a free demo class, pick a batch, and enrol. Online and offline batches for Classes I–XII.",
};

const steps = [
  { n: "01", t: "Tell us about the student", d: "Class, subjects or the creative programme you're interested in, and what you're hoping changes." },
  { n: "02", t: "Sit in on a free demo", d: "No fee, no obligation. The student attends a real class with the batch they'd join." },
  { n: "03", t: "Pick a batch and timing", d: "We place the student in a batch that fits their level and your schedule — online or offline." },
  { n: "04", t: "Enrol", d: "Complete the form, collect the printed study material, and start." },
];

export default function AdmissionsPage() {
  return (
    <>
      <PageHero eyebrow="Admissions" title="Start with a free demo class" lead="The simplest way to judge a coaching centre is to watch one of its classes. So that's where we start." image={asset(heroImage("hero-academics"))} />

      <Section>
        <Container>
          <SectionHead eyebrow="How it works" title="Four steps" />
          <ol className="grid gap-6 md:grid-cols-4" data-stagger>
            {steps.map((s) => (
              <li key={s.n} className="border-t-2 border-blue-600 pt-5">
                <span className="display text-3xl text-grey-200">{s.n}</span>
                <h3 className="mt-1 font-semibold text-navy-900">{s.t}</h3>
                <p className="mt-2 text-sm text-grey-600">{s.d}</p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <Section className="bg-grey-050">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr]">
            <Card>
              <SectionHead eyebrow="Enquiry" title="Book a demo class" lead="Submits directly to Study Skills Center — no account needed on either end." />
              <EnquiryForm />
              <p className="mt-4 rounded-lg border border-dashed border-gold-500 bg-gold-500/10 px-4 py-3 text-sm">
                <strong>Draft note:</strong> this form sends real email via a third-party relay
                (FormSubmit) since the site has no server of its own. The very first submission
                triggers a one-time confirmation email to {site.email} that must be clicked
                before messages start arriving — see docs/07-lead-form.md.
              </p>
            </Card>

            <aside className="self-start rounded-2xl bg-navy-900 p-8 text-white on-dark">
              <p className="display text-2xl">Rather just talk?</p>
              <p className="mt-3 text-sm text-white/75">Call any of these numbers, or send a WhatsApp message and we will reply.</p>
              <ul className="mt-5 space-y-2">
                {site.phones.map((p) => (
                  <li key={p}><a href={`tel:${p}`} className="text-lg font-semibold text-gold-300">{p}</a></li>
                ))}
              </ul>
              <div className="mt-6"><Button href={`https://wa.me/${site.whatsapp}`} variant="gold">WhatsApp us</Button></div>
              <p className="mt-6 border-t border-white/15 pt-4 text-sm text-white/60">{site.address.full}</p>
            </aside>
          </div>
          <TodoNote>
            Leads currently email to {site.email} only — confirm if a second person/number
            should also be notified (e.g. by WhatsApp), and finalise the consent wording with
            legal review before launch.
          </TodoNote>
        </Container>
      </Section>
    </>
  );
}
