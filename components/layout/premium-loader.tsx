"use client";

import { useEffect, useState } from "react";

export function PremiumLoader() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timeout = window.setTimeout(() => setIsVisible(false), 900);

    return () => window.clearTimeout(timeout);
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="premium-loader fixed inset-0 z-[100] grid place-items-center bg-obsidian text-center text-ivory">
      <div className="relative">
        <div className="mx-auto h-16 w-16 border border-gold/30" />
        <div className="absolute inset-0 animate-spin border-t border-gold" />
        <p className="mt-6 text-xs font-bold uppercase tracking-[0.34em] text-gold">
          AYYI TOUR
        </p>
        <p className="mt-2 text-[11px] uppercase tracking-[0.24em] text-stone-400">
          Transport Service VIP
        </p>
      </div>
    </div>
  );
}
