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
  const textColor = tone === "dark" ? "#f7f0df" : "#070707";
  const uid = useId().replaceAll(":", "");
  const goldId = `ayyi-gold-${uid}`;
  const deepGoldId = `ayyi-deep-gold-${uid}`;
  const glowId = `ayyi-glow-${uid}`;
  const shineId = `ayyi-shine-${uid}`;
  const gold = `url(#${goldId})`;
  const deepGold = `url(#${deepGoldId})`;
  const glow = `url(#${glowId})`;
  const shine = `url(#${shineId})`;

  return (
    <svg
      viewBox={isIcon ? "0 0 220 220" : "0 0 760 260"}
      role="img"
      aria-label="AYYI TOUR Transport Service VIP"
      className={clsx("logo-signature", isIcon ? "h-12 w-12" : "h-14 w-auto", className)}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={goldId} x1="38" y1="34" x2="178" y2="205">
          <stop stopColor="#fff4b8" />
          <stop offset="0.22" stopColor="#f4c94f" />
          <stop offset="0.48" stopColor="#b77b16" />
          <stop offset="0.7" stopColor="#f4d777" />
          <stop offset="1" stopColor="#8b5a10" />
        </linearGradient>
        <linearGradient id={deepGoldId} x1="64" y1="68" x2="165" y2="166">
          <stop stopColor="#fff6c8" />
          <stop offset="0.34" stopColor="#d99c20" />
          <stop offset="0.68" stopColor="#6f4309" />
          <stop offset="1" stopColor="#f4cf64" />
        </linearGradient>
        <radialGradient id={glowId} cx="0" cy="0" r="1" gradientTransform="matrix(70 0 0 70 110 55)">
          <stop stopColor="#fff2a8" stopOpacity="0.96" />
          <stop offset="0.28" stopColor="#f4c94f" stopOpacity="0.52" />
          <stop offset="1" stopColor="#f4c94f" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={shineId} x1="64" y1="111" x2="155" y2="111">
          <stop stopColor="#7a4808" />
          <stop offset="0.2" stopColor="#ffe98b" />
          <stop offset="0.5" stopColor="#fff8cf" />
          <stop offset="0.82" stopColor="#c68918" />
          <stop offset="1" stopColor="#5f3906" />
        </linearGradient>
        <filter id={`soft-shadow-${uid}`} x="-35%" y="-35%" width="170%" height="170%">
          <feDropShadow dx="0" dy="8" stdDeviation="8" floodColor="#000000" floodOpacity="0.42" />
          <feDropShadow dx="0" dy="0" stdDeviation="5" floodColor="#c9a24a" floodOpacity="0.28" />
        </filter>
      </defs>

      <g
        className="logo-mark"
        transform={isIcon ? "translate(0 2)" : "translate(28 18)"}
        filter={`url(#soft-shadow-${uid})`}
      >
        <circle cx="110" cy="52" r="70" fill={glow} />
        <path d="M110 19v56" stroke={gold} strokeWidth="2" strokeLinecap="round" opacity="0.8" />
        <path d="M92 38c10 7 25 7 36 0" stroke={gold} strokeWidth="2.6" strokeLinecap="round" />

        <path
          d="M39 74 110 49l71 25-6 82-65 43-65-43-6-82Z"
          fill="rgba(5,5,5,0.62)"
          stroke={gold}
          strokeWidth="5"
          strokeLinejoin="round"
        />
        <path
          d="M53 84 110 64l57 20-5 62-52 34-52-34-5-62Z"
          stroke={deepGold}
          strokeWidth="2.6"
          strokeLinejoin="round"
          opacity="0.95"
        />

        <g stroke={gold} strokeLinecap="round" strokeLinejoin="round">
          <path d="M78 92 88 72l13 23 9-27 11 27 12-23 11 20" strokeWidth="4" />
          <path d="M82 96c17-5 39-5 56 0" strokeWidth="2.8" />
          <path d="M101 68 110 58l9 10" strokeWidth="3" />
          <circle cx="88" cy="70" r="3.2" fill={gold} strokeWidth="0" />
          <circle cx="132" cy="70" r="3.2" fill={gold} strokeWidth="0" />
        </g>

        <path
          d="M154 75c16 1 28 4 37 10-12 1-22 5-32 11l4-8-18-5 9-8Z"
          fill={deepGold}
          stroke={gold}
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path d="M165 85h22" stroke="#fff1a7" strokeWidth="1.6" strokeLinecap="round" opacity="0.9" />

        <g fill={deepGold} stroke={gold} strokeLinejoin="round">
          <path d="M42 143c-15-2-27-8-35-19 17 1 29 7 35 19Z" />
          <path d="M45 128c-14-6-23-15-27-29 16 5 25 15 27 29Z" />
          <path d="M50 114c-10-10-15-22-13-36 13 10 18 22 13 36Z" />
          <path d="M178 143c15-2 27-8 35-19-17 1-29 7-35 19Z" />
          <path d="M175 128c14-6 23-15 27-29-16 5-25 15-27 29Z" />
          <path d="M170 114c10-10 15-22 13-36-13 10-18 22-13 36Z" />
        </g>
        <path d="M18 153c34 18 65 20 92 5 27 15 58 13 92-5" stroke={gold} strokeWidth="3" strokeLinecap="round" />

        <g>
          <path
            d="M66 130c4-20 18-34 44-34s40 14 44 34"
            fill="rgba(7,7,7,0.88)"
            stroke={gold}
            strokeWidth="4"
          />
          <path
            d="M60 128c8-15 24-22 50-22s42 7 50 22l9 24c-13 10-33 15-59 15s-46-5-59-15l9-24Z"
            fill={shine}
            stroke={gold}
            strokeWidth="4"
            strokeLinejoin="round"
          />
          <path d="M76 131c10 4 21 5 34 5s24-1 34-5" stroke="#4a2a04" strokeWidth="4" strokeLinecap="round" />
          <path d="M83 145h54" stroke="#1a0f03" strokeWidth="6" strokeLinecap="round" />
          <path d="M88 139h44" stroke="#ffe178" strokeWidth="2" strokeLinecap="round" opacity="0.9" />
          <path d="M62 139c11-8 23-8 35-2-11 5-23 5-35 2Z" fill="#fff0a3" stroke="#3b2205" strokeWidth="2" />
          <path d="M158 139c-11-8-23-8-35-2 11 5 23 5 35 2Z" fill="#fff0a3" stroke="#3b2205" strokeWidth="2" />
          <path d="M66 155c14 5 29 8 44 8s30-3 44-8" stroke="#fff1a7" strokeWidth="2" strokeLinecap="round" opacity="0.68" />
        </g>
      </g>

      {!isIcon ? (
        <g transform="translate(276 74)">
          <text
            x="0"
            y="60"
            fill={textColor}
            fontFamily="Georgia, 'Times New Roman', serif"
            fontSize="58"
            fontWeight="700"
            letterSpacing="0"
          >
            AYYI TOUR
          </text>
          <path d="M4 82h342" stroke={gold} strokeWidth="3" strokeLinecap="round" />
          <path d="M160 82h28" stroke="#fff0a7" strokeWidth="5" strokeLinecap="round" />
          <text
            x="4"
            y="117"
            fill="#c9a24a"
            fontFamily="Arial, Helvetica, sans-serif"
            fontSize="17"
            fontWeight="700"
            letterSpacing="0"
          >
            TRANSPORT SERVICE VIP
          </text>
        </g>
      ) : null}
    </svg>
  );
}
