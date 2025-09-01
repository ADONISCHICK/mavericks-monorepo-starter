"use client";

import Image, { ImageProps } from "next/image";
import { useState } from "react";

/**
 * Client-only image with a built-in fallback.
 * Use this from Server Components (no onError prop needed).
 */
export default function SafeImage({
  src,
  alt,
  fallback = "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1600&auto=format&fit=crop",
  ...rest
}: ImageProps & { fallback?: string }) {
  const initial = typeof src === "string" ? src : String(src);
  const [img, setImg] = useState(initial);

  return (
    <Image
      {...rest}
      alt={alt}
      src={img}
      onError={() => setImg(fallback)}
    />
  );
}
