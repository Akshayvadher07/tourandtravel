import Link from "next/link";

const points = [
  {
    title: "Gujarat-first routing",
    body: "We stitch Dwarka, Somnath, Gir, Diu, and Junagadh into sensible road loops with realistic drive times.",
    icon: "◎",
  },
  {
    title: "Safari & permits",
    body: "Gir gypsy slots and park rules change often—we book windows and brief you before every safari.",
    icon: "◇",
  },
  {
    title: "Custom travel plans",
    body: "Tell us dates and pace; we send a day-by-day plan and estimate before you lock anything in.",
    icon: "◆",
  },
];

export function WhySection() {
  return (
    <section
      id="why"
      className="relative scroll-mt-20 overflow-hidden border-t border-teal-200/60 bg-linear-to-b from-[#eefaf7] via-[#e7f5f2] to-[#dff0ec] py-20 sm:py-28"
    >
      <div className="pointer-events-none absolute inset-0 opacity-[0.2]">
        <div
          className="absolute -left-1/4 top-0 h-[120%] w-1/2 rounded-full blur-[100px]"
          style={{ background: "radial-gradient(circle, rgba(249,115,22,0.45) 0%, transparent 70%)" }}
        />
        <div
          className="absolute -right-1/4 bottom-0 h-full w-1/2 rounded-full blur-[90px]"
          style={{ background: "radial-gradient(circle, rgba(20,184,166,0.35) 0%, transparent 70%)" }}
        />
      </div>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-[#2e7dab]/50 to-transparent" />
      <div className="site-shell relative">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="font-serif text-3xl text-slate-900 sm:text-4xl lg:text-5xl">Why travel with Madhav</h2>
            <p className="mt-4 max-w-xl text-lg text-slate-600">
              Based in Gir Somnath with years on Saurashtra roads—we know where to stay, when to move, and how to avoid rush-hour temple queues.
            </p>
          </div>
          <Link
            href="/about"
            className="group inline-flex items-center gap-1 text-sm font-semibold text-[#2e7dab] transition duration-300 hover:gap-2 hover:text-[#2563eb]"
          >
            Read our story
            <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
              →
            </span>
          </Link>
        </div>
        <ul className="mt-14 grid gap-6 sm:grid-cols-3 lg:mt-16 lg:gap-8">
          {points.map((p) => (
            <li
              key={p.title}
              className="why-card-glow group relative overflow-hidden rounded-2xl border border-teal-200/70 bg-linear-to-b from-white/70 to-teal-50/40 p-8 shadow-lg shadow-teal-100/40 transition duration-500 hover:-translate-y-1 hover:border-[#2e7dab]/50"
            >
              <span
                className="inline-block font-serif text-2xl text-[#2e7dab]/85 transition duration-500 group-hover:scale-110 group-hover:text-[#2e7dab]"
                aria-hidden
              >
                {p.icon}
              </span>
              <h3 className="mt-4 font-serif text-xl text-slate-900 transition group-hover:text-[#2e7dab]">{p.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600 transition group-hover:text-slate-700">{p.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
