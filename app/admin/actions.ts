"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  createLocalService,
  createLocalVehicle,
  deleteLocalService,
  deleteLocalVehicle,
  updateLocalService,
  updateLocalVehicle,
} from "@/lib/data/local-admin-catalog";
import {
  ADMIN_COOKIE_NAME,
  ADMIN_LOGIN,
  ADMIN_PASSWORD,
  createAdminSessionToken,
  hasAdminAuthConfig,
  verifyAdminSessionToken,
} from "@/lib/admin-auth";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { hasSupabaseAdminConfig } from "@/lib/supabase/config";
import type { Database } from "@/types/supabase";

type ServiceInsert = Database["public"]["Tables"]["services"]["Insert"];
type ServiceUpdate = Database["public"]["Tables"]["services"]["Update"];
type FleetInsert = Database["public"]["Tables"]["fleet"]["Insert"];
type FleetUpdate = Database["public"]["Tables"]["fleet"]["Update"];

const serviceStatuses = ["draft", "published", "archived"] as const;
const vehicleStatuses = ["available", "maintenance", "hidden"] as const;

async function requireAdminSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  const isAdmin = await verifyAdminSessionToken(token);

  if (!isAdmin) {
    redirect("/admin/login");
  }
}

function text(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

function requiredText(formData: FormData, key: string) {
  const value = text(formData, key);

  if (!value) {
    throw new Error(`${key} is required`);
  }

  return value;
}

function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function numberOrNull(formData: FormData, key: string) {
  const value = text(formData, key);

  if (!value) {
    return null;
  }

  const parsed = Number(value);

  if (!Number.isFinite(parsed)) {
    throw new Error(`${key} must be a number`);
  }

  return parsed;
}

function integerOrDefault(formData: FormData, key: string, fallback: number) {
  const value = numberOrNull(formData, key);

  if (value === null) {
    return fallback;
  }

  return Math.max(0, Math.round(value));
}

function serviceStatus(formData: FormData) {
  const status = text(formData, "status");

  if (serviceStatuses.includes(status as (typeof serviceStatuses)[number])) {
    return status as (typeof serviceStatuses)[number];
  }

  return "draft";
}

function vehicleStatus(formData: FormData) {
  const status = text(formData, "status");

  if (vehicleStatuses.includes(status as (typeof vehicleStatuses)[number])) {
    return status as (typeof vehicleStatuses)[number];
  }

  return "available";
}

function highlights(formData: FormData) {
  return text(formData, "highlights")
    .split(/\r?\n|,/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function revalidateCatalog() {
  revalidatePath("/");
  revalidatePath("/services");
  revalidatePath("/fleet");
  revalidatePath("/admin");
  revalidatePath("/admin/services");
  revalidatePath("/admin/fleet");
}

function requireSupabaseAdminClient(returnPath: "/admin/services" | "/admin/fleet") {
  if (!hasSupabaseAdminConfig()) {
    redirect(`${returnPath}?config=missing`);
  }

  return createSupabaseAdminClient();
}

function localId(prefix: string) {
  return `${prefix}-${crypto.randomUUID()}`;
}

function serviceFromForm(formData: FormData, id = localId("srv")) {
  const payload = servicePayload(formData);

  return {
    id,
    slug: payload.slug,
    name: payload.name,
    category: payload.category,
    description: payload.description,
    highlights: payload.highlights ?? [],
    status: payload.status ?? "draft",
    startingPrice: payload.starting_price ?? undefined,
  };
}

function vehicleFromForm(formData: FormData, id = localId("veh")) {
  const payload = fleetPayload(formData);

  return {
    id,
    slug: payload.slug,
    name: payload.name,
    segment: payload.segment,
    description: payload.description,
    passengers: payload.passengers ?? 3,
    luggage: payload.luggage ?? 2,
    status: payload.status ?? "available",
  };
}

function servicePayload(formData: FormData): ServiceInsert {
  const name = requiredText(formData, "name");
  const rawSlug = text(formData, "slug");

  return {
    slug: rawSlug ? slugify(rawSlug) : slugify(name),
    name,
    category: requiredText(formData, "category"),
    description: requiredText(formData, "description"),
    highlights: highlights(formData),
    status: serviceStatus(formData),
    starting_price: numberOrNull(formData, "startingPrice"),
  };
}

function fleetPayload(formData: FormData): FleetInsert {
  const name = requiredText(formData, "name");
  const rawSlug = text(formData, "slug");

  return {
    slug: rawSlug ? slugify(rawSlug) : slugify(name),
    name,
    segment: requiredText(formData, "segment"),
    description: requiredText(formData, "description"),
    passengers: integerOrDefault(formData, "passengers", 3),
    luggage: integerOrDefault(formData, "luggage", 2),
    status: vehicleStatus(formData),
  };
}

export async function loginAdmin(formData: FormData) {
  if (process.env.NODE_ENV === "production" && !hasAdminAuthConfig()) {
    throw new Error(
      "Missing ADMIN_LOGIN, ADMIN_PASSWORD or ADMIN_SESSION_SECRET in production",
    );
  }

  const login = String(formData.get("login") ?? "");
  const password = String(formData.get("password") ?? "");

  if (login !== ADMIN_LOGIN || password !== ADMIN_PASSWORD) {
    redirect("/admin/login?error=1");
  }

  const token = await createAdminSessionToken();
  const cookieStore = await cookies();

  cookieStore.set(ADMIN_COOKIE_NAME, token, {
    httpOnly: true,
    maxAge: 60 * 60 * 8,
    path: "/admin",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  redirect("/admin");
}

export async function logoutAdmin() {
  const cookieStore = await cookies();

  cookieStore.set(ADMIN_COOKIE_NAME, "", {
    httpOnly: true,
    maxAge: 0,
    path: "/admin",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
  redirect("/admin/login");
}

export async function createService(formData: FormData) {
  await requireAdminSession();

  if (!hasSupabaseAdminConfig()) {
    await createLocalService(serviceFromForm(formData));
    revalidateCatalog();
    redirect("/admin/services");
  }

  const supabase = requireSupabaseAdminClient("/admin/services");
  const { error } = await supabase.from("services").insert(servicePayload(formData));

  if (error) {
    throw new Error(`Unable to create service: ${error.message}`);
  }

  revalidateCatalog();
  redirect("/admin/services");
}

export async function updateService(formData: FormData) {
  await requireAdminSession();

  const id = requiredText(formData, "id");

  if (!hasSupabaseAdminConfig()) {
    await updateLocalService(serviceFromForm(formData, id));
    revalidateCatalog();
    redirect("/admin/services");
  }

  const payload: ServiceUpdate = servicePayload(formData);
  const supabase = requireSupabaseAdminClient("/admin/services");
  const { error } = await supabase.from("services").update(payload).eq("id", id);

  if (error) {
    throw new Error(`Unable to update service: ${error.message}`);
  }

  revalidateCatalog();
  redirect("/admin/services");
}

export async function deleteService(formData: FormData) {
  await requireAdminSession();

  const id = requiredText(formData, "id");

  if (!hasSupabaseAdminConfig()) {
    await deleteLocalService(id);
    revalidateCatalog();
    redirect("/admin/services");
  }

  const supabase = requireSupabaseAdminClient("/admin/services");
  const { error } = await supabase.from("services").delete().eq("id", id);

  if (error) {
    throw new Error(`Unable to delete service: ${error.message}`);
  }

  revalidateCatalog();
  redirect("/admin/services");
}

export async function createVehicle(formData: FormData) {
  await requireAdminSession();

  if (!hasSupabaseAdminConfig()) {
    await createLocalVehicle(vehicleFromForm(formData));
    revalidateCatalog();
    redirect("/admin/fleet");
  }

  const supabase = requireSupabaseAdminClient("/admin/fleet");
  const { error } = await supabase.from("fleet").insert(fleetPayload(formData));

  if (error) {
    throw new Error(`Unable to create vehicle: ${error.message}`);
  }

  revalidateCatalog();
  redirect("/admin/fleet");
}

export async function updateVehicle(formData: FormData) {
  await requireAdminSession();

  const id = requiredText(formData, "id");

  if (!hasSupabaseAdminConfig()) {
    await updateLocalVehicle(vehicleFromForm(formData, id));
    revalidateCatalog();
    redirect("/admin/fleet");
  }

  const payload: FleetUpdate = fleetPayload(formData);
  const supabase = requireSupabaseAdminClient("/admin/fleet");
  const { error } = await supabase.from("fleet").update(payload).eq("id", id);

  if (error) {
    throw new Error(`Unable to update vehicle: ${error.message}`);
  }

  revalidateCatalog();
  redirect("/admin/fleet");
}

export async function deleteVehicle(formData: FormData) {
  await requireAdminSession();

  const id = requiredText(formData, "id");

  if (!hasSupabaseAdminConfig()) {
    await deleteLocalVehicle(id);
    revalidateCatalog();
    redirect("/admin/fleet");
  }

  const supabase = requireSupabaseAdminClient("/admin/fleet");
  const { error } = await supabase.from("fleet").delete().eq("id", id);

  if (error) {
    throw new Error(`Unable to delete vehicle: ${error.message}`);
  }

  revalidateCatalog();
  redirect("/admin/fleet");
}
