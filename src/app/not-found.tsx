import { Container, Button } from "@/components/ui";

export default function NotFound() {
  return (
    <section className="on-dark flex min-h-[70vh] items-center bg-navy-900 text-white">
      <Container className="text-center">
        <p className="display text-gold-300" style={{ fontSize: "var(--fs-display)" }}>404</p>
        <h1 className="display mt-2" style={{ fontSize: "var(--fs-h2)" }}>That page isn&apos;t here</h1>
        <p className="mx-auto mt-4 max-w-md text-white/70">
          The link may be old, or the page may have moved. Try the programmes page, or just call us.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button href="/" variant="gold">Back to home</Button>
          <Button href="/courses" variant="ghost">All programmes</Button>
        </div>
      </Container>
    </section>
  );
}
