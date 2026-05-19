import type { Metadata } from "next";
import { AdminShell } from "@/components/admin/admin-shell";
import { MetricCard } from "@/components/admin/metric-card";
import { getAdminFleet, getAdminServices } from "@/lib/data/admin-catalog";

export const metadata: Metadata = {
  title: "Admin",
};

export default async function AdminPage() {
  const [services, fleet] = await Promise.all([getAdminServices(), getAdminFleet()]);
  const publishedServices = services.filter((service) => service.status === "published");
  const availableVehicles = fleet.filter((vehicle) => vehicle.status === "available");

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
          Tableau de bord initial pour suivre les services et la flotte avant
          connexion complete a Supabase.
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
        <MetricCard label="Canal contact" value="Email" helper="reservation@ayyi-tour.com" />
      </div>

      <section className="mt-10 border border-white/10 bg-white/[0.04]">
        <div className="border-b border-white/10 px-6 py-5">
          <h2 className="text-2xl font-semibold text-white">Pilotage commercial</h2>
        </div>
        <p className="px-6 py-5 text-sm leading-7 text-stone-400">
          Les demandes de trajet arrivent maintenant directement par email a
          reservation@ayyi-tour.com. Le back-office reste dedie a la gestion des
          services et de la flotte.
        </p>
      </section>
      </div>
    </AdminShell>
  );
}
