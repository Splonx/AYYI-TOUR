import Link from "next/link";
import { Crown } from "lucide-react";

const navItems = [
  { href: "/services", label: "Services" },
  { href: "/fleet", label: "Flotte" },
];

export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/70 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 sm:px-8 lg:px-10">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center border border-gold/50 bg-gold/10 text-gold">
            <Crown className="h-5 w-5" />
          </span>
          <span>
            <span className="block text-sm font-bold uppercase tracking-[0.24em] text-white">
              AYYI TOUR
            </span>
            <span className="block text-[11px] uppercase tracking-[0.28em] text-gold">
              Transport Service VIP
            </span>
          </span>
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-300 transition hover:text-gold"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
