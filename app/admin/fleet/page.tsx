import type { Metadata } from "next";
import { Plus, Save, Trash2 } from "lucide-react";
import { AdminShell } from "@/components/admin/admin-shell";
import { ConfirmSubmitButton } from "@/components/admin/confirm-submit-button";
import { createVehicle, deleteVehicle, updateVehicle } from "@/app/admin/actions";
import { getAdminFleet } from "@/lib/data/admin-catalog";
import { hasSupabaseAdminConfig } from "@/lib/supabase/config";

export const metadata: Metadata = {
  title: "Admin Flotte",
};

const inputClass =
  "w-full border border-white/10 bg-black/30 px-3 py-2 text-sm text-white outline-none transition placeholder:text-stone-600 focus:border-gold";
const labelClass = "text-xs font-bold uppercase tracking-[0.16em] text-stone-500";

export default async function AdminFleetPage() {
  const fleet = await getAdminFleet();
  const canPersist = hasSupabaseAdminConfig();

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

        <section className="mt-8 border border-white/10 bg-white/[0.04] p-5">
          <h2 className="text-xl font-semibold text-white">Ajouter un vehicule</h2>
          <form action={createVehicle} className="mt-5 grid gap-4 lg:grid-cols-4">
            <fieldset className="contents">
            <label className="space-y-2">
              <span className={labelClass}>Nom</span>
              <input className={inputClass} name="name" required />
            </label>
            <label className="space-y-2">
              <span className={labelClass}>Slug</span>
              <input className={inputClass} name="slug" placeholder="auto si vide" />
            </label>
            <label className="space-y-2">
              <span className={labelClass}>Segment</span>
              <input className={inputClass} name="segment" required />
            </label>
            <label className="space-y-2">
              <span className={labelClass}>Statut</span>
              <select className={inputClass} name="status" defaultValue="available">
                <option value="available">available</option>
                <option value="maintenance">maintenance</option>
                <option value="hidden">hidden</option>
              </select>
            </label>
            <label className="space-y-2 lg:col-span-2">
              <span className={labelClass}>Passagers</span>
              <input className={inputClass} min="0" name="passengers" type="number" defaultValue={3} />
            </label>
            <label className="space-y-2 lg:col-span-2">
              <span className={labelClass}>Bagages</span>
              <input className={inputClass} min="0" name="luggage" type="number" defaultValue={2} />
            </label>
            <label className="space-y-2 lg:col-span-4">
              <span className={labelClass}>Description</span>
              <textarea className={inputClass} name="description" required rows={3} />
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
                  <span className={labelClass}>Slug</span>
                  <input className={inputClass} name="slug" defaultValue={vehicle.slug} required />
                </label>
                <label className="space-y-2">
                  <span className={labelClass}>Segment</span>
                  <input
                    className={inputClass}
                    name="segment"
                    defaultValue={vehicle.segment}
                    required
                  />
                </label>
                <label className="space-y-2">
                  <span className={labelClass}>Statut</span>
                  <select className={inputClass} name="status" defaultValue={vehicle.status}>
                    <option value="available">available</option>
                    <option value="maintenance">maintenance</option>
                    <option value="hidden">hidden</option>
                  </select>
                </label>
                <label className="space-y-2">
                  <span className={labelClass}>Passagers</span>
                  <input
                    className={inputClass}
                    min="0"
                    name="passengers"
                    type="number"
                    defaultValue={vehicle.passengers}
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
