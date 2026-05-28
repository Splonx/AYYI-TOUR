import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Plus, Save, Trash2 } from "lucide-react";
import { AdminShell } from "@/components/admin/admin-shell";
import { ConfirmSubmitButton } from "@/components/admin/confirm-submit-button";
import { getAdminServicesSafe } from "@/lib/data/admin-catalog";
import { hasSupabaseAdminConfig } from "@/lib/supabase/config";

export const metadata: Metadata = {
  title: "Admin Services",
};

export const dynamic = "force-dynamic";

const inputClass =
  "w-full border border-white/10 bg-black/30 px-3 py-2 text-sm text-white outline-none transition placeholder:text-stone-600 focus:border-gold";
const labelClass = "text-xs font-bold uppercase tracking-[0.16em] text-stone-500";
const iconOptions = ["Plane", "BriefcaseBusiness", "CalendarCheck", "Gem", "Sparkles"];

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
    return "Service ajoute avec succes.";
  }

  if (value === "updated") {
    return "Service modifie avec succes.";
  }

  if (value === "deleted") {
    return "Service supprime avec succes.";
  }

  return "";
}

export default async function AdminServicesPage(props: PageProps<"/admin/services">) {
  const searchParams = await props.searchParams;
  const servicesResult = await getAdminServicesSafe();
  const services = servicesResult.data;
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
              Services
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-stone-400">
              Services affiches sur le front-office. Les champs vides sont normalises
              cote serveur pour eviter les crashs en production.
            </p>
          </div>
        </div>

        {!canPersist ? (
          <Alert tone="warning">
            Mode local actif: les services sont enregistres dans data/admin-catalog.json.
            Configurez Supabase pour synchroniser la production.
          </Alert>
        ) : null}

        {servicesResult.error ? (
          <Alert tone="error">
            Impossible de charger les services depuis Supabase. Affichage des donnees locales.
            {process.env.NODE_ENV !== "production" ? (
              <pre className="mt-3 overflow-x-auto text-xs">{servicesResult.error}</pre>
            ) : null}
          </Alert>
        ) : null}

        {hasSaveError ? (
          <Alert tone="error">
            Enregistrement impossible. Verifiez la table public.services et les variables serveur.
          </Alert>
        ) : null}

        {success ? <Alert tone="success">{success}</Alert> : null}

        <section className="mt-8 border border-white/10 bg-white/[0.04] p-5">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-xl font-semibold text-white">Ajouter un service</h2>
            <span className="border border-gold/30 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-gold">
              Nouveau
            </span>
          </div>
          <form action="/api/admin/services" method="post" className="mt-5 grid gap-4 lg:grid-cols-4">
            <input name="intent" type="hidden" value="create" />
            <label className="space-y-2 lg:col-span-2">
              <span className={labelClass}>Titre</span>
              <input className={inputClass} name="title" required maxLength={120} />
            </label>
            <label className="space-y-2">
              <span className={labelClass}>Icone</span>
              <select className={inputClass} name="icon" defaultValue="Sparkles">
                {iconOptions.map((icon) => (
                  <option key={icon} value={icon}>
                    {icon}
                  </option>
                ))}
              </select>
            </label>
            <label className="space-y-2">
              <span className={labelClass}>Ordre</span>
              <input className={inputClass} min="0" name="displayOrder" type="number" defaultValue={0} />
            </label>
            <label className="space-y-2 lg:col-span-4">
              <span className={labelClass}>Description</span>
              <textarea className={inputClass} name="description" required rows={3} />
            </label>
            <label className="flex items-center gap-3 text-sm text-stone-200">
              <input name="isActive" type="checkbox" defaultChecked />
              Actif
            </label>
            <div className="lg:col-span-4">
              <ConfirmSubmitButton
                className="inline-flex min-h-11 items-center justify-center gap-2 bg-gold px-5 text-sm font-bold uppercase tracking-[0.16em] text-black transition hover:bg-champagne disabled:cursor-wait disabled:opacity-70"
                message="Confirmer l'ajout de ce service ?"
                type="submit"
              >
                <Plus className="h-4 w-4" />
                Ajouter un service
              </ConfirmSubmitButton>
            </div>
          </form>
        </section>

        <section className="mt-8 border border-white/10 bg-white/[0.04]">
          <div className="border-b border-white/10 px-5 py-4">
            <h2 className="text-xl font-semibold text-white">Catalogue services</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-[760px] w-full text-left text-sm">
              <thead className="bg-black/40 text-xs uppercase tracking-[0.14em] text-stone-500">
                <tr>
                  <th className="px-4 py-3">Titre</th>
                  <th className="px-4 py-3">Icone</th>
                  <th className="px-4 py-3">Ordre</th>
                  <th className="px-4 py-3">Statut</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {services.map((service) => (
                  <tr key={service.id} className="align-top">
                    <td className="px-4 py-4">
                      <p className="font-semibold text-white">{service.title}</p>
                      <p className="mt-1 line-clamp-2 max-w-md text-stone-400">
                        {service.description || "Aucune description"}
                      </p>
                    </td>
                    <td className="px-4 py-4 text-stone-300">{service.icon}</td>
                    <td className="px-4 py-4 text-stone-300">{service.displayOrder}</td>
                    <td className="px-4 py-4">
                      <span className={service.isActive ? "border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-200" : "border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-bold text-stone-400"}>
                        {service.isActive ? "Actif" : "Inactif"}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <details className="group">
                        <summary className="cursor-pointer text-gold transition hover:text-champagne">
                          Modifier
                        </summary>
                        <div className="mt-4 w-[min(680px,calc(100vw-3rem))] border border-white/10 bg-black/60 p-4">
                          <form action="/api/admin/services" method="post" className="grid gap-4 sm:grid-cols-2">
                            <input name="intent" type="hidden" value="update" />
                            <input name="id" type="hidden" value={service.id} />
                            <label className="space-y-2">
                              <span className={labelClass}>Titre</span>
                              <input className={inputClass} name="title" defaultValue={service.title} required maxLength={120} />
                            </label>
                            <label className="space-y-2">
                              <span className={labelClass}>Icone</span>
                              <select className={inputClass} name="icon" defaultValue={service.icon}>
                                {iconOptions.map((icon) => (
                                  <option key={icon} value={icon}>
                                    {icon}
                                  </option>
                                ))}
                              </select>
                            </label>
                            <label className="space-y-2">
                              <span className={labelClass}>Ordre</span>
                              <input className={inputClass} min="0" name="displayOrder" type="number" defaultValue={service.displayOrder} />
                            </label>
                            <label className="flex items-center gap-3 pt-7 text-sm text-stone-200">
                              <input name="isActive" type="checkbox" defaultChecked={service.isActive} />
                              Actif
                            </label>
                            <label className="space-y-2 sm:col-span-2">
                              <span className={labelClass}>Description</span>
                              <textarea className={inputClass} name="description" defaultValue={service.description} required rows={3} />
                            </label>
                            <div className="flex flex-wrap gap-2 sm:col-span-2">
                              <ConfirmSubmitButton
                                className="inline-flex min-h-10 items-center justify-center gap-2 border border-gold px-4 text-sm font-semibold text-gold transition hover:bg-gold hover:text-black disabled:cursor-wait disabled:opacity-70"
                                message={`Confirmer les modifications du service "${service.title}" ?`}
                                type="submit"
                              >
                                <Save className="h-4 w-4" />
                                Enregistrer
                              </ConfirmSubmitButton>
                            </div>
                          </form>
                          <form action="/api/admin/services" method="post" className="mt-3">
                            <input name="intent" type="hidden" value="delete" />
                            <input name="id" type="hidden" value={service.id} />
                            <ConfirmSubmitButton
                              className="inline-flex min-h-10 items-center justify-center gap-2 border border-white/10 px-4 text-sm font-semibold text-stone-200 transition hover:border-red-400 hover:text-red-300 disabled:cursor-wait disabled:opacity-70"
                              message={`Confirmer la suppression du service "${service.title}" ?`}
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
          {services.length === 0 ? (
            <div className="p-6 text-sm leading-6 text-stone-400">
              Aucun service pour le moment. Ajoutez un premier service pour alimenter le site.
            </div>
          ) : null}
        </section>
      </div>
    </AdminShell>
  );
}
