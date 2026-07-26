"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const HeroScene = dynamic(() => import("./scene"), { ssr: false });

/**
 * Decides whether this device should get the WebGL scene at all.
 *
 * The 3D layer is a progressive enhancement: if any check fails the caller
 * renders the static poster instead, which is what mobile, low-power and
 * reduced-motion visitors see. The poster is the LCP element on those devices
 * and is designed to stand on its own.
 */
function useCanRender3D(): boolean | null {
  const [ok, setOk] = useState<boolean | null>(null);

  useEffect(() => {
    const nav = navigator as Navigator & {
      deviceMemory?: number;
      connection?: { saveData?: boolean };
    };

    const checks =
      window.matchMedia("(min-width: 1024px)").matches &&
      window.matchMedia("(pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
      (navigator.hardwareConcurrency ?? 2) >= 4 &&
      (nav.deviceMemory ?? 4) >= 4 &&
      !nav.connection?.saveData;

    if (!checks) {
      setOk(false);
      return;
    }

    // Confirm WebGL2 actually works before pulling in ~200 kB of Three.js.
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl2");
      setOk(Boolean(gl));
      gl?.getExtension("WEBGL_lose_context")?.loseContext();
    } catch {
      setOk(false);
    }
  }, []);

  return ok;
}

export function Hero3D() {
  const canRender = useCanRender3D();
  const [visible, setVisible] = useState(true);

  // Stop rendering entirely once the hero has scrolled away.
  useEffect(() => {
    const el = document.getElementById("hero");
    if (!el || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), {
      threshold: 0,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  if (!canRender) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-[1]"
      style={{ visibility: visible ? "visible" : "hidden" }}
    >
      {visible && <HeroScene />}
    </div>
  );
}
