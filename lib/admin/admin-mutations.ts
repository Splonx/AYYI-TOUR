import "server-only";
import { revalidatePath } from "next/cache";
import {
  createLocalService,
  createLocalVehicle,
  deleteLocalService,
  deleteLocalVehicle,
  updateLocalService,
  updateLocalVehicle,
} from "@/lib/data/local-admin-catalog";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { hasSupabaseAdminConfig } from "@/lib/supabase/config";
import type { Service, Vehicle } from "@/types/domain";
import type { Database } from "@/types/supabase";

type ServiceInsert = Database["public"]["Tables"]["services"]["Insert"];
type ServiceUpdate = Database["public"]["Tables"]["services"]["Update"];
type FleetInsert = Database["public"]["Tables"]["fleet"]["Insert"];
type FleetUpdate = Database["public"]["Tables"]["fleet"]["Update"];

export type AdminMutationTarget = "services" | "fleet";
export type AdminMutationStatus = "created" | "updated" | "deleted";

const serviceIconNames = new Set([
  "BriefcaseBusiness",
  "CalendarCheck",
  "Gem",
  "Plane",
  "Sparkles",
]);

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

function integerOrDefault(formData: FormData, key: string, fallback: number) {
  const value = text(formData, key);

  if (!value) {
    return fallback;
  }

  const parsed = Number(value);

  if (!Number.isFinite(parsed)) {
    throw new Error(`${key} must be a number`);
  }

  return Math.max(0, Math.round(parsed));
}

function optionalImageUrl(formData: FormData) {
  const value = text(formData, "imageUrl");

  if (!value) {
    return null;
  }

  if (value.startsWith("/") || value.startsWith("https://")) {
    return value;
  }

  throw new Error("imageUrl must be a local path or HTTPS URL");
}

function revalidateCatalog() {
  revalidatePath("/");
  revalidatePath("/services");
  revalidatePath("/fleet");
  revalidatePath("/admin");
  revalidatePath("/admin/services");
  revalidatePath("/admin/fleet");
}

function localId(prefix: string) {
  return `${prefix}-${crypto.randomUUID()}`;
}

function servicePayload(formData: FormData): ServiceInsert {
  const title = requiredText(formData, "title");
  const icon = text(formData, "icon") || "Sparkles";

  if (!serviceIconNames.has(icon)) {
    throw new Error("icon is invalid");
  }

  return {
    title,
    description: requiredText(formData, "description"),
    icon,
    display_order: integerOrDefault(formData, "displayOrder", 0),
    is_active: formData.get("isActive") === "on",
    slug: slugify(title),
    name: title,
    category: "Service VIP",
    highlights: [],
    status: formData.get("isActive") === "on" ? "published" : "draft",
    starting_price: null,
  };
}

function serviceFromForm(formData: FormData, id = localId("srv")): Service {
  const payload = servicePayload(formData);

  return {
    id,
    slug: slugify(payload.title),
    title: payload.title,
    description: payload.description,
    icon: payload.icon ?? "Sparkles",
    displayOrder: payload.display_order ?? 0,
    isActive: payload.is_active ?? true,
  };
}

function fleetPayload(formData: FormData): FleetInsert {
  const name = requiredText(formData, "name");
  const description = requiredText(formData, "description");

  return {
    name,
    short_description: text(formData, "shortDescription") || description,
    long_description: text(formData, "longDescription") || description,
    description,
    image_url: optionalImageUrl(formData),
    seats: integerOrDefault(formData, "seats", 3),
    luggage: integerOrDefault(formData, "luggage", 2),
    price_note: text(formData, "priceNote") || null,
    category: text(formData, "category") || null,
    is_featured: formData.get("isFeatured") === "on",
    is_active: formData.get("isActive") === "on",
    display_order: integerOrDefault(formData, "displayOrder", 0),
  };
}

function vehicleFromForm(formData: FormData, id = localId("veh")): Vehicle {
  const payload = fleetPayload(formData);

  return {
    id,
    name: payload.name,
    shortDescription: payload.short_description ?? payload.description ?? "",
    longDescription: payload.long_description ?? payload.description ?? "",
    description: payload.description ?? "",
    imageUrl: payload.image_url ?? undefined,
    seats: payload.seats ?? 3,
    luggage: payload.luggage ?? 2,
    priceNote: payload.price_note ?? "",
    category: payload.category ?? "Premium",
    isFeatured: payload.is_featured ?? false,
    isActive: payload.is_active ?? true,
    displayOrder: payload.display_order ?? 0,
  };
}

export async function mutateService(formData: FormData): Promise<AdminMutationStatus> {
  const intent = text(formData, "intent");
  const id = text(formData, "id");

  if (intent === "delete") {
    if (!id) {
      throw new Error("id is required");
    }

    if (!hasSupabaseAdminConfig()) {
      await deleteLocalService(id);
    } else {
      const supabase = createSupabaseAdminClient();
      const { error } = await supabase.from("services").delete().eq("id", id);

      if (error) {
        throw new Error(error.message);
      }
    }

    revalidateCatalog();
    return "deleted";
  }

  if (intent === "update") {
    if (!id) {
      throw new Error("id is required");
    }

    if (!hasSupabaseAdminConfig()) {
      await updateLocalService(serviceFromForm(formData, id));
    } else {
      const payload: ServiceUpdate = servicePayload(formData);
      const supabase = createSupabaseAdminClient();
      const { error } = await supabase.from("services").update(payload).eq("id", id);

      if (error) {
        throw new Error(error.message);
      }
    }

    revalidateCatalog();
    return "updated";
  }

  if (!hasSupabaseAdminConfig()) {
    await createLocalService(serviceFromForm(formData));
  } else {
    const supabase = createSupabaseAdminClient();
    const { error } = await supabase.from("services").insert(servicePayload(formData));

    if (error) {
      throw new Error(error.message);
    }
  }

  revalidateCatalog();
  return "created";
}

export async function mutateFleet(formData: FormData): Promise<AdminMutationStatus> {
  const intent = text(formData, "intent");
  const id = text(formData, "id");

  if (intent === "delete") {
    if (!id) {
      throw new Error("id is required");
    }

    if (!hasSupabaseAdminConfig()) {
      await deleteLocalVehicle(id);
    } else {
      const supabase = createSupabaseAdminClient();
      const { error } = await supabase.from("fleet").delete().eq("id", id);

      if (error) {
        throw new Error(error.message);
      }
    }

    revalidateCatalog();
    return "deleted";
  }

  if (intent === "update") {
    if (!id) {
      throw new Error("id is required");
    }

    if (!hasSupabaseAdminConfig()) {
      await updateLocalVehicle(vehicleFromForm(formData, id));
    } else {
      const payload: FleetUpdate = fleetPayload(formData);
      const supabase = createSupabaseAdminClient();
      const { error } = await supabase.from("fleet").update(payload).eq("id", id);

      if (error) {
        throw new Error(error.message);
      }
    }

    revalidateCatalog();
    return "updated";
  }

  if (!hasSupabaseAdminConfig()) {
    await createLocalVehicle(vehicleFromForm(formData));
  } else {
    const supabase = createSupabaseAdminClient();
    const { error } = await supabase.from("fleet").insert(fleetPayload(formData));

    if (error) {
      throw new Error(error.message);
    }
  }

  revalidateCatalog();
  return "created";
}
