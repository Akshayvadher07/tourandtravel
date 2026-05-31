import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { ToursExplorer } from "@/components/ToursExplorer";

export const metadata: Metadata = {
  title: "Gujarat tours",
  description: "Browse Dwarka, Sasan Gir, Diu, Junagadh, and full-circuit packages from Madhav Tours and Travels.",
};

export default function ToursPage() {
  return (
    <>
      <PageHero
        eyebrow="Gujarat catalog"
        title="Packages across Saurashtra & beyond"
        subtitle="Prices and durations load live — same data your travel plan requests use when we quote a custom route."
        imageUrl="https://images.unsplash.com/photo-1560807707-8cc99967e783?w=1920&q=80"
      />
      <section className="bg-[#0c1a2e] py-16 sm:py-20">
        <div className="site-shell">
          <ToursExplorer />
        </div>
      </section>
    </>
  );
}
