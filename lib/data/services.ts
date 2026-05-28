import type { Service } from "@/types/domain";

export const services: Service[] = [
  {
    id: "srv-airport-vip",
    slug: "service-aeroport",
    title: "Service aeroport",
    description:
      "Accueil personnalise, suivi de vol et prise en charge fluide entre aeroport, hotel, residence ou lieu de rendez-vous.",
    icon: "Plane",
    displayOrder: 1,
    isActive: true,
  },
  {
    id: "srv-business",
    slug: "transport-avec-chauffeur",
    title: "Transport avec chauffeur",
    description:
      "Chauffeur dedie, conduite souple et itineraires optimises pour vos rendez-vous professionnels ou prives.",
    icon: "BriefcaseBusiness",
    displayOrder: 2,
    isActive: true,
  },
  {
    id: "srv-private-transfer",
    slug: "transfert-prive",
    title: "Transfert prive",
    description:
      "Trajets directs entre Agadir, Marrakech, hotels, villas, golfs, gares, aeroports et destinations sur mesure.",
    icon: "Sparkles",
    displayOrder: 3,
    isActive: true,
  },
  {
    id: "srv-disposal",
    slug: "mise-a-disposition",
    title: "Mise a disposition",
    description:
      "Vehicule avec chauffeur reserve a l'heure, a la journee ou pour une mission multi-etapes.",
    icon: "CalendarCheck",
    displayOrder: 4,
    isActive: true,
  },
];
