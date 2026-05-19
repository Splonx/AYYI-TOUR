"use client";

import Link from "next/link";

export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-obsidian px-6 text-center text-ivory">
      <div className="max-w-xl">
        <p className="text-xs font-bold uppercase tracking-[0.32em] text-gold">
          Incident temporaire
        </p>
        <h1 className="mt-4 text-4xl font-semibold text-white sm:text-5xl">
          Une erreur est survenue
        </h1>
        <p className="mt-5 leading-7 text-stone-300">
          Merci de reessayer. Si le probleme persiste, contactez AYYI TOUR via WhatsApp.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={reset}
            className="inline-flex h-12 items-center justify-center bg-gold px-5 text-sm font-bold uppercase tracking-[0.16em] text-black transition hover:bg-champagne"
          >
            Reessayer
          </button>
          <Link
            href="/"
            className="inline-flex h-12 items-center justify-center border border-gold px-5 text-sm font-bold uppercase tracking-[0.16em] text-gold transition hover:bg-gold hover:text-black"
          >
            Retour accueil
          </Link>
        </div>
      </div>
    </main>
  );
}
