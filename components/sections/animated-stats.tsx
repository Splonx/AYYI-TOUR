type AnimatedStatsProps = {
  items: {
    value: string;
    label: string;
    suffix?: string;
  }[];
};

export function AnimatedStats({ items }: AnimatedStatsProps) {
  return (
    <div className="mt-10 grid max-w-3xl grid-cols-1 divide-y divide-white/15 border-y border-white/15 sm:mt-12 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
      {items.map((item) => (
        <div key={item.label} className="py-4 sm:px-4 sm:py-5 sm:first:pl-0">
          <p className="text-2xl font-semibold text-gold">
            {item.value}
            {item.suffix ?? ""}
          </p>
          <p className="mt-1 text-xs uppercase tracking-[0.12em] text-stone-300 sm:tracking-[0.16em]">
            {item.label}
          </p>
        </div>
      ))}
    </div>
  );
}
