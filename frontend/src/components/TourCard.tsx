import Link from "next/link";
import type { Tour } from "@/lib/api";

const categoryLabel: Record<Tour["category"], string> = {
  adventure: "Adventure",
  cultural: "Cultural",
  relaxation: "Relaxation",
  wildlife: "Wildlife",
  city: "City",
};

export function TourCard({ tour }: { tour: Tour }) {
  return (
    <article className="tour-card-shine group flex flex-col overflow-hidden rounded-3xl border border-sky-100 bg-white/95 shadow-[0_14px_40px_-18px_rgba(14,116,144,0.35)] ring-1 ring-white/70 backdrop-blur-sm transition duration-500 hover:-translate-y-2 hover:shadow-[0_18px_46px_-16px_rgba(37,99,235,0.45)]">
      <Link href={`/tours/${tour._id}`} className="tour-img-wrap relative aspect-[16/10] w-full overflow-hidden bg-slate-200">
        <img
          src={tour.imageUrl}
          alt={tour.title}
          className="h-full w-full object-cover object-center transition duration-700 group-hover:scale-110"
          loading="lazy"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/75 via-slate-900/10 to-transparent opacity-70" />

        {/* Badges */}
        <div className="absolute left-3 top-3 z-10 flex gap-2">
          {tour.featured && (
            <span className="rounded-full bg-blue-600 px-3 py-1 text-[10px] font-bold uppercase text-white shadow-lg">
              Featured
            </span>
          )}
          <span className="rounded-full bg-black/50 px-3 py-1 text-[10px] font-bold uppercase text-white backdrop-blur-md">
            {categoryLabel[tour.category]}
          </span>
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-6">
        <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-blue-700">
          {tour.destination}
        </p>

        <h2 className="mt-2 line-clamp-1 font-serif text-[1.35rem] font-bold leading-tight text-slate-900">
          {tour.title}
        </h2>

        <p className="mt-3 line-clamp-2 flex-1 text-sm leading-relaxed text-slate-600">
          {tour.description}
        </p>

        <div className="mt-6 flex items-center justify-between border-t border-slate-100/90 pt-4">
          <div className="flex items-center text-xs text-slate-500">
            <span className="font-medium">{tour.durationDays} Days</span>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-bold uppercase text-slate-400">From</p>
            <p className="font-bold text-slate-900">₹{tour.priceFrom.toLocaleString("en-IN")}</p>
          </div>
        </div>
      </div>
    </article>
  );
}