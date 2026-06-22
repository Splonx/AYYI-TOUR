import type { Service } from "@/types/domain";

export const services: Service[] = [
  {
    id: "srv-airport-vip",
    slug: "transfert-aeroport",
    title: "Transfert aeroport",
    description:
      "Accueil personnalise, suivi des horaires et trajet fluide entre aeroport, hotel, residence ou lieu de rendez-vous.",
    icon: "Plane",
    displayOrder: 1,
    isActive: true,
  },
  {
    id: "srv-business",
    slug: "chauffeur-prive",
    title: "Chauffeur prive",
    description:
      "Chauffeur dedie, conduite souple et itineraires optimises pour vos rendez-vous professionnels ou prives.",
    icon: "BriefcaseBusiness",
    displayOrder: 2,
    isActive: true,
  },
  {
    id: "srv-disposal",
    slug: "mise-a-disposition",
    title: "Mise a disposition",
    description:
      "Vehicule avec chauffeur reserve a l'heure, a la journee ou pour une mission multi-etapes.",
    icon: "CalendarCheck",
    displayOrder: 3,
    isActive: true,
  },
  {
    id: "srv-private-transfer",
    slug: "trajets-interurbains",
    title: "Trajets interurbains",
    description:
      "Trajets directs entre Agadir, Marrakech, hotels, villas, aeroports et destinations longue distance.",
    icon: "Sparkles",
    displayOrder: 4,
    isActive: true,
  },
];
