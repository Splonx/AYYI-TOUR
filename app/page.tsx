import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  Clock,
  Crown,
  Gem,
  HelpCircle,
  Mail,
  MapPin,
  MessageCircle,
  Navigation,
  Phone,
  Plane,
  Quote,
  ShieldCheck,
  Sparkles,
  Star,
} from "lucide-react";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { FleetCard } from "@/components/sections/fleet-card";
import { SectionHeading } from "@/components/sections/section-heading";
import { ServiceCard } from "@/components/sections/service-card";
import { fleet as defaultFleet } from "@/lib/data/fleet";
import { services as defaultServices } from "@/lib/data/services";
import { getAvailableFleet, getPublishedServices } from "@/lib/data/admin-catalog";
import { siteConfig } from "@/lib/site";
import type { Vehicle } from "@/types/domain";

export const metadata: Metadata = {
  title: "AYYI TOUR Transport Service VIP",
  description:
    "Transport VIP Agadir, chauffeur prive Marrakech, service aeroport Agadir et transport prive au Maroc avec AYYI TOUR.",
  alternates: {
    canonical: siteConfig.url,
  },
  openGraph: {
    title: "AYYI TOUR Transport Service VIP",
    description:
      "Chauffeur prive, service aeroport et flotte premium pour vos trajets VIP a Agadir, Marrakech et en region.",
    url: siteConfig.url,
  },
};

const publicFleetNames = new Set(["Ford Transit", "Skoda Superb"]);

function publicFleet(vehicles: Vehicle[]) {
  const selected = vehicles.filter((vehicle) => publicFleetNames.has(vehicle.name));
  return selected.length > 0 ? selected : defaultFleet;
}

const trustBadges = [
  { icon: BriefcaseBusiness, label: "Chauffeur prive" },
  { icon: Plane, label: "Service aeroport" },
  { icon: MapPin, label: "Agadir & Marrakech" },
  { icon: Clock, label: "Disponible 24/7" },
];

const signatureStats = [
  { value: "24/7", label: "Coordination chauffeur" },
  { value: "2", label: "Vehicules premium" },
  { value: "100%", label: "Service prive" },
];

const whyChoose = [
  {
    icon: Clock,
    title: "Ponctualite",
    text: "Suivi des horaires, marge operationnelle et chauffeur confirme avant chaque prise en charge.",
  },
  {
    icon: ShieldCheck,
    title: "Discretion",
    text: "Une presence sobre, professionnelle et adaptee aux clients exigeants.",
  },
  {
    icon: Gem,
    title: "Confort premium",
    text: "Vehicules soignes, habitacle confortable et conduite fluide sur chaque trajet.",
  },
  {
    icon: Sparkles,
    title: "Service personnalise",
    text: "Itineraire, attente, bagages et niveau d'accompagnement ajustes a votre programme.",
  },
];

const experienceSteps = [
  {
    title: "Prise en charge personnalisee",
    text: "Votre trajet est prepare avec les informations essentielles: horaire, lieu exact, bagages et preferences.",
  },
  {
    title: "Service fluide",
    text: "Le chauffeur coordonne l'arrivee, l'accueil et le trajet pour eviter toute friction.",
  },
  {
    title: "Trajet securise",
    text: "Conduite souple, vehicule entretenu et itineraire adapte aux conditions de circulation.",
  },
  {
    title: "Accompagnement haut de gamme",
    text: "Une attention constante aux details pour une experience calme, elegante et fiable.",
  },
];

const zones = ["Agadir", "Marrakech", "Region", "Aeroport", "Transferts interurbains"];

const testimonials = [
  {
    name: "Direction executive",
    context: "Transfert aeroport - Agadir",
    text: "Accueil precis, chauffeur ponctuel et vehicule parfaitement presente. Un niveau de service tres rassurant pour nos invites.",
  },
  {
    name: "Client prive",
    context: "Marrakech - Agadir",
    text: "Trajet confortable, conduite douce et communication claire avant le depart. Experience discrete et vraiment premium.",
  },
  {
    name: "Organisation evenementielle",
    context: "Mission VIP - Marrakech",
    text: "La coordination a ete fluide du premier contact jusqu'a l'arrivee. Exactement le standard attendu pour un transport haut de gamme.",
  },
];

