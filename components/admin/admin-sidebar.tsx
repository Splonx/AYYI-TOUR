import Link from "next/link";
import { Car, LayoutDashboard, LogOut, Settings, Sparkles } from "lucide-react";
import { logoutAdmin } from "@/app/admin/actions";

const adminNav = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/services", label: "Services", icon: Sparkles },
  { href: "/admin/fleet", label: "Flotte", icon: Car },
];

export function AdminSidebar() {
  return (
    <aside className="border-r border-white/10 bg-black px-5 py-6 lg:min-h-screen">
      <div className="mb-10">
        <p className="text-sm font-bold uppercase tracking-[0.24em] text-white">
          AYYI Admin
        </p>
        <p className="mt-2 text-xs uppercase tracking-[0.2em] text-gold">
          Operations VIP
        </p>
      </div>
      <nav className="grid gap-2">
        {adminNav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center gap-3 border border-white/10 px-4 py-3 text-sm font-semibold text-stone-200 transition hover:border-gold hover:text-gold"
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="mt-10 border border-gold/20 bg-gold/10 p-4 text-sm text-stone-200">
        <Settings className="mb-3 h-5 w-5 text-gold" />
        Mode local disponible. Ajoutez les variables Supabase dans `.env.local`
        pour synchroniser la gestion avec la base de donnees.
      </div>
      <form action={logoutAdmin} className="mt-5">
        <button
          type="submit"
          className="flex w-full items-center gap-3 border border-white/10 px-4 py-3 text-left text-sm font-semibold text-stone-300 transition hover:border-gold hover:text-gold"
        >
          <LogOut className="h-4 w-4" />
          Deconnexion
        </button>
      </form>
    </aside>
  );
}
