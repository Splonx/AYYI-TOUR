import type { Vehicle } from "@/types/domain";

export const fleet: Vehicle[] = [
  {
    id: "veh-mercedes-vito",
    name: "Mercedes Vito",
    shortDescription: "Van premium spacieux pour familles, equipes et delegations.",
    longDescription:
      "Mercedes Vito avec chauffeur prive, ideal pour transferts aeroport, missions business et trajets inter-villes avec confort cabine.",
    description: "Van premium spacieux pour familles, equipes et delegations.",
    seats: 7,
    luggage: 6,
    priceNote: "Sur devis",
    category: "Van VIP",
    isFeatured: true,
    isActive: true,
    displayOrder: 1,
  },
  {
    id: "veh-skoda-superb",
    name: "Skoda Superb",
    shortDescription: "Berline executive discrete pour transferts VIP et rendez-vous business.",
    longDescription:
      "Skoda Superb avec chauffeur prive, selectionnee pour sa discretion, son confort et sa tenue parfaite sur les trajets premium.",
    description: "Berline executive discrete pour transferts VIP et rendez-vous business.",
    seats: 3,
    luggage: 2,
    priceNote: "Sur devis",
    category: "Berline Executive",
    isFeatured: true,
    isActive: true,
    displayOrder: 2,
  },
];
