"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Destination } from "@/lib/api";
import { Reveal } from "@/components/Reveal";
import { getDestinations } from "@/services/destinationService";

function LoadingSkeleton() {
  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div
          key={i}
          className="animate-skeleton flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04]"
        >
          <div className="aspect-[4/3] bg-white/10" />
          <div className="space-y-3 p-6">
            <div className="h-5 w-2/5 rounded bg-white/10" />
            <div className="h-3 w-full rounded bg-white/10" />
            <div className="h-3 w-5/6 rounded bg-white/10" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function DestinationsExplorer() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    getDestinations()
      .then((list) => setDestinations(list))
      .catch((e: unknown) => {
        setErr(e instanceof Error ? e.message : "Failed to load destinations");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div>
        <p className="mb-6 text-sm text-slate-500">Loading destinations...</p>
        <LoadingSkeleton />
      </div>
    );
  }

  if (err) {
    return <p className="rounded-xl border border-red-400/40 bg-red-500/10 px-4 py-3 text-red-200">{err}</p>;
  }

  if (destinations.length === 0) {
    return <p className="text-slate-400">No destinations in the response.</p>;
  }

  return (
    <Reveal>
      <div className="stagger-grid grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {destinations.map((destination) => (
          <Link
            key={destination._id}
            href={destination.href || "/tours"}
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] shadow-lg shadow-black/20 transition duration-500 hover:-translate-y-2 hover:border-[#2e7dab]/45 hover:shadow-xl hover:shadow-[#2e7dab]/10"
          >
            <div className="relative aspect-[4/3]">
              <img
                src={destination.imageUrl}
                alt={destination.name}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                sizes="(max-width:768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c1a2e] via-transparent to-transparent opacity-90" />
            </div>
            <div className="absolute inset-x-0 bottom-0 p-6">
              <h2 className="font-serif text-2xl text-white">{destination.name}</h2>
              <p className="mt-2 text-sm text-slate-300">{destination.blurb}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#2e7dab]">
                See matching tours <span aria-hidden>→</span>
              </span>
            </div>
          </Link>
        ))}
      </div>
    </Reveal>
  );
}
