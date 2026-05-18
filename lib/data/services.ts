import type { Service } from "@/types/domain";

export const services: Service[] = [
  {
    id: "srv-airport-vip",
    slug: "transfert-aeroport-vip",
    name: "Transfert aeroport VIP",
    category: "Airport",
    description:
      "Accueil personnalise, suivi de vol et prise en charge fluide entre aeroport, hotel, residence ou lieu de rendez-vous.",
    highlights: ["Suivi des vols", "Accueil pancarte", "Temps d'attente coordonne"],
    status: "published",
    startingPrice: 750,
  },
  {
    id: "srv-business",
    slug: "chauffeur-business",
    name: "Chauffeur business",
    category: "Corporate",
    description:
      "Deplacements professionnels avec chauffeur dedie, discretion et itineraire optimise pour chaque agenda.",
    highlights: ["Chauffeur bilingue", "Facturation entreprise", "Coordination assistant"],
    status: "published",
    startingPrice: 1200,
  },
  {
    id: "srv-disposal",
    slug: "mise-a-disposition",
    name: "Mise a disposition",
    category: "Private hire",
    description:
      "Vehicule avec chauffeur reserve a l'heure, a la journee ou pour une mission multi-etapes.",
    highlights: ["Forfait horaire", "Multi-arrets", "Service flexible"],
    status: "published",
    startingPrice: 1800,
  },
  {
    id: "srv-events",
    slug: "evenements-vip",
    name: "Evenements VIP",
    category: "Event",
    description:
      "Plan de transport pour mariages, delegations, conferences et experiences privees haut de gamme.",
    highlights: ["Coordination flotte", "Brief chauffeurs", "Planning operationnel"],
    status: "draft",
  },
];
