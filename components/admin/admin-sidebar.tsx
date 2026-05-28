"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Car, LayoutDashboard, LogOut, Settings, Sparkles } from "lucide-react";

const adminNav = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/services", label: "Services", icon: Sparkles },
  { href: "/admin/fleet", label: "Flotte", icon: Car },
  { href: "/admin/settings", label: "Parametres", icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="border-b border-white/10 bg-black/95 px-4 py-4 lg:min-h-screen lg:border-b-0 lg:border-r lg:px-5 lg:py-6">
      <div className="mb-5 flex items-center justify-between gap-4 lg:mb-10 lg:block">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-white sm:tracking-[0.24em]">
          AYYI Admin
        </p>
        <p className="hidden text-xs uppercase tracking-[0.2em] text-gold lg:mt-2 lg:block">
          Operations VIP
        </p>
      </div>
      <nav className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-1">
        {adminNav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={clsx(
              "flex min-h-11 items-center gap-3 border px-3 py-3 text-sm font-semibold transition sm:px-4",
              pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href))
                ? "border-gold bg-gold text-black"
                : "border-white/10 text-stone-200 hover:border-gold hover:text-gold",
            )}
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="mt-6 hidden border border-gold/20 bg-gold/10 p-4 text-sm text-stone-200 lg:block">
        <Settings className="mb-3 h-5 w-5 text-gold" />
        Back-office limite aux services, a la flotte et aux visuels vehicules.
      </div>
      <form action="/api/admin/logout" method="post" className="mt-5">
        <button
          type="submit"
          className="flex min-h-11 w-full items-center justify-center gap-3 border border-white/10 px-4 py-3 text-left text-sm font-semibold text-stone-300 transition hover:border-gold hover:text-gold lg:justify-start"
        >
          <LogOut className="h-4 w-4" />
          Deconnexion
        </button>
      </form>
    </aside>
  );
}
