"use client";

import { useEffect, useMemo, useState } from "react";
import { TourCard } from "@/components/TourCard";
import { Reveal } from "@/components/Reveal";
import type { Tour } from "@/lib/api";
import { getTours } from "@/services/tourService";

function LoadingSkeleton() {
  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div
          key={i}
          className="animate-skeleton flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04]"
        >
          <div className="aspect-[16/10] bg-white/10" />
          <div className="space-y-3 p-6">
            <div className="h-3 w-1/3 rounded bg-white/10" />
            <div className="h-5 w-4/5 rounded bg-white/10" />
            <div className="h-3 w-full rounded bg-white/10" />
            <div className="h-3 w-5/6 rounded bg-white/10" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function ToursExplorer() {
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    getTours()
      .then((list) => {
        const sorted = [...list].sort((a, b) => Number(b.featured) - Number(a.featured));
        setTours(sorted);
      })
      .catch((e: unknown) => {
        setErr(e instanceof Error ? e.message : "Failed to load tours");
      })
      .finally(() => setLoading(false));
  }, []);

  const indiaFirst = useMemo(() => {
    const idx = tours.findIndex((t) => /sasan|gir|gujarat/i.test(`${t.destination} ${t.title}`));
    if (idx <= 0) return tours;
    const copy = [...tours];
    const [g] = copy.splice(idx, 1);
    return [g, ...copy];
  }, [tours]);

  if (loading) {
    return (
      <div>
        <p className="mb-6 text-sm text-slate-500">Loading catalog…</p>
        <LoadingSkeleton />
      </div>
    );
  }
  if (err) {
    return (
      <p className="rounded-xl border border-red-400/40 bg-red-500/10 px-4 py-3 text-red-200">
        {err}
      </p>
    );
  }
  if (tours.length === 0) {
    return <p className="text-slate-400">No tours in the response.</p>;
  }

  return (
    <>
      <Reveal>
        <div className="stagger-grid grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {indiaFirst.map((tour) => (
            <TourCard key={tour._id} tour={tour} />
          ))}
        </div>
      </Reveal>
    </>
  );
}
