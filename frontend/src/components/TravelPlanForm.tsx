"use client";

import { useEffect, useState } from "react";
import { createTravelPlan } from "@/services/travelPlanService";
import { getDestinations } from "@/services/destinationService";
import type { Destination } from "@/lib/api";

type FormState = "idle" | "submitting" | "success";

export function TravelPlanForm() {
  const [state, setState] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loadingDestinations, setLoadingDestinations] = useState(true);

  useEffect(() => {
    getDestinations()
      .then((list) => setDestinations(list))
      .catch((err: unknown) => {
        setErrorMessage(err instanceof Error ? err.message : "Failed to load destinations.");
      })
      .finally(() => setLoadingDestinations(false));
  }, []);

  function toggleDestination(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMessage(null);
    const form = e.currentTarget;
    const fd = new FormData(form);
    const fullName = String(fd.get("fullName") ?? "").trim();
    const email = String(fd.get("email") ?? "").trim();
    const phone = String(fd.get("phone") ?? "").trim();
    const travelDates = String(fd.get("travelDates") ?? "").trim();
    const message = String(fd.get("message") ?? "").trim();
    const adults = Math.max(1, parseInt(String(fd.get("adults")), 10) || 1);
    const children = Math.max(0, parseInt(String(fd.get("children")), 10) || 0);

    if (!fullName || !email) {
      setErrorMessage("Please enter your name and email.");
      return;
    }

    setState("submitting");
    setErrorMessage(null);
    try {
      await createTravelPlan({
        fullName,
        email,
        phone,
        destinations: [...selected].map((slug) => destinations.find((d) => d.slug === slug)?.name ?? slug),
        travelDates,
        adults,
        children,
        message,
      });
      form.reset();
      setSelected(new Set());
      setState("success");
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong.");
      setState("idle");
    }
  }

  if (state === "success") {
    return (
      <div className="rounded-2xl border border-emerald-500/35 bg-emerald-500/10 p-8 text-center">
        <p className="font-serif text-xl text-white">Travel plan request received</p>
        <p className="mt-3 text-slate-300">
          We will review your Gujarat preferences and contact you shortly with a suggested route and estimate.
        </p>
        <button
          type="button"
          className="mt-6 text-sm font-semibold text-[#67e8f9] underline-offset-4 hover:underline"
          onClick={() => setState("idle")}
        >
          Submit another request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {errorMessage && (
        <p className="rounded-xl border border-red-400/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">{errorMessage}</p>
      )}

      <div className="grid gap-6 sm:grid-cols-2">
        <label className="block">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#2e7dab]">Full name</span>
          <input
            required
            name="fullName"
            type="text"
            autoComplete="name"
            className="mt-2 w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-white outline-none ring-[#2e7dab]/0 transition placeholder:text-slate-600 focus:border-[#2e7dab]/50 focus:ring-2 focus:ring-[#2e7dab]/30"
            placeholder="Your name"
          />
        </label>
        <label className="block">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#2e7dab]">Email</span>
          <input
            required
            name="email"
            type="email"
            autoComplete="email"
            className="mt-2 w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-[#2e7dab]/50 focus:ring-2 focus:ring-[#2e7dab]/30"
            placeholder="you@example.com"
          />
        </label>
      </div>

      <label className="block">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#2e7dab]">Phone / WhatsApp</span>
        <input
          name="phone"
          type="tel"
          autoComplete="tel"
          className="mt-2 w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-[#2e7dab]/50 focus:ring-2 focus:ring-[#2e7dab]/30"
          placeholder="+91 …"
        />
      </label>

      <fieldset>
        <legend className="text-xs font-semibold uppercase tracking-wider text-[#2e7dab]">Gujarat places you want covered</legend>
        <p className="mt-1 text-sm text-slate-400">Select any that apply—we will weave them into a sensible route.</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {loadingDestinations ? (
            <p className="text-sm text-slate-400">Loading destination options...</p>
          ) : (
            destinations.map((destination) => {
              const on = selected.has(destination.slug);
              return (
                <button
                  key={destination._id}
                  type="button"
                  onClick={() => toggleDestination(destination.slug)}
                  className={`rounded-full border px-3 py-1.5 text-sm font-medium transition ${
                    on
                      ? "border-[#fdcb2d] bg-[#fdcb2d]/15 text-[#fef9c3]"
                      : "border-white/20 bg-white/4 text-slate-300 hover:border-[#2e7dab]/50"
                  }`}
                >
                  {destination.name}
                </button>
              );
            })
          )}
        </div>
      </fieldset>

      <div className="grid gap-6 sm:grid-cols-2">
        <label className="block">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#2e7dab]">Travel dates or season</span>
          <input
            name="travelDates"
            type="text"
            className="mt-2 w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-[#2e7dab]/50 focus:ring-2 focus:ring-[#2e7dab]/30"
            placeholder="e.g. 15–22 Nov 2026"
          />
        </label>
        <div className="grid grid-cols-2 gap-4">
          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#2e7dab]">Adults</span>
            <input
              name="adults"
              type="number"
              min={1}
              defaultValue={2}
              className="mt-2 w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-white outline-none focus:border-[#2e7dab]/50 focus:ring-2 focus:ring-[#2e7dab]/30"
            />
          </label>
          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#2e7dab]">Children</span>
            <input
              name="children"
              type="number"
              min={0}
              defaultValue={0}
              className="mt-2 w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-white outline-none focus:border-[#2e7dab]/50 focus:ring-2 focus:ring-[#2e7dab]/30"
            />
          </label>
        </div>
      </div>

      <label className="block">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#2e7dab]">Notes</span>
        <textarea
          name="message"
          rows={5}
          className="mt-2 w-full resize-y rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-[#2e7dab]/50 focus:ring-2 focus:ring-[#2e7dab]/30"
          placeholder="Budget range, flight city, hotels vs homestay, pace, medical or dietary needs…"
        />
      </label>

      <button
        type="submit"
        disabled={state === "submitting"}
        className="w-full rounded-full bg-[#fdcb2d] py-3.5 text-sm font-bold text-[#0c1a2e] shadow-lg shadow-[#fdcb2d]/20 transition hover:bg-[#fde047] disabled:opacity-60 sm:w-auto sm:px-12"
      >
        {state === "submitting" ? "Sending…" : "Request travel plan"}
      </button>
    </form>
  );
}
