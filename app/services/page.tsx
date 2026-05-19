import type { Metadata } from "next";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { SectionHeading } from "@/components/sections/section-heading";
import { ServiceCard } from "@/components/sections/service-card";
import { getPublishedServices } from "@/lib/data/admin-catalog";

export const metadata: Metadata = {
  title: "Services VIP",
  description:
    "Transferts aeroport, chauffeur business, mise a disposition et transport evenementiel VIP au Maroc.",
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "Services VIP AYYI TOUR",
    description:
      "Des prestations de chauffeur prive et transport VIP pour entreprises, familles et delegations au Maroc.",
    url: "/services",
  },
};

export default async function ServicesPage() {
  const services = await getPublishedServices();

  return (
    <main className="min-h-screen bg-ivory text-obsidian">
      <SiteHeader />
      <section className="px-4 pb-16 pt-[7.5rem] sm:px-8 sm:pb-20 sm:pt-36 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Catalogue"
            title="Services VIP configurables"
            description="Transferts aeroport, chauffeur business, mise a disposition et coordination evenementielle avec un niveau de service premium."
            dark
          />
          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            {services.map((service) => (
              <div id={service.slug} key={service.slug}>
                <ServiceCard service={service} />
              </div>
            ))}
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
