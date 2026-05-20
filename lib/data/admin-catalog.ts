import "server-only";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { getSupabaseAdminConfigStatus, hasSupabaseAdminConfig } from "@/lib/supabase/config";
import { normalizeFleetVehicles } from "@/lib/data/fleet-normalization";
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

function mapService(row: ServiceRow): Service {
  return {
    id: row.id,
    slug: row.slug || row.id,
    name: row.name || "Service",
    category: row.category || "Service VIP",
    description: row.description || "",
    highlights: toArray(row.highlights),
    status: serviceStatus(row.status),
    startingPrice: row.starting_price ?? undefined,
  };
}

function mapVehicle(row: VehicleRow): Vehicle {
  const shortDescription = row.short_description ?? row.description;

  return {
    id: row.id,
    name: row.name,
    shortDescription,
    longDescription: row.long_description ?? row.description,
    description: row.description,
    imageUrl: row.image_url ?? undefined,
    seats: row.seats,
    luggage: row.luggage,
    priceNote: row.price_note ?? "",
    category: row.category ?? "Premium",
    isFeatured: row.is_featured,
    isActive: row.is_active,
    displayOrder: row.display_order,
    createdAt: row.created_at,
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
    console.error("[admin services] Supabase load failed", error);

    return {
      data: await getLocalServices(),
      error: error instanceof Error ? error.message : "Unable to load Supabase services.",
      source: "local",
    };
  }
}

export async function getAdminFleet() {
  if (!hasSupabaseAdminConfig()) {
    return normalizeFleetVehicles(await getLocalFleet());
  }

  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("fleet")
    .select("*")
    .order("display_order", { ascending: true })
    .order("created_at", { ascending: true });

  if (error) {
    throw new Error(`Unable to load fleet: ${error.message}`);
  }

  return normalizeFleetVehicles(data.map(mapVehicle));
}

export async function getAdminFleetSafe(): Promise<AdminCatalogResult<Vehicle>> {
  const status = getSupabaseAdminConfigStatus();

  if (!status.ready) {
    return {
      data: normalizeFleetVehicles(await getLocalFleet()),
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
    console.error("[admin fleet] Supabase load failed", error);

    return {
      data: normalizeFleetVehicles(await getLocalFleet()),
      error: error instanceof Error ? error.message : "Unable to load Supabase fleet.",
      source: "local",
    };
  }
}

export async function getPublishedServices() {
  if (!hasSupabaseAdminConfig()) {
    return fallbackServices.filter((service) => service.status === "published");
  }

  try {
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
  } catch (error) {
    console.error("[public services] Supabase load failed", error);

    return fallbackServices.filter((service) => service.status === "published");
  }
}

export async function getAvailableFleet() {
  if (!hasSupabaseAdminConfig()) {
    return normalizeFleetVehicles(fallbackFleet.filter((vehicle) => vehicle.isActive));
  }

  try {
    const supabase = createSupabaseAdminClient();
    const { data, error } = await supabase
      .from("fleet")
      .select("*")
      .eq("is_active", true)
      .order("display_order", { ascending: true })
      .order("created_at", { ascending: true });

    if (error) {
      throw new Error(`Unable to load available fleet: ${error.message}`);
    }

    return normalizeFleetVehicles(data.map(mapVehicle));
  } catch (error) {
    console.error("[public fleet] Supabase load failed", error);

    return normalizeFleetVehicles(fallbackFleet.filter((vehicle) => vehicle.isActive));
  }
}
