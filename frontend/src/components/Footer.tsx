import Link from "next/link";
import { Great_Vibes } from "next/font/google";

const brandScript = Great_Vibes({ weight: "400", subsets: ["latin"] });

const explore = [
  { href: "/tours", label: "Gujarat packages" },
  { href: "/destinations", label: "Top places" },
  { href: "/travel-plan", label: "Travel plan" },
  { href: "/about", label: "About us" },
];

const company = [
  { href: "/contact", label: "Contact" },
  { href: "/#why", label: "Why us" },
];

export function Footer() {
  return (
    <footer className="border-t border-sky-200/70 bg-linear-to-br from-[#eef8ff] via-[#e7f4ff] to-[#dbeeff]">
      <div className="site-shell py-14 sm:py-16">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <p className={`${brandScript.className} text-3xl text-slate-900`}>Madhav Tours and Travels</p>
            <p className="mt-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#2e7dab]">Gir Somnath · Gujarat</p>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-slate-600">
              Experience unforgettable journeys across Gujarat—safaris in Sasan Gir, the Dwarka coast, Diu, Junagadh, and custom
              loops planned around your dates.
            </p>
            <p className="mt-4 text-sm text-slate-700">
              <a href="mailto:kuldipvadher0007@gmail.com" className="font-medium underline-offset-2 hover:underline">
                kuldipvadher0007@gmail.com
              </a>
              <span className="mx-2 text-slate-400">·</span>
              <a href="tel:+917567696097" className="font-medium underline-offset-2 hover:underline">
                +91 75676 96097
              </a>
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#2e7dab]">Explore</p>
            <ul className="mt-4 space-y-3 text-sm text-slate-600">
              {explore.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="footer-link transition hover:text-slate-900">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#2e7dab]">Company</p>
            <ul className="mt-4 space-y-3 text-sm text-slate-600">
              {company.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="footer-link transition hover:text-slate-900">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-teal-200/70 pt-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-slate-500">© {new Date().getFullYear()} Madhav Tours and Travels · Gujarat, India</p>

          </div>
        </div>
      </div>
    </footer>
  );
}
