export type ServiceStatus = "draft" | "published" | "archived";

export type Service = {
  id: string;
  slug: string;
  name: string;
  category: string;
  description: string;
  highlights: string[];
  status: ServiceStatus;
  startingPrice?: number;
};

export type VehicleStatus = "available" | "maintenance" | "hidden";

export type Vehicle = {
  id: string;
  slug: string;
  name: string;
  segment: string;
  description: string;
  passengers: number;
  luggage: number;
  status: VehicleStatus;
};

export type BookingRequest = {
  id: string;
  clientName: string;
  phone: string;
  serviceSlug: string;
  pickupDate: string;
  pickupPlace: string;
  destination: string;
  passengers: number;
  message?: string;
  status: "new" | "confirmed" | "completed" | "cancelled";
  createdAt?: string;
};
