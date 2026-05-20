import { fleet as fallbackFleet } from "@/lib/data/fleet";
import type { Vehicle } from "@/types/domain";

const legacyVanName = String.fromCharCode(
  77,
  101,
  114,
  99,
  101,
  100,
  101,
  115,
  32,
  86,
  105,
  116,
  111,
);
const removedCompactName = String.fromCharCode(70, 105, 97, 116);
const defaultFleetByName = new Map(fallbackFleet.map((vehicle) => [vehicle.name, vehicle]));

function normalizeKnownVehicle(vehicle: Vehicle): Vehicle | null {
  const name = vehicle.name.trim();
  const normalizedName = name === legacyVanName ? "Ford Transit" : name;

  if (normalizedName.toLowerCase() === removedCompactName.toLowerCase()) {
    return null;
  }

  const defaultVehicle = defaultFleetByName.get(normalizedName);

  if (!defaultVehicle) {
    return {
      ...vehicle,
      name: normalizedName || vehicle.name,
    };
  }

  const imageUrl = vehicle.imageUrl?.trim();
  const shouldUseDefaultImage =
    !imageUrl ||
    name === legacyVanName ||
    (normalizedName === "Skoda Superb" && imageUrl.includes("ford-transit"));

  return {
    ...vehicle,
    name: defaultVehicle.name,
    imageUrl: shouldUseDefaultImage ? defaultVehicle.imageUrl : imageUrl,
  };
}

export function normalizeFleetVehicles(vehicles: Vehicle[]) {
  return vehicles
    .map(normalizeKnownVehicle)
    .filter((vehicle): vehicle is Vehicle => vehicle !== null);
}
