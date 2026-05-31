import type { Metadata } from "next";

import { PageHero } from "@/components/PageHero";
import { DestinationsExplorer } from "@/components/DestinationsExplorer";

export const metadata: Metadata = {
  title: "Destinations in Gujarat",
  description:
    "Dwarka, Sasan Gir, Diu, Junagadh, Somnath, and more—where Madhav Tours and Travels runs loops across Saurashtra and Kutch.",
};



export default function DestinationsPage() {
  return (
    <>
      <PageHero
        eyebrow="Gujarat"
        title="Places we build itineraries around"
        subtitle="These hubs connect by road in sensible loops—tell us your priorities on the travel plan form and we stitch the route."
        imageUrl="https://images.unsplash.com/photo-1524492412937-b280c8729d48?w=1920&q=80"
      />
      <section className="bg-[#0c1a2e] py-16 sm:py-24">
        <div className="site-shell">
          <DestinationsExplorer />
        </div>
      </section>
    </>
  );
}
