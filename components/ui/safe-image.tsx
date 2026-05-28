"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";

type SafeImageProps = Omit<ImageProps, "src"> & {
  src?: string | null;
  fallbackSrc: string;
};

export function SafeImage({ src, fallbackSrc, alt, ...props }: SafeImageProps) {
  const cleanSrc = src?.trim() || fallbackSrc;
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const imageSrc = failedSrc === cleanSrc ? fallbackSrc : cleanSrc;

  return (
    <Image
      {...props}
      src={imageSrc}
      alt={alt}
      onError={() => {
        if (cleanSrc !== fallbackSrc) {
          setFailedSrc(cleanSrc);
        }
      }}
    />
  );
}
