import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Service } from "@/types/domain";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <article className="group border border-black/10 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:border-gold">
      <p className="text-xs font-bold uppercase tracking-[0.24em] text-gold">
        {service.category}
      </p>
      <h3 className="mt-5 text-3xl font-semibold text-obsidian">
        {service.name}
      </h3>
      <p className="mt-4 leading-7 text-stone-700">{service.description}</p>
      <ul className="mt-6 space-y-3 text-sm text-stone-700">
        {service.highlights.map((highlight) => (
          <li key={highlight} className="border-l border-gold/50 pl-4">
            {highlight}
          </li>
        ))}
      </ul>
      <Link
        href={`/services#${service.slug}`}
        className="mt-7 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.16em] text-obsidian transition group-hover:text-gold"
      >
        Details <ArrowUpRight className="h-4 w-4" />
      </Link>
    </article>
  );
}
