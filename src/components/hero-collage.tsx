import { galleryItems } from "@/lib/gallery";
import { asset } from "@/lib/asset";

/**
 * Floating photo collage for the hero.
 *
 * Layout differs by breakpoint on purpose:
 *
 * - **Mobile**: the collage is a band at the top of the hero and the headline
 *   sits *below* it on solid navy. Overlapping white display type on bright
 *   photographs was unreadable however heavy the scrim got — the first two lines
 *   of the headline vanished into a classroom photo. Separating them removes the
 *   problem rather than tuning around it.
 * - **Desktop**: the collage is full-bleed behind the copy, which occupies the
 *   deliberately clear left third.
 */
const PICKS: Array<{
  category: string;
  nth: number;
  className: string;
  depth: number;
  eager?: boolean;
}> = [
  {
    category: "dance",
    nth: 0,
    depth: 26,
    eager: true,
    className:
      "right-[5%] top-[5%] w-[50%] max-w-[19rem] rotate-[3deg] lg:right-[6%] lg:top-[10%] lg:w-[21rem]",
  },
  {
    category: "art",
    nth: 1,
    depth: 44,
    eager: true,
    className:
      "left-[5%] top-[26%] w-[42%] max-w-[16rem] -rotate-[4deg] lg:left-auto lg:right-[27%] lg:top-[48%] lg:w-[17rem]",
  },
  {
    category: "academics",
    nth: 0,
    depth: 16,
    eager: true,
    className:
      "right-[8%] bottom-[8%] w-[40%] max-w-[17rem] rotate-[5deg] lg:right-[9%] lg:bottom-[8%] lg:w-[18rem]",
  },
  {
    category: "music",
    nth: 0,
    depth: 34,
    className: "hidden lg:block right-[30%] top-[9%] w-[13rem] rotate-[7deg]",
  },
  {
    category: "taekwondo",
    nth: 0,
    depth: 52,
    className: "hidden lg:block right-[2%] top-[44%] w-[12rem] -rotate-[6deg]",
  },
  {
    category: "chess",
    nth: 0,
    depth: 22,
    className: "hidden xl:block right-[38%] bottom-[10%] w-[11rem] rotate-[2deg]",
  },
];

export function HeroCollage() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none relative z-[1] aspect-[16/10] max-h-[34svh] w-full shrink-0 sm:aspect-[16/9] lg:absolute lg:inset-0 lg:aspect-auto lg:max-h-none lg:h-auto"
    >
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
                loading={p.eager ? "eager" : "lazy"}
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

      {/* Mobile only: fade the band into the solid copy area below it. */}
      <span
        className="absolute inset-x-0 bottom-0 h-20 lg:hidden"
        style={{ background: "linear-gradient(to bottom,transparent,#0a1633)" }}
      />
    </div>
  );
}
