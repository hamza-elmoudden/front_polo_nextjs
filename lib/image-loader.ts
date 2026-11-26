"use client";

type LoaderArgs = { src: string; width: number; quality?: number };

/**
 * Global next/image loader (images.loaderFile).
 * - Sanity and Unsplash images: resized by their own CDN (w/q/auto=format), no proxy hop.
 * - Everything else (files in /public): served directly from /public.
 */
export default function imageLoader({ src, width, quality }: LoaderArgs) {
  if (src.startsWith("https://cdn.sanity.io/") || src.startsWith("https://images.unsplash.com/")) {
    const url = new URL(src);
    url.searchParams.set("w", String(width));
    url.searchParams.set("q", String(quality || 75));
    url.searchParams.set("auto", "format");
    return url.toString();
  }
  // A custom loader disables Next's /_next/image endpoint, so local files are served as-is
  // (the width param is ignored by the static file server but keeps srcset entries distinct).
  return `${src}?w=${width}`;
}
