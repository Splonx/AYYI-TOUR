import type { Metadata } from "next";
import { AdminShell } from "@/components/admin/admin-shell";
import { getAdminDiagnostics } from "@/lib/admin-diagnostics";

export const metadata: Metadata = {
  title: "Admin Diagnostics",
};

export const dynamic = "force-dynamic";

export default async function AdminDiagnosticsPage() {
  const diagnostics = await getAdminDiagnostics();

  return (
    <AdminShell>
      <div className="px-6 py-8 sm:px-8 lg:px-10">
        <div className="mb-8">
          <p className="text-xs font-bold uppercase tracking-[0.32em] text-gold">
            Diagnostic
          </p>
          <h1 className="mt-4 text-4xl font-semibold text-white">
            Configuration back-office
          </h1>
          <p className="mt-4 max-w-2xl text-stone-400">
            Verification serveur des variables, tables Supabase et bucket images.
            Les valeurs secretes ne sont jamais affichees.
          </p>
        </div>

        <div className="grid gap-3">
          {diagnostics.items.map((item) => (
            <article
              key={item.label}
              className="grid gap-2 border border-white/10 bg-white/[0.04] p-4 sm:grid-cols-[220px_90px_1fr]"
            >
              <p className="font-semibold text-white">{item.label}</p>
              <p className={item.ok ? "font-bold text-emerald-300" : "font-bold text-red-300"}>
                {item.ok ? "OK" : "Erreur"}
              </p>
              <p className="text-sm leading-6 text-stone-300">{item.detail}</p>
            </article>
          ))}
        </div>

        {process.env.NODE_ENV !== "production" ? (
          <pre className="mt-8 overflow-x-auto border border-white/10 bg-black/40 p-4 text-xs text-stone-300">
            {JSON.stringify(diagnostics, null, 2)}
          </pre>
        ) : null}
      </div>
    </AdminShell>
  );
}
