import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CalendarCheck, CheckCircle2 } from "lucide-react";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { SectionHeading } from "@/components/sections/section-heading";
import { ServiceCard } from "@/components/sections/service-card";
import { services as defaultServices } from "@/lib/data/services";
import { getPublishedServices } from "@/lib/data/admin-catalog";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Services VIP",
  description:
    "Services de transport VIP a Agadir et Marrakech: service aeroport, chauffeur prive, transfert prive et mise a disposition.",
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "Services VIP AYYI TOUR",
    description:
      "Transport VIP Agadir, chauffeur prive Marrakech, service aeroport Agadir et transport prive Maroc.",
    url: "/services",
  },
};

const serviceHighlights = [
  "Demande traitee directement par email ou telephone",
  "Chauffeur professionnel confirme avant le trajet",
  "Vehicule adapte au nombre de passagers et aux bagages",
];

export default async function ServicesPage() {
  const servicesResult = await getPublishedServices();
  const services = servicesResult.length > 0 ? servicesResult : defaultServices;

  return (
    <main className="min-h-screen bg-obsidian text-ivory">
      <SiteHeader />
      <section className="relative overflow-hidden px-4 pb-16 pt-32 sm:px-8 sm:pb-20 sm:pt-40 lg:px-10">
        <div className="absolute inset-0 bg-[linear-gradient(140deg,rgba(210,171,103,0.2),transparent_32%,rgba(105,129,111,0.14)_68%,transparent)]" />
        <div className="relative mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <SectionHeading
              eyebrow="Services VIP"
              title="Des prestations claires pour chaque trajet important"
              description="AYYI TOUR organise vos deplacements premium avec chauffeur prive a Agadir, Marrakech et en region: service aeroport, transfert prive, mise a disposition et trajets professionnels."
            />
            <div className="surface-panel rounded-3xl p-6 text-sm leading-7 text-stone-300">
              <CalendarCheck className="mb-4 h-6 w-6 text-gold" />
              Aucun formulaire a remplir: envoyez votre demande par email et recevez une
              reponse claire pour planifier votre trajet.
              <a
                href={siteConfig.reservationMailto}
                className="mt-5 inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-gold px-5 text-xs font-bold uppercase tracking-[0.16em] text-black transition hover:bg-champagne"
              >
                Planifier un trajet
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {services.map((service) => (
              <div id={service.slug} key={service.id}>
                <ServiceCard service={service} />
              </div>
            ))}
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {serviceHighlights.map((highlight) => (
              <div key={highlight} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-5 text-sm leading-6 text-stone-300">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                {highlight}
              </div>
            ))}
          </div>

          <div className="mt-10 flex justify-center">
            <Link
              href="/fleet"
              className="inline-flex min-h-12 items-center justify-center gap-3 rounded-full border border-gold/40 px-6 text-xs font-bold uppercase tracking-[0.16em] text-gold transition hover:bg-gold hover:text-black"
            >
              Decouvrir la flotte
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
