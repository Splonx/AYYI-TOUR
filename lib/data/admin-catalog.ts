import "server-only";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { getSupabaseAdminConfigStatus, hasSupabaseAdminConfig } from "@/lib/supabase/config";
import { fleet as fallbackFleet } from "@/lib/data/fleet";
import { services as fallbackServices } from "@/lib/data/services";
import {
  getLocalFleet,
  getLocalServices,
} from "@/lib/data/local-admin-catalog";
import type { Service, Vehicle } from "@/types/domain";
import type { Database } from "@/types/supabase";

type ServiceRow = Database["public"]["Tables"]["services"]["Row"];
type VehicleRow = Database["public"]["Tables"]["fleet"]["Row"];
type AdminCatalogResult<T> = {
  data: T[];
  error?: string;
  source: "supabase" | "local";
};

function mapService(row: ServiceRow): Service {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    category: row.category,
    description: row.description,
    highlights: row.highlights,
    status: row.status,
    startingPrice: row.starting_price ?? undefined,
  };
}

function mapVehicle(row: VehicleRow): Vehicle {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    segment: row.segment,
    description: row.description,
    passengers: row.passengers,
    luggage: row.luggage,
    status: row.status,
  };
}

export async function getAdminServices() {
  if (!hasSupabaseAdminConfig()) {
    return getLocalServices();
  }

  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("services")
    .select("*")
    .order("created_at", { ascending: true });

  if (error) {
    throw new Error(`Unable to load services: ${error.message}`);
  }

  return data.map(mapService);
}

export async function getAdminServicesSafe(): Promise<AdminCatalogResult<Service>> {
  const status = getSupabaseAdminConfigStatus();

  if (!status.ready) {
    return {
      data: await getLocalServices(),
      error: status.mode === "local" ? undefined : status.message,
      source: "local",
    };
  }

  try {
    return {
      data: await getAdminServices(),
      source: "supabase",
    };
  } catch (error) {
    return {
      data: await getLocalServices(),
      error: error instanceof Error ? error.message : "Unable to load Supabase services.",
      source: "local",
    };
  }
}

export async function getAdminFleet() {
  if (!hasSupabaseAdminConfig()) {
    return getLocalFleet();
  }

  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("fleet")
    .select("*")
    .order("created_at", { ascending: true });

  if (error) {
    throw new Error(`Unable to load fleet: ${error.message}`);
  }

  return data.map(mapVehicle);
}

export async function getAdminFleetSafe(): Promise<AdminCatalogResult<Vehicle>> {
  const status = getSupabaseAdminConfigStatus();

  if (!status.ready) {
    return {
      data: await getLocalFleet(),
      error: status.mode === "local" ? undefined : status.message,
      source: "local",
    };
  }

  try {
    return {
      data: await getAdminFleet(),
      source: "supabase",
    };
  } catch (error) {
    return {
      data: await getLocalFleet(),
      error: error instanceof Error ? error.message : "Unable to load Supabase fleet.",
      source: "local",
    };
  }
}

export async function getPublishedServices() {
  if (!hasSupabaseAdminConfig()) {
    return fallbackServices.filter((service) => service.status === "published");
  }

  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("services")
    .select("*")
    .eq("status", "published")
    .order("created_at", { ascending: true });

  if (error) {
    throw new Error(`Unable to load published services: ${error.message}`);
  }

  return data.map(mapService);
}

export async function getAvailableFleet() {
  if (!hasSupabaseAdminConfig()) {
    return fallbackFleet.filter((vehicle) => vehicle.status === "available");
  }

  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("fleet")
    .select("*")
    .eq("status", "available")
    .order("created_at", { ascending: true });

  if (error) {
    throw new Error(`Unable to load available fleet: ${error.message}`);
  }

  return data.map(mapVehicle);
}
