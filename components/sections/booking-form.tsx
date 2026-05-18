"use client";

import { FormEvent, useState } from "react";
import { Send } from "lucide-react";
import type { Service } from "@/types/domain";

type BookingFormProps = {
  services: Service[];
};

const inputClass =
  "h-12 w-full border border-black/10 bg-white px-4 text-sm text-obsidian outline-none transition placeholder:text-stone-400 focus:border-gold";
const labelClass = "grid gap-2 text-sm font-semibold text-stone-800";

export function BookingForm({ services }: BookingFormProps) {
  const [clientName, setClientName] = useState("");
  const [phone, setPhone] = useState("");
  const [serviceSlug, setServiceSlug] = useState(services[0]?.slug ?? "");
  const [pickupDate, setPickupDate] = useState("");
  const [pickupPlace, setPickupPlace] = useState("");
  const [destination, setDestination] = useState("");
  const [passengers, setPassengers] = useState("1");
  const [message, setMessage] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const selectedService = services.find((service) => service.slug === serviceSlug);
    const text = [
      "Bonjour AYYI TOUR, je souhaite reserver un transport VIP.",
      `Nom: ${clientName}`,
      `Telephone: ${phone}`,
      `Service: ${selectedService?.name ?? "Non precise"}`,
      `Date et heure: ${pickupDate}`,
      `Depart: ${pickupPlace}`,
      `Destination: ${destination}`,
      `Passagers: ${passengers}`,
      message ? `Details: ${message}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    window.open(
      `https://wa.me/212672508363?text=${encodeURIComponent(text)}`,
      "_blank",
      "noopener,noreferrer",
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-4 border border-black/10 bg-white/85 p-4 shadow-sm sm:grid-cols-2 sm:p-6"
    >
      <label className={labelClass}>
        Nom complet
        <input
          className={inputClass}
          name="clientName"
          required
          value={clientName}
          onChange={(event) => setClientName(event.target.value)}
        />
      </label>
      <label className={labelClass}>
        Telephone
        <input
          className={inputClass}
          name="phone"
          required
          type="tel"
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
        />
      </label>
      <label className={labelClass}>
        Service
        <select
          className={inputClass}
          name="service"
          required
          value={serviceSlug}
          onChange={(event) => setServiceSlug(event.target.value)}
        >
          {services.map((service) => (
            <option key={service.slug} value={service.slug}>
              {service.name}
            </option>
          ))}
        </select>
      </label>
      <label className={labelClass}>
        Date et heure
        <input
          className={inputClass}
          name="pickupDate"
          required
          type="datetime-local"
          value={pickupDate}
          onChange={(event) => setPickupDate(event.target.value)}
        />
      </label>
      <label className={labelClass}>
        Lieu de depart
        <input
          className={inputClass}
          name="pickupPlace"
          required
          value={pickupPlace}
          onChange={(event) => setPickupPlace(event.target.value)}
        />
      </label>
      <label className={labelClass}>
        Destination
        <input
          className={inputClass}
          name="destination"
          required
          value={destination}
          onChange={(event) => setDestination(event.target.value)}
        />
      </label>
      <label className={labelClass}>
        Passagers
        <input
          className={inputClass}
          min="1"
          name="passengers"
          required
          type="number"
          value={passengers}
          onChange={(event) => setPassengers(event.target.value)}
        />
      </label>
      <label className={`${labelClass} sm:col-span-2`}>
        Details supplementaires
        <textarea
          className="min-h-28 w-full resize-y border border-black/10 bg-white px-4 py-3 text-sm text-obsidian outline-none transition placeholder:text-stone-400 focus:border-gold"
          name="message"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
        />
      </label>
      <div className="sm:col-span-2">
        <button
          type="submit"
          className="inline-flex h-12 w-full items-center justify-center gap-3 bg-obsidian px-5 text-center text-xs font-bold uppercase tracking-[0.14em] text-gold transition hover:bg-black sm:w-auto sm:px-6 sm:text-sm sm:tracking-[0.18em]"
        >
          Envoyer la demande
          <Send className="h-4 w-4" />
        </button>
      </div>
    </form>
  );
}
