"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { CalendarCheck, Menu, X } from "lucide-react";
import { AyyiTourLogo } from "@/components/brand/ayyi-tour-logo";
import { siteConfig } from "@/lib/site";

const navItems = [
  { href: "/", label: "Accueil" },
  { href: "/services", label: "Services" },
  { href: "/fleet", label: "Flotte" },
  { href: "/#experience", label: "Experience" },
  { href: "/#contact", label: "Contact" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const updateHeader = () => setHasScrolled(window.scrollY > 18);

    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });

    return () => window.removeEventListener("scroll", updateHeader);
  }, []);

  return (
    <header
      className={clsx(
        "fixed inset-x-0 top-0 z-50 border-b transition duration-500",
        hasScrolled || isOpen
          ? "border-gold/20 bg-black/88 shadow-[0_18px_70px_rgba(0,0,0,0.34)] backdrop-blur-2xl"
          : "border-white/10 bg-black/48 backdrop-blur-md",
      )}
    >
      <div className="mx-auto flex h-[4.75rem] max-w-7xl items-center justify-between gap-3 px-4 sm:h-20 sm:px-8 lg:px-10">
        <Link
          href="/"
          className="flex min-w-0 items-center"
          onClick={() => setIsOpen(false)}
          aria-label="AYYI TOUR accueil"
        >
          <AyyiTourLogo className="h-12 max-w-[178px] sm:h-14 sm:max-w-[245px]" />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : item.href.startsWith(pathname) && pathname !== "/";

            return (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  "px-4 py-3 text-xs font-semibold uppercase tracking-[0.18em] transition",
                  isActive ? "text-gold" : "text-stone-300 hover:text-gold",
                )}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={siteConfig.phoneHref}
            className="text-sm font-semibold text-stone-200 transition hover:text-gold"
          >
            {siteConfig.phone}
          </a>
          <a
            href={siteConfig.reservationMailto}
            className="premium-button inline-flex h-11 items-center justify-center gap-2 bg-gold px-5 text-xs font-bold uppercase tracking-[0.16em] text-black transition hover:bg-champagne"
          >
            <CalendarCheck className="h-4 w-4" />
            Planifier un trajet
          </a>
        </div>

        <button
          type="button"
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center border border-gold/35 bg-gold/10 text-gold transition hover:bg-gold hover:text-black lg:hidden"
          aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((current) => !current)}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {isOpen ? (
        <nav className="max-h-[calc(100svh-4.75rem)] overflow-y-auto border-t border-gold/20 bg-black/96 px-4 py-4 shadow-2xl lg:hidden">
          <div className="mx-auto grid max-w-7xl gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="border border-white/10 bg-white/[0.03] px-4 py-4 text-sm font-bold uppercase tracking-[0.16em] text-stone-100 transition hover:border-gold hover:text-gold"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <a
              href={siteConfig.reservationMailto}
              className="mt-2 inline-flex min-h-12 items-center justify-center gap-2 bg-gold px-4 py-3 text-center text-sm font-bold uppercase tracking-[0.16em] text-black transition hover:bg-champagne"
              onClick={() => setIsOpen(false)}
            >
              <CalendarCheck className="h-4 w-4" />
              Planifier un trajet
            </a>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
