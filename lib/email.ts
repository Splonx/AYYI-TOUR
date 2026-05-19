import "server-only";

type ReservationEmailDetails = {
  clientName: string;
  phone: string;
  serviceName: string;
  pickupDate: string;
  pickupPlace: string;
  destination: string;
  passengers: number;
  message?: string;
};

const reservationEmailTo = process.env.RESERVATION_EMAIL_TO ?? "reservation@ayyi-tour.com";
const reservationEmailFrom =
  process.env.RESERVATION_EMAIL_FROM ?? "AYYI TOUR <reservation@ayyi-tour.com>";

function reservationEmailText(details: ReservationEmailDetails) {
  return [
    "Nouvelle demande de reservation AYYI TOUR",
    "",
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

function reservationEmailHtml(details: ReservationEmailDetails) {
  const rows = [
    ["Nom", details.clientName],
    ["Telephone", details.phone],
    ["Service", details.serviceName],
    ["Date et heure", details.pickupDate],
    ["Depart", details.pickupPlace],
    ["Destination", details.destination],
    ["Passagers", String(details.passengers)],
    ["Details", details.message || "Non precise"],
  ];

  return `
    <div style="margin:0;padding:32px;background:#070707;color:#f7f0df;font-family:Arial,Helvetica,sans-serif">
      <div style="max-width:680px;margin:0 auto;border:1px solid rgba(201,162,74,.35);background:#11100e">
        <div style="padding:28px 28px 18px;border-bottom:1px solid rgba(201,162,74,.25)">
          <p style="margin:0 0 10px;color:#c9a24a;font-size:12px;font-weight:700;letter-spacing:4px;text-transform:uppercase">AYYI TOUR</p>
          <h1 style="margin:0;color:#fff;font-family:Georgia,'Times New Roman',serif;font-size:30px;font-weight:700">Nouvelle demande de reservation</h1>
        </div>
        <table style="width:100%;border-collapse:collapse">
          <tbody>
            ${rows
              .map(
                ([label, value]) => `
                  <tr>
                    <td style="width:180px;padding:16px 28px;border-bottom:1px solid rgba(255,255,255,.08);color:#c9a24a;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:2px">${label}</td>
                    <td style="padding:16px 28px;border-bottom:1px solid rgba(255,255,255,.08);color:#f7f0df;font-size:15px;line-height:1.6">${value}</td>
                  </tr>
                `,
              )
              .join("")}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

export async function sendReservationEmail(details: ReservationEmailDetails) {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    return { sent: false, reason: "missing-config" as const };
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: reservationEmailFrom,
      to: [reservationEmailTo],
      subject: `Nouvelle reservation AYYI TOUR - ${details.clientName}`,
      text: reservationEmailText(details),
      html: reservationEmailHtml(details),
    }),
  });

  if (!response.ok) {
    return {
      sent: false,
      reason: "api-error" as const,
      error: await response.text(),
    };
  }

  return { sent: true };
}
