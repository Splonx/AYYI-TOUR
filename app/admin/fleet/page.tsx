import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Plus, Save, Trash2 } from "lucide-react";
import { AdminShell } from "@/components/admin/admin-shell";
import { ConfirmSubmitButton } from "@/components/admin/confirm-submit-button";
import { SafeImage } from "@/components/ui/safe-image";
import { getAdminFleetSafe } from "@/lib/data/admin-catalog";
import { hasSupabaseAdminConfig } from "@/lib/supabase/config";

export const metadata: Metadata = {
  title: "Admin Flotte",
};

export const dynamic = "force-dynamic";

const inputClass =
  "w-full border border-white/10 bg-black/30 px-3 py-2 text-sm text-white outline-none transition placeholder:text-stone-600 focus:border-gold";
const labelClass = "text-xs font-bold uppercase tracking-[0.16em] text-stone-500";
const fallbackFleetImage = "/fleet/ford-transit.jpg";

function Alert({
  tone,
  children,
}: {
  tone: "success" | "warning" | "error";
  children: ReactNode;
}) {
  const className =
    tone === "success"
      ? "border-emerald-400/30 bg-emerald-500/10 text-emerald-100"
      : tone === "warning"
        ? "border-gold/30 bg-gold/[0.08] text-stone-200"
        : "border-red-400/30 bg-red-500/10 text-red-100";

  return <div className={`mt-6 border p-4 text-sm leading-6 ${className}`}>{children}</div>;
}

function successMessage(value: string | string[] | undefined) {
  if (value === "created") {
    return "Vehicule ajoute avec succes.";
  }

  if (value === "updated") {
    return "Vehicule modifie avec succes.";
  }

  if (value === "deleted") {
    return "Vehicule supprime avec succes.";
  }

  return "";
}

