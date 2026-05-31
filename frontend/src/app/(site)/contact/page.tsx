import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { TravelPlanForm } from "@/components/TravelPlanForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Reach Madhav Tours and Travels in Gujarat by phone, WhatsApp, or email—or submit a custom travel plan request.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="We are here for your Gujarat trip"
        subtitle="Call or message for a quick chat, or use the travel plan form for a detailed itinerary request."
        imageUrl="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1920&q=80"
      />
      <section className="bg-[#0c1a2e] py-16 sm:py-24">
        <div className="site-shell">
          <div className="grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
            <div>
              <h2 className="font-serif text-3xl text-white">Direct contact</h2>
              <ul className="mt-8 space-y-6 text-slate-300">
                <li>
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#2e7dab]">Email</p>
                  <a
                    href="mailto:kuldipvadher0007@gmail.com"
                    className="mt-1 inline-block text-lg text-white hover:text-[#fdcb2d]"
                  >
                    kuldipvadher0007@gmail.com
                  </a>
                </li>
                <li>
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#2e7dab]">Phone / WhatsApp</p>
                  <a href="tel:+917567696097" className="mt-1 inline-block text-lg text-white hover:text-[#fdcb2d]">
                    +91 75676 96097
                  </a>
                </li>
                <li>
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#2e7dab]">Location</p>
                  <p className="mt-1">Gir Somnath, Gujarat, India</p>
                </li>
              </ul>
              <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                <p className="text-sm leading-relaxed text-slate-400">
                  Need only a quick question answered? Message us anytime. For day-by-day routing and quotes, the form helps us
                  respond faster.
                </p>
              </div>
              <Link href="/travel-plan" className="mt-8 inline-flex text-sm font-semibold text-[#67e8f9] hover:text-white">
                Travel plan service page →
              </Link>
            </div>
            <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-transparent p-8 sm:p-10">
              <h3 className="mb-6 font-serif text-xl text-white">Request a custom travel plan</h3>
              <TravelPlanForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
