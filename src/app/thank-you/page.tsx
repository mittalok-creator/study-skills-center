import { Container, Button } from "@/components/ui";
import { site } from "@/content/site";

export const metadata = {
  title: "Thank you",
  description: "Your enquiry has been sent to Study Skills Center.",
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return (
    <section className="on-dark flex min-h-[70vh] items-center bg-navy-900 text-white">
      <Container className="text-center">
        <p className="display text-gold-300" style={{ fontSize: "var(--fs-h1)" }}>
          Thank you
        </p>
        <h1 className="display mt-2" style={{ fontSize: "var(--fs-h2)" }}>
          We&apos;ve got your enquiry
        </h1>
        <p className="mx-auto mt-4 max-w-md text-white/70">
          Someone from Study Skills Center will call or WhatsApp you shortly. If it&apos;s
          urgent, you don&apos;t need to wait — call us directly.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button href={`tel:${site.primaryPhone}`} variant="gold">
            Call {site.primaryPhone}
          </Button>
          <Button href="/" variant="ghost">
            Back to home
          </Button>
        </div>
      </Container>
    </section>
  );
}
