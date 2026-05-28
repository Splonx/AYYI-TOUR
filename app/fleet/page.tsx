import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, Car, CheckCircle2, Gem, Luggage, Users } from "lucide-react";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { FleetCard } from "@/components/sections/fleet-card";
import { SectionHeading } from "@/components/sections/section-heading";
import { fleet as defaultFleet } from "@/lib/data/fleet";
import { getAvailableFleet } from "@/lib/data/admin-catalog";
import { siteConfig } from "@/lib/site";
import type { Vehicle } from "@/types/domain";

export const metadata: Metadata = {
  title: "Flotte Premium",
  description:
    "Flotte premium AYYI TOUR: Ford Transit et Skoda Superb avec chauffeur prive pour Agadir, Marrakech et les transferts VIP.",
  alternates: {
    canonical: "/fleet",
  },
  openGraph: {
    title: "Flotte premium AYYI TOUR",
    description:
      "Ford Transit et Skoda Superb pour transport VIP, service aeroport et chauffeur prive au Maroc.",
    url: "/fleet",
  },
};

const publicFleetNames = new Set(["Ford Transit", "Skoda Superb"]);

function publicFleet(vehicles: Vehicle[]) {
  const selected = vehicles.filter((vehicle) => publicFleetNames.has(vehicle.name));

  return selected.length > 0 ? selected : defaultFleet;
}

export default async function FleetPage() {
  const fleetResult = await getAvailableFleet();
  const fleet = publicFleet(fleetResult);

  return (
    <main className="min-h-screen bg-obsidian text-ivory">
      <SiteHeader />
      <section className="relative overflow-hidden px-4 pb-16 pt-32 sm:px-8 sm:pb-20 sm:pt-40 lg:px-10">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(201,162,74,0.15),transparent_34%,rgba(255,255,255,0.04)_72%,transparent)]" />
        <div className="relative mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
            <SectionHeading
              eyebrow="Flotte VIP"
              title="Ford Transit et Skoda Superb, selectionnes pour le confort"
              description="Une flotte courte, lisible et premium: van VIP pour groupes et berline executive pour trajets prives, professionnels et service aeroport."
            />
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { icon: Users, label: "Jusqu'a 7 places" },
                { icon: Luggage, label: "Bagages optimises" },
                { icon: Gem, label: "Confort premium" },
              ].map((item) => (
                <div key={item.label} className="border border-white/10 bg-white/[0.04] p-5">
                  <item.icon className="h-5 w-5 text-gold" />
                  <p className="mt-4 text-sm font-semibold text-white">{item.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {fleet.map((vehicle) => (
              <FleetCard key={vehicle.id} vehicle={vehicle} />
            ))}
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            {fleet.map((vehicle) => (
              <article key={`${vehicle.id}-detail`} className="grid overflow-hidden border border-white/10 bg-white/[0.04] md:grid-cols-[0.95fr_1.05fr]">
                <div className="relative min-h-[260px] bg-black">
                  <Image
                    src={vehicle.imageUrl || "/fleet/ford-transit.jpg"}
                    alt={`${vehicle.name} AYYI TOUR`}
                    fill
                    loading="lazy"
                    quality={82}
                    sizes="(min-width: 1024px) 45vw, 100vw"
                    className="object-cover transition duration-700 hover:scale-[1.04]"
                  />
                </div>
                <div className="p-6">
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-gold">
                    {vehicle.category}
                  </p>
                  <h2 className="mt-4 text-3xl font-semibold text-white">{vehicle.name}</h2>
                  <p className="mt-4 text-sm leading-7 text-stone-300">
                    {vehicle.longDescription || vehicle.description}
                  </p>
                  <div className="mt-5 grid gap-3 text-sm text-stone-300">
                    <span className="flex items-center gap-3">
                      <CheckCircle2 className="h-4 w-4 text-gold" />
                      Vehicule premium entretenu et prepare avant mission
                    </span>
                    <span className="flex items-center gap-3">
                      <Car className="h-4 w-4 text-gold" />
                      Adapte aux trajets aeroport, business et interurbains
                    </span>
                  </div>
                  <a
                    href={siteConfig.reservationMailto}
                    className="mt-6 inline-flex min-h-11 items-center justify-center gap-2 bg-gold px-4 text-xs font-bold uppercase tracking-[0.16em] text-black transition hover:bg-champagne"
                  >
                    Demander un trajet
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
