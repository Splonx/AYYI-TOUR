import type { Metadata } from "next";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { FleetCard } from "@/components/sections/fleet-card";
import { SectionHeading } from "@/components/sections/section-heading";
import { getAvailableFleet } from "@/lib/data/admin-catalog";

export const metadata: Metadata = {
  title: "Flotte Premium",
};

export default async function FleetPage() {
  const fleet = await getAvailableFleet();

  return (
    <main className="min-h-screen bg-obsidian text-ivory">
      <SiteHeader />
      <section className="px-6 pb-20 pt-36 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Garage VIP"
            title="Flotte premium pour chaque mission"
            description="Berline executive, van VIP et SUV premium: chaque vehicule est selectionne selon le confort attendu, le nombre de passagers et les bagages."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
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
