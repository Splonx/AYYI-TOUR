import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { AyyiTourLogo } from "@/components/brand/ayyi-tour-logo";
import { siteConfig } from "@/lib/site";

const footerLinks = [
  { href: "/", label: "Accueil" },
  { href: "/#services", label: "Services" },
  { href: "/fleet", label: "Flotte" },
  { href: "/#contact", label: "Contact" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-gold/15 bg-black px-4 pb-28 pt-14 text-stone-400 sm:px-8 sm:pb-14 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[1.25fr_0.75fr_0.9fr]">
          <div className="min-w-0">
            <AyyiTourLogo className="h-28 w-28" />
            <p className="mt-5 max-w-md text-sm leading-7">
              AYYI TOUR accompagne vos deplacements VIP a Agadir, Marrakech et en region
              avec chauffeurs professionnels, flotte premium et coordination discrete.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <span className="border border-gold/20 bg-gold/[0.06] px-3 py-2 text-xs font-bold uppercase tracking-[0.16em] text-gold">
                Chauffeur prive
              </span>
              <span className="border border-gold/20 bg-gold/[0.06] px-3 py-2 text-xs font-bold uppercase tracking-[0.16em] text-gold">
                Service aeroport
              </span>
            </div>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-gold">
              Liens rapides
            </p>
            <nav className="mt-5 grid gap-3 text-sm">
              {footerLinks.map((item) => (
                <Link key={item.href} href={item.href} className="transition hover:text-gold">
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-gold">
              Contact
            </p>
            <div className="mt-5 grid gap-4 text-sm">
              <a
                href={siteConfig.phoneHref}
                className="flex items-center gap-3 text-stone-200 transition hover:text-gold"
              >
                <Phone className="h-4 w-4 text-gold" />
                {siteConfig.phone}
              </a>
              <a
                href={siteConfig.reservationMailto}
                className="flex items-center gap-3 text-stone-200 transition hover:text-gold"
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
