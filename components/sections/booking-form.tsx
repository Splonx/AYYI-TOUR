"use client";

import { useActionState, useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";
import { Send } from "lucide-react";
import { createBookingRequest, type BookingFormState } from "@/app/actions";
import type { Service } from "@/types/domain";

type BookingFormProps = {
  services: Service[];
};

const inputClass =
  "h-12 w-full border border-black/10 bg-white px-4 text-sm text-obsidian outline-none transition placeholder:text-stone-400 focus:border-gold";
const labelClass = "grid gap-2 text-sm font-semibold text-stone-800";
const initialState: BookingFormState = {
  status: "idle",
  message: "",
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex h-12 w-full items-center justify-center gap-3 bg-obsidian px-5 text-center text-xs font-bold uppercase tracking-[0.14em] text-gold transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:px-6 sm:text-sm sm:tracking-[0.18em]"
    >
      {pending ? "Traitement..." : "Envoyer la reservation"}
      <Send className="h-4 w-4" />
    </button>
  );
}

export function BookingForm({ services }: BookingFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction] = useActionState(createBookingRequest, initialState);

  useEffect(() => {
    if (state.status !== "success") {
      return;
    }

    formRef.current?.reset();

    if (state.whatsappUrl) {
      window.open(state.whatsappUrl, "_blank", "noopener,noreferrer");
    }
  }, [services, state]);

  return (
    <form
      ref={formRef}
      action={formAction}
      className="grid gap-4 border border-black/10 bg-white/85 p-4 shadow-sm sm:grid-cols-2 sm:p-6"
    >
      <label className={labelClass}>
        Nom complet
        <input
          className={inputClass}
          name="clientName"
          required
        />
      </label>
      <label className={labelClass}>
        Telephone
        <input
          className={inputClass}
          name="phone"
          required
          type="tel"
        />
      </label>
      <label className={labelClass}>
        Service
        <select
          className={inputClass}
          name="service"
          required
          defaultValue={services[0]?.slug ?? ""}
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
        />
      </label>
      <label className={labelClass}>
        Lieu de depart
        <input
          className={inputClass}
          name="pickupPlace"
          required
        />
      </label>
      <label className={labelClass}>
        Destination
        <input
          className={inputClass}
          name="destination"
          required
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
          defaultValue="1"
        />
      </label>
      <label className={`${labelClass} sm:col-span-2`}>
        Details supplementaires
        <textarea
          className="min-h-28 w-full resize-y border border-black/10 bg-white px-4 py-3 text-sm text-obsidian outline-none transition placeholder:text-stone-400 focus:border-gold"
          name="message"
        />
      </label>
      <div className="sm:col-span-2">
        <SubmitButton />
        {state.message ? (
          <p
            className={`mt-3 text-sm font-medium ${
              state.status === "error" ? "text-red-700" : "text-stone-700"
            }`}
          >
            {state.message}
          </p>
        ) : null}
        {state.whatsappUrl ? (
          <a
            href={state.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex text-sm font-bold text-obsidian underline decoration-gold underline-offset-4"
          >
            Ouvrir WhatsApp avec les details
          </a>
        ) : null}
      </div>
    </form>
  );
}