const faqs = [
  {
    question: "Comment reserver ?",
    answer:
      "Envoyez votre demande par email a reservation@ayyi-tour.com ou contactez AYYI TOUR par telephone ou WhatsApp. L'equipe confirme les disponibilites et les details du trajet.",
  },
  {
    question: "Proposez-vous les transferts aeroport ?",
    answer:
      "Oui. AYYI TOUR assure les transferts aeroport a Agadir, Marrakech et en region avec suivi des horaires et prise en charge personnalisee.",
  },
  {
    question: "Est-ce disponible 24/7 ?",
    answer:
      "Oui. Les trajets peuvent etre organises pour les arrivees tardives, les departs matinaux et les besoins professionnels sensibles.",
  },
  {
    question: "Puis-je reserver pour un groupe ?",
    answer:
      "Oui. Le Ford Transit permet d'organiser les trajets pour familles, groupes, equipes et delegations avec bagages.",
  },
  {
    question: "Intervenez-vous entre Agadir et Marrakech ?",
    answer:
      "Oui. AYYI TOUR couvre les trajets interurbains entre Agadir, Marrakech et plusieurs destinations de la region.",
  },
];

const contactCards = [
  {
    icon: Phone,
    label: "Telephone",
    value: siteConfig.phone,
    href: siteConfig.phoneHref,
  },
  {
    icon: Mail,
    label: "Email",
    value: siteConfig.reservationEmail,
    href: siteConfig.reservationMailto,
  },
  {
    icon: MapPin,
    label: "Zone",
    value: "Agadir, Marrakech et region",
  },
] as const;

