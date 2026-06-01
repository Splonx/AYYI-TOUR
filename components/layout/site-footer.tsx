import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { AyyiTourLogo } from "@/components/brand/ayyi-tour-logo";
import { siteConfig } from "@/lib/site";

const footerLinks = [
  { href: "/", label: "Accueil" },
  { href: "/services", label: "Services" },
  { href: "/fleet", label: "Flotte" },
  { href: "/#contact", label: "Contact" },
];

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#0b0f14] px-4 pb-28 pt-16 text-stone-300 sm:px-8 sm:pb-14 lg:px-10">
      <div className="pointer-events-none absolute -left-12 top-0 h-56 w-56 rounded-full bg-gold/15 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 bottom-0 h-64 w-64 rounded-full bg-[#69816f]/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr_1fr]">
          <div className="min-w-0">
            <AyyiTourLogo className="h-28 w-28" />
            <p className="mt-6 max-w-md text-sm leading-7 text-stone-300">
              Transport VIP a Agadir et Marrakech avec une execution discrete, un confort
              soigne et des chauffeurs professionnels.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <span className="rounded-full border border-gold/30 bg-gold/10 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.15em] text-gold">
                Chauffeur prive
              </span>
              <span className="rounded-full border border-gold/30 bg-gold/10 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.15em] text-gold">
                Service aeroport
              </span>
            </div>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-gold">Navigation</p>
            <nav className="mt-5 grid gap-3 text-sm">
              {footerLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="w-fit border-b border-transparent pb-0.5 transition hover:border-gold hover:text-gold"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-gold">Contact</p>
            <div className="mt-5 grid gap-4 text-sm">
              <a
                href={siteConfig.phoneHref}
                className="flex items-center gap-3 text-stone-100 transition hover:text-gold"
              >
                <Phone className="h-4 w-4 text-gold" />
                {siteConfig.phone}
              </a>
              <a
                href={siteConfig.reservationMailto}
                className="flex items-center gap-3 text-stone-100 transition hover:text-gold"
              >
                <Mail className="h-4 w-4 text-gold" />
                {siteConfig.reservationEmail}
              </a>
              <p className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-gold" />
                Agadir, Marrakech et region
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-stone-500 sm:flex-row sm:items-center sm:justify-between">
          <p>Copyright {new Date().getFullYear()} AYYI TOUR. Tous droits reserves.</p>
          <p>Transport VIP avec chauffeur prive au Maroc.</p>
        </div>
      </div>
    </footer>
  );
}
