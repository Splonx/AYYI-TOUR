import { clsx } from "clsx";
import Image from "next/image";

type AyyiTourLogoProps = {
  variant?: "horizontal" | "icon";
  tone?: "dark" | "light";
  className?: string;
  preload?: boolean;
};

export function AyyiTourLogo({
  variant = "horizontal",
  className,
  preload = false,
}: AyyiTourLogoProps) {
  const isIcon = variant === "icon";

  return (
    <span
      className={clsx(
        "logo-signature relative block shrink-0 transition duration-500 hover:scale-[1.025] hover:drop-shadow-[0_0_18px_rgba(201,162,74,0.34)]",
        isIcon ? "h-14 w-14" : "h-16 w-16 sm:h-[4.5rem] sm:w-[4.5rem]",
        className,
      )}
    >
      <Image
        src={isIcon ? "/logo/favicon.png" : "/logo/ayyi-tour-logo.png"}
        alt="AYYI TOUR Transport Service VIP"
        fill
        preload={preload}
        quality={100}
        sizes={isIcon ? "56px" : "(max-width: 640px) 64px, 72px"}
        className="object-contain"
      />
    </span>
  );
}
