import type { BookingRequest } from "@/types/domain";

export const recentRequests: BookingRequest[] = [
  {
    id: "req-1001",
    clientName: "Client corporate",
    serviceSlug: "transfert-aeroport-vip",
    pickupDate: "2026-05-15 21:30",
    status: "new",
  },
  {
    id: "req-1002",
    clientName: "Delegation privee",
    serviceSlug: "mise-a-disposition",
    pickupDate: "2026-05-17 09:00",
    status: "confirmed",
  },
  {
    id: "req-1003",
    clientName: "Famille VIP",
    serviceSlug: "chauffeur-business",
    pickupDate: "2026-05-19 14:15",
    status: "new",
  },
];
