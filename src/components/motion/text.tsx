"use client";

import type { CSSProperties, ReactNode } from "react";

/**
 * Character-by-character heading.
 *
 * Each word is wrapped so it never breaks mid-word, and each character gets its
 * own span for the stagger. The full text is still exposed to assistive tech and
 * to search engines through an `aria-label` on the heading plus `aria-hidden` on
 * the decorative spans — otherwise a screen reader announces the letters one at
 * a time, which is unusable.
 *
 * Characters are visible by default. The motion layer sets their "from" state at
 * runtime, so no-JS, print and reduced-motion all render normal text.
 */
export function CharHeading({
  text,
  as: Tag = "h1",
  className = "",
  style,
  accentFrom,
  accentClassName = "text-gold-300",
  delay = 0,
}: {
  /** Lines of the heading. Each string becomes its own visual line. */
  text: string[];
  as?: "h1" | "h2" | "h3";
  className?: string;
  style?: CSSProperties;
  /** Index of the first line that should take the accent colour. */
  accentFrom?: number;
  accentClassName?: string;
  delay?: number;
}) {
  const label = text.join(" ");
  let charIndex = 0;

  return (
    <Tag className={className} style={style} aria-label={label} data-chars data-char-delay={delay}>
      {text.map((line, li) => (
        <span
          key={li}
          aria-hidden="true"
          className={`block ${accentFrom !== undefined && li >= accentFrom ? accentClassName : ""}`}
        >
          {line.split(" ").map((word, wi) => (
            <span key={wi} className="inline-block whitespace-nowrap">
              {Array.from(word).map((ch) => (
                <span
                  key={charIndex}
                  data-char
                  style={{ ["--char-i" as string]: charIndex++ }}
                  className="inline-block will-change-transform"
                >
                  {ch}
                </span>
              ))}
              {wi < line.split(" ").length - 1 && <span className="inline-block">&nbsp;</span>}
            </span>
          ))}
        </span>
      ))}
    </Tag>
  );
}

/**
 * Animated number.
 *
 * Renders the final value as text on the server so the page is correct without
 * JS; the motion layer counts it up from zero when it scrolls into view.
 */
export function Counter({
  value,
  decimals = 0,
  prefix = "",
  suffix = "",
  className = "",
}: {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}) {
  const formatted = value.toLocaleString("en-IN", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
  return (
    <span
      className={className}
      data-count={value}
      data-count-decimals={decimals}
      data-count-prefix={prefix}
      data-count-suffix={suffix}
    >
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}

export function Blank({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
