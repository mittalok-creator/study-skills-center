import { Container, Section, SectionHead, PageHero, Button, Card, TodoNote } from "@/components/ui";
import { site, academicPrograms, madsPrograms } from "@/content/site";
import { heroImage } from "@/lib/gallery";
import { asset } from "@/lib/asset";

export const metadata = { title: "Admissions" };

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
              <SectionHead eyebrow="Enquiry" title="Book a demo class" lead="Draft layout — the form is not wired up in this preview." />
              <form className="grid gap-4 sm:grid-cols-2" aria-describedby="form-draft-note">
                <label className="block sm:col-span-1">
                  <span className="mb-1.5 block text-sm font-medium text-navy-900">Student&apos;s name</span>
                  <input type="text" name="student" autoComplete="name" className="min-h-[44px] w-full rounded-lg border border-grey-200 px-3" />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-sm font-medium text-navy-900">Parent&apos;s name</span>
                  <input type="text" name="parent" className="min-h-[44px] w-full rounded-lg border border-grey-200 px-3" />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-sm font-medium text-navy-900">Phone number</span>
                  <input type="tel" name="phone" autoComplete="tel" inputMode="tel" className="min-h-[44px] w-full rounded-lg border border-grey-200 px-3" />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-sm font-medium text-navy-900">Class / age</span>
                  <input type="text" name="class" className="min-h-[44px] w-full rounded-lg border border-grey-200 px-3" />
                </label>
                <label className="block sm:col-span-2">
                  <span className="mb-1.5 block text-sm font-medium text-navy-900">Programme of interest</span>
                  <select name="programme" className="min-h-[44px] w-full rounded-lg border border-grey-200 px-3">
                    <option>Select a programme</option>
                    <optgroup label="Academics">
                      {academicPrograms.map((p) => <option key={p.slug}>{p.title}</option>)}
                    </optgroup>
                    <optgroup label="MADS — Creative">
                      {madsPrograms.map((m) => <option key={m.slug}>{m.title}</option>)}
                    </optgroup>
                    <optgroup label="Competitive exams">
                      <option>Grades Career Institute — JEE / NEET / Olympiad</option>
                    </optgroup>
                  </select>
                </label>
                <label className="block sm:col-span-2">
                  <span className="mb-1.5 block text-sm font-medium text-navy-900">Anything we should know?</span>
                  <textarea name="message" rows={3} className="w-full rounded-lg border border-grey-200 p-3" />
                </label>
                <label className="flex items-start gap-3 sm:col-span-2">
                  <input type="checkbox" name="consent" className="mt-1 h-5 w-5 shrink-0" />
                  <span className="text-sm text-grey-600">
                    I am the parent or guardian and I consent to Study Skills Center contacting me
                    about this enquiry. <span className="text-grey-400">(Final wording pending legal review.)</span>
                  </span>
                </label>
                <div className="sm:col-span-2">
                  <Button href="#" variant="primary">Request a free demo</Button>
                </div>
              </form>
              <p id="form-draft-note" className="mt-4 rounded-lg border border-dashed border-gold-500 bg-gold-500/10 px-4 py-3 text-sm">
                <strong>Draft:</strong> this form does not submit yet. In the live build it validates
                server-side, blocks spam, stores the lead, and notifies staff by email and WhatsApp.
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
          <TodoNote>Confirm what information staff need on a lead, who receives the notification, and the exact consent wording for parents of students under 18.</TodoNote>
        </Container>
      </Section>
    </>
  );
}
