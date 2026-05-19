import { clsx } from "clsx";
import { useId } from "react";

type AyyiTourLogoProps = {
  variant?: "horizontal" | "icon";
  tone?: "dark" | "light";
  className?: string;
};

export function AyyiTourLogo({
  variant = "horizontal",
  tone = "dark",
  className,
}: AyyiTourLogoProps) {
  const isIcon = variant === "icon";
  const primary = tone === "dark" ? "#f7f0df" : "#070707";
  const gradientId = `ayyi-gold-${useId().replaceAll(":", "")}`;
  const gradient = `url(#${gradientId})`;

  return (
    <svg
      viewBox={isIcon ? "0 0 160 160" : "0 0 720 180"}
      role="img"
      aria-label="AYYI TOUR Transport Service VIP"
      className={clsx("logo-signature", isIcon ? "h-10 w-10" : "h-12 w-auto", className)}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={gradientId} x1="18" y1="24" x2="142" y2="146">
          <stop stopColor="#f5d98d" />
          <stop offset="0.42" stopColor="#c9a24a" />
          <stop offset="0.72" stopColor="#8d6b24" />
          <stop offset="1" stopColor="#f1d58b" />
        </linearGradient>
      </defs>
      <g className="logo-mark">
        <path
          d="M80 10 139 44v68l-59 38-59-38V44L80 10Z"
          stroke={gradient}
          strokeWidth="3"
        />
        <path
          className="logo-wing-left"
          d="M32 78c20-7 35-18 48-36"
          stroke={gradient}
          strokeWidth="5"
          strokeLinecap="round"
        />
        <path
          className="logo-wing-right"
          d="M128 78c-20-7-35-18-48-36"
          stroke={gradient}
          strokeWidth="5"
          strokeLinecap="round"
        />
        <path d="M52 106 80 49l28 57" stroke={gradient} strokeWidth="7" strokeLinecap="round" />
        <path d="M64 84h32" stroke={gradient} strokeWidth="5" strokeLinecap="round" />
        <path d="M104 52 80 95l-24-43" stroke={primary} strokeOpacity="0.92" strokeWidth="4" />
        <path d="M56 119c15-8 33-8 48 0" stroke={gradient} strokeWidth="3" strokeLinecap="round" />
      </g>
      {!isIcon ? (
        <g transform="translate(190 53)">
          <text
            x="0"
            y="45"
            fill={primary}
            fontFamily="Georgia, 'Times New Roman', serif"
            fontSize="48"
            fontWeight="700"
            letterSpacing="7"
          >
            AYYI TOUR
          </text>
          <path d="M2 68h292" stroke={gradient} strokeWidth="2" />
          <text
            x="2"
            y="97"
            fill="#c9a24a"
            fontFamily="Arial, Helvetica, sans-serif"
            fontSize="16"
            fontWeight="700"
            letterSpacing="5"
          >
            TRANSPORT SERVICE VIP
          </text>
        </g>
      ) : null}
    </svg>
  );
}
