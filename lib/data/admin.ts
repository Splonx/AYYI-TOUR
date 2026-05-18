import type { BookingRequest } from "@/types/domain";

export const recentRequests: BookingRequest[] = [
  {
    id: "req-1001",
    clientName: "Client corporate",
    phone: "+212 600 000 001",
    serviceSlug: "transfert-aeroport-vip",
    pickupDate: "2026-05-15 21:30",
    pickupPlace: "Aeroport Agadir",
    destination: "Hotel",
    passengers: 2,
    status: "new",
  },
  {
    id: "req-1002",
    clientName: "Delegation privee",
    phone: "+212 600 000 002",
    serviceSlug: "mise-a-disposition",
    pickupDate: "2026-05-17 09:00",
    pickupPlace: "Marrakech",
    destination: "Programme multi-arrets",
    passengers: 5,
    status: "confirmed",
  },
  {
    id: "req-1003",
    clientName: "Famille VIP",
    phone: "+212 600 000 003",
    serviceSlug: "chauffeur-business",
    pickupDate: "2026-05-19 14:15",
    pickupPlace: "Residence privee",
    destination: "Aeroport Marrakech",
    passengers: 4,
    status: "new",
  },
];
