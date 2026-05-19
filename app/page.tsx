import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  BriefcaseBusiness,
  CalendarCheck,
  Car,
  Clock,
  Crown,
  Plane,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { BookingForm } from "@/components/sections/booking-form";
import { FleetCard } from "@/components/sections/fleet-card";
import { SectionHeading } from "@/components/sections/section-heading";
import { ServiceCard } from "@/components/sections/service-card";
import { getAvailableFleet, getPublishedServices } from "@/lib/data/admin-catalog";

const stats = [
  { value: "24/7", label: "Disponibilite chauffeur" },
  { value: "VIP", label: "Accueil aeroport & hotel" },
  { value: "100%", label: "Reservation privee" },
];

const promise = [
  {
    icon: ShieldCheck,
    title: "Discretion absolue",
    text: "Un service premium pense pour dirigeants, familles et delegations.",
  },
  {
    icon: Clock,
    title: "Ponctualite maitrisee",
    text: "Suivi des vols, marge operationnelle et coordination chauffeur.",
  },
  {
    icon: Sparkles,
    title: "Experience soignee",
    text: "Vehicules impeccables, accueil elegant et confort cabine haut niveau.",
  },
];

export default async function Home() {
  const [services, fleet] = await Promise.all([getPublishedServices(), getAvailableFleet()]);

  return (
    <main className="min-h-screen bg-obsidian text-ivory">
      <SiteHeader />

      <section
        className="relative min-h-[100svh] overflow-hidden pt-20 sm:min-h-[92vh] sm:pt-24"
        aria-label="Flotte de transport VIP devant un hotel premium"
      >
        <Image
          src="/images/vip-hero.png"
          alt=""
          fill
          preload
          quality={82}
          sizes="100vw"
          className="object-cover object-[62%_center] sm:object-center"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,5,5,0.92)_0%,rgba(5,5,5,0.76)_42%,rgba(5,5,5,0.95)_100%)] sm:bg-[linear-gradient(90deg,rgba(5,5,5,0.98)_0%,rgba(5,5,5,0.86)_34%,rgba(5,5,5,0.42)_68%,rgba(5,5,5,0.2)_100%)]" />
        <div className="absolute inset-0 bg-gold/[0.04]" />
        <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-obsidian to-transparent" />

        <div className="relative z-10 mx-auto flex min-h-[calc(100svh-5rem)] max-w-7xl items-center px-4 py-12 sm:min-h-[calc(92vh-6rem)] sm:px-8 sm:py-16 lg:px-10">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex max-w-full items-center gap-3 border border-gold/35 bg-black/45 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-gold sm:mb-8 sm:px-4 sm:text-xs sm:tracking-[0.32em]">
              <Crown className="h-4 w-4" />
              Transport Service VIP
            </div>
            <h1 className="max-w-4xl text-4xl font-semibold leading-[1.05] text-white sm:text-6xl lg:text-7xl">
              AYYI TOUR Transport Service VIP
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-stone-200 sm:mt-7 sm:text-xl sm:leading-8">
              Chauffeur prive, transferts aeroport, mise a disposition et
              flotte executive pour vos deplacements haut de gamme au Maroc.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/services"
                className="inline-flex h-12 w-full items-center justify-center gap-3 bg-gold px-5 text-center text-xs font-bold uppercase tracking-[0.14em] text-black transition hover:bg-champagne sm:w-auto sm:px-6 sm:text-sm sm:tracking-[0.18em]"
              >
                Voir les services
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="https://wa.me/212672508363"
                className="inline-flex h-12 w-full items-center justify-center border border-white/20 px-5 text-center text-xs font-bold uppercase tracking-[0.14em] text-white transition hover:border-gold hover:text-gold sm:w-auto sm:px-6 sm:text-sm sm:tracking-[0.18em]"
                target="_blank"
                rel="noopener noreferrer"
                title="WhatsApp : +212 672 508 363"
              >
                Contactez-nous via WhatsApp
              </Link>
            </div>
            <div className="mt-10 grid max-w-2xl grid-cols-1 divide-y divide-white/15 border-y border-white/15 sm:mt-12 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
              {stats.map((item) => (
                <div key={item.label} className="py-4 sm:px-4 sm:py-5 sm:first:pl-0">
                  <p className="text-2xl font-semibold text-gold">{item.value}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.12em] text-stone-300 sm:tracking-[0.16em]">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-obsidian px-4 py-16 sm:px-8 sm:py-24 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Signature AYYI TOUR"
            title="Un standard VIP du premier contact a l'arrivee"
            description="Chaque trajet est prepare comme une mission: vehicule adapte, chauffeur confirme, details passagers et niveau de service attendus."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {promise.map((item) => (
              <div
                key={item.title}
                className="border border-white/10 bg-white/[0.035] p-5 sm:p-7"
              >
                <item.icon className="h-7 w-7 text-gold" />
                <h3 className="mt-6 text-xl font-semibold text-white">
                  {item.title}
                </h3>
                <p className="mt-4 leading-7 text-stone-300">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ivory px-4 py-16 text-obsidian sm:px-8 sm:py-24 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Services"
            title="Des prestations premium pour clients exigeants"
            description="Des trajets prives orchestres avec precision, confort et discretion pour chaque moment important."
            dark
          />
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {services.slice(0, 3).map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#11100e] px-4 py-16 sm:px-8 sm:py-24 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
            <SectionHeading
              eyebrow="Flotte"
              title="Vehicules premium, selectionnes par usage"
              description="Sedan executive, van VIP et SUV premium: une flotte elegante, confortable et adaptee a chaque deplacement."
            />
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {fleet.map((vehicle) => (
                <FleetCard key={vehicle.slug} vehicle={vehicle} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-black px-4 py-16 sm:px-8 sm:py-20 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Plane, label: "Transfert aeroport" },
            { icon: BriefcaseBusiness, label: "Business travel" },
            { icon: CalendarCheck, label: "Evenements VIP" },
            { icon: Car, label: "Mise a disposition" },
          ].map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-4 border border-gold/20 bg-gold/[0.04] p-5 text-sm font-semibold uppercase tracking-[0.16em] text-stone-100"
            >
              <item.icon className="h-5 w-5 text-gold" />
              {item.label}
            </div>
          ))}
        </div>
      </section>

      <section id="reservation" className="scroll-mt-24 bg-ivory px-4 py-16 text-obsidian sm:px-8 sm:py-20 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-gold sm:tracking-[0.32em]">
              Reservation
            </p>
            <h2 className="mt-4 text-3xl font-semibold leading-tight sm:text-5xl">
              Preparez votre trajet VIP
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-stone-700 sm:text-lg sm:leading-8">
              Envoyez les details de votre trajet sur WhatsApp: date, horaire,
              lieu de prise en charge, destination, passagers et bagages.
            </p>
          </div>
          <BookingForm services={services} />
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
