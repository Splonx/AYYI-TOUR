import type { Vehicle } from "@/types/domain";

export function normalizeFleetVehicles(vehicles: Vehicle[]) {
  return vehicles
    .map((vehicle) => ({
      ...vehicle,
      name: vehicle.name.trim() || "Vehicule premium",
      imageUrl: vehicle.imageUrl?.trim() || undefined,
    }))
    .sort((a, b) => a.displayOrder - b.displayOrder);
}
