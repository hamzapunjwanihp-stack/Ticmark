"use client";

import Image, { type ImageLoaderProps, type ImageProps } from "next/image";

/**
 * Unsplash images are resized by Unsplash's own CDN (imgix), so they do not use
 * Vercel's image optimisation quota. Any other source (e.g. /public images)
 * uses the default Next.js behaviour.
 */
function unsplashLoader({ src, width, quality }: ImageLoaderProps) {
  const url = new URL(src);
  url.searchParams.set("w", String(width));
  url.searchParams.set("q", String(quality ?? 72));
  url.searchParams.set("auto", "format");
  url.searchParams.set("fit", "crop");
  return url.toString();
}

export function Photo({ unoptimized, alt, ...props }: ImageProps) {
  const isUnsplash = typeof props.src === "string" && props.src.startsWith("https://images.unsplash.com/");
  if (isUnsplash) return <Image {...props} alt={alt} loader={unsplashLoader} />;
  return <Image {...props} alt={alt} unoptimized={unoptimized} />;
}
