"use client";

import { useEffect, useRef, useState } from "react";

type AnimatedStatsProps = {
  items: {
    value: string;
    label: string;
    suffix?: string;
  }[];
};

function useInView() {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;

    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
}

function AnimatedValue({ value }: { value: string }) {
  const numericValue = Number(value.match(/\d+/)?.[0] ?? Number.NaN);
  const [current, setCurrent] = useState(Number.isFinite(numericValue) ? 0 : numericValue);
  const { ref, isVisible } = useInView();

  useEffect(() => {
    if (!isVisible || !Number.isFinite(numericValue)) {
      return;
    }

    const duration = 900;
    const start = performance.now();
    let frame = 0;

    function tick(now: number) {
      const progress = Math.min((now - start) / duration, 1);
      setCurrent(Math.round(numericValue * progress));

      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    }

    frame = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frame);
  }, [isVisible, numericValue]);

  if (!Number.isFinite(numericValue)) {
    return <span ref={ref}>{value}</span>;
  }

  const prefix = value.startsWith("+") ? "+" : "";
  const suffix = value.endsWith("%") ? "%" : value.includes("/") ? "/7" : "";

  return (
    <span ref={ref}>
      {prefix}
      {current}
      {suffix}
    </span>
  );
}

export function AnimatedStats({ items }: AnimatedStatsProps) {
  return (
    <div className="mt-10 grid max-w-3xl grid-cols-1 divide-y divide-white/15 border-y border-white/15 sm:mt-12 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
      {items.map((item) => (
        <div key={item.label} className="py-4 sm:px-4 sm:py-5 sm:first:pl-0">
          <p className="text-2xl font-semibold text-gold">
            <AnimatedValue value={item.value} />
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
