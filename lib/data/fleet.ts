import type { Vehicle } from "@/types/domain";

export const fleet: Vehicle[] = [
  {
    id: "veh-sedan",
    slug: "sedan-executive",
    name: "Sedan Executive",
    segment: "Executive",
    description: "Berline noire, silencieuse et elegante pour rendez-vous business.",
    passengers: 3,
    luggage: 2,
    status: "available",
  },
  {
    id: "veh-van",
    slug: "van-vip",
    name: "Van VIP",
    segment: "VIP Van",
    description: "Cabine spacieuse pour familles, equipes dirigeantes et delegations.",
    passengers: 7,
    luggage: 6,
    status: "available",
  },
  {
    id: "veh-suv",
    slug: "suv-premium",
    name: "SUV Premium",
    segment: "Premium SUV",
    description: "Presence, confort et polyvalence pour trajets urbains ou longues distances.",
    passengers: 4,
    luggage: 4,
    status: "maintenance",
  },
];
