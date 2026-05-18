import type { Metadata } from "next";
import { Plus, Save, Trash2 } from "lucide-react";
import { AdminShell } from "@/components/admin/admin-shell";
import { ConfirmSubmitButton } from "@/components/admin/confirm-submit-button";
import { createService, deleteService, updateService } from "@/app/admin/actions";
import { getAdminServices } from "@/lib/data/admin-catalog";
import { hasSupabaseAdminConfig } from "@/lib/supabase/config";

export const metadata: Metadata = {
  title: "Admin Services",
};

const inputClass =
  "w-full border border-white/10 bg-black/30 px-3 py-2 text-sm text-white outline-none transition placeholder:text-stone-600 focus:border-gold";
const labelClass = "text-xs font-bold uppercase tracking-[0.16em] text-stone-500";

export default async function AdminServicesPage() {
  const services = await getAdminServices();
  const canPersist = hasSupabaseAdminConfig();

  return (
    <AdminShell>
      <div className="px-6 py-8 sm:px-8 lg:px-10">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.32em] text-gold">
              Gestion
            </p>
            <h1 className="mt-4 text-4xl font-semibold text-white">Services</h1>
          </div>
        </div>

        {!canPersist ? (
          <div className="mt-8 border border-gold/30 bg-gold/[0.08] p-5 text-sm leading-6 text-stone-200">
            Mode local actif: les services sont enregistres dans data/admin-catalog.json.
            Ajoutez NEXT_PUBLIC_SUPABASE_URL et SUPABASE_SERVICE_ROLE_KEY dans .env.local
            pour utiliser Supabase.
          </div>
        ) : null}

        <section className="mt-8 border border-white/10 bg-white/[0.04] p-5">
          <h2 className="text-xl font-semibold text-white">Ajouter un service</h2>
          <form action={createService} className="mt-5 grid gap-4 lg:grid-cols-4">
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
              <span className={labelClass}>Categorie</span>
              <input className={inputClass} name="category" required />
            </label>
            <label className="space-y-2">
              <span className={labelClass}>Statut</span>
              <select className={inputClass} name="status" defaultValue="draft">
                <option value="draft">draft</option>
                <option value="published">published</option>
                <option value="archived">archived</option>
              </select>
            </label>
            <label className="space-y-2 lg:col-span-3">
              <span className={labelClass}>Description</span>
              <textarea className={inputClass} name="description" required rows={3} />
            </label>
            <label className="space-y-2">
              <span className={labelClass}>Prix depart MAD</span>
              <input className={inputClass} min="0" name="startingPrice" type="number" />
            </label>
            <label className="space-y-2 lg:col-span-4">
              <span className={labelClass}>Points forts</span>
              <textarea
                className={inputClass}
                name="highlights"
                placeholder="Un point par ligne ou separe par virgule"
                rows={3}
              />
            </label>
            <div className="lg:col-span-4">
              <ConfirmSubmitButton
                className="inline-flex h-11 items-center justify-center gap-2 bg-gold px-5 text-sm font-bold uppercase tracking-[0.16em] text-black transition hover:bg-champagne"
                message="Confirmer l'ajout de ce service ?"
                type="submit"
              >
                <Plus className="h-4 w-4" />
                Ajouter
              </ConfirmSubmitButton>
            </div>
            </fieldset>
          </form>
        </section>

        <div className="mt-8 grid gap-5">
          {services.map((service) => (
            <article key={service.id} className="border border-white/10 bg-black/20 p-5">
              <form action={updateService} className="grid gap-4 lg:grid-cols-4">
                <fieldset className="contents">
                <input name="id" type="hidden" value={service.id} />
                <label className="space-y-2">
                  <span className={labelClass}>Nom</span>
                  <input className={inputClass} name="name" defaultValue={service.name} required />
                </label>
                <label className="space-y-2">
                  <span className={labelClass}>Slug</span>
                  <input className={inputClass} name="slug" defaultValue={service.slug} required />
                </label>
                <label className="space-y-2">
                  <span className={labelClass}>Categorie</span>
                  <input
                    className={inputClass}
                    name="category"
                    defaultValue={service.category}
                    required
                  />
                </label>
                <label className="space-y-2">
                  <span className={labelClass}>Statut</span>
                  <select className={inputClass} name="status" defaultValue={service.status}>
                    <option value="draft">draft</option>
                    <option value="published">published</option>
                    <option value="archived">archived</option>
                  </select>
                </label>
                <label className="space-y-2 lg:col-span-3">
                  <span className={labelClass}>Description</span>
                  <textarea
                    className={inputClass}
                    name="description"
                    defaultValue={service.description}
                    required
                    rows={3}
                  />
                </label>
                <label className="space-y-2">
                  <span className={labelClass}>Prix depart MAD</span>
                  <input
                    className={inputClass}
                    min="0"
                    name="startingPrice"
                    type="number"
                    defaultValue={service.startingPrice ?? ""}
                  />
                </label>
                <label className="space-y-2 lg:col-span-4">
                  <span className={labelClass}>Points forts</span>
                  <textarea
                    className={inputClass}
                    name="highlights"
                    defaultValue={service.highlights.join("\n")}
                    rows={3}
                  />
                </label>
                <div className="flex flex-wrap gap-2 lg:col-span-4">
                  <ConfirmSubmitButton
                    className="inline-flex h-10 items-center justify-center gap-2 border border-gold px-4 text-sm font-semibold text-gold transition hover:bg-gold hover:text-black"
                    message={`Confirmer les modifications du service "${service.name}" ?`}
                    type="submit"
                  >
                    <Save className="h-4 w-4" />
                    Modifier
                  </ConfirmSubmitButton>
                </div>
                </fieldset>
              </form>
              <form action={deleteService} className="mt-3">
                <input name="id" type="hidden" value={service.id} />
                <ConfirmSubmitButton
                  className="inline-flex h-10 items-center justify-center gap-2 border border-white/10 px-4 text-sm font-semibold text-stone-200 transition hover:border-red-400 hover:text-red-300"
                  message={`Confirmer la suppression du service "${service.name}" ?`}
                  type="submit"
                >
                  <Trash2 className="h-4 w-4" />
                  Supprimer
                </ConfirmSubmitButton>
              </form>
            </article>
          ))}
          {services.length === 0 ? (
            <div className="border border-white/10 bg-black/20 p-6 text-stone-400">
              Aucun service pour le moment.
            </div>
          ) : null}
        </div>
      </div>
    </AdminShell>
  );
}
