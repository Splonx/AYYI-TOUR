import Link from "next/link";
import { Mail, MessageCircle, Phone } from "lucide-react";
import { siteConfig } from "@/lib/site";

export function FloatingActions() {
  return (
    <>
      <Link
        href={siteConfig.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contacter AYYI TOUR sur WhatsApp"
        className="fixed bottom-24 right-4 z-40 hidden h-14 w-14 items-center justify-center rounded-full border border-gold/40 bg-[#111823]/90 text-gold shadow-[0_18px_60px_rgba(0,0,0,0.45)] backdrop-blur-xl transition hover:-translate-y-1 hover:bg-gold hover:text-black sm:inline-flex"
      >
        <MessageCircle className="h-6 w-6" />
      </Link>
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-gold/25 bg-[#0a0f15]/92 px-4 py-3 shadow-[0_-18px_60px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:hidden">
        <div className="grid grid-cols-[1fr_auto_auto] gap-3">
          <a
            href={siteConfig.reservationMailto}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-gold px-4 text-xs font-bold uppercase tracking-[0.14em] text-black"
          >
            <Mail className="h-4 w-4" />
            Planifier
          </a>
          <a
            href={siteConfig.phoneHref}
            aria-label="Appeler AYYI TOUR"
            className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-gold/35 text-gold"
          >
            <Phone className="h-5 w-5" />
          </a>
          <Link
            href={siteConfig.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-gold/35 text-gold"
          >
            <MessageCircle className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </>
  );
}
