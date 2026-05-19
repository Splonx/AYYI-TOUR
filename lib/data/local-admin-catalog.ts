import "server-only";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
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
  features?: unknown;
  tags?: unknown;
  highlights?: unknown;
};

const catalogPath = path.join(process.cwd(), "data", "admin-catalog.json");

function toArray(value: unknown) {
  if (Array.isArray(value)) {
    return value.filter((item): item is string => typeof item === "string" && item.trim() !== "");
  }

  if (typeof value === "string" && value.trim()) {
    return value
      .split(/\r?\n|,/)
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
}

function serviceStatus(value: unknown): Service["status"] {
  if (value === "published" || value === "archived") {
    return value;
  }

  return "draft";
}

function normalizeLocalServices(value: unknown): Service[] {
  if (!Array.isArray(value)) {
    return fallbackServices;
  }

  return value.map((item, index) => {
    const service = item as LegacyService;
    const highlights = toArray(service.highlights);

    return {
      id: service.id ?? `srv-local-${index + 1}`,
      slug: service.slug ?? `service-${index + 1}`,
      name: service.name ?? "Service",
      category: service.category ?? "Service VIP",
      description: service.description ?? "",
      highlights:
        highlights.length > 0
          ? highlights
          : toArray(service.features).concat(toArray(service.tags)),
      status: serviceStatus(service.status),
      startingPrice: service.startingPrice,
    };
  });
}

function normalizeLocalFleet(value: unknown): Vehicle[] {
  if (!Array.isArray(value)) {
    return fallbackFleet;
  }

  return value.map((item, index) => {
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
