"use client";

import Link from "next/link";
import { useState } from "react";
import { Crown, Menu, X } from "lucide-react";

const navItems = [
  { href: "/", label: "Accueil" },
  { href: "/services", label: "Services" },
  { href: "/fleet", label: "Flotte" },
  { href: "/#reservation", label: "Reservation" },
];

function isReservationLink(href: string) {
  return href === "/#reservation";
}

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/90 backdrop-blur-xl lg:bg-black/70">
      <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between gap-3 px-4 sm:h-20 sm:px-8 lg:px-10">
        <Link
          href="/"
          className="flex min-w-0 items-center gap-3"
          onClick={() => setIsOpen(false)}
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-gold/50 bg-gold/10 text-gold">
            <Crown className="h-5 w-5" />
          </span>
          <span className="min-w-0">
            <span className="block truncate text-sm font-bold uppercase tracking-[0.18em] text-white sm:tracking-[0.24em]">
              AYYI TOUR
            </span>
            <span className="block truncate text-[10px] uppercase tracking-[0.18em] text-gold sm:text-[11px] sm:tracking-[0.28em]">
              Transport Service VIP
            </span>
          </span>
        </Link>
        <nav className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) =>
            isReservationLink(item.href) ? (
              <a
                key={item.href}
                href={item.href}
                className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-300 transition hover:text-gold"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </a>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-300 transition hover:text-gold"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>
        <button
          type="button"
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center border border-gold/40 bg-gold/10 text-gold transition hover:bg-gold hover:text-black lg:hidden"
          aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((current) => !current)}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {isOpen ? (
        <nav className="max-h-[calc(100svh-4.5rem)] overflow-y-auto border-t border-gold/20 bg-black/95 px-4 py-4 shadow-2xl lg:hidden">
          <div className="mx-auto grid max-w-7xl gap-2">
            {navItems.map((item) =>
              isReservationLink(item.href) ? (
                <a
                  key={item.href}
                  href={item.href}
                  className="border border-white/10 px-4 py-4 text-sm font-bold uppercase tracking-[0.18em] text-stone-100 transition hover:border-gold hover:text-gold"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className="border border-white/10 px-4 py-4 text-sm font-bold uppercase tracking-[0.18em] text-stone-100 transition hover:border-gold hover:text-gold"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ),
            )}
            <Link
              href="https://wa.me/212672508363"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gold px-4 py-4 text-sm font-bold uppercase tracking-[0.18em] text-black transition hover:bg-champagne"
              onClick={() => setIsOpen(false)}
            >
              WhatsApp
            </Link>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