export default async function Home() {
  const [servicesResult, fleetResult] = await Promise.all([
    getPublishedServices(),
    getAvailableFleet(),
  ]);
  const services = servicesResult.length > 0 ? servicesResult : defaultServices;
  const fleet = publicFleet(fleetResult);

  return (
    <main className="min-h-screen bg-obsidian text-ivory">
      <SiteHeader />

      <section
        className="relative min-h-[100svh] overflow-hidden px-4 pb-20 pt-28 sm:px-8 sm:pb-24 sm:pt-36 lg:px-10"
        aria-label="AYYI TOUR transport VIP au Maroc"
      >
        <Image
          src="/images/vip-hero.png"
          alt="Flotte de transport VIP AYYI TOUR devant un hotel premium"
          fill
          preload
          quality={82}
          sizes="100vw"
          className="object-cover object-[60%_center]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(95deg,rgba(6,8,12,0.96)_0%,rgba(9,12,17,0.92)_34%,rgba(10,15,22,0.56)_70%,rgba(10,15,22,0.32)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_12%,rgba(210,171,103,0.28),transparent_42%)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0b0f14] to-transparent" />

        <div className="relative z-10 mx-auto grid min-h-[calc(100svh-7rem)] max-w-7xl gap-8 lg:grid-cols-[1fr_0.48fr] lg:items-end">
          <div className="max-w-4xl min-w-0">
            <div className="luxury-reveal mb-7 inline-flex max-w-full items-center gap-3 rounded-full border border-gold/35 bg-black/38 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-gold shadow-[0_18px_70px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:text-xs sm:tracking-[0.24em]">
              <Crown className="h-4 w-4" />
              Transport Service VIP
            </div>
            <h1 className="luxury-reveal max-w-4xl text-5xl font-semibold leading-[0.98] text-white sm:text-7xl">
              AYYI TOUR
              <br />
              Chauffeur prive
            </h1>
            <p className="luxury-reveal mt-6 max-w-2xl text-base leading-7 text-stone-200 sm:text-xl sm:leading-8">
              Service aeroport, transferts interurbains et accompagnement premium a Agadir,
              Marrakech et en region. Une execution calme pour chaque trajet sensible.
            </p>

            <div className="luxury-reveal mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={siteConfig.reservationMailto}
                className="premium-button inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-full bg-gold px-5 text-center text-xs font-bold uppercase tracking-[0.14em] text-black transition hover:bg-champagne sm:w-auto sm:px-6 sm:text-sm"
              >
                Planifier un trajet
                <Navigation className="h-4 w-4" />
              </a>
              <Link
                href="/fleet"
                className="inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-full border border-white/20 bg-white/[0.04] px-5 text-center text-xs font-bold uppercase tracking-[0.14em] text-white backdrop-blur-md transition hover:border-gold hover:text-gold sm:w-auto sm:px-6 sm:text-sm"
              >
                Decouvrir la flotte
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="luxury-reveal mt-8 flex flex-wrap gap-2 sm:gap-3">
              {trustBadges.map((badge) => (
                <span
                  key={badge.label}
                  className="inline-flex items-center gap-2 rounded-full border border-white/14 bg-black/40 px-3 py-2 text-xs font-semibold text-stone-100 backdrop-blur-md"
                >
                  <badge.icon className="h-4 w-4 text-gold" />
                  {badge.label}
                </span>
              ))}
            </div>
          </div>

          <aside className="surface-panel luxury-reveal ring-glow rounded-[1.7rem] p-6 sm:p-7">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-gold">
              Signature AYYI TOUR
            </p>
            <div className="mt-5 grid gap-4 border-y border-white/10 py-5">
              {signatureStats.map((item) => (
                <div key={item.label} className="flex items-end justify-between gap-4">
                  <p className="text-4xl font-semibold leading-none text-white">{item.value}</p>
                  <p className="text-right text-[11px] uppercase tracking-[0.14em] text-stone-300">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-5 text-sm leading-7 text-stone-300">
              Chauffeur confirme, horaires suivis, vehicule prepare. Un service concu pour
              les clients exigeants et les agendas precis.
            </p>
          </aside>
        </div>
      </section>

      <section id="services" className="relative bg-[#0b0f14] px-4 py-20 sm:px-8 sm:py-24 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              eyebrow="Services"
              title="Prestations VIP claires, fiables et discretes"
              description="Des solutions de transport prive pour l'aeroport, les rendez-vous, les transferts et la mise a disposition avec chauffeur."
            />
            <Link
              href="/services"
              className="inline-flex min-h-11 w-fit items-center justify-center gap-2 rounded-full border border-gold/35 px-5 text-xs font-bold uppercase tracking-[0.16em] text-gold transition hover:bg-gold hover:text-black"
            >
              Tous les services
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {services.slice(0, 4).map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#111723] px-4 py-20 sm:px-8 sm:py-24 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <SectionHeading
              eyebrow="Flotte"
              title="Deux vehicules, deux usages, un meme standard VIP"
              description="Ford Transit pour groupes et familles, Skoda Superb pour trajets executive. Presentation sobre, entretien rigoureux et confort constant."
            />
            <div className="grid gap-5 md:grid-cols-2">
              {fleet.map((vehicle) => (
                <FleetCard key={vehicle.id} vehicle={vehicle} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f2e7d7] px-4 py-20 text-obsidian sm:px-8 sm:py-24 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
            <SectionHeading
              eyebrow="Pourquoi nous choisir"
              title="Une execution calme pour les trajets importants"
              description="Le service repose sur une promesse simple: arriver a l'heure, dans le confort, avec un accompagnement discret et professionnel."
              dark
            />
            <div className="grid gap-4 sm:grid-cols-2">
              {whyChoose.map((item) => (
                <article
                  key={item.title}
                  className="group rounded-3xl border border-black/10 bg-white p-5 transition duration-500 hover:-translate-y-1 hover:border-gold/50"
                >
                  <item.icon className="h-6 w-6 text-gold transition group-hover:scale-110" />
                  <h3 className="mt-4 text-2xl font-semibold text-obsidian">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-stone-700">{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="experience" className="bg-[#0a0f16] px-4 py-20 text-ivory sm:px-8 sm:py-24 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.86fr_1.14fr] lg:items-center">
          <div className="relative min-h-[420px] overflow-hidden rounded-[2rem] border border-white/10 bg-black">
            <Image
              src="/fleet/skoda-superb.jpg"
              alt="Skoda Superb AYYI TOUR pour trajet VIP"
              fill
              loading="lazy"
              quality={82}
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/12 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white sm:p-8">
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-gold">
                Experience client
              </p>
              <h2 className="mt-4 text-4xl font-semibold leading-[1.02] sm:text-6xl">
                Un trajet prepare, pas improvise
              </h2>
            </div>
          </div>

          <div>
            <SectionHeading
              eyebrow="Experience"
              title="Un accompagnement fluide du premier message a l'arrivee"
              description="AYYI TOUR transforme chaque trajet en sequence simple, maitrisee et confortable."
            />
            <div className="mt-8 grid gap-4">
              {experienceSteps.map((step, index) => (
                <article
                  key={step.title}
                  className="grid gap-4 rounded-3xl border border-white/10 bg-white/[0.03] p-5 sm:grid-cols-[52px_1fr]"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/40 bg-gold/10 text-sm font-bold text-gold">
                    0{index + 1}
                  </span>
                  <div>
                    <h3 className="text-2xl font-semibold text-white">{step.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-stone-300">{step.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f5eadc] px-4 py-20 text-obsidian sm:px-8 sm:py-24 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <SectionHeading
              eyebrow="Zone d'intervention"
              title="Agadir, Marrakech et transferts interurbains"
              description="Service aeroport, trajets hotels, villas, evenements, circuits prives et liaisons entre villes selon votre programme."
              dark
            />
            <div className="grid gap-4 sm:grid-cols-2">
              {zones.map((zone) => (
                <article
                  key={zone}
                  className="rounded-3xl border border-black/10 bg-white p-5 transition hover:-translate-y-1 hover:border-gold/50"
                >
                  <MapPin className="h-5 w-5 text-gold" />
                  <p className="mt-4 text-3xl font-semibold text-obsidian">{zone}</p>
                  <p className="mt-3 text-sm leading-6 text-stone-700">
                    Organisation sur demande avec chauffeur prive, timing clair et vehicule
                    adapte.
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#0b1018] px-4 py-20 sm:px-8 sm:py-24 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Temoignages"
            title="Des retours clients sobres, mais tres clairs"
            description="Ponctualite, discretion et confort reviennent dans chaque experience AYYI TOUR."
          />
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {testimonials.map((testimonial) => (
              <article
                key={testimonial.name}
                className="ring-glow rounded-3xl border border-white/10 bg-white/[0.04] p-6 transition hover:-translate-y-1 hover:border-gold/40"
              >
                <div className="flex items-center justify-between gap-4">
                  <Quote className="h-7 w-7 text-gold" />
                  <div className="flex gap-1 text-gold" aria-label="Avis 5 etoiles">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star key={index} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="mt-6 leading-7 text-stone-200">{testimonial.text}</p>
                <div className="mt-8 border-t border-white/10 pt-5">
                  <p className="font-semibold text-white">{testimonial.name}</p>
                  <p className="mt-1 text-sm text-stone-400">{testimonial.context}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#efe3d2] px-4 py-20 text-obsidian sm:px-8 sm:py-24 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.76fr_1.24fr]">
          <SectionHeading
            eyebrow="FAQ"
            title="Questions frequentes"
            description="Les reponses essentielles avant de planifier un chauffeur prive VIP a Agadir, Marrakech ou en region."
            dark
          />
          <div className="grid gap-4">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-3xl border border-black/10 bg-white p-5 shadow-sm transition hover:border-gold"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-bold text-obsidian">
                  <span>{faq.question}</span>
                  <HelpCircle className="h-5 w-5 shrink-0 text-gold transition group-open:rotate-45" />
                </summary>
                <p className="mt-4 leading-7 text-stone-700">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="relative overflow-hidden bg-[#0b0f14] px-4 py-20 sm:px-8 sm:py-24 lg:px-10">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(210,171,103,0.2),transparent_32%,rgba(255,255,255,0.05)_67%,transparent)]" />
        <div className="relative mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.12fr_0.88fr] lg:items-stretch">
          <div className="surface-panel rounded-[1.8rem] p-6 sm:p-8 lg:p-10">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-gold">Contact VIP</p>
            <h2 className="mt-5 max-w-3xl text-4xl font-semibold leading-[1.02] text-white sm:text-6xl">
              Planifiez un trajet premium avec chauffeur prive
            </h2>
            <p className="mt-5 max-w-2xl leading-7 text-stone-300">
              Indiquez votre horaire, votre point de depart, votre destination et le nombre
              de passagers. AYYI TOUR vous repond avec une organisation claire et adaptee.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={siteConfig.reservationMailto}
                className="premium-button inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-gold px-5 text-xs font-bold uppercase tracking-[0.14em] text-black transition hover:bg-champagne sm:px-6 sm:text-sm"
              >
                <Mail className="h-4 w-4" />
                Planifier un trajet
              </a>
              <Link
                href={siteConfig.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center gap-3 rounded-full border border-white/15 bg-white/[0.04] px-5 text-xs font-bold uppercase tracking-[0.14em] text-white transition hover:border-gold hover:text-gold sm:px-6 sm:text-sm"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp
              </Link>
            </div>
          </div>

          <div className="grid gap-4">
            {contactCards.map((item) => {
              const content = (
                <>
                  <item.icon className="h-5 w-5 text-gold" />
                  <p className="mt-5 text-xs font-bold uppercase tracking-[0.18em] text-stone-500">
                    {item.label}
                  </p>
                  <p className="mt-2 break-words text-2xl font-semibold text-white">{item.value}</p>
                </>
              );

              if ("href" in item) {
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    className="group rounded-3xl border border-white/10 bg-white/[0.045] p-5 transition hover:-translate-y-1 hover:border-gold/45"
                  >
                    {content}
                  </a>
                );
              }

              return (
                <div
                  key={item.label}
                  className="rounded-3xl border border-white/10 bg-white/[0.045] p-5"
                >
                  {content}
                </div>
              );
            })}

            <div className="rounded-3xl border border-gold/20 bg-gold/[0.06] p-5 text-sm leading-7 text-stone-300">
              <CheckCircle2 className="mb-4 h-5 w-5 text-gold" />
              Sans formulaire sur le site: le contact se fait directement par email,
              telephone ou WhatsApp pour garder un echange clair et rapide.
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
