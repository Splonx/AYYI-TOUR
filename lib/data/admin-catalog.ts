import "server-only";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { hasSupabaseAdminConfig } from "@/lib/supabase/config";
import { fleet as fallbackFleet } from "@/lib/data/fleet";
import { services as fallbackServices } from "@/lib/data/services";
import {
  getLocalBookingRequests,
  getLocalFleet,
  getLocalServices,
} from "@/lib/data/local-admin-catalog";
import type { BookingRequest, Service, Vehicle } from "@/types/domain";
import type { Database } from "@/types/supabase";

type ServiceRow = Database["public"]["Tables"]["services"]["Row"];
type VehicleRow = Database["public"]["Tables"]["fleet"]["Row"];
type BookingRequestRow = Database["public"]["Tables"]["booking_requests"]["Row"];

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

function mapBookingRequest(row: BookingRequestRow): BookingRequest {
  return {
    id: row.id,
    clientName: row.client_name,
    phone: row.phone,
    serviceSlug: row.service_slug,
    pickupDate: row.pickup_date,
    pickupPlace: row.pickup_place,
    destination: row.destination,
    passengers: row.passengers,
    message: row.message ?? undefined,
    status: row.status,
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

export async function getAdminBookingRequests() {
  if (!hasSupabaseAdminConfig()) {
    return getLocalBookingRequests();
  }

  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("booking_requests")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(`Unable to load booking requests: ${error.message}`);
  }

  return data.map(mapBookingRequest);
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
