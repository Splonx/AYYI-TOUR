import "server-only";

const defaultNotificationNumber = "212672508363";

export function getWhatsAppNotificationNumber() {
  return process.env.WHATSAPP_NOTIFICATION_TO ?? defaultNotificationNumber;
}

export function buildWhatsAppMessage(details: {
  clientName: string;
  phone: string;
  serviceName: string;
  pickupDate: string;
  pickupPlace: string;
  destination: string;
  passengers: number;
  message?: string;
}) {
  return [
    "Nouvelle demande de reservation AYYI TOUR",
    `Nom: ${details.clientName}`,
    `Telephone: ${details.phone}`,
    `Service: ${details.serviceName}`,
    `Date et heure: ${details.pickupDate}`,
    `Depart: ${details.pickupPlace}`,
    `Destination: ${details.destination}`,
    `Passagers: ${details.passengers}`,
    details.message ? `Details: ${details.message}` : "",
  ]
    .filter(Boolean)
    .join("\n");
}

export function buildWhatsAppUrl(text: string) {
  return `https://wa.me/${getWhatsAppNotificationNumber()}?text=${encodeURIComponent(text)}`;
}

export async function sendWhatsAppNotification(text: string) {
  const accessToken = process.env.WHATSAPP_ACCESS_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;

  if (!accessToken || !phoneNumberId) {
    return { sent: false, reason: "missing-config" as const };
  }

  const response = await fetch(`https://graph.facebook.com/v20.0/${phoneNumberId}/messages`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      messaging_product: "whatsapp",
      to: getWhatsAppNotificationNumber(),
      type: "text",
      text: {
        body: text,
        preview_url: false,
      },
    }),
  });

  if (!response.ok) {
    const error = await response.text();

    return { sent: false, reason: "api-error" as const, error };
  }

  return { sent: true };
}
