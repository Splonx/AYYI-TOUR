"use server";

import { revalidatePath } from "next/cache";
import { createLocalBookingRequest } from "@/lib/data/local-admin-catalog";
import { getPublishedServices } from "@/lib/data/admin-catalog";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { hasSupabaseAdminConfig } from "@/lib/supabase/config";
import {
  buildWhatsAppMessage,
  buildWhatsAppUrl,
  sendWhatsAppNotification,
} from "@/lib/whatsapp";
import type { BookingRequest } from "@/types/domain";
import type { Database } from "@/types/supabase";

export type BookingFormState = {
  status: "idle" | "success" | "error";
  message: string;
  whatsappUrl?: string;
  notificationSent?: boolean;
};

type BookingInsert = Database["public"]["Tables"]["booking_requests"]["Insert"];

function text(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

function requireText(formData: FormData, key: string) {
  const value = text(formData, key);

  if (!value) {
    throw new Error("Merci de remplir tous les champs obligatoires.");
  }

  return value;
}

function passengers(formData: FormData) {
  const value = Number(text(formData, "passengers"));

  if (!Number.isFinite(value) || value < 1) {
    throw new Error("Merci d'indiquer un nombre de passagers valide.");
  }

  return Math.round(value);
}

export async function createBookingRequest(
  _state: BookingFormState,
  formData: FormData,
): Promise<BookingFormState> {
  try {
    const clientName = requireText(formData, "clientName");
    const phone = requireText(formData, "phone");
    const serviceSlug = requireText(formData, "service");
    const pickupDate = requireText(formData, "pickupDate");
    const pickupPlace = requireText(formData, "pickupPlace");
    const destination = requireText(formData, "destination");
    const passengerCount = passengers(formData);
    const details = text(formData, "message");
    const services = await getPublishedServices();
    const selectedService = services.find((service) => service.slug === serviceSlug);

    if (!selectedService) {
      throw new Error("Le service selectionne n'est pas disponible.");
    }

    const payload: BookingInsert = {
      client_name: clientName,
      phone,
      service_slug: serviceSlug,
      pickup_date: new Date(pickupDate).toISOString(),
      pickup_place: pickupPlace,
      destination,
      passengers: passengerCount,
      message: details || null,
      status: "new",
    };

    if (hasSupabaseAdminConfig()) {
      const supabase = createSupabaseAdminClient();
      const { error } = await supabase.from("booking_requests").insert(payload);

      if (error) {
        throw new Error(`Impossible d'enregistrer la demande: ${error.message}`);
      }
    } else {
      const request: BookingRequest = {
        id: `req-${crypto.randomUUID()}`,
        clientName,
        phone,
        serviceSlug,
        pickupDate,
        pickupPlace,
        destination,
        passengers: passengerCount,
        message: details || undefined,
        status: "new",
        createdAt: new Date().toISOString(),
      };

      await createLocalBookingRequest(request);
    }

    const whatsAppMessage = buildWhatsAppMessage({
      clientName,
      phone,
      serviceName: selectedService.name,
      pickupDate,
      pickupPlace,
      destination,
      passengers: passengerCount,
      message: details || undefined,
    });
    const notification = await sendWhatsAppNotification(whatsAppMessage);

    revalidatePath("/admin");

    return {
      status: "success",
      message: notification.sent
        ? "Votre demande a ete enregistree dans le back-office et la notification WhatsApp automatique a ete envoyee."
        : "Votre demande a ete enregistree dans le back-office. Le message WhatsApp est pret a etre envoye.",
      whatsappUrl: buildWhatsAppUrl(whatsAppMessage),
      notificationSent: notification.sent,
    };
  } catch (error) {
    return {
      status: "error",
      message: error instanceof Error ? error.message : "Impossible d'envoyer la demande.",
    };
  }
}
