import Link from "next/link";
import { Hero } from "@/components/Hero";
import { TourCard } from "@/components/TourCard";
import { WhySection } from "@/components/WhySection";
import { Reveal } from "@/components/Reveal";
import { getFeaturedTours } from "@/services/tourService";

export default async function Home() {
  let tours: Awaited<ReturnType<typeof getFeaturedTours>> = [];
  let error: string | null = null;
  try {
    tours = await getFeaturedTours();
  } catch (e) {
    error = e instanceof Error ? e.message : "Something went wrong loading tours.";
  }

  const preview = tours.slice(0, 3);

  return (
    <>
      <Hero />
      <section className="relative border-y border-sky-200/60 bg-linear-to-b from-[#eef6fc] via-[#e8f2fa] to-[#deeaf6] py-20">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(46,125,171,0.18),transparent)]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-[#d8e8f4]/70 to-transparent" />
        <div className="site-shell relative">
          <Reveal>
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="font-serif text-3xl text-slate-900 sm:text-4xl">Featured Gujarat packages</h2>
                <p className="mt-3 max-w-xl text-slate-600">
                  Dwarka, Somnath, Sasan Gir, Diu, Junagadh, and full circuits—pricing loads live from our tour catalog.
                </p>
              </div>
              <Link
                href="/tours"
                className="btn-shimmer group inline-flex w-fit items-center rounded-full border border-[#2e7dab]/60 bg-[#dbeafe] px-5 py-2.5 text-sm font-semibold text-[#2e7dab] shadow-md shadow-sky-200/30 transition hover:border-[#2e7dab]/90 hover:bg-[#bfdbfe]"
              >
                <span className="flex items-center gap-2">
                  View all tours
                  <span aria-hidden className="transition group-hover:translate-x-1">→</span>
                </span>
              </Link>
            </div>
            {error ? (
              <p className="mt-12 rounded-xl border border-red-300/60 bg-red-50 px-4 py-3 text-red-700">{error}</p>
            ) : (
              <div className="stagger-grid mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {preview.map((tour) => (
                  <TourCard key={tour._id} tour={tour} />
                ))}
              </div>
            )}
          </Reveal>
        </div>
      </section>
      <WhySection />
      <section className="relative overflow-hidden py-20 sm:py-28">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30 transition duration-700"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=1920&q=80)",
          }}
        />
        <div className="cta-aurora" aria-hidden />
        <div className="absolute inset-0 bg-linear-to-r from-[#0f172a]/78 via-[#1e4a6e]/68 to-[#2e7dab]/72" />
        <Reveal>
          <div className="site-shell-narrow relative text-center">
            <h2 className="font-serif text-3xl text-white drop-shadow-md sm:text-4xl">Plan your Gujarat trip</h2>
            <p className="mt-4 text-lg text-cyan-50/95 drop-shadow">
              Use our travel plan form—we reply with a suggested itinerary and estimate, not a hard sell.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/travel-plan"
                className="btn-shimmer btn-glow-hover inline-flex rounded-full bg-[#fdcb2d] px-8 py-3.5 text-sm font-bold text-[#0c1a2e] shadow-xl shadow-[#fdcb2d]/25 transition hover:bg-[#fde047]"
              >
                <span>Request a travel plan</span>
              </Link>
              <Link
                href="/about"
                className="inline-flex rounded-full border border-cyan-100/70 bg-white/15 px-8 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition hover:border-[#67e8f9] hover:bg-white/25 hover:shadow-lg"
              >
                Our story
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
