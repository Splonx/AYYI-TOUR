import type { Metadata } from "next";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { FleetCard } from "@/components/sections/fleet-card";
import { SectionHeading } from "@/components/sections/section-heading";
import { getAvailableFleet } from "@/lib/data/admin-catalog";

export const metadata: Metadata = {
  title: "Flotte Premium",
  description:
    "Flotte premium AYYI TOUR: berlines executive, vans VIP et SUV avec chauffeur prive au Maroc.",
  alternates: {
    canonical: "/fleet",
  },
  openGraph: {
    title: "Flotte premium AYYI TOUR",
    description:
      "Vehicules premium adaptes aux transferts aeroport, trajets business et missions privees au Maroc.",
    url: "/fleet",
  },
};

export default async function FleetPage() {
  const fleet = await getAvailableFleet();

  return (
    <main className="min-h-screen bg-obsidian text-ivory">
      <SiteHeader />
      <section className="px-4 pb-16 pt-[7.5rem] sm:px-8 sm:pb-20 sm:pt-36 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Garage VIP"
            title="Flotte premium pour chaque mission"
            description="Berline executive, van VIP et SUV premium: chaque vehicule est selectionne selon le confort attendu, le nombre de passagers et les bagages."
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {fleet.map((vehicle) => (
              <FleetCard key={vehicle.slug} vehicle={vehicle} />
            ))}
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
