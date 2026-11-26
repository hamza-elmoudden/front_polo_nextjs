import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    agentFeedback: true,
    // Inline the (small, Tailwind-generated) CSS into <head> instead of a render-blocking <link>.
    inlineCss: true,
  },
  cacheComponents: true,
  images: {
    // Sanity images are served by Sanity's CDN directly; see lib/image-loader.ts.
    loader: "custom",
    loaderFile: "./lib/image-loader.ts",
    // Object form without `search`: Sanity image URLs always carry query params (?w=…&auto=format).
    // Unsplash: placeholder photos in the home page device mockup (lib/device-mockup.ts).
    remotePatterns: [
      { protocol: "https", hostname: "cdn.sanity.io", pathname: "/images/**" },
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
    ],
  },
  partialPrefetching: true,
  turbopack: {
    // Next.js always bundles a small polyfill module (Array.prototype.at/flat/flatMap,
    // Object.fromEntries/hasOwn, String.prototype.trimStart/trimEnd, ...) into the main
    // client chunk, regardless of browserslist. Every browser Next.js supports
    // (Chrome/Edge/Firefox 111+, Safari 16.4+) has these natively, so swap it for an
    // empty module to drop the "Legacy JavaScript" Lighthouse warning.
    resolveAlias: {
      "../build/polyfills/polyfill-module": "./lib/empty-polyfill.js",
    },
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
