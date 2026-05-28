import type { Metadata } from "next";
import { AlertTriangle, CheckCircle2, Database, Settings } from "lucide-react";
import { AdminShell } from "@/components/admin/admin-shell";
import { MetricCard } from "@/components/admin/metric-card";
import { hasAdminAuthConfig } from "@/lib/admin-auth";
import { getAdminFleetSafe, getAdminServicesSafe } from "@/lib/data/admin-catalog";
import { getSupabaseAdminConfigStatus } from "@/lib/supabase/config";

export const metadata: Metadata = {
  title: "Admin",
};

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const [servicesResult, fleetResult] = await Promise.all([
    getAdminServicesSafe(),
    getAdminFleetSafe(),
  ]);
  const services = servicesResult.data;
  const fleet = fleetResult.data;
  const supabaseStatus = getSupabaseAdminConfigStatus();
  const adminErrors = [servicesResult.error, fleetResult.error].filter(Boolean);
  const activeServices = services.filter((service) => service.isActive);
  const activeVehicles = fleet.filter((vehicle) => vehicle.isActive);
  const featuredVehicles = fleet.filter((vehicle) => vehicle.isFeatured);
  const supabaseConnected =
    supabaseStatus.ready && servicesResult.source === "supabase" && fleetResult.source === "supabase";
  const missingEnv = [
    !process.env.ADMIN_LOGIN ? "ADMIN_LOGIN" : "",
    !process.env.ADMIN_PASSWORD ? "ADMIN_PASSWORD" : "",
    !process.env.ADMIN_SESSION_SECRET ? "ADMIN_SESSION_SECRET" : "",
    ...supabaseStatus.missing,
  ].filter(Boolean);

  console.info("[admin page]", {
    supabaseMode: supabaseStatus.mode,
    missing: supabaseStatus.missing,
    serviceSource: servicesResult.source,
    fleetSource: fleetResult.source,
    errors: adminErrors,
  });

  return (
    <AdminShell>
      <div className="px-4 py-6 sm:px-8 lg:px-10">
      <div className="mb-10">
        <p className="text-xs font-bold uppercase tracking-[0.32em] text-gold">
          Back-office
        </p>
        <h1 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
          Pilotage AYYI TOUR
        </h1>
        <p className="mt-4 max-w-2xl text-stone-400">
          Vue d&apos;ensemble des contenus geres par le back-office: services, flotte,
          images et etat de la configuration production.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        <MetricCard
          label="Services"
          value={String(services.length)}
          helper="Total catalogue"
        />
        <MetricCard
          label="Services actifs"
          value={String(activeServices.length)}
          helper="Visibles cote client"
        />
        <MetricCard
          label="Vehicules"
          value={String(fleet.length)}
          helper="Total flotte"
        />
        <MetricCard
          label="Vehicules actifs"
          value={String(activeVehicles.length)}
          helper="Affiches sur le site"
        />
        <MetricCard
          label="Mis en avant"
          value={String(featuredVehicles.length)}
          helper="Selection premium"
        />
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <section className="border border-white/10 bg-white/[0.04] p-5">
          <div className="flex items-center gap-3">
            <Database className="h-5 w-5 text-gold" />
            <h2 className="text-xl font-semibold text-white">Statut Supabase</h2>
          </div>
          <p className={supabaseConnected ? "mt-4 font-bold text-emerald-300" : "mt-4 font-bold text-red-300"}>
            {supabaseConnected ? "Connecte" : "Erreur / fallback local"}
          </p>
          <p className="mt-3 text-sm leading-6 text-stone-400">{supabaseStatus.message}</p>
        </section>

        <section className="border border-white/10 bg-white/[0.04] p-5">
          <div className="flex items-center gap-3">
            <Settings className="h-5 w-5 text-gold" />
            <h2 className="text-xl font-semibold text-white">Variables env</h2>
          </div>
          <p className={missingEnv.length === 0 && hasAdminAuthConfig() ? "mt-4 font-bold text-emerald-300" : "mt-4 font-bold text-red-300"}>
            {missingEnv.length === 0 && hasAdminAuthConfig() ? "OK" : "Manquantes"}
          </p>
          <p className="mt-3 text-sm leading-6 text-stone-400">
            {missingEnv.length === 0
              ? "Les variables requises sont configurees."
              : `A completer: ${missingEnv.join(", ")}`}
          </p>
        </section>
      </div>

      {adminErrors.length > 0 ? (
        <section className="mt-8 border border-gold/30 bg-gold/[0.08] p-5 text-sm leading-7 text-stone-200">
          <p className="flex items-center gap-2 font-semibold text-gold">
            <AlertTriangle className="h-4 w-4" />
            Mode secours actif
          </p>
          <p className="mt-2">
            Le dashboard utilise les donnees locales parce que Supabase n&apos;est pas
            disponible ou mal configure. Les pages services/flotte restent accessibles.
          </p>
          {process.env.NODE_ENV !== "production" ? (
            <pre className="mt-4 overflow-x-auto border border-white/10 bg-black/40 p-4 text-xs text-stone-300">
              {JSON.stringify(
                {
                  supabase: supabaseStatus,
                  errors: adminErrors,
                },
                null,
                2,
              )}
            </pre>
          ) : null}
        </section>
      ) : null}

      <section className="mt-10 border border-white/10 bg-white/[0.04]">
        <div className="border-b border-white/10 px-6 py-5">
          <h2 className="flex items-center gap-3 text-2xl font-semibold text-white">
            <CheckCircle2 className="h-5 w-5 text-gold" />
            Perimetre admin
          </h2>
        </div>
        <p className="px-6 py-5 text-sm leading-7 text-stone-400">
          Aucun formulaire de reservation n&apos;est gere ici. Le back-office reste
          dedie aux services, a la flotte et aux contenus visuels des vehicules.
        </p>
      </section>
      </div>
    </AdminShell>
  );
}
