import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getTourById } from "@/services/tourService";

type Props = { params: Promise<{ id: string }> };

const categoryLabel = {
  adventure: "Adventure",
  cultural: "Cultural",
  relaxation: "Relaxation",
  wildlife: "Wildlife",
  city: "City",
} as const;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const tour = await getTourById(id);
  if (!tour) return { title: "Tour | Madhav Tours and Travels" };
  return {
    title: `${tour.title} | Madhav Tours and Travels`,
    description: tour.description.slice(0, 160),
  };
}

export default async function TourPage({ params }: Props) {
  const { id } = await params;
  const tour = await getTourById(id);
  if (!tour) notFound();

  return (
    <article className="bg-[#0c1a2e]">
      <div className="relative h-[min(52vh,520px)] min-h-[300px] w-full">
        <Image src={tour.imageUrl} alt={tour.title} fill className="object-cover" priority sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c1a2e] via-[#0c1a2e]/60 to-transparent" />
        <div className="site-shell absolute bottom-0 left-0 right-0 pb-10">
          <Link href="/tours" className="text-sm font-medium text-[#2e7dab] transition hover:text-[#246994]">
            ← Back to all tours
          </Link>
          <p className="mt-4 text-sm font-semibold uppercase tracking-[0.15em] text-[#2e7dab]/90">
            {categoryLabel[tour.category]} · {tour.destination}
          </p>
          <h1 className="mt-2 max-w-3xl font-serif text-4xl font-medium text-white sm:text-5xl lg:text-6xl">{tour.title}</h1>
        </div>
      </div>

      <div className="site-shell py-14 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1fr_340px] lg:gap-16">
          <div>
            <p className="text-lg leading-relaxed text-slate-300 sm:text-xl">{tour.description}</p>
            <div className="mt-12 grid gap-6 sm:grid-cols-3">
              {[
                { label: "Duration", value: `${tour.durationDays} days` },
                { label: "Style", value: categoryLabel[tour.category] },
                { label: "Group size", value: "8–14 guests" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
                >
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#2e7dab]">{item.label}</p>
                  <p className="mt-2 font-medium text-white">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          <aside className="lg:pt-2">
            <div className="sticky top-24 rounded-2xl border border-[#2e7dab]/30 bg-gradient-to-b from-[#2e7dab]/10 to-transparent p-8 shadow-xl shadow-black/20">
              <p className="text-sm text-slate-400">From</p>
              <p className="mt-1 font-serif text-4xl text-white">${tour.priceFrom.toLocaleString()}</p>
              <p className="mt-1 text-sm text-slate-500">per person, sharing · indicative</p>
              <Link
                href="/travel-plan"
                className="mt-8 flex w-full items-center justify-center rounded-full bg-[#fdcb2d] py-3.5 text-sm font-bold text-[#0c1a2e] transition hover:bg-[#fde047]"
              >
                Request travel plan
              </Link>
              <p className="mt-4 text-center text-xs text-slate-500">We reply within one business day.</p>
            </div>
          </aside>
        </div>
      </div>
    </article>
  );
}
