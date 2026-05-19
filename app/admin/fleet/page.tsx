import type { Metadata } from "next";
import { Plus, Save, Trash2 } from "lucide-react";
import { AdminShell } from "@/components/admin/admin-shell";
import { ConfirmSubmitButton } from "@/components/admin/confirm-submit-button";
import { createVehicle, deleteVehicle, updateVehicle } from "@/app/admin/actions";
import { getAdminFleetSafe } from "@/lib/data/admin-catalog";
import { hasSupabaseAdminConfig } from "@/lib/supabase/config";

export const metadata: Metadata = {
  title: "Admin Flotte",
};

export const dynamic = "force-dynamic";

const inputClass =
  "w-full border border-white/10 bg-black/30 px-3 py-2 text-sm text-white outline-none transition placeholder:text-stone-600 focus:border-gold";
const labelClass = "text-xs font-bold uppercase tracking-[0.16em] text-stone-500";

export default async function AdminFleetPage(props: PageProps<"/admin/fleet">) {
  const searchParams = await props.searchParams;
  const fleetResult = await getAdminFleetSafe();
  const fleet = fleetResult.data;
  const canPersist = hasSupabaseAdminConfig();
  const hasSaveError = searchParams.error === "save";

  return (
    <AdminShell>
      <div className="px-6 py-8 sm:px-8 lg:px-10">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.32em] text-gold">
              Gestion
            </p>
            <h1 className="mt-4 text-4xl font-semibold text-white">Flotte</h1>
          </div>
        </div>

        {!canPersist ? (
          <div className="mt-8 border border-gold/30 bg-gold/[0.08] p-5 text-sm leading-6 text-stone-200">
            Mode local actif: la flotte est enregistree dans data/admin-catalog.json.
            Ajoutez NEXT_PUBLIC_SUPABASE_URL et SUPABASE_SERVICE_ROLE_KEY dans .env.local
            pour utiliser Supabase.
          </div>
        ) : null}

        {fleetResult.error ? (
          <div className="mt-8 border border-red-400/30 bg-red-500/10 p-5 text-sm leading-6 text-red-100">
            Impossible de charger la flotte depuis Supabase. Affichage des donnees locales.
            {process.env.NODE_ENV !== "production" ? (
              <pre className="mt-3 overflow-x-auto text-xs">{fleetResult.error}</pre>
            ) : null}
          </div>
        ) : null}

        {hasSaveError ? (
          <div className="mt-8 border border-red-400/30 bg-red-500/10 p-5 text-sm leading-6 text-red-100">
            Impossible d&apos;enregistrer la flotte. Verifiez que la table public.fleet
            existe avec le schema a jour, puis relancez l&apos;operation.
          </div>
        ) : null}

        <section className="mt-8 border border-white/10 bg-white/[0.04] p-5">
          <h2 className="text-xl font-semibold text-white">Ajouter un vehicule</h2>
          <form action={createVehicle} className="mt-5 grid gap-4 lg:grid-cols-4">
            <fieldset className="contents">
            <label className="space-y-2">
              <span className={labelClass}>Nom</span>
              <input className={inputClass} name="name" required />
            </label>
            <label className="space-y-2">
              <span className={labelClass}>Categorie</span>
              <input className={inputClass} name="category" placeholder="Van VIP" />
            </label>
            <label className="space-y-2">
              <span className={labelClass}>Places</span>
              <input className={inputClass} min="0" name="seats" type="number" defaultValue={3} />
            </label>
            <label className="space-y-2 lg:col-span-2">
              <span className={labelClass}>Bagages</span>
              <input className={inputClass} min="0" name="luggage" type="number" defaultValue={2} />
            </label>
            <label className="space-y-2 lg:col-span-2">
              <span className={labelClass}>Ordre</span>
              <input className={inputClass} min="0" name="displayOrder" type="number" defaultValue={0} />
            </label>
            <label className="space-y-2 lg:col-span-2">
              <span className={labelClass}>Note prix</span>
              <input className={inputClass} name="priceNote" placeholder="Sur devis" />
            </label>
            <label className="space-y-2 lg:col-span-4">
              <span className={labelClass}>Image URL</span>
              <input className={inputClass} name="imageUrl" type="url" />
            </label>
            <label className="space-y-2 lg:col-span-4">
              <span className={labelClass}>Description courte</span>
              <textarea className={inputClass} name="shortDescription" rows={2} />
            </label>
            <label className="space-y-2 lg:col-span-4">
              <span className={labelClass}>Description longue</span>
              <textarea className={inputClass} name="longDescription" rows={3} />
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
                className="inline-flex h-11 items-center justify-center gap-2 bg-gold px-5 text-sm font-bold uppercase tracking-[0.16em] text-black transition hover:bg-champagne"
                message="Confirmer l'ajout de ce vehicule ?"
                type="submit"
              >
                <Plus className="h-4 w-4" />
                Ajouter
              </ConfirmSubmitButton>
            </div>
            </fieldset>
          </form>
        </section>

        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          {fleet.map((vehicle) => (
            <article key={vehicle.id} className="border border-white/10 bg-white/[0.04] p-5">
              <form action={updateVehicle} className="grid gap-4 sm:grid-cols-2">
                <fieldset className="contents">
                <input name="id" type="hidden" value={vehicle.id} />
                <label className="space-y-2">
                  <span className={labelClass}>Nom</span>
                  <input className={inputClass} name="name" defaultValue={vehicle.name} required />
                </label>
                <label className="space-y-2">
                  <span className={labelClass}>Categorie</span>
                  <input
                    className={inputClass}
                    name="category"
                    defaultValue={vehicle.category}
                  />
                </label>
                <label className="space-y-2">
                  <span className={labelClass}>Places</span>
                  <input
                    className={inputClass}
                    min="0"
                    name="seats"
                    type="number"
                    defaultValue={vehicle.seats}
                  />
                </label>
                <label className="space-y-2">
                  <span className={labelClass}>Bagages</span>
                  <input
                    className={inputClass}
                    min="0"
                    name="luggage"
                    type="number"
                    defaultValue={vehicle.luggage}
                  />
                </label>
                <label className="space-y-2">
                  <span className={labelClass}>Ordre</span>
                  <input
                    className={inputClass}
                    min="0"
                    name="displayOrder"
                    type="number"
                    defaultValue={vehicle.displayOrder}
                  />
                </label>
                <label className="space-y-2">
                  <span className={labelClass}>Note prix</span>
                  <input className={inputClass} name="priceNote" defaultValue={vehicle.priceNote} />
                </label>
                <label className="space-y-2 sm:col-span-2">
                  <span className={labelClass}>Image URL</span>
                  <input className={inputClass} name="imageUrl" type="url" defaultValue={vehicle.imageUrl} />
                </label>
                <label className="space-y-2 sm:col-span-2">
                  <span className={labelClass}>Description courte</span>
                  <textarea
                    className={inputClass}
                    name="shortDescription"
                    defaultValue={vehicle.shortDescription}
                    rows={2}
                  />
                </label>
                <label className="space-y-2 sm:col-span-2">
                  <span className={labelClass}>Description longue</span>
                  <textarea
                    className={inputClass}
                    name="longDescription"
                    defaultValue={vehicle.longDescription}
                    rows={3}
                  />
                </label>
                <label className="space-y-2 sm:col-span-2">
                  <span className={labelClass}>Description</span>
                  <textarea
                    className={inputClass}
                    name="description"
                    defaultValue={vehicle.description}
                    required
                    rows={3}
                  />
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
                    className="inline-flex h-10 items-center justify-center gap-2 border border-gold px-4 text-sm font-semibold text-gold transition hover:bg-gold hover:text-black"
                    message={`Confirmer les modifications du vehicule "${vehicle.name}" ?`}
                    type="submit"
                  >
                    <Save className="h-4 w-4" />
                    Modifier
                  </ConfirmSubmitButton>
                </div>
                </fieldset>
              </form>
              <form action={deleteVehicle} className="mt-3">
                <input name="id" type="hidden" value={vehicle.id} />
                <ConfirmSubmitButton
                  className="inline-flex h-10 items-center justify-center gap-2 border border-white/10 px-4 text-sm font-semibold text-stone-200 transition hover:border-red-400 hover:text-red-300"
                  message={`Confirmer la suppression du vehicule "${vehicle.name}" ?`}
                  type="submit"
                >
                  <Trash2 className="h-4 w-4" />
                  Supprimer
                </ConfirmSubmitButton>
              </form>
            </article>
          ))}
          {fleet.length === 0 ? (
            <div className="border border-white/10 bg-black/20 p-6 text-stone-400">
              Aucun vehicule pour le moment.
            </div>
          ) : null}
        </div>
      </div>
    </AdminShell>
  );
}
