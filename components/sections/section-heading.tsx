import { clsx } from "clsx";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  dark?: boolean;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  dark = false,
}: SectionHeadingProps) {
  return (
    <div className="max-w-3xl">
      <p className="text-xs font-bold uppercase tracking-[0.22em] text-gold sm:tracking-[0.32em]">
        {eyebrow}
      </p>
      <h2
        className={clsx(
          "mt-4 text-3xl font-semibold leading-tight sm:text-5xl",
          dark ? "text-obsidian" : "text-white",
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={clsx(
            "mt-5 text-base leading-7 sm:text-lg sm:leading-8",
            dark ? "text-stone-700" : "text-stone-300",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
