import type { Vehicle } from "@/types/domain";

export const fleet: Vehicle[] = [
  {
    id: "veh-ford-transit",
    name: "Ford Transit",
    shortDescription: "Van premium spacieux et confortable pour transferts aeroport, groupes et familles.",
    longDescription:
      "Van premium spacieux et confortable, ideal pour les transferts aeroport, groupes, familles et trajets longue distance VIP.",
    description: "Van premium spacieux et confortable pour transferts aeroport, groupes et familles.",
    imageUrl: "/fleet/ford-transit.jpg",
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
    shortDescription: "Berline elegante et confortable pour deplacements professionnels, prives et VIP.",
    longDescription:
      "Berline elegante et confortable adaptee aux deplacements professionnels, prives et transport VIP.",
    description: "Berline elegante et confortable pour deplacements professionnels, prives et VIP.",
    imageUrl: "/fleet/skoda-superb.jpg",
    seats: 3,
    luggage: 2,
    priceNote: "Sur devis",
    category: "Berline Executive",
    isFeatured: true,
    isActive: true,
    displayOrder: 2,
  },
];
