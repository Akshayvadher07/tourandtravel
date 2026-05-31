import Link from "next/link";


export function Hero() {
  return (
    <section className="relative min-h-[85vh] overflow-hidden bg-[#faf7f2] sm:min-h-[90vh]">

      {/* Background photo */}
      <div
        className="absolute inset-0 scale-105 bg-cover bg-center"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1400&q=80)",
          borderRadius: "inherit",
        }}
      />

      {/* Light warm overlay — fades from transparent top-right to solid bottom-left */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#f8fbff]/10 via-[#f8fbff]/35 to-[#0b1c33]/62" style={{ borderRadius: "inherit" }} />

      {/* Ambient gold orb */}
      <div className="pointer-events-none absolute -right-16 top-1/4 h-80 w-80 rounded-full bg-[#c9a227]/18 blur-[90px]" />



      {/* Main content */}
      <div className="site-shell relative flex min-h-[85vh] flex-col justify-end pb-16 pt-28 sm:min-h-[90vh] sm:pb-20 lg:pb-28">
        <div className="max-w-2xl rounded-3xl border border-white/25 bg-white/18 p-7 shadow-[0_18px_55px_-24px_rgba(15,23,42,0.65)] backdrop-blur-md sm:p-9">

        {/* Headline */}
        <h1
          className="max-w-2xl text-[2.25rem] font-normal leading-[1.1] tracking-tight text-[#111827] sm:text-5xl lg:text-[3.2rem]"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          Go where the world still feels{" "}
          <em className="italic text-[#5c5546]">wide open</em>.
        </h1>

        {/* Subtitle */}
        <p className="mt-5 max-w-md text-[15px] font-light leading-relaxed text-slate-800/90">
          Hand-picked routes, thoughtful pacing, and guides who know the backstreets as well as the highlights.
        </p>

        {/* CTA buttons */}
        <div className="mt-7 flex flex-wrap gap-3">
          <Link
            href="/tours"
            className="group inline-flex items-center gap-2 rounded-full bg-[#1c1a14] px-7 py-3 text-sm font-medium text-[#faf7f2] transition hover:-translate-y-0.5 hover:bg-[#2e2b1e]"
          >
            Browse tours
            <span className="transition-transform group-hover:translate-x-0.5">→</span>
          </Link>
          <Link
            href="/destinations"
            className="inline-flex items-center rounded-full border border-black/20 bg-transparent px-7 py-3 text-sm font-medium text-[#1c1a14] transition hover:-translate-y-0.5 hover:border-[#c9a227] hover:bg-[#c9a227]/06"
          >
            Explore regions
          </Link>
        </div>
        </div>
      </div>
    </section>
  );
}