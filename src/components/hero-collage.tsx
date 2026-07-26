import { galleryItems } from "@/lib/gallery";
import { asset } from "@/lib/asset";

/**
 * Floating photo collage behind the hero.
 *
 * Uses real photographs of the centre rather than abstract shapes: for a school,
 * the strongest thing on the page is evidence that classes actually look like
 * this. Cards drift on a CSS animation and parallax to the pointer on desktop
 * (handled by the motion layer); on mobile only the first three render, so the
 * frame stays legible and the payload stays small.
 */
const PICKS: Array<{
  category: string;
  nth: number;
  className: string;
  depth: number;
  /** Shown on mobile too. */
  core?: boolean;
}> = [
  { category: "dance", nth: 0, depth: 26, core: true, className: "right-[4%] top-[3%] w-[52%] max-w-[19rem] rotate-[3deg] sm:w-[32%] lg:right-[6%] lg:top-[10%] lg:w-[21rem]" },
  { category: "art", nth: 1, depth: 44, core: true, className: "left-[3%] top-[16%] w-[40%] max-w-[16rem] -rotate-[4deg] sm:w-[26%] lg:left-auto lg:right-[27%] lg:top-[48%] lg:w-[17rem]" },
  { category: "academics", nth: 0, depth: 16, core: true, className: "right-[5%] bottom-[4%] w-[46%] max-w-[17rem] rotate-[5deg] sm:w-[28%] lg:right-[9%] lg:bottom-[8%] lg:w-[18rem]" },
  { category: "music", nth: 0, depth: 34, className: "hidden lg:block right-[30%] top-[9%] w-[13rem] rotate-[7deg]" },
  { category: "taekwondo", nth: 0, depth: 52, className: "hidden lg:block right-[2%] top-[44%] w-[12rem] -rotate-[6deg]" },
  { category: "chess", nth: 0, depth: 22, className: "hidden xl:block right-[38%] bottom-[10%] w-[11rem] rotate-[2deg]" },
];

export function HeroCollage() {
  return (
    <div className="pointer-events-none absolute inset-0 z-[1] overflow-hidden" aria-hidden="true">
      {PICKS.map((p, i) => {
        const pool = galleryItems.filter((g) => g.category === p.category);
        const item = pool[p.nth % Math.max(pool.length, 1)];
        if (!item) return null;
        return (
          <figure
            key={`${p.category}-${p.nth}`}
            data-float={p.depth}
            className={`hero-card absolute ${p.className}`}
          >
            {/*
              Two elements on purpose: GSAP writes `transform` on the figure for
              the entrance and pointer parallax, while the idle drift is a CSS
              animation on this inner div. Put both on one element and the
              running animation silently wins over GSAP's inline transform.
            */}
            <div
              className="hero-float relative overflow-hidden rounded-2xl border border-white/15 shadow-[0_24px_60px_-18px_rgba(0,0,0,.75)]"
              style={{ animationDelay: `${i * -1.7}s`, animationDuration: `${7 + i * 0.9}s` }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={asset(item.src)}
                alt=""
                width={item.w}
                height={item.h}
                loading={p.core ? "eager" : "lazy"}
                fetchPriority={i === 0 ? "high" : undefined}
                className="aspect-[4/3] w-full object-cover"
              />
              <span
                className="absolute inset-0"
                style={{ background: "linear-gradient(160deg,rgba(10,22,51,.05),rgba(10,22,51,.42))" }}
              />
            </div>
          </figure>
        );
      })}
    </div>
  );
}
