type MetricCardProps = {
  label: string;
  value: string;
  helper: string;
};

export function MetricCard({ label, value, helper }: MetricCardProps) {
  return (
    <div className="border border-white/10 bg-white/[0.04] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.22)] transition hover:border-gold/40">
      <p className="text-xs font-bold uppercase tracking-[0.22em] text-gold">
        {label}
      </p>
      <p className="mt-4 text-4xl font-semibold text-white">{value}</p>
      <p className="mt-3 text-sm text-stone-400">{helper}</p>
    </div>
  );
}
