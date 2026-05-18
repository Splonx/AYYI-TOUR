import type { Metadata } from "next";
import { AdminShell } from "@/components/admin/admin-shell";
import { MetricCard } from "@/components/admin/metric-card";
import {
  getAdminBookingRequests,
  getAdminFleet,
  getAdminServices,
} from "@/lib/data/admin-catalog";

export const metadata: Metadata = {
  title: "Admin",
};

function formatPickupDate(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("fr-MA", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

export default async function AdminPage() {
  const [services, fleet, bookingRequests] = await Promise.all([
    getAdminServices(),
    getAdminFleet(),
    getAdminBookingRequests(),
  ]);
  const publishedServices = services.filter((service) => service.status === "published");
  const availableVehicles = fleet.filter((vehicle) => vehicle.status === "available");
  const serviceNames = new Map(services.map((service) => [service.slug, service.name]));

  return (
    <AdminShell>
      <div className="px-6 py-8 sm:px-8 lg:px-10">
      <div className="mb-10">
        <p className="text-xs font-bold uppercase tracking-[0.32em] text-gold">
          Back-office
        </p>
        <h1 className="mt-4 text-4xl font-semibold text-white">
          Pilotage AYYI TOUR
        </h1>
        <p className="mt-4 max-w-2xl text-stone-400">
          Tableau de bord initial pour suivre les services, la flotte et les
          demandes de reservation avant connexion complete a Supabase.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        <MetricCard
          label="Services publies"
          value={String(publishedServices.length)}
          helper="Offres visibles cote client"
        />
        <MetricCard
          label="Vehicules disponibles"
          value={String(availableVehicles.length)}
          helper="Flotte prete a reserver"
        />
        <MetricCard
          label="Demandes recentes"
          value={String(bookingRequests.length)}
          helper="Reservations recues depuis le site"
        />
      </div>

      <section className="mt-10 border border-white/10 bg-white/[0.04]">
        <div className="border-b border-white/10 px-6 py-5">
          <h2 className="text-2xl font-semibold text-white">Demandes recentes</h2>
        </div>
        <div className="divide-y divide-white/10">
          {bookingRequests.length > 0 ? (
            bookingRequests.map((request) => (
              <div
                key={request.id}
                className="grid gap-3 px-6 py-5 text-sm lg:grid-cols-[1fr_1fr_1fr_120px]"
              >
                <div>
                  <p className="font-semibold text-white">{request.clientName}</p>
                  <p className="mt-1 text-stone-400">{request.phone}</p>
                </div>
                <div>
                  <p className="text-stone-200">
                    {serviceNames.get(request.serviceSlug) ?? request.serviceSlug}
                  </p>
                  <p className="mt-1 text-stone-400">{formatPickupDate(request.pickupDate)}</p>
                </div>
                <div>
                  <p className="text-stone-200">
                    {request.pickupPlace} vers {request.destination}
                  </p>
                  <p className="mt-1 text-stone-400">
                    {request.passengers} passager{request.passengers > 1 ? "s" : ""}
                  </p>
                </div>
                <span className="text-gold">{request.status}</span>
              </div>
            ))
          ) : (
            <p className="px-6 py-5 text-sm text-stone-400">
              Aucune demande recue pour le moment.
            </p>
          )}
        </div>
      </section>
      </div>
    </AdminShell>
  );
}
