import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  BriefcaseBusiness,
  CalendarCheck,
  Car,
  Clock,
  Crown,
  Gem,
  HelpCircle,
  Luggage,
  MapPin,
  Navigation,
  Plane,
  Quote,
  ShieldCheck,
  Sparkles,
  Star,
} from "lucide-react";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { AnimatedStats } from "@/components/sections/animated-stats";
import { FleetCard } from "@/components/sections/fleet-card";
import { SectionHeading } from "@/components/sections/section-heading";
import { ServiceCard } from "@/components/sections/service-card";
import { getAvailableFleet, getPublishedServices } from "@/lib/data/admin-catalog";
import { siteConfig } from "@/lib/site";

const stats = [
  { value: "24/7", label: "Disponibilite chauffeur" },
  { value: "3", label: "Axes Agadir Marrakech Maroc" },
  { value: "100%", label: "Service prive" },
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

const localSeoHighlights = [
  {
    city: "Agadir",
    text: "Transferts aeroport Agadir Al Massira, hotels premium, marina, Taghazout et missions business dans le Souss.",
  },
  {
    city: "Marrakech",
    text: "Accueil Menara, palaces, golfs, villas privees, evenements VIP et trajets inter-villes avec chauffeur.",
  },
  {
    city: "Maroc",
    text: "Coordination chauffeur prive pour itineraires Agadir, Marrakech, Essaouira, Casablanca et destinations sur mesure.",
  },
];

const testimonials = [
  {
    name: "Direction evenementielle",
    context: "Delegation internationale - Marrakech",
    text: "Coordination impeccable, chauffeur ponctuel et vehicule parfaitement presente. L'experience correspond a un standard executive.",
  },
  {
    name: "Client corporate",
    context: "Transfert aeroport - Agadir",
    text: "Prise en charge discrete, communication claire et trajet fluide apres un vol tardif. Service tres professionnel.",
  },
  {
    name: "Famille privee",
    context: "Mise a disposition - Maroc",
    text: "Vehicule confortable, conduite souple et grande flexibilite sur les horaires. Une vraie prestation premium.",
  },
];

const faqs = [
  {
    question: "Puis-je reserver un chauffeur prive a Agadir ou Marrakech ?",
    answer:
      "Oui. AYYI TOUR organise les transferts aeroport, trajets business, mises a disposition et itineraires prives a Agadir, Marrakech et dans plusieurs villes du Maroc.",
  },
  {
    question: "Comment confirmer une reservation VIP ?",
    answer:
      "Envoyez les details par email a reservation@ayyi-tour.com ou contactez l'equipe via WhatsApp. AYYI TOUR confirme les disponibilites rapidement.",
  },
  {
    question: "Le service est-il adapte aux entreprises et delegations ?",
    answer:
      "Oui. Les prestations sont pensees pour dirigeants, equipes corporate, delegations, familles VIP et evenements demandant ponctualite, confort et discretion.",
  },
  {
    question: "Les trajets inter-villes sont-ils possibles ?",
    answer:
      "Oui. Les chauffeurs peuvent assurer des trajets Agadir Marrakech, Marrakech Essaouira, Casablanca et autres itineraires sur demande.",
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
          <div className="max-w-3xl min-w-0">
            <div className="luxury-reveal mb-6 inline-flex max-w-full items-center gap-3 border border-gold/35 bg-black/45 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-gold shadow-[0_18px_70px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:mb-8 sm:px-4 sm:text-xs sm:tracking-[0.32em]">
              <Crown className="h-4 w-4" />
              Transport Service VIP
            </div>
            <h1 className="luxury-reveal max-w-full text-3xl font-semibold leading-[1.08] text-white sm:text-6xl lg:text-7xl">
              AYYI TOUR Transport Service VIP
            </h1>
            <p className="luxury-reveal mt-6 max-w-2xl text-base leading-7 text-stone-200 sm:mt-7 sm:text-xl sm:leading-8">
              Chauffeur prive, transferts aeroport, mise a disposition et
              flotte executive pour vos deplacements haut de gamme au Maroc.
            </p>
            <div className="luxury-reveal mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/services"
                className="premium-button inline-flex h-12 w-full items-center justify-center gap-3 bg-gold px-5 text-center text-xs font-bold uppercase tracking-[0.14em] text-black transition hover:bg-champagne sm:w-auto sm:px-6 sm:text-sm sm:tracking-[0.18em]"
              >
                Voir les services
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="https://wa.me/212672508363"
                className="inline-flex h-12 w-full items-center justify-center border border-white/20 bg-white/[0.03] px-5 text-center text-xs font-bold uppercase tracking-[0.14em] text-white backdrop-blur-md transition hover:border-gold hover:text-gold sm:w-auto sm:px-6 sm:text-sm sm:tracking-[0.18em]"
                target="_blank"
                rel="noopener noreferrer"
                title="WhatsApp : +212 672 508 363"
              >
                <span className="sm:hidden">WhatsApp</span>
                <span className="hidden sm:inline">Contactez-nous via WhatsApp</span>
              </Link>
            </div>
            <AnimatedStats items={stats} />
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
                className="glass-luxury group border border-white/10 p-5 transition duration-500 hover:-translate-y-1 hover:border-gold/45 sm:p-7"
              >
                <item.icon className="h-7 w-7 text-gold transition group-hover:scale-110" />
                <h3 className="mt-6 text-xl font-semibold text-white">
                  {item.title}
                </h3>
                <p className="mt-4 leading-7 text-stone-300">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#0c0b0a] px-4 py-16 sm:px-8 sm:py-24 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <SectionHeading
              eyebrow="Agadir / Marrakech"
              title="Chauffeur prive local, execution haut de gamme"
              description="AYYI TOUR combine connaissance terrain, discretion et coordination premium pour les transferts VIP a Agadir, Marrakech et sur les axes inter-villes du Maroc."
            />
            <div className="grid gap-4 sm:grid-cols-3">
              {localSeoHighlights.map((item) => (
                <article
                  key={item.city}
                  className="glass-luxury border border-gold/15 p-5 transition hover:-translate-y-1 hover:border-gold/45"
                >
                  <MapPin className="h-5 w-5 text-gold" />
                  <h3 className="mt-5 text-2xl font-semibold text-white">{item.city}</h3>
                  <p className="mt-4 text-sm leading-6 text-stone-300">{item.text}</p>
                </article>
              ))}
            </div>
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
              description="Van VIP et berline executive: une flotte elegante, confortable et adaptee aux transferts, deplacements professionnels et trajets prives."
            />
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {fleet.map((vehicle) => (
                <FleetCard key={vehicle.id} vehicle={vehicle} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="overflow-hidden bg-obsidian px-4 py-16 sm:px-8 sm:py-24 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Galerie premium"
            title="Presence executive, confort cabine, details soignes"
            description="Une presentation sobre et luxueuse de la flotte pour choisir le vehicule adapte: Ford Transit ou Skoda Superb avec chauffeur."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {fleet.map((vehicle, index) => (
              <article
                key={vehicle.id}
                className="group relative min-h-[360px] overflow-hidden border border-white/10 bg-[#11100e] p-5 transition duration-500 hover:-translate-y-1 hover:border-gold/50"
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(201,162,74,0.24),transparent_36%),linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.01))]" />
                <div className="absolute -right-16 top-14 h-40 w-40 border border-gold/20 opacity-70 transition duration-700 group-hover:rotate-12" />
                <div className="relative z-10 flex h-full flex-col justify-between">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.24em] text-gold">
                      Selection 0{index + 1}
                    </p>
                    <h3 className="mt-5 text-3xl font-semibold text-white">{vehicle.name}</h3>
                    <p className="mt-4 leading-7 text-stone-300">
                      {vehicle.longDescription || vehicle.description}
                    </p>
                  </div>
                  <div className="mt-10 grid grid-cols-2 gap-3 border-t border-white/10 pt-5 text-sm text-stone-200">
                    <span className="flex items-center gap-2">
                      <Car className="h-4 w-4 text-gold" />
                      {vehicle.category}
                    </span>
                    <span className="flex items-center gap-2">
                      <Luggage className="h-4 w-4 text-gold" />
                      {vehicle.luggage} bagages
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-black px-4 py-16 sm:px-8 sm:py-20 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Plane, label: "Transfert aeroport" },
            { icon: BriefcaseBusiness, label: "Business travel" },
            { icon: CalendarCheck, label: "Evenements VIP" },
            { icon: Gem, label: "Mise a disposition" },
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

      <section className="bg-[#0b0a09] px-4 py-16 sm:px-8 sm:py-24 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Temoignages"
            title="Ils confient leurs trajets sensibles a AYYI TOUR"
            description="Des retours clients orientes ponctualite, discretion, confort et qualite de coordination."
          />
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {testimonials.map((testimonial) => (
              <article
                key={testimonial.name}
                className="glass-luxury border border-white/10 p-6 transition hover:-translate-y-1 hover:border-gold/40"
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

      <section className="bg-ivory px-4 py-16 text-obsidian sm:px-8 sm:py-24 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading
            eyebrow="FAQ"
            title="Questions frequentes"
            description="Les reponses essentielles avant de reserver un chauffeur prive VIP a Agadir, Marrakech ou ailleurs au Maroc."
            dark
          />
          <div className="grid gap-4">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group border border-black/10 bg-white p-5 shadow-sm transition hover:border-gold"
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

      <section className="bg-[#11100e] px-4 py-16 sm:px-8 sm:py-24 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-stretch">
          <div className="glass-luxury border border-white/10 p-6 sm:p-8">
            <MapPin className="h-7 w-7 text-gold" />
            <h2 className="mt-6 text-3xl font-semibold text-white sm:text-5xl">
              Presence locale, service disponible sur rendez-vous
            </h2>
            <p className="mt-5 leading-7 text-stone-300">
              Depart depuis Agadir, Marrakech, aeroports, hotels, residences privees et
              lieux d&apos;evenement. Les trajets sont prepares selon l&apos;horaire, le niveau
              de discretion et le confort attendu.
            </p>
            <a
              href={siteConfig.reservationMailto}
              className="premium-button mt-8 inline-flex h-12 items-center justify-center gap-3 bg-gold px-5 text-xs font-bold uppercase tracking-[0.14em] text-black sm:text-sm"
            >
              Planifier un trajet
              <Navigation className="h-4 w-4" />
            </a>
          </div>
          <div className="min-h-[360px] overflow-hidden border border-gold/20 bg-black shadow-[0_24px_90px_rgba(0,0,0,0.35)]">
            <iframe
              title="Carte AYYI TOUR Agadir Marrakech Maroc"
              src="https://www.google.com/maps?q=Agadir%20Marrakech%20Maroc&output=embed"
              className="h-full min-h-[360px] w-full grayscale contrast-125 invert"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
