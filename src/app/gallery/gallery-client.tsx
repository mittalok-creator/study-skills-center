"use client";

import { useState } from "react";
import { Container, Section, Eyebrow } from "@/components/ui";
import { galleryItems, categoryLabels } from "@/lib/gallery";
import { asset } from "@/lib/asset";

const cats = ["all", ...Object.keys(categoryLabels)];

export default function GalleryClient() {
  const [active, setActive] = useState("all");
  const [lightbox, setLightbox] = useState<string | null>(null);
  const items = active === "all" ? galleryItems : galleryItems.filter((g) => g.category === active);

  return (
    <>
      <header className="on-dark bg-navy-900 py-16 text-white">
        <Container>
          <Eyebrow tone="gold">Gallery</Eyebrow>
          <h1 className="display" style={{ fontSize: "var(--fs-h1)" }}>Life at the centre</h1>
          <p className="mt-4 max-w-2xl text-white/75">
            {galleryItems.length} photographs from classes, events and showcases.
          </p>
        </Container>
      </header>

      <Section>
        <Container>
          <div className="mb-8 flex flex-wrap gap-2" role="group" aria-label="Filter gallery by category">
            {cats.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setActive(c)}
                aria-pressed={active === c}
                className={`min-h-[44px] rounded-full px-5 text-sm font-semibold transition-colors ${
                  active === c ? "bg-blue-600 text-white" : "border border-grey-200 text-grey-600 hover:border-blue-600"
                }`}
              >
                {c === "all" ? "All" : categoryLabels[c]}
              </button>
            ))}
          </div>

          <ul className="columns-2 gap-3 md:columns-3 lg:columns-4">
            {items.map((g) => (
              <li key={g.src} className="mb-3 break-inside-avoid">
                <button
                  type="button"
                  onClick={() => setLightbox(asset(g.src))}
                  className="block w-full overflow-hidden rounded-xl"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={asset(g.src)}
                    alt={`${categoryLabels[g.category]} at Study Skills Center`}
                    loading="lazy"
                    width={g.w}
                    height={g.h}
                    className="w-full object-cover transition-transform duration-500 hover:scale-[1.03]"
                  />
                </button>
              </li>
            ))}
          </ul>

          <p className="mt-10 rounded-lg border border-dashed border-gold-500 bg-gold-500/10 px-4 py-3 text-sm">
            <strong>Draft note:</strong> these images came through WhatsApp and are capped at
            1600px, so they work as gallery tiles but not as full-width heroes. Consent per event
            must be confirmed before launch.
          </p>
        </Container>
      </Section>

      {lightbox && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Photo"
          className="fixed inset-0 z-[60] flex items-center justify-center bg-navy-900/95 p-4"
          onClick={() => setLightbox(null)}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={lightbox} alt="" className="max-h-[88vh] max-w-full rounded-lg object-contain" />
          <button
            type="button"
            onClick={() => setLightbox(null)}
            className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white"
          >
            <span className="sr-only">Close</span>
            <span aria-hidden="true">✕</span>
          </button>
        </div>
      )}
    </>
  );
}
