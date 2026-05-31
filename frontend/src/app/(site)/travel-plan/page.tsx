import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { TravelPlanForm } from "@/components/TravelPlanForm";

export const metadata: Metadata = {
  title: "Travel plan service",
  description:
    "Tell Madhav Tours and Travels where you want to go in Gujarat—we will propose dates, routing, and pricing.",
};

export default function TravelPlanPage() {
  return (
    <>
      <PageHero
        eyebrow="Custom Gujarat trips"
        title="Travel plan service"
        subtitle="Share who is travelling, which places you want to cover, and your window of dates. We build Kathiawar and Saurashtra loops every week—Dwarka, Somnath, Sasan Gir, Diu, Junagadh, and beyond."
        imageUrl="https://images.unsplash.com/photo-1524492412937-b280c8729d48?w=1920&q=80"
      />
      <section className="bg-[#0c1a2e] py-16 sm:py-24">
        <div className="site-shell">
          <div className="grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
            <div>
              <h2 className="font-serif text-3xl text-white">How it works</h2>
              <ol className="mt-8 list-decimal space-y-4 pl-5 text-slate-300">
                <li>You submit this form with destinations and travel dates.</li>
                <li>We reply with a day-by-day route, stay class options, and an estimate.</li>
                <li>After you confirm, we book permits (e.g. Gir safari), vehicles, and hotels.</li>
              </ol>
              <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                <p className="text-sm font-semibold text-[#fdcb2d]">Prefer to talk first?</p>
                <p className="mt-2 text-sm text-slate-400">
                  Call or WhatsApp{" "}
                  <a href="tel:+917567696097" className="text-white underline-offset-2 hover:underline">
                    +91 75676 96097
                  </a>{" "}
                  or email{" "}
                  <a href="mailto:kuldipvadher0007@gmail.com" className="text-white underline-offset-2 hover:underline">
                    kuldipvadher0007@gmail.com
                  </a>
                  .
                </p>
                <p className="mt-3 text-sm text-slate-500">Based in Gir Somnath, Gujarat—serving all of Saurashtra and Kutch.</p>
              </div>
              <Link
                href="/tours"
                className="mt-8 inline-flex text-sm font-semibold text-[#67e8f9] transition hover:text-white"
              >
                Browse ready-made packages →
              </Link>
            </div>
            <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-transparent p-8 sm:p-10">
              <TravelPlanForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
