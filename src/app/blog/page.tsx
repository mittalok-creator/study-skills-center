import { Container, Section, SectionHead, PageHero, Card, Badge, TodoNote } from "@/components/ui";
import { heroImage } from "@/lib/gallery";
import { asset } from "@/lib/asset";

export const metadata = { title: "Blog" };

const ideas = [
  { tag: "Boards", title: "How to plan the last 90 days before Class X boards", why: "High search volume every January–March." },
  { tag: "Parents", title: "Is your child ready for a coaching class? Five honest signs", why: "Answers the question parents actually type." },
  { tag: "MADS", title: "Why Kathak is good for young children — beyond the dance", why: "Brings creative-programme traffic." },
  { tag: "Careers", title: "JEE vs NEET: helping a Class X student choose a stream", why: "Feeds Grades Career Institute enquiries." },
  { tag: "Study skills", title: "Mental maths at home: ten minutes a day that works", why: "Shareable, links to the Mental Maths programme." },
  { tag: "Local", title: "Choosing a tuition centre in Malviya Nagar: what to ask", why: "Local intent — strong ranking opportunity." },
];

export default function BlogPage() {
  return (
    <>
      <PageHero eyebrow="Writing" title="Blog" lead="Answering the questions parents ask before they call — the cheapest, most durable source of search traffic there is." image={asset(heroImage("hero-academics"))} />
      <Section>
        <Container>
          <SectionHead eyebrow="Proposed" title="Opening editorial calendar" lead="Draft article ideas, chosen for local and parent search intent rather than general interest." />
          <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3" data-stagger>
            {ideas.map((a) => (
              <Card as="li" key={a.title}>
                <Badge tone="blue">{a.tag}</Badge>
                <h2 className="mt-3 font-semibold text-navy-900">{a.title}</h2>
                <p className="mt-2 text-sm text-grey-500"><span className="font-medium text-grey-600">Why: </span>{a.why}</p>
              </Card>
            ))}
          </ul>
          <TodoNote>Confirm whether SSC will write these in-house or wants them drafted. One article a fortnight is enough to matter.</TodoNote>
        </Container>
      </Section>
    </>
  );
}
