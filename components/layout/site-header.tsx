"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { CalendarCheck, Menu, Phone, X } from "lucide-react";
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
    const updateHeader = () => setHasScrolled(window.scrollY > 14);

    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    return () => window.removeEventListener("scroll", updateHeader);
  }, []);

  return (
    <header
      className={clsx(
        "fixed inset-x-0 top-0 z-50 border-b transition duration-500",
        hasScrolled || isOpen
          ? "border-white/10 bg-[#0c1015]/92 shadow-[0_18px_70px_rgba(0,0,0,0.36)] backdrop-blur-2xl"
          : "border-white/5 bg-transparent backdrop-blur-sm",
      )}
    >
      <div className="mx-auto flex h-[4.8rem] max-w-7xl items-center justify-between gap-3 px-4 sm:h-[5.25rem] sm:px-8 lg:px-10">
        <Link
          href="/"
          className="flex min-w-0 items-center"
          onClick={() => setIsOpen(false)}
          aria-label="AYYI TOUR accueil"
        >
          <AyyiTourLogo preload className="h-16 w-16 sm:h-[4.5rem] sm:w-[4.5rem]" />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => {
            const routePath = item.href.split("#")[0] || "/";
            const isAnchor = item.href.startsWith("/#");
            const isActive = isAnchor
              ? false
              : routePath === "/"
                ? pathname === "/"
                : pathname.startsWith(routePath);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  "rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] transition",
                  isActive
                    ? "bg-gold/15 text-gold"
                    : "text-stone-200 hover:bg-white/5 hover:text-champagne",
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
            className="inline-flex items-center gap-2 text-sm font-semibold text-stone-100 transition hover:text-gold"
          >
            <Phone className="h-4 w-4 text-gold" />
            {siteConfig.phone}
          </a>
          <a
            href={siteConfig.reservationMailto}
            className="premium-button inline-flex h-11 items-center justify-center gap-2 rounded-full bg-gold px-5 text-xs font-bold uppercase tracking-[0.15em] text-black transition hover:bg-champagne"
          >
            <CalendarCheck className="h-4 w-4" />
            Reserver
          </a>
        </div>

        <button
          type="button"
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold/35 bg-gold/10 text-gold transition hover:bg-gold hover:text-black lg:hidden"
          aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((current) => !current)}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {isOpen ? (
        <nav className="max-h-[calc(100svh-4.8rem)] overflow-y-auto border-t border-gold/20 bg-[#0a0d12] px-4 py-4 shadow-2xl lg:hidden">
          <div className="mx-auto grid max-w-7xl gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-4 text-sm font-bold uppercase tracking-[0.15em] text-stone-100 transition hover:border-gold hover:text-gold"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <a
              href={siteConfig.reservationMailto}
              className="mt-2 inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-gold px-4 py-3 text-center text-sm font-bold uppercase tracking-[0.15em] text-black transition hover:bg-champagne"
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
