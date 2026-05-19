"use client";

import Link from "next/link";

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const isDevelopment = process.env.NODE_ENV !== "production";

  return (
    <main className="min-h-screen bg-obsidian px-6 py-12 text-ivory">
      <div className="mx-auto max-w-3xl border border-red-400/30 bg-red-500/10 p-6">
        <p className="text-xs font-bold uppercase tracking-[0.28em] text-red-200">
          Erreur admin
        </p>
        <h1 className="mt-4 text-3xl font-semibold text-white">
          Impossible de charger le back-office
        </h1>
        <p className="mt-4 leading-7 text-stone-300">
          Verifiez la configuration Supabase et les variables admin dans l&apos;environnement
          de production.
        </p>
        {error.digest ? (
          <p className="mt-3 text-xs text-stone-500">Digest: {error.digest}</p>
        ) : null}
        <div className="mt-5 border border-white/10 bg-black/50 p-4">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-red-200">
            Erreur exacte
          </p>
          <pre className="mt-3 overflow-x-auto whitespace-pre-wrap text-xs leading-6 text-red-100">
            {error.message || "Erreur inconnue"}
            {isDevelopment && error.stack ? `\n\n${error.stack}` : ""}
          </pre>
        </div>
        <button
          type="button"
          onClick={reset}
          className="mt-6 inline-flex h-11 items-center justify-center bg-gold px-5 text-sm font-bold uppercase tracking-[0.16em] text-black"
        >
          Reessayer
        </button>
        <Link
          href="/admin/diagnostics"
          className="ml-3 mt-6 inline-flex h-11 items-center justify-center border border-gold px-5 text-sm font-bold uppercase tracking-[0.16em] text-gold"
        >
          Diagnostics
        </Link>
      </div>
    </main>
  );
}
