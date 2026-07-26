"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import gsap from "gsap";

/* ------------------------------------------------------------------ *
 * Split headline
 * ------------------------------------------------------------------ */

/**
 * Renders each line inside a clipping mask so the line can slide up from
 * below. Lines are passed in explicitly rather than measured, which keeps it
 * deterministic across fonts and viewports — and the text is real text, so
 * screen readers and search engines see a normal heading.
 */
export function SplitHeading({
  lines,
  className = "",
  style,
  as: Tag = "h1",
}: {
  lines: React.ReactNode[];
  className?: string;
  style?: React.CSSProperties;
  as?: "h1" | "h2";
}) {
  return (
    <Tag className={className} style={style} data-split>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.06em]">
          <span data-split-inner className="block will-change-transform">
            {line}
          </span>
        </span>
      ))}
    </Tag>
  );
}

/* ------------------------------------------------------------------ *
 * Counter
 * ------------------------------------------------------------------ */

export function Counter({
  value,
  suffix = "",
  prefix = "",
  className = "",
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}) {
  return (
    <span className={className}>
      {prefix}
      <span data-count={value} data-count-suffix={suffix}>
        {value.toLocaleString("en-IN")}
        {suffix}
      </span>
    </span>
  );
}

/* ------------------------------------------------------------------ *
 * Magnetic button
 * ------------------------------------------------------------------ */

export function MagneticButton({
  href,
  children,
  variant = "gold",
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "gold" | "ghost" | "primary";
  className?: string;
}) {
  const base =
    "inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold will-change-transform transition-colors duration-200";
  const styles = {
    gold: "bg-gold-500 text-navy-900 hover:bg-gold-300",
    ghost: "border border-white/35 text-white hover:bg-white/10 hover:border-white/60",
    primary: "bg-blue-600 text-white hover:bg-blue-500",
  }[variant];

  const inner = (
    <span data-magnetic className={`${base} ${styles} ${className}`}>
      {children}
    </span>
  );

  if (href.startsWith("http") || href.startsWith("tel:")) {
    return (
      <a href={href} rel="noopener noreferrer" className="inline-block">
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className="inline-block">
      {inner}
    </Link>
  );
}

/* ------------------------------------------------------------------ *
 * Scroll indicator
 * ------------------------------------------------------------------ */

export function ScrollIndicator({ target = "#divisions" }: { target?: string }) {
  return (
    <a
      href={target}
      className="group absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2 text-white/60 transition-colors hover:text-white"
    >
      <span className="text-[10px] uppercase tracking-[0.22em]">Scroll</span>
      <span className="relative flex h-11 w-[26px] items-start justify-center rounded-full border border-white/35 p-1.5">
        <span className="scroll-dot h-1.5 w-1.5 rounded-full bg-gold-300" />
      </span>
    </a>
  );
}

/* ------------------------------------------------------------------ *
 * Cursor
 * ------------------------------------------------------------------ */

/** A soft follower ring. Pointer-fine devices only; never replaces the real cursor. */
export function CustomCursor() {
  const ring = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const ok =
      window.matchMedia("(pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setEnabled(ok);
    if (!ok || !ring.current) return;

    const el = ring.current;
    const xTo = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3" });

    const move = (e: PointerEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
      const interactive = (e.target as HTMLElement)?.closest?.(
        "a,button,summary,input,select,textarea,[role='button']"
      );
      gsap.to(el, { scale: interactive ? 1.9 : 1, opacity: interactive ? 0.5 : 0.28, duration: 0.28 });
    };
    const hide = () => gsap.to(el, { opacity: 0, duration: 0.2 });

    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", hide);
    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", hide);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div
      ref={ring}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[90] hidden h-9 w-9 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-blue-600 opacity-0 lg:block"
      style={{ willChange: "transform" }}
    />
  );
}

/* ------------------------------------------------------------------ *
 * Page transition
 * ------------------------------------------------------------------ */

/** A brief navy wipe on route change, plus a fade-up of the incoming page. */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const overlay = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const first = useRef(true);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (first.current) {
      first.current = false;
      return;
    }
    const tl = gsap.timeline();
    if (overlay.current) {
      tl.fromTo(
        overlay.current,
        { scaleY: 1, transformOrigin: "top" },
        { scaleY: 0, transformOrigin: "bottom", duration: 0.62, ease: "power4.inOut" }
      );
    }
    if (content.current) {
      tl.from(content.current, { opacity: 0, y: 18, duration: 0.5, ease: "power2.out" }, "-=0.34");
    }
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <div
        ref={overlay}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[95] origin-bottom scale-y-0 bg-navy-900"
      />
      <div ref={content}>{children}</div>
    </>
  );
}
