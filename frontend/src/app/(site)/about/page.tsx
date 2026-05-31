import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "About us",
  description:
    "Madhav Tours and Travels plans Gujarat tours from Gir Somnath—pilgrimage coasts, wildlife, and heritage towns.",
};

const milestones = [
  { year: "Roots", text: "Years of moving guests across Saurashtra—Safaris, temple towns, and Diu weekends." },
  { year: "Today", text: "Custom travel plans with clear estimates: you choose places and pace; we handle permits and drivers." },
  { year: "Focus", text: "One state done well—Gujarat road networks, seasons, and festival crowds inform every itinerary." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Madhav Tours and Travels"
        title="Gujarat specialists from Gir Somnath"
        subtitle="We are not a faceless marketplace—we plan routes we drive ourselves, from Dwarka darshan timings to Gir safari slots."
        imageUrl="https://images.unsplash.com/photo-1526772662000-3f88f10405ff?w=1920&q=80"
      />
      <section className="bg-[#0c1a2e] py-16 sm:py-24">
        <div className="site-shell">
          <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
            <div>
              <h2 className="font-serif text-3xl text-white sm:text-4xl">What we care about</h2>
              <ul className="mt-8 space-y-6 text-slate-300">
                <li className="flex gap-4">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#2e7dab]" />
                  <span>Honest drive times between Kathiawar towns—no impossible “same-day” miracles.</span>
                </li>
                <li className="flex gap-4">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#2e7dab]" />
                  <span>Transparent inclusions: safari permits, ferry tickets, and parking—spelled out up front.</span>
                </li>
                <li className="flex gap-4">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#2e7dab]" />
                  <span>Family-run stays and local meals where it makes sense for comfort and taste.</span>
                </li>
              </ul>
            </div>
            <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-transparent p-8 sm:p-10">
              <h3 className="font-serif text-2xl text-[#fdcb2d]">Quick facts</h3>
              <dl className="mt-8 grid grid-cols-2 gap-8">
                <div>
                  <dt className="text-xs uppercase tracking-wider text-slate-500">Home base</dt>
                  <dd className="mt-1 font-serif text-xl text-white">Gir Somnath</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wider text-slate-500">Coverage</dt>
                  <dd className="mt-1 font-serif text-xl text-white">All Gujarat</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wider text-slate-500">Signature loops</dt>
                  <dd className="mt-1 font-serif text-xl text-white">Dwarka–Somnath–Gir–Diu</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wider text-slate-500">Service</dt>
                  <dd className="mt-1 font-serif text-xl text-white">Travel plans</dd>
                </div>
              </dl>
            </div>
          </div>

          <div className="mt-24 border-t border-white/10 pt-20">
            <h2 className="font-serif text-3xl text-white sm:text-4xl">How we work</h2>
            <ol className="mt-12 space-y-10">
              {milestones.map((m) => (
                <li key={m.year} className="flex flex-col gap-2 border-l-2 border-[#2e7dab]/40 pl-8 sm:flex-row sm:gap-12">
                  <span className="font-serif text-2xl text-[#2e7dab] sm:w-28 sm:shrink-0">{m.year}</span>
                  <p className="text-lg text-slate-300">{m.text}</p>
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-20 flex flex-wrap justify-center gap-4">
            <Link
              href="/travel-plan"
              className="inline-flex rounded-full bg-[#fdcb2d] px-8 py-3.5 text-sm font-bold text-[#0c1a2e] transition hover:bg-[#fde047]"
            >
              Request a travel plan
            </Link>
            <Link
              href="/tours"
              className="inline-flex rounded-full border border-white/20 px-8 py-3.5 text-sm font-semibold text-white hover:bg-white/5"
            >
              Browse tours
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
