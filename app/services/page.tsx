import type { Metadata } from "next";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { SectionHeading } from "@/components/sections/section-heading";
import { ServiceCard } from "@/components/sections/service-card";
import { getPublishedServices } from "@/lib/data/admin-catalog";

export const metadata: Metadata = {
  title: "Services VIP",
};

export default async function ServicesPage() {
  const services = await getPublishedServices();

  return (
    <main className="min-h-screen bg-ivory text-obsidian">
      <SiteHeader />
      <section className="px-6 pb-20 pt-36 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Catalogue"
            title="Services VIP configurables"
            description="Transferts aeroport, chauffeur business, mise a disposition et coordination evenementielle avec un niveau de service premium."
            dark
          />
          <div className="mt-12 grid gap-5 lg:grid-cols-2">
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
