import Link from "next/link";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  CalendarCheck,
  Gem,
  Plane,
  Sparkles,
} from "lucide-react";
import type { Service } from "@/types/domain";

const serviceIcons = {
  BriefcaseBusiness,
  CalendarCheck,
  Gem,
  Plane,
  Sparkles,
};

export function ServiceCard({ service }: { service: Service }) {
  const Icon =
    serviceIcons[service.icon as keyof typeof serviceIcons] ?? serviceIcons.Sparkles;

  return (
    <article className="group relative min-h-full overflow-hidden border border-white/10 bg-white/[0.045] p-5 shadow-[0_24px_90px_rgba(0,0,0,0.24)] backdrop-blur-xl transition duration-500 hover:-translate-y-1 hover:border-gold/50 hover:bg-white/[0.07] sm:p-7">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/70 to-transparent opacity-50" />
      <div className="flex h-12 w-12 items-center justify-center border border-gold/35 bg-gold/[0.09] text-gold transition duration-500 group-hover:bg-gold group-hover:text-black">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="mt-6 text-2xl font-semibold text-white">{service.title}</h3>
      <p className="mt-4 text-sm leading-7 text-stone-300">{service.description}</p>
      <Link
        href={`/services#${service.slug}`}
        className="mt-7 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-gold transition group-hover:text-champagne"
      >
        Details du service <ArrowUpRight className="h-4 w-4" />
      </Link>
    </article>
  );
}
