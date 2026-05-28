import "server-only";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { normalizeFleetVehicles } from "@/lib/data/fleet-normalization";
import { fleet as fallbackFleet } from "@/lib/data/fleet";
import { services as fallbackServices } from "@/lib/data/services";
import type { Service, Vehicle } from "@/types/domain";

type LocalCatalog = {
  services: Service[];
  fleet: Vehicle[];
};

type LegacyVehicle = Partial<Vehicle> & {
  segment?: string;
  passengers?: number;
  status?: string;
};

type LegacyService = Partial<Service> & {
  name?: string;
  title?: string;
  category?: string;
  features?: unknown;
  tags?: unknown;
  highlights?: unknown;
  status?: string;
  startingPrice?: number;
};

const catalogPath = path.join(process.cwd(), "data", "admin-catalog.json");

function normalizeLocalServices(value: unknown): Service[] {
  if (!Array.isArray(value)) {
    return fallbackServices;
  }

  return value.map((item, index) => {
    const service = item as LegacyService;
    const title = service.title ?? service.name ?? "Service VIP";

    return {
      id: service.id ?? `srv-local-${index + 1}`,
      slug: service.slug ?? title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      title,
      description: service.description ?? "",
      icon: service.icon ?? "Sparkles",
      displayOrder: service.displayOrder ?? index + 1,
      isActive:
        service.isActive ??
        (service.status ? service.status === "published" : true),
    };
  }).sort((a, b) => a.displayOrder - b.displayOrder);
}

function normalizeLocalFleet(value: unknown): Vehicle[] {
  if (!Array.isArray(value)) {
    return fallbackFleet;
  }

  const vehicles = value.map((item, index) => {
    const vehicle = item as LegacyVehicle;
    const description = vehicle.description ?? "";

    return {
      id: vehicle.id ?? `veh-local-${index + 1}`,
      name: vehicle.name ?? "Vehicule premium",
      shortDescription: vehicle.shortDescription ?? description,
      longDescription: vehicle.longDescription ?? description,
      description,
      imageUrl: vehicle.imageUrl,
      seats: vehicle.seats ?? vehicle.passengers ?? 3,
      luggage: vehicle.luggage ?? 2,
      priceNote: vehicle.priceNote ?? "",
      category: vehicle.category ?? vehicle.segment ?? "Premium",
      isFeatured: vehicle.isFeatured ?? true,
      isActive:
        vehicle.isActive ??
        (vehicle.status ? vehicle.status === "available" : true),
      displayOrder: vehicle.displayOrder ?? index + 1,
      createdAt: vehicle.createdAt,
    };
  });

  return normalizeFleetVehicles(vehicles);
}

async function readLocalCatalog(): Promise<LocalCatalog> {
  try {
    const value = await readFile(catalogPath, "utf8");
    const parsed = JSON.parse(value) as Partial<LocalCatalog>;

    return {
      services: normalizeLocalServices(parsed.services),
      fleet: normalizeLocalFleet(parsed.fleet),
    };
  } catch {
    return {
      services: fallbackServices,
      fleet: fallbackFleet,
    };
  }
}

async function writeLocalCatalog(catalog: LocalCatalog) {
  await mkdir(path.dirname(catalogPath), { recursive: true });
  await writeFile(catalogPath, `${JSON.stringify(catalog, null, 2)}\n`, "utf8");
}

export async function getLocalServices() {
  const catalog = await readLocalCatalog();

  return catalog.services;
}

export async function getLocalFleet() {
  const catalog = await readLocalCatalog();

  return catalog.fleet;
}

export async function createLocalService(service: Service) {
  const catalog = await readLocalCatalog();

  await writeLocalCatalog({
    ...catalog,
    services: [...catalog.services, service],
  });
}

export async function updateLocalService(service: Service) {
  const catalog = await readLocalCatalog();

  await writeLocalCatalog({
    ...catalog,
    services: catalog.services.map((item) => (item.id === service.id ? service : item)),
  });
}

export async function deleteLocalService(id: string) {
  const catalog = await readLocalCatalog();

  await writeLocalCatalog({
    ...catalog,
    services: catalog.services.filter((item) => item.id !== id),
  });
}

export async function createLocalVehicle(vehicle: Vehicle) {
  const catalog = await readLocalCatalog();

  await writeLocalCatalog({
    ...catalog,
    fleet: [...catalog.fleet, vehicle],
  });
}

export async function updateLocalVehicle(vehicle: Vehicle) {
  const catalog = await readLocalCatalog();

  await writeLocalCatalog({
    ...catalog,
    fleet: catalog.fleet.map((item) => (item.id === vehicle.id ? vehicle : item)),
  });
}

export async function deleteLocalVehicle(id: string) {
  const catalog = await readLocalCatalog();

  await writeLocalCatalog({
    ...catalog,
    fleet: catalog.fleet.filter((item) => item.id !== id),
  });
}
