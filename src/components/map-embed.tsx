"use client";

import { useState } from "react";
import { Button } from "@/components/ui";

/**
 * Click-to-load Google Maps embed.
 *
 * An always-on iframe on every page load costs a third-party connection,
 * cookies, and render time nobody asked for — see docs/01-master-spec-v2.md
 * §6.2. So the default state is a static card; the real map (an iframe using
 * Google's no-API-key embed form) only mounts once the visitor asks for it.
 */
export function MapEmbed({ query, label }: { query: string; label: string }) {
  const [loaded, setLoaded] = useState(false);
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
  const embedSrc = `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;

  if (loaded) {
    return (
      <div className="aspect-[21/9] w-full overflow-hidden rounded-2xl border border-grey-200">
        <iframe
          title={label}
          src={embedSrc}
          className="h-full w-full"
          style={{ border: 0 }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    );
  }

  return (
    <div className="flex aspect-[21/9] w-full flex-col items-center justify-center gap-4 rounded-2xl border border-grey-200 bg-grey-050 p-8 text-center">
      <div>
        <p className="font-semibold text-navy-900">{label}</p>
        <p className="mx-auto mt-1 max-w-md text-sm text-grey-500">
          The interactive map loads only when you ask for it, so it doesn&apos;t cost load time
          or a third-party connection on every visit.
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={() => setLoaded(true)}
          className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-500"
        >
          Load interactive map
        </button>
        <Button href={mapsUrl} variant="secondary">
          Open in Google Maps
        </Button>
      </div>
    </div>
  );
}
