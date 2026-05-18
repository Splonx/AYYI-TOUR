import "server-only";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fleet as fallbackFleet } from "@/lib/data/fleet";
import { services as fallbackServices } from "@/lib/data/services";
import type { BookingRequest, Service, Vehicle } from "@/types/domain";

type LocalCatalog = {
  services: Service[];
  fleet: Vehicle[];
  bookingRequests?: BookingRequest[];
};

const catalogPath = path.join(process.cwd(), "data", "admin-catalog.json");

async function readLocalCatalog(): Promise<LocalCatalog> {
  try {
    const value = await readFile(catalogPath, "utf8");
    const parsed = JSON.parse(value) as Partial<LocalCatalog>;

    return {
      services: Array.isArray(parsed.services) ? parsed.services : fallbackServices,
      fleet: Array.isArray(parsed.fleet) ? parsed.fleet : fallbackFleet,
      bookingRequests: Array.isArray(parsed.bookingRequests) ? parsed.bookingRequests : [],
    };
  } catch {
    return {
      services: fallbackServices,
      fleet: fallbackFleet,
      bookingRequests: [],
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

export async function getLocalBookingRequests() {
  const catalog = await readLocalCatalog();

  return catalog.bookingRequests ?? [];
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

export async function createLocalBookingRequest(request: BookingRequest) {
  const catalog = await readLocalCatalog();

  await writeLocalCatalog({
    ...catalog,
    bookingRequests: [request, ...(catalog.bookingRequests ?? [])],
  });
}