export default async function AdminFleetPage(props: PageProps<"/admin/fleet">) {
  const searchParams = await props.searchParams;
  const fleetResult = await getAdminFleetSafe();
  const fleet = fleetResult.data;
  const canPersist = hasSupabaseAdminConfig();
  const success = successMessage(searchParams.success);
  const hasSaveError = searchParams.error === "save";

  return (
    <AdminShell>
      <div className="px-4 py-6 sm:px-8 lg:px-10">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.32em] text-gold">
              Gestion
            </p>
            <h1 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
              Flotte
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-stone-400">
              Vehicules, images, descriptions et details affiches sur le site.
              Les images locales attendues sont /fleet/ford-transit.jpg et /fleet/skoda-superb.jpg.
            </p>
          </div>
        </div>

        {!canPersist ? (
          <Alert tone="warning">
            Mode local actif: la flotte est enregistree dans data/admin-catalog.json.
            Configurez Supabase pour synchroniser la production.
          </Alert>
        ) : null}

        {fleetResult.error ? (
          <Alert tone="error">
            Impossible de charger la flotte depuis Supabase. Affichage des donnees locales.
            {process.env.NODE_ENV !== "production" ? (
              <pre className="mt-3 overflow-x-auto text-xs">{fleetResult.error}</pre>
            ) : null}
          </Alert>
        ) : null}

        {hasSaveError ? (
          <Alert tone="error">
            Enregistrement impossible. Verifiez la table public.fleet, les variables serveur
            et le format de l&apos;image.
          </Alert>
        ) : null}

        {success ? <Alert tone="success">{success}</Alert> : null}

        <section className="mt-8 border border-white/10 bg-white/[0.04] p-5">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-xl font-semibold text-white">Ajouter un vehicule</h2>
            <span className="border border-gold/30 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-gold">
              Nouveau
            </span>
          </div>
          <form action="/api/admin/fleet" method="post" className="mt-5 grid gap-4 lg:grid-cols-4">
            <input name="intent" type="hidden" value="create" />
            <label className="space-y-2 lg:col-span-2">
              <span className={labelClass}>Nom</span>
              <input className={inputClass} name="name" required maxLength={120} />
            </label>
            <label className="space-y-2">
              <span className={labelClass}>Categorie</span>
              <input className={inputClass} name="category" placeholder="Van VIP" />
            </label>
            <label className="space-y-2">
              <span className={labelClass}>Ordre</span>
              <input className={inputClass} min="0" name="displayOrder" type="number" defaultValue={0} />
            </label>
            <label className="space-y-2">
              <span className={labelClass}>Places</span>
              <input className={inputClass} min="0" name="seats" type="number" defaultValue={3} />
            </label>
            <label className="space-y-2">
              <span className={labelClass}>Bagages</span>
              <input className={inputClass} min="0" name="luggage" type="number" defaultValue={2} />
            </label>
            <label className="space-y-2 lg:col-span-2">
              <span className={labelClass}>Note prix</span>
              <input className={inputClass} name="priceNote" placeholder="Sur devis" />
            </label>
            <label className="space-y-2 lg:col-span-4">
              <span className={labelClass}>Image locale ou URL</span>
              <input className={inputClass} name="imageUrl" placeholder="/fleet/ford-transit.jpg" />
            </label>
            <label className="space-y-2 lg:col-span-2">
              <span className={labelClass}>Description courte</span>
              <textarea className={inputClass} name="shortDescription" rows={2} />
            </label>
            <label className="space-y-2 lg:col-span-2">
              <span className={labelClass}>Description longue</span>
              <textarea className={inputClass} name="longDescription" rows={2} />
            </label>
            <label className="space-y-2 lg:col-span-4">
              <span className={labelClass}>Description</span>
              <textarea className={inputClass} name="description" required rows={3} />
            </label>
            <label className="flex items-center gap-3 text-sm text-stone-200">
              <input name="isFeatured" type="checkbox" defaultChecked />
              Mis en avant
            </label>
            <label className="flex items-center gap-3 text-sm text-stone-200">
              <input name="isActive" type="checkbox" defaultChecked />
              Actif
            </label>
            <div className="lg:col-span-4">
              <ConfirmSubmitButton
                className="inline-flex min-h-11 items-center justify-center gap-2 bg-gold px-5 text-sm font-bold uppercase tracking-[0.16em] text-black transition hover:bg-champagne disabled:cursor-wait disabled:opacity-70"
                message="Confirmer l'ajout de ce vehicule ?"
                type="submit"
              >
                <Plus className="h-4 w-4" />
                Ajouter un vehicule
              </ConfirmSubmitButton>
            </div>
          </form>
        </section>

        <section className="mt-8 border border-white/10 bg-white/[0.04]">
          <div className="border-b border-white/10 px-5 py-4">
            <h2 className="text-xl font-semibold text-white">Vehicules</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-[920px] w-full text-left text-sm">
              <thead className="bg-black/40 text-xs uppercase tracking-[0.14em] text-stone-500">
                <tr>
                  <th className="px-4 py-3">Image</th>
                  <th className="px-4 py-3">Vehicule</th>
                  <th className="px-4 py-3">Details</th>
                  <th className="px-4 py-3">Statut</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {fleet.map((vehicle) => (
                  <tr key={vehicle.id} className="align-top">
                    <td className="px-4 py-4">
                      <div className="relative h-20 w-28 overflow-hidden border border-gold/20 bg-black">
                        <SafeImage
                          src={vehicle.imageUrl}
                          fallbackSrc={fallbackFleetImage}
                          alt={vehicle.name}
                          fill
                          sizes="112px"
                          className="object-cover"
                        />
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <p className="font-semibold text-white">{vehicle.name}</p>
                      <p className="mt-1 text-stone-400">{vehicle.category || "Premium"}</p>
                      <p className="mt-2 line-clamp-2 max-w-sm text-stone-400">
                        {vehicle.shortDescription || vehicle.description || "Aucune description"}
                      </p>
                    </td>
                    <td className="px-4 py-4 text-stone-300">
                      <p>{vehicle.seats} places</p>
                      <p>{vehicle.luggage} bagages</p>
                      <p>Ordre {vehicle.displayOrder}</p>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex flex-wrap gap-2">
                        <span className={vehicle.isActive ? "border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-200" : "border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-bold text-stone-400"}>
                          {vehicle.isActive ? "Actif" : "Inactif"}
                        </span>
                        {vehicle.isFeatured ? (
                          <span className="border border-gold/30 bg-gold/[0.08] px-3 py-1 text-xs font-bold text-gold">
                            Mis en avant
                          </span>
                        ) : null}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <details>
                        <summary className="cursor-pointer text-gold transition hover:text-champagne">
                          Modifier
                        </summary>
                        <div className="mt-4 w-[min(760px,calc(100vw-3rem))] border border-white/10 bg-black/60 p-4">
                          <form action="/api/admin/fleet" method="post" className="grid gap-4 sm:grid-cols-2">
                            <input name="intent" type="hidden" value="update" />
                            <input name="id" type="hidden" value={vehicle.id} />
                            <label className="space-y-2">
                              <span className={labelClass}>Nom</span>
                              <input className={inputClass} name="name" defaultValue={vehicle.name} required maxLength={120} />
                            </label>
                            <label className="space-y-2">
                              <span className={labelClass}>Categorie</span>
                              <input className={inputClass} name="category" defaultValue={vehicle.category} />
                            </label>
                            <label className="space-y-2">
                              <span className={labelClass}>Places</span>
                              <input className={inputClass} min="0" name="seats" type="number" defaultValue={vehicle.seats} />
                            </label>
                            <label className="space-y-2">
                              <span className={labelClass}>Bagages</span>
                              <input className={inputClass} min="0" name="luggage" type="number" defaultValue={vehicle.luggage} />
                            </label>
                            <label className="space-y-2">
                              <span className={labelClass}>Ordre</span>
                              <input className={inputClass} min="0" name="displayOrder" type="number" defaultValue={vehicle.displayOrder} />
                            </label>
                            <label className="space-y-2">
                              <span className={labelClass}>Note prix</span>
                              <input className={inputClass} name="priceNote" defaultValue={vehicle.priceNote} />
                            </label>
                            <label className="space-y-2 sm:col-span-2">
                              <span className={labelClass}>Image locale ou URL</span>
                              <input className={inputClass} name="imageUrl" defaultValue={vehicle.imageUrl ?? ""} />
                            </label>
                            <label className="space-y-2 sm:col-span-2">
                              <span className={labelClass}>Description courte</span>
                              <textarea className={inputClass} name="shortDescription" defaultValue={vehicle.shortDescription} rows={2} />
                            </label>
                            <label className="space-y-2 sm:col-span-2">
                              <span className={labelClass}>Description longue</span>
                              <textarea className={inputClass} name="longDescription" defaultValue={vehicle.longDescription} rows={3} />
                            </label>
                            <label className="space-y-2 sm:col-span-2">
                              <span className={labelClass}>Description</span>
                              <textarea className={inputClass} name="description" defaultValue={vehicle.description} required rows={3} />
                            </label>
                            <label className="flex items-center gap-3 text-sm text-stone-200">
                              <input name="isFeatured" type="checkbox" defaultChecked={vehicle.isFeatured} />
                              Mis en avant
                            </label>
                            <label className="flex items-center gap-3 text-sm text-stone-200">
                              <input name="isActive" type="checkbox" defaultChecked={vehicle.isActive} />
                              Actif
                            </label>
                            <div className="sm:col-span-2">
                              <ConfirmSubmitButton
                                className="inline-flex min-h-10 items-center justify-center gap-2 border border-gold px-4 text-sm font-semibold text-gold transition hover:bg-gold hover:text-black disabled:cursor-wait disabled:opacity-70"
                                message={`Confirmer les modifications du vehicule "${vehicle.name}" ?`}
                                type="submit"
                              >
                                <Save className="h-4 w-4" />
                                Enregistrer
                              </ConfirmSubmitButton>
                            </div>
                          </form>
                          <form action="/api/admin/fleet" method="post" className="mt-3">
                            <input name="intent" type="hidden" value="delete" />
                            <input name="id" type="hidden" value={vehicle.id} />
                            <ConfirmSubmitButton
                              className="inline-flex min-h-10 items-center justify-center gap-2 border border-white/10 px-4 text-sm font-semibold text-stone-200 transition hover:border-red-400 hover:text-red-300 disabled:cursor-wait disabled:opacity-70"
                              message={`Confirmer la suppression du vehicule "${vehicle.name}" ?`}
                              type="submit"
                            >
                              <Trash2 className="h-4 w-4" />
                              Supprimer
                            </ConfirmSubmitButton>
                          </form>
                        </div>
                      </details>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {fleet.length === 0 ? (
            <div className="p-6 text-sm leading-6 text-stone-400">
              Aucun vehicule pour le moment. Les valeurs par defaut attendues sont Ford Transit
              et Skoda Superb.
            </div>
          ) : null}
        </section>
      </div>
    </AdminShell>
  );
}
