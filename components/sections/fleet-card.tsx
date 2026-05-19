import Image from "next/image";
import { Gauge, Users } from "lucide-react";
import type { Vehicle } from "@/types/domain";

export function FleetCard({ vehicle }: { vehicle: Vehicle }) {
  return (
    <article className="border border-white/10 bg-black/35 p-5">
      <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden border border-gold/20 bg-[radial-gradient(circle_at_50%_35%,rgba(201,162,74,0.2),transparent_48%),linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.01))]">
        {vehicle.imageUrl ? (
          <Image
            src={vehicle.imageUrl}
            alt={vehicle.name}
            fill
            sizes="(min-width: 1280px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
        ) : null}
        <span className="relative z-10 bg-black/35 px-3 py-2 text-center text-xs font-bold uppercase tracking-[0.18em] text-gold backdrop-blur-sm sm:tracking-[0.28em]">
          {vehicle.category}
        </span>
      </div>
      <h3 className="mt-5 text-xl font-semibold text-white sm:text-2xl">{vehicle.name}</h3>
      <p className="mt-3 text-sm leading-6 text-stone-300">
        {vehicle.shortDescription || vehicle.description}
      </p>
      <div className="mt-5 grid grid-cols-2 gap-3 text-sm text-stone-200">
        <span className="flex items-center gap-2">
          <Users className="h-4 w-4 text-gold" />
          {vehicle.seats} passagers
        </span>
        <span className="flex items-center gap-2">
          <Gauge className="h-4 w-4 text-gold" />
          {vehicle.luggage} bagages
        </span>
      </div>
    </article>
  );
}
