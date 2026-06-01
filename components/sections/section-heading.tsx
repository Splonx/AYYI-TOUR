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
    <div className="max-w-3xl min-w-0">
      <p className="text-xs font-bold uppercase tracking-[0.24em] text-gold sm:tracking-[0.3em]">
        {eyebrow}
      </p>
      <h2
        className={clsx(
          "mt-4 max-w-full break-words text-4xl font-semibold leading-[1.04] sm:text-5xl lg:text-6xl",
          dark ? "text-obsidian" : "text-white",
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={clsx(
            "mt-5 max-w-full text-base leading-7 sm:text-lg sm:leading-8",
            dark ? "text-stone-700" : "text-stone-300",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
