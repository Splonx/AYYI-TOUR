import type { Metadata } from "next";
import { LockKeyhole } from "lucide-react";
import { AyyiTourLogo } from "@/components/brand/ayyi-tour-logo";
import { hasAdminAuthConfig } from "@/lib/admin-auth";

export const metadata: Metadata = {
  title: "Connexion Admin",
};

export default async function AdminLoginPage(props: PageProps<"/admin/login">) {
  const searchParams = await props.searchParams;
  const hasError = searchParams.error === "1";
  const nextPath = typeof searchParams.next === "string" ? searchParams.next : "/admin";
  const isConfigMissing =
    searchParams.config === "missing" ||
    (process.env.NODE_ENV === "production" && !hasAdminAuthConfig());

  return (
    <main className="flex min-h-screen items-center justify-center bg-obsidian px-6 py-16 text-ivory">
      <form
        action="/api/admin/login"
        method="post"
        className="w-full max-w-md border border-white/10 bg-black/70 p-8 shadow-2xl"
      >
        <input name="next" type="hidden" value={nextPath} />
        <div className="mb-8">
          <AyyiTourLogo preload className="h-28 w-28" />
        </div>
        <div className="mb-8 flex h-12 w-12 items-center justify-center border border-gold/40 bg-gold/10 text-gold">
          <LockKeyhole className="h-6 w-6" />
        </div>
        <p className="text-xs font-bold uppercase tracking-[0.32em] text-gold">
          Acces securise
        </p>
        <h1 className="mt-4 text-4xl font-semibold text-white">Admin AYYI TOUR</h1>
        <div className="mt-8 grid gap-4">
          <label className="grid gap-2 text-sm font-semibold text-stone-200">
            Login
            <input
              name="login"
              autoComplete="username"
              className="h-12 border border-white/15 bg-white/[0.04] px-4 text-white outline-none transition focus:border-gold"
              required
            />
          </label>
          <label className="grid gap-2 text-sm font-semibold text-stone-200">
            Mot de passe
            <input
              name="password"
              type="password"
              autoComplete="current-password"
              className="h-12 border border-white/15 bg-white/[0.04] px-4 text-white outline-none transition focus:border-gold"
              required
            />
          </label>
        </div>
        {hasError ? (
          <p className="mt-4 border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-100">
            Login ou mot de passe incorrect.
          </p>
        ) : null}
        {isConfigMissing ? (
          <p className="mt-4 border border-gold/30 bg-gold/[0.08] px-4 py-3 text-sm leading-6 text-stone-200">
            Configuration admin incomplete. Ajoutez ADMIN_LOGIN, ADMIN_PASSWORD et
            ADMIN_SESSION_SECRET dans Vercel, puis redeployez.
          </p>
        ) : null}
        <button
          type="submit"
          disabled={isConfigMissing}
          className="mt-8 inline-flex h-12 w-full items-center justify-center bg-gold px-5 text-sm font-bold uppercase tracking-[0.18em] text-black transition hover:bg-champagne disabled:cursor-not-allowed disabled:opacity-50"
        >
          Se connecter
        </button>
      </form>
    </main>
  );
}
