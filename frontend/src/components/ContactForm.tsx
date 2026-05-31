"use client";

import { useState } from "react";

export function ContactForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
  }

  if (sent) {
    return (
      <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-8 text-center">
        <p className="font-serif text-xl text-white">Thanks for reaching out</p>
        <p className="mt-3 text-slate-300">
          This demo does not send email yet. Wire this form to your API or a service like Resend / SendGrid when you are ready.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <label className="block">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#2e7dab]">Name</span>
          <input
            required
            name="name"
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
        <span className="text-xs font-semibold uppercase tracking-wider text-[#2e7dab]">Rough dates or season</span>
        <input
          name="dates"
          type="text"
          className="mt-2 w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-[#2e7dab]/50 focus:ring-2 focus:ring-[#2e7dab]/30"
          placeholder="e.g. June 2026, or Autumn"
        />
      </label>
      <label className="block">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#2e7dab]">Message</span>
        <textarea
          required
          name="message"
          rows={5}
          className="mt-2 w-full resize-y rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-[#2e7dab]/50 focus:ring-2 focus:ring-[#2e7dab]/30"
          placeholder="Destinations, pace, budget range, anything we should know…"
        />
      </label>
      <button
        type="submit"
        className="w-full rounded-full bg-[#2e7dab] py-3.5 text-sm font-bold text-white transition hover:bg-[#246994] sm:w-auto sm:px-12"
      >
        Send message
      </button>
    </form>
  );
}
