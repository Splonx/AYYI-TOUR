import Link from "next/link";
import { AyyiTourLogo } from "@/components/brand/ayyi-tour-logo";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-obsidian px-4 py-10 text-stone-400 sm:px-8 lg:px-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="min-w-0">
          <AyyiTourLogo className="h-14 w-auto max-w-[260px]" />
          <p className="mt-2 text-sm">Chauffeur prive, flotte premium, service discret.</p>
          <a
            href="https://wa.me/212672508363"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex text-sm font-semibold text-gold hover:text-champagne"
            title="WhatsApp : +212 672 508 363"
          >
            WhatsApp : +212 672 508 363
          </a>
        </div>
        <div className="flex flex-wrap gap-6 text-sm">
          <Link href="/services" className="hover:text-gold">
            Services
          </Link>
          <Link href="/fleet" className="hover:text-gold">
            Flotte
          </Link>
        </div>
      </div>
    </footer>
  );
}
