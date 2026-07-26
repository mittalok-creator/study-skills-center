import Link from "next/link";
import type { ReactNode } from "react";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`container-x ${className}`}>{children}</div>;
}

export function Section({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`section ${className}`}>
      {children}
    </section>
  );
}

export function Eyebrow({ children, tone = "blue" }: { children: ReactNode; tone?: "blue" | "gold" }) {
  const color = tone === "gold" ? "text-gold-300" : "text-blue-600";
  return (
    <p className={`${color} text-xs font-semibold uppercase tracking-[0.18em] mb-3`}>{children}</p>
  );
}

export function SectionHead({
  eyebrow,
  title,
  lead,
  tone = "blue",
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  tone?: "blue" | "gold";
  align?: "left" | "center";
}) {
  return (
    <div className={`${align === "center" ? "text-center mx-auto max-w-2xl" : "max-w-2xl"} mb-10`}>
      {eyebrow && <Eyebrow tone={tone}>{eyebrow}</Eyebrow>}
      <h2 className="display" style={{ fontSize: "var(--fs-h2)" }}>
        {title}
      </h2>
      {lead && <p className="mt-4 text-grey-600 [.on-dark_&]:text-white/70">{lead}</p>}
    </div>
  );
}

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "gold";
  className?: string;
};

export function Button({ href, children, variant = "primary", className = "" }: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-200 min-h-[44px]";
  const styles = {
    primary: "bg-blue-600 text-white hover:bg-blue-500 shadow-[var(--shadow-2)] hover:-translate-y-0.5",
    secondary: "bg-white text-navy-900 border border-grey-200 hover:border-blue-600 hover:-translate-y-0.5",
    ghost: "border border-white/30 text-white hover:bg-white/10",
    gold: "bg-gold-500 text-navy-900 hover:bg-gold-300 hover:-translate-y-0.5",
  }[variant];
  const external = href.startsWith("http") || href.startsWith("tel:") || href.startsWith("mailto:");
  if (external) {
    return (
      <a href={href} className={`${base} ${styles} ${className}`} rel="noopener noreferrer">
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={`${base} ${styles} ${className}`}>
      {children}
    </Link>
  );
}

export function Card({
  children,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "article" | "li";
}) {
  return (
    <Tag
      className={`rounded-2xl border border-grey-200 bg-white p-6 shadow-[var(--shadow-1)] transition-shadow duration-300 hover:shadow-[var(--shadow-3)] ${className}`}
    >
      {children}
    </Tag>
  );
}

export function Badge({ children, tone = "blue" }: { children: ReactNode; tone?: "blue" | "gold" | "grey" }) {
  const styles = {
    blue: "bg-blue-050 text-blue-600",
    gold: "bg-gold-500/15 text-navy-900",
    grey: "bg-grey-050 text-grey-600",
  }[tone];
  return (
    <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${styles}`}>{children}</span>
  );
}

export function TodoNote({ children }: { children: ReactNode }) {
  return (
    <p className="mt-4 rounded-lg border border-dashed border-gold-500 bg-gold-500/10 px-4 py-3 text-sm text-navy-900">
      <strong className="font-semibold">Needs input from SSC:</strong> {children}
    </p>
  );
}

export function PageHero({
  eyebrow,
  title,
  lead,
  image,
  logo,
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  image?: string;
  /** A division mark (MADS, Grades) shown on a white card above the eyebrow. */
  logo?: { src: string; alt: string };
}) {
  return (
    <header className="on-dark relative isolate overflow-hidden bg-navy-900 text-white grain">
      {image && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={image}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover opacity-25"
        />
      )}
      <div
        className="absolute inset-0 -z-0"
        style={{ background: "linear-gradient(120deg,#0a1633 20%,rgba(10,22,51,.72) 100%)" }}
        aria-hidden="true"
      />
      <Container className="relative py-20 md:py-28">
        {logo && (
          <div className="mb-6 inline-flex rounded-2xl bg-white p-3 shadow-[var(--shadow-3)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={logo.src} alt={logo.alt} className="h-12 w-auto sm:h-14" />
          </div>
        )}
        {eyebrow && <Eyebrow tone="gold">{eyebrow}</Eyebrow>}
        <h1 className="display max-w-4xl" style={{ fontSize: "var(--fs-h1)" }}>
          {title}
        </h1>
        {lead && <p className="mt-5 max-w-2xl text-white/75">{lead}</p>}
      </Container>
    </header>
  );
}
