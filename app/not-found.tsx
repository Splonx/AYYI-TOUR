import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-obsidian px-6 text-center text-ivory">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.32em] text-gold">
          Page introuvable
        </p>
        <h1 className="mt-4 text-5xl font-semibold text-white">404</h1>
        <Link
          href="/"
          className="mt-8 inline-flex border border-gold px-5 py-3 text-sm font-bold uppercase tracking-[0.18em] text-gold hover:bg-gold hover:text-black"
        >
          Retour accueil
        </Link>
      </div>
    </main>
  );
}
