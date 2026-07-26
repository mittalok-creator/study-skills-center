"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

/**
 * Site-wide motion layer.
 *
 * Two rules, both learned from bugs in this build:
 *
 * 1. Nothing is hidden in CSS. Elements are visible in the stylesheet and GSAP
 *    sets the "from" state at runtime only where it will also animate it back.
 *    No-JS, print and reduced-motion therefore always show the finished page.
 * 2. Anything inside the first viewport animates on a load timeline, never on a
 *    ScrollTrigger. An element that sits below its own trigger point at load
 *    would otherwise stay at its "from" state forever.
 *
 * Everything runs on mobile too — most visitors are on a phone. Only the pointer
 * effects (magnetic, parallax-to-cursor) are desktop-only, because they need a
 * cursor to exist.
 */
export function MotionProvider() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const isDesktop = window.matchMedia("(min-width: 1024px) and (pointer: fine)").matches;

    /* ---------------- Smooth scrolling ---------------- */
    const lenis = new Lenis({
      duration: 1.05,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      // Never smooth touch — it fights native momentum and feels worse on phones.
      syncTouch: false,
    });
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const cleanups: Array<() => void> = [];

    const ctx = gsap.context(() => {
      /* ---------------- Character-by-character headings ---------------- */
      gsap.utils.toArray<HTMLElement>("[data-chars]").forEach((el) => {
        const chars = el.querySelectorAll<HTMLElement>("[data-char]");
        if (!chars.length) return;

        const inHero = Boolean(el.closest("[data-hero]"));
        const delay = Number(el.dataset.charDelay ?? "0");

        // Letters assemble from below with a slight rotation — reads as writing
        // rather than a generic fade.
        const from = {
          opacity: 0,
          yPercent: 68,
          rotateX: -55,
          duration: 0.62,
          ease: "back.out(1.6)",
          stagger: { each: 0.022, from: "start" as const },
          delay,
        };

        if (inHero) {
          gsap.from(chars, from);
        } else {
          gsap.from(chars, {
            ...from,
            scrollTrigger: { trigger: el, start: "top 86%", once: true },
          });
        }
      });

      /* ---------------- Hero body content ---------------- */
      const heroItems = gsap.utils.toArray<HTMLElement>("[data-hero-item]");
      if (heroItems.length) {
        gsap.from(heroItems, {
          opacity: 0,
          y: 24,
          duration: 0.75,
          ease: "power3.out",
          stagger: 0.1,
          delay: 0.45,
        });
      }

      /* ---------------- Hero collage cards ---------------- */
      const cards = gsap.utils.toArray<HTMLElement>(".hero-card");
      if (cards.length) {
        gsap.from(cards, {
          opacity: 0,
          scale: 0.86,
          y: 40,
          duration: 1,
          ease: "power3.out",
          stagger: 0.11,
          delay: 0.2,
        });
      }

      /* ---------------- Section reveals ---------------- */
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 30,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
        });
      });

      /* ---------------- Staggered groups ---------------- */
      gsap.utils.toArray<HTMLElement>("[data-stagger]").forEach((group) => {
        const kids = Array.from(group.children) as HTMLElement[];
        if (!kids.length) return;
        gsap.from(kids, {
          opacity: 0,
          y: 26,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.06,
          scrollTrigger: { trigger: group, start: "top 90%", once: true },
        });
      });

      /* ---------------- Counters ----------------
         Every number on the site counts up: hero stats, result scores, anything
         marked data-count. Handles decimals, prefixes and suffixes. */
      gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
        const target = Number(el.dataset.count ?? "0");
        const decimals = Number(el.dataset.countDecimals ?? "0");
        const prefix = el.dataset.countPrefix ?? "";
        const suffix = el.dataset.countSuffix ?? "";
        if (!Number.isFinite(target)) return;

        const obj = { v: 0 };
        const render = () =>
          (el.textContent =
            prefix +
            obj.v.toLocaleString("en-IN", {
              minimumFractionDigits: decimals,
              maximumFractionDigits: decimals,
            }) +
            suffix);

        gsap.to(obj, {
          v: target,
          duration: 1.9,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 95%", once: true },
          onUpdate: render,
          onComplete: render,
        });
      });

      /* ---------------- Scrub parallax on media ---------------- */
      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
        gsap.to(el, {
          y: Number(el.dataset.parallax ?? "60"),
          ease: "none",
          scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
        });
      });

      /* ---------------- Student Journey ----------------
         Pinned horizontal scrub on desktop; on touch it stays a normal
         snap-scrolling carousel with the cards revealing as they enter. */
      const track = document.querySelector<HTMLElement>("[data-hscroll]");
      const wrap = track?.parentElement;
      if (track && wrap && isDesktop) {
        const distance = () => Math.max(0, track.scrollWidth - window.innerWidth + 96);
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
      } else if (track) {
        gsap.from(Array.from(track.children) as HTMLElement[], {
          opacity: 0,
          y: 30,
          duration: 0.6,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: track, start: "top 90%", once: true },
        });
      }

      /* ---------------- Pointer-only effects ---------------- */
      if (isDesktop) {
        // Magnetic buttons
        gsap.utils.toArray<HTMLElement>("[data-magnetic]").forEach((el) => {
          const xTo = gsap.quickTo(el, "x", { duration: 0.45, ease: "power3" });
          const yTo = gsap.quickTo(el, "y", { duration: 0.45, ease: "power3" });
          const move = (e: PointerEvent) => {
            const r = el.getBoundingClientRect();
            xTo((e.clientX - (r.left + r.width / 2)) * 0.3);
            yTo((e.clientY - (r.top + r.height / 2)) * 0.4);
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

        // Hero collage parallax — each card moves by its own depth.
        const floats = gsap.utils.toArray<HTMLElement>("[data-float]");
        if (floats.length) {
          const setters = floats.map((el) => ({
            depth: Number(el.dataset.float ?? "30"),
            x: gsap.quickTo(el, "x", { duration: 1.1, ease: "power3" }),
            y: gsap.quickTo(el, "y", { duration: 1.1, ease: "power3" }),
          }));
          const onMove = (e: PointerEvent) => {
            const nx = e.clientX / window.innerWidth - 0.5;
            const ny = e.clientY / window.innerHeight - 0.5;
            for (const s of setters) {
              s.x(-nx * s.depth);
              s.y(-ny * s.depth * 0.6);
            }
          };
          window.addEventListener("pointermove", onMove, { passive: true });
          cleanups.push(() => window.removeEventListener("pointermove", onMove));
        }
      }
    });

    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);
    const refreshTimer = window.setTimeout(() => ScrollTrigger.refresh(), 900);

    return () => {
      window.removeEventListener("load", onLoad);
      window.clearTimeout(refreshTimer);
      cleanups.forEach((fn) => fn());
      gsap.ticker.remove(tick);
      lenis.destroy();
      ctx.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [pathname]);

  return null;
}
