"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

/**
 * Site-wide motion layer.
 *
 * Design rule, learned the hard way: nothing here hides content in CSS. Every
 * element is fully visible in the stylesheet, and GSAP sets the "from" state at
 * runtime only when it is also going to animate it back. If this script never
 * runs — no JS, print, an error — the page reads normally.
 *
 * Everything is disabled under prefers-reduced-motion.
 */
export function MotionProvider() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);

    /* ---------- Smooth scrolling (Lenis), driven by GSAP's ticker ---------- */
    const lenis = new Lenis({
      duration: 1.05,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      // Never smooth touch: it breaks native momentum and feels worse on phones.
      syncTouch: false,
    });

    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const ctx = gsap.context(() => {
      /* ---------- Hero intro ----------
         Hero content animates on load, never on scroll. Anything in the first
         viewport that waits for a ScrollTrigger can sit at its "from" state
         forever if it happens to fall below the trigger point — which is
         exactly how the trust indicators went missing. */
      const heroItems = gsap.utils.toArray<HTMLElement>("[data-hero-item]");
      if (heroItems.length) {
        gsap
          .timeline({ defaults: { ease: "power3.out" } })
          .from(heroItems, { opacity: 0, y: 26, duration: 0.8, stagger: 0.11 }, 0.15);
      }

      /* ---------- Section reveals ---------- */
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 34,
          duration: 0.75,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
      });

      /* ---------- Staggered groups ---------- */
      gsap.utils.toArray<HTMLElement>("[data-stagger]").forEach((group) => {
        const kids = Array.from(group.children) as HTMLElement[];
        gsap.from(kids, {
          opacity: 0,
          y: 30,
          duration: 0.65,
          ease: "power3.out",
          stagger: 0.07,
          scrollTrigger: { trigger: group, start: "top 86%", once: true },
        });
      });

      /* ---------- Split-text headline reveal ---------- */
      gsap.utils.toArray<HTMLElement>("[data-split]").forEach((el) => {
        const lines = el.querySelectorAll<HTMLElement>("[data-split-inner]");
        if (!lines.length) return;
        const inHero = Boolean(el.closest("#hero"));
        gsap.from(lines, {
          yPercent: 116,
          duration: 0.95,
          ease: "power4.out",
          stagger: 0.09,
          delay: inHero ? 0.1 : 0,
          // The hero headline plays on load; every other split heading waits
          // for its section to come into view.
          scrollTrigger: inHero ? undefined : { trigger: el, start: "top 88%", once: true },
        });
      });

      /* ---------- Counters ---------- */
      gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
        const target = Number(el.dataset.count ?? "0");
        const suffix = el.dataset.countSuffix ?? "";
        const obj = { v: 0 };
        gsap.to(obj, {
          v: target,
          duration: 1.6,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 92%", once: true },
          onUpdate: () => {
            el.textContent = Math.round(obj.v).toLocaleString("en-IN") + suffix;
          },
        });
      });

      /* ---------- Parallax on decorative media ---------- */
      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
        const amount = Number(el.dataset.parallax ?? "60");
        gsap.to(el, {
          y: amount,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
        });
      });

      /* ---------- Horizontal scroll: the Student Journey ---------- */
      const track = document.querySelector<HTMLElement>("[data-hscroll]");
      const wrap = track?.parentElement;
      if (track && wrap && window.matchMedia("(min-width: 1024px)").matches) {
        const distance = () => track.scrollWidth - window.innerWidth + 96;
        gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: wrap,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.85,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        });
      }

      /* ---------- Magnetic buttons ---------- */
      const magnets = gsap.utils.toArray<HTMLElement>("[data-magnetic]");
      const cleanups: Array<() => void> = [];
      magnets.forEach((el) => {
        const xTo = gsap.quickTo(el, "x", { duration: 0.45, ease: "power3" });
        const yTo = gsap.quickTo(el, "y", { duration: 0.45, ease: "power3" });
        const move = (e: PointerEvent) => {
          const r = el.getBoundingClientRect();
          xTo((e.clientX - (r.left + r.width / 2)) * 0.32);
          yTo((e.clientY - (r.top + r.height / 2)) * 0.42);
        };
        const leave = () => {
          xTo(0);
          yTo(0);
        };
        el.addEventListener("pointermove", move);
        el.addEventListener("pointerleave", leave);
        cleanups.push(() => {
          el.removeEventListener("pointermove", move);
          el.removeEventListener("pointerleave", leave);
        });
      });

      return () => cleanups.forEach((fn) => fn());
    });

    // Late-loading images change layout; recompute trigger positions.
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);
    const refreshTimer = window.setTimeout(() => ScrollTrigger.refresh(), 900);

    return () => {
      window.removeEventListener("load", onLoad);
      window.clearTimeout(refreshTimer);
      gsap.ticker.remove(tick);
      lenis.destroy();
      ctx.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [pathname]);

  return null;
}
