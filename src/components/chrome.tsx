"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { site, navigation } from "@/content/site";
import { asset } from "@/lib/asset";

export function DraftBanner() {
  return (
    <div className="bg-gold-500 text-navy-900">
      <div className="container-x flex flex-wrap items-center justify-center gap-x-3 gap-y-1 py-2 text-center text-xs font-semibold sm:text-sm">
        <span className="rounded-full bg-navy-900 px-2.5 py-0.5 text-[10px] uppercase tracking-wider text-gold-300">
          Draft
        </span>
        <span>Rough first draft for review — content, photos and fees are not final.</span>
      </div>
    </div>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const primary = navigation.slice(0, 8);

  return (
    <>
      <DraftBanner />
      <header className="sticky top-0 z-50 border-b border-grey-200 bg-white/85 backdrop-blur-md">
        <div className="container-x flex items-center justify-between gap-4 py-3">
          <Link href="/" className="flex items-center gap-3" aria-label={`${site.name} — home`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={asset("/images/brand/ssc-logo.jpg")}
              alt=""
              aria-hidden="true"
              width={44}
              height={44}
              className="h-11 w-11 rounded-full object-cover"
            />
            <span className="leading-tight">
              <span className="display block text-lg text-navy-900">Study Skills Center</span>
              <span className="block text-[10px] uppercase tracking-[0.16em] text-grey-500">
                {site.tagline}
              </span>
            </span>
          </Link>

          <nav aria-label="Primary" className="hidden xl:block">
            <ul className="flex items-center gap-1">
              {primary.map((item) => {
                const active = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={`rounded-full px-3 py-2 text-sm font-medium transition-colors ${
                        active ? "bg-blue-050 text-blue-600" : "text-grey-600 hover:text-navy-900"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
            <a
              href={`tel:${site.primaryPhone}`}
              className="rounded-full px-4 py-2 text-sm font-semibold text-navy-900 hover:text-blue-600"
            >
              {site.primaryPhone}
            </a>
            <Link
              href="/admissions"
              className="whitespace-nowrap rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-500"
            >
              Book a free demo
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="flex h-11 w-11 items-center justify-center rounded-lg border border-grey-200 xl:hidden"
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8">
              {open ? <path d="M4 4l12 12M16 4L4 16" /> : <path d="M3 6h14M3 10h14M3 14h14" />}
            </svg>
          </button>
        </div>

        {open && (
          <nav id="mobile-nav" aria-label="All pages" className="border-t border-grey-200 bg-white xl:hidden">
            <ul className="container-x grid grid-cols-2 gap-1 py-4 sm:grid-cols-3">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    aria-current={pathname === item.href ? "page" : undefined}
                    className="block rounded-lg px-3 py-3 text-sm font-medium text-grey-600 hover:bg-grey-050 hover:text-navy-900"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </header>
    </>
  );
}

export function MobileCTABar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-grey-200 bg-white/95 p-2 backdrop-blur lg:hidden">
      <div className="flex gap-2">
        <a
          href={`tel:${site.primaryPhone}`}
          className="flex min-h-[44px] flex-1 items-center justify-center rounded-full border border-grey-200 text-sm font-semibold text-navy-900"
        >
          Call
        </a>
        <a
          href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
            "Hi, I'd like to know more about classes at Study Skills Center."
          )}`}
          className="flex min-h-[44px] flex-1 items-center justify-center rounded-full border border-grey-200 text-sm font-semibold text-navy-900"
          rel="noopener noreferrer"
        >
          WhatsApp
        </a>
        <Link
          href="/admissions"
          className="flex min-h-[44px] flex-[1.4] items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white"
        >
          Free demo
        </Link>
      </div>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="on-dark bg-navy-900 pb-24 text-white lg:pb-0">
      <div className="container-x grid gap-10 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="display text-2xl">Study Skills Center</p>
          <p className="mt-1 text-xs uppercase tracking-[0.16em] text-gold-300">{site.tagline}</p>
          <p className="mt-4 text-sm text-white/70">
            {site.address.line1}
            <br />
            {site.address.line2}
            <br />
            {site.address.city} – {site.address.pin}
          </p>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-white/90">Explore</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {navigation.slice(1, 9).map((i) => (
              <li key={i.href}>
                <Link href={i.href} className="text-white/70 hover:text-white">
                  {i.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-white/90">Information</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {navigation.slice(9).map((i) => (
              <li key={i.href}>
                <Link href={i.href} className="text-white/70 hover:text-white">
                  {i.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-white/90">Get in touch</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {site.phones.map((p) => (
              <li key={p}>
                <a href={`tel:${p}`} className="text-white/70 hover:text-white">
                  {p}
                </a>
              </li>
            ))}
            <li>
              <a href={`mailto:${site.email}`} className="text-white/70 hover:text-white">
                {site.email}
              </a>
            </li>
          </ul>
          <div className="mt-5 flex gap-2">
            <a
              href={`https://wa.me/${site.whatsapp}`}
              className="rounded-full bg-gold-500 px-4 py-2 text-sm font-semibold text-navy-900"
              rel="noopener noreferrer"
            >
              WhatsApp us
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-wrap items-center justify-between gap-3 py-5 text-xs text-white/50">
          <p>© {new Date().getFullYear()} Study Skills Center, New Delhi. All rights reserved.</p>
          <p className="text-gold-300">Draft website — not for public release</p>
        </div>
      </div>
    </footer>
  );
}
