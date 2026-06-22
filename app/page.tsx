import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BriefcaseBusiness,
  CalendarCheck,
  Car,
  CheckCircle2,
  Clock,
  Gem,
  Luggage,
  Mail,
  MapPin,
  MessageCircle,
  Navigation,
  Phone,
  Plane,
  ShieldCheck,
  Sparkles,
  UserCheck,
  Users,
} from "lucide-react";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { FleetCard } from "@/components/sections/fleet-card";
import { SectionHeading } from "@/components/sections/section-heading";
import { fleet as defaultFleet } from "@/lib/data/fleet";
import { getAvailableFleet } from "@/lib/data/admin-catalog";
import { siteConfig } from "@/lib/site";
import type { Vehicle } from "@/types/domain";

export const metadata: Metadata = {
  title: "Transport VIP Agadir & Marrakech",
  description:
    "AYYI TOUR organise vos trajets premium a Agadir et Marrakech: chauffeur prive, transfert aeroport, transport VIP et service discret 24/7.",
  alternates: {
    canonical: siteConfig.url,
  },
  openGraph: {
    title: "Transport VIP Agadir & Marrakech | AYYI TOUR",
    description:
      "Chauffeur prive, transferts aeroport et trajets premium a Agadir, Marrakech et en region.",
    url: siteConfig.url,
  },
};

const publicFleetNames = new Set(["Ford Transit", "Skoda Superb"]);

function publicFleet(vehicles: Vehicle[]) {
  const sources = [...vehicles, ...defaultFleet];

  return Array.from(publicFleetNames)
    .map((name) => sources.find((vehicle) => vehicle.name === name))
    .filter((vehicle): vehicle is Vehicle => Boolean(vehicle));
}

const heroBadges = [
  { icon: Clock, label: "24/7" },
  { icon: UserCheck, label: "Chauffeur prive" },
  { icon: Plane, label: "Service aeroport" },
  { icon: MapPin, label: "Agadir - Marrakech" },
];

const trustItems = [
  { icon: Clock, label: "Ponctualite" },
  { icon: ShieldCheck, label: "Discretion" },
  { icon: Gem, label: "Confort premium" },
  { icon: UserCheck, label: "Chauffeurs professionnels" },
  { icon: CalendarCheck, label: "Reservation rapide" },
];

const services = [
  {
    icon: Plane,
    title: "Transfert aeroport",
    text: "Accueil clair, suivi des horaires et trajet fluide vers hotel, villa, residence ou rendez-vous.",
  },
  {
    icon: UserCheck,
    title: "Chauffeur prive",
    text: "Un chauffeur professionnel pour vos trajets business, prives ou VIP, avec conduite souple et discrete.",
  },
  {
    icon: CalendarCheck,
    title: "Mise a disposition",
    text: "Vehicule avec chauffeur reserve a l'heure, a la journee ou pour plusieurs etapes dans la region.",
  },
  {
    icon: Navigation,
    title: "Trajets interurbains",
    text: "Liaisons confortables entre Agadir, Marrakech et les destinations longue distance selon votre programme.",
  },
];

const bookingSteps = [
  {
    title: "Contactez-nous",
    text: "Envoyez un email, appelez ou contactez AYYI TOUR sur WhatsApp.",
  },
  {
    title: "Indiquez votre trajet",
    text: "Date, horaire, depart, destination, passagers et bagages suffisent.",
  },
  {
    title: "Votre chauffeur vous prend en charge",
    text: "Le trajet est confirme avec un vehicule adapte et un timing clair.",
  },
];

const zones = [
  "Agadir",
  "Marrakech",
  "Aeroport",
  "Region",
  "Trajets longue distance",
];

const whyChoose = [
  {
    icon: ShieldCheck,
    title: "Service discret",
    text: "Une presence sobre, adaptee aux clients prives, dirigeants et invites VIP.",
  },
  {
    icon: Car,
    title: "Vehicules confortables",
    text: "Ford Transit et Skoda Superb prepares pour les trajets courts, longs et aeroport.",
  },
  {
    icon: Clock,
    title: "Disponibilite 24/7",
    text: "Organisation possible pour arrivees tardives, departs matinaux et urgences.",
  },
  {
    icon: Sparkles,
    title: "Accompagnement personnalise",
    text: "Horaire, attente, bagages et itineraire sont ajustes a votre besoin reel.",
  },
  {
    icon: UserCheck,
    title: "Chauffeur professionnel",
    text: "Conduite fluide, attitude soignee et communication claire avant la prise en charge.",
  },
  {
    icon: Gem,
    title: "Experience haut de gamme",
    text: "Un service premium sans surcharge, centre sur le confort et la fiabilite.",
  },
];

