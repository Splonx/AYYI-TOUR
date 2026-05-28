import { ArrowUpRight, Gauge, Gem, Luggage, Users } from "lucide-react";
import { SafeImage } from "@/components/ui/safe-image";
import { siteConfig } from "@/lib/site";
import type { Vehicle } from "@/types/domain";

const fallbackFleetImage = "/fleet/ford-transit.jpg";

export function FleetCard({ vehicle }: { vehicle: Vehicle }) {
  const imageSrc = vehicle.imageUrl?.trim() || fallbackFleetImage;

  return (
    <article className="group min-h-full overflow-hidden border border-white/10 bg-white/[0.045] shadow-[0_24px_90px_rgba(0,0,0,0.26)] backdrop-blur-xl transition duration-500 hover:-translate-y-1 hover:border-gold/50 hover:bg-white/[0.07]">
      <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden border-b border-gold/15 bg-black">
        <SafeImage
          src={imageSrc}
          fallbackSrc={fallbackFleetImage}
          alt={`${vehicle.name} AYYI TOUR Transport Service VIP`}
          fill
          loading="lazy"
          quality={82}
          sizes="(min-width: 1280px) 38vw, (min-width: 768px) 50vw, 100vw"
          className="object-cover transition duration-700 ease-out group-hover:scale-[1.055]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/16 to-transparent" />
        <div className="absolute left-4 top-4 border border-gold/40 bg-black/55 px-3 py-2 text-xs font-bold uppercase tracking-[0.18em] text-gold backdrop-blur-md">
          VIP
        </div>
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-3">
          <span className="border border-white/15 bg-black/45 px-3 py-2 text-xs font-bold uppercase tracking-[0.16em] text-white backdrop-blur-md">
            {vehicle.category || "Premium"}
          </span>
          {vehicle.priceNote ? (
            <span className="text-xs font-semibold text-champagne">{vehicle.priceNote}</span>
          ) : null}
        </div>
      </div>

      <div className="p-5 sm:p-6">
        <h3 className="text-2xl font-semibold text-white">{vehicle.name}</h3>
        <p className="mt-3 text-sm leading-7 text-stone-300">
          {vehicle.shortDescription || vehicle.description}
        </p>

        <div className="mt-5 grid grid-cols-3 gap-2 text-sm text-stone-200">
          <span className="border border-white/10 bg-black/25 p-3">
            <Users className="mb-2 h-4 w-4 text-gold" />
            {vehicle.seats} places
          </span>
          <span className="border border-white/10 bg-black/25 p-3">
            <Luggage className="mb-2 h-4 w-4 text-gold" />
            {vehicle.luggage} bagages
          </span>
          <span className="border border-white/10 bg-black/25 p-3">
            <Gauge className="mb-2 h-4 w-4 text-gold" />
            Confort
          </span>
        </div>

        <a
          href={siteConfig.reservationMailto}
          className="mt-6 inline-flex min-h-11 w-full items-center justify-center gap-2 border border-gold/45 bg-gold/[0.08] px-4 text-xs font-bold uppercase tracking-[0.16em] text-gold transition hover:bg-gold hover:text-black"
        >
          <Gem className="h-4 w-4" />
          Demander un trajet
          <ArrowUpRight className="h-4 w-4" />
        </a>
      </div>
    </article>
  );
}
