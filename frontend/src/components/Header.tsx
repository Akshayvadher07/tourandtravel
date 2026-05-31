"use client";

import Link from "next/link";
import { Great_Vibes } from "next/font/google";
import { usePathname } from "next/navigation";
import { useState } from "react";

const brandScript = Great_Vibes({ weight: "400", subsets: ["latin"] });

const nav = [
  { href: "/tours", label: "Tours" },
  { href: "/destinations", label: "Destinations" },
  { href: "/travel-plan", label: "Travel plan" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <>
      {nav.map((item) => {
        const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href + "/"));
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={`relative py-1 transition duration-300 ${active ? "text-slate-900" : "text-slate-600 hover:text-slate-900"
              }`}
          >
            {item.label}
            {active && (
              <span
                className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-linear-to-r from-[#2e7dab] via-sky-200 to-[#2e7dab] shadow-[0_0_12px_rgba(46,125,171,0.45)]"
                aria-hidden
              />
            )}
          </Link>
        );
      })}
    </>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/40 bg-linear-to-r from-[#edf7ff]/92 via-[#f7fbff]/92 to-[#ebf6ff]/92 shadow-[0_10px_40px_-24px_rgba(14,116,144,0.55)] backdrop-blur-xl backdrop-saturate-150">
      <div className="header-glow-line pointer-events-none absolute inset-x-8 bottom-0 mx-auto h-px max-w-4xl bg-linear-to-r from-transparent via-[#2e7dab]/70 to-transparent sm:inset-x-12" />
      <div className="site-shell flex h-16 items-center justify-between gap-4 sm:h-17">
        <Link
          href="/"
          className={`${brandScript.className} text-center leading-tight text-slate-900 transition duration-300 hover:scale-[1.01] active:scale-[0.99] sm:text-left`}
          onClick={() => setOpen(false)}
        >
          <span className="block text-2xl sm:text-3xl">Madhav Tours and Travels</span>
          <span className="mt-0.5 block font-sans text-[10px] font-semibold uppercase tracking-[0.25em] text-[#2e7dab] sm:text-xs">
            Gujarat · India
          </span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium md:flex">
          <NavLinks />
          <Link href="/#why" className="text-slate-600 transition duration-300 hover:text-slate-900">
            Why us
          </Link>
          <Link
            href="/travel-plan"
            className="btn-shimmer rounded-full bg-[#2e7dab] px-5 py-2.5 text-white shadow-md shadow-[#2e7dab]/25 transition hover:bg-[#246994]"
          >
            <span className="font-semibold">Book travel plan</span>
          </Link>
        </nav>

        <div className="flex items-center gap-3 md:hidden">
          <Link
            href="/travel-plan"
            className="rounded-full bg-[#2e7dab] px-4 py-2 text-xs font-bold text-white shadow-md shadow-[#2e7dab]/20 transition active:scale-95"
            onClick={() => setOpen(false)}
          >
            Plan
          </Link>
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-300 text-slate-800 transition hover:border-[#2e7dab]/40 hover:bg-slate-100"
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
          >
            <span className="sr-only">Menu</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {open ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <>
                  <path d="M4 6h16M4 12h16M4 18h16" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div className="mobile-nav-panel border-t border-sky-200/60 bg-[#eaf4fb]/95 px-4 py-6 shadow-2xl shadow-sky-200/30 md:hidden">
          <nav className="flex flex-col gap-4 text-base font-medium">
            <NavLinks onNavigate={() => setOpen(false)} />
            <Link href="/#why" className="text-slate-600 transition hover:text-slate-900" onClick={() => setOpen(false)}>
              Why us
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