export default async function Home() {
  const fleetResult = await getAvailableFleet();
  const fleet = publicFleet(fleetResult);

  return (
    <main className="min-h-screen bg-obsidian text-ivory">
      <SiteHeader />

      <section
        id="accueil"
        className="relative isolate min-h-[92svh] overflow-hidden px-4 pb-12 pt-28 sm:px-8 sm:pb-16 sm:pt-36 lg:px-10"
        aria-label="Transport VIP AYYI TOUR a Agadir et Marrakech"
      >
        <Image
          src="/images/vip-hero.png"
          alt="Vehicule premium pour transport VIP a Agadir et Marrakech"
          fill
          preload
          quality={82}
          sizes="100vw"
          className="object-cover object-[62%_center]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,8,12,0.98)_0%,rgba(7,9,13,0.92)_42%,rgba(8,10,14,0.6)_72%,rgba(8,10,14,0.36)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#090c11] to-transparent" />

        <div className="relative z-10 mx-auto flex min-h-[calc(92svh-7rem)] max-w-7xl items-center">
          <div className="max-w-4xl">
            <p className="luxury-reveal inline-flex items-center gap-2 rounded-full border border-gold/35 bg-black/40 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.22em] text-gold backdrop-blur-xl">
              Transport VIP au Maroc
            </p>
            <h1 className="luxury-reveal mt-6 max-w-4xl text-5xl font-semibold leading-[0.98] text-white sm:text-7xl lg:text-8xl">
              Transport VIP a Agadir & Marrakech
            </h1>
            <p className="luxury-reveal mt-6 max-w-2xl text-base leading-7 text-stone-200 sm:text-xl sm:leading-8">
              Chauffeur prive, transferts aeroport et trajets premium avec confort,
              ponctualite et discretion.
            </p>

            <div className="luxury-reveal mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={siteConfig.reservationMailto}
                className="premium-button inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-full bg-gold px-5 text-center text-xs font-bold uppercase tracking-[0.14em] text-black transition hover:bg-champagne sm:w-auto sm:px-6"
              >
                <Mail className="h-4 w-4" />
                Planifier un trajet
              </a>
              <a
                href={siteConfig.phoneHref}
                className="inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-full border border-white/20 bg-white/[0.06] px-5 text-center text-xs font-bold uppercase tracking-[0.14em] text-white backdrop-blur-md transition hover:border-gold hover:text-gold sm:w-auto sm:px-6"
              >
                <Phone className="h-4 w-4" />
                Appeler maintenant
              </a>
            </div>

            <div className="luxury-reveal mt-7 flex flex-wrap gap-2 sm:gap-3">
              {heroBadges.map((badge) => (
                <span
                  key={badge.label}
                  className="inline-flex items-center gap-2 rounded-full border border-white/14 bg-black/42 px-3 py-2 text-xs font-semibold text-stone-100 backdrop-blur-md"
                >
                  <badge.icon className="h-4 w-4 text-gold" />
                  {badge.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-[#090c11] px-4 py-5 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {trustItems.map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3"
            >
              <item.icon className="h-5 w-5 shrink-0 text-gold" />
              <p className="text-sm font-semibold text-white">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="services" className="bg-[#0b0f14] px-4 py-20 sm:px-8 sm:py-24 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
            <SectionHeading
              eyebrow="Services"
              title="Choisissez votre trajet, AYYI TOUR organise le reste"
              description="Des prestations simples a comprendre pour reserver vite: aeroport, chauffeur prive, mise a disposition ou longue distance."
            />
            <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
              <a
                href={siteConfig.reservationMailto}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-gold px-5 text-xs font-bold uppercase tracking-[0.14em] text-black transition hover:bg-champagne"
              >
                Planifier un trajet
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href={siteConfig.phoneHref}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-white/15 px-5 text-xs font-bold uppercase tracking-[0.14em] text-white transition hover:border-gold hover:text-gold"
              >
                <Phone className="h-4 w-4" />
                Appeler
              </a>
            </div>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {services.map((service) => (
              <article
                key={service.title}
                className="group min-h-full rounded-[1.4rem] border border-white/10 bg-[#121720]/86 p-6 shadow-[0_18px_70px_rgba(0,0,0,0.22)] transition duration-300 hover:-translate-y-1 hover:border-gold/45"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/35 bg-gold/[0.1] text-gold transition group-hover:bg-gold group-hover:text-black">
                  <service.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-3xl font-semibold leading-[1.08] text-white">
                  {service.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-stone-300">{service.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#111723] px-4 py-20 sm:px-8 sm:py-24 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
            <SectionHeading
              eyebrow="Comment reserver ?"
              title="Trois etapes, aucun formulaire"
              description="Le parcours est volontairement direct: vous contactez AYYI TOUR, vous partagez les details utiles, le chauffeur prend le relais."
            />
            <div className="grid gap-4 md:grid-cols-3">
              {bookingSteps.map((step, index) => (
                <article
                  key={step.title}
                  className="rounded-[1.4rem] border border-white/10 bg-white/[0.04] p-6"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gold text-sm font-bold text-black">
                    {index + 1}
                  </span>
                  <h3 className="mt-5 text-2xl font-semibold text-white">{step.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-stone-300">{step.text}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="flotte" className="bg-[#f3eadc] px-4 py-20 text-obsidian sm:px-8 sm:py-24 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
            <SectionHeading
              eyebrow="Flotte"
              title="Ford Transit ou Skoda Superb"
              description="Une flotte courte, lisible et premium pour choisir rapidement le vehicule adapte a votre trajet."
              dark
            />
            <div className="grid gap-3 sm:grid-cols-3">
              {[
                { icon: Users, label: "Familles et groupes" },
                { icon: BriefcaseBusiness, label: "Business et VIP" },
                { icon: Luggage, label: "Aeroport et bagages" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-black/10 bg-white px-4 py-4 shadow-sm"
                >
                  <item.icon className="h-5 w-5 text-gold" />
                  <p className="mt-3 text-sm font-bold text-obsidian">{item.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {fleet.map((vehicle) => (
              <FleetCard key={vehicle.id} vehicle={vehicle} tone="light" />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#0b0f14] px-4 py-20 sm:px-8 sm:py-24 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
            <SectionHeading
              eyebrow="Zones couvertes"
              title="Agadir, Marrakech et region"
              description="AYYI TOUR couvre les transferts aeroport, les trajets locaux et les deplacements longue distance avec chauffeur prive."
            />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {zones.map((zone) => (
                <article
                  key={zone}
                  className="rounded-[1.25rem] border border-white/10 bg-white/[0.04] p-5 transition hover:-translate-y-1 hover:border-gold/45"
                >
                  <MapPin className="h-5 w-5 text-gold" />
                  <p className="mt-4 text-2xl font-semibold text-white">{zone}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="pourquoi-nous" className="bg-[#111723] px-4 py-20 sm:px-8 sm:py-24 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
            <SectionHeading
              eyebrow="Pourquoi nous"
              title="Un service haut de gamme, sobre et efficace"
              description="AYYI TOUR privilegie ce qui compte vraiment: ponctualite, confort, discretion et une reservation rapide."
            />
            <div className="grid gap-4 sm:grid-cols-2">
              {whyChoose.map((item) => (
                <article
                  key={item.title}
                  className="rounded-[1.4rem] border border-white/10 bg-white/[0.04] p-5 transition hover:-translate-y-1 hover:border-gold/45"
                >
                  <item.icon className="h-6 w-6 text-gold" />
                  <h3 className="mt-4 text-2xl font-semibold text-white">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-stone-300">{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="bg-[#f3eadc] px-4 py-20 text-obsidian sm:px-8 sm:py-24 lg:px-10">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[1.8rem] border border-black/10 bg-[#0b0f14] p-6 text-white shadow-[0_28px_90px_rgba(0,0,0,0.28)] sm:p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-gold">
                Contact direct
              </p>
              <h2 className="mt-5 max-w-3xl text-4xl font-semibold leading-[1.02] sm:text-6xl">
                Besoin d&apos;un transport VIP aujourd&apos;hui ?
              </h2>
              <p className="mt-5 max-w-2xl leading-7 text-stone-300">
                Partagez votre trajet par email, telephone ou WhatsApp. Nous vous repondons
                avec une organisation claire et un vehicule adapte.
              </p>
            </div>

            <div className="grid gap-3">
              <a
                href={siteConfig.reservationMailto}
                className="premium-button inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-gold px-5 text-xs font-bold uppercase tracking-[0.14em] text-black transition hover:bg-champagne"
              >
                <Mail className="h-4 w-4" />
                Planifier un trajet
              </a>
              <a
                href={siteConfig.phoneHref}
                className="inline-flex min-h-12 items-center justify-center gap-3 rounded-full border border-white/15 bg-white/[0.04] px-5 text-xs font-bold uppercase tracking-[0.14em] text-white transition hover:border-gold hover:text-gold"
              >
                <Phone className="h-4 w-4" />
                Appeler maintenant
              </a>
              <Link
                href={siteConfig.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center gap-3 rounded-full border border-gold/35 bg-gold/[0.08] px-5 text-xs font-bold uppercase tracking-[0.14em] text-gold transition hover:bg-gold hover:text-black"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp
              </Link>
            </div>
          </div>

          <div className="mt-8 grid gap-3 border-t border-white/10 pt-6 text-sm text-stone-300 sm:grid-cols-3">
            <a href={siteConfig.phoneHref} className="flex items-center gap-3 hover:text-gold">
              <Phone className="h-4 w-4 text-gold" />
              {siteConfig.phone}
            </a>
            <a
              href={siteConfig.reservationMailto}
              className="flex items-center gap-3 break-all hover:text-gold"
            >
              <Mail className="h-4 w-4 shrink-0 text-gold" />
              {siteConfig.reservationEmail}
            </a>
            <p className="flex items-center gap-3">
              <CheckCircle2 className="h-4 w-4 text-gold" />
              Reponse rapide
            </p>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
