import type { Locale } from "./i18n";

/**
 * Text and images for the "device mockup" visual (components/DeviceMockup.tsx) shown
 * in the home page's about section. Edit here; every string needs both languages.
 * Unsplash URLs are given without query params: lib/image-loader.ts adds w/q/format.
 */
type L = Record<Locale, string>;

export type MockupScreen = {
  id: string;
  tab: L;
  image: string;
  alt: L;
  /** Red pill (with pulsing dot) and dark glass pill in the top-left corner. */
  badges: [L, L];
  eyebrow: L;
  title: L;
  meta: L;
  /** Progress bar fill, 0–100. */
  progress: number;
  status: L;
};

const UNSPLASH = "https://images.unsplash.com/";

export const MOCKUP = {
  screens: [
    {
      id: "movies",
      tab: { en: "Movies 4K", pl: "Filmy 4K" },
      image: `${UNSPLASH}photo-1536440136628-849c177e76a1`,
      alt: {
        en: "Neon-lit cinema entrance – 4K movies on demand with IPTV Poland",
        pl: "Neonowe wejście do kina – filmy 4K na żądanie z IPTV Polska",
      },
      badges: [
        { en: "4K Premiere", pl: "Premiera 4K" },
        { en: "Dolby Atmos", pl: "Dolby Atmos" },
      ],
      eyebrow: { en: "On Demand • Ultra HD Blockbuster", pl: "Na żądanie • Hit Ultra HD" },
      title: { en: "Cyber Horizon: Beyond the Orbit", pl: "Cyber Horizon: Poza orbitą" },
      meta: {
        en: "2026 • Sci-Fi / Thriller • 2160p HDR10+ • Multi-Audio & Subtitles",
        pl: "2026 • Sci-Fi / Thriller • 2160p HDR10+ • Wiele ścieżek audio i napisy",
      },
      progress: 60,
      status: { en: "Live / 60FPS", pl: "Na żywo / 60FPS" },
    },
    {
      id: "sports",
      tab: { en: "Live Sports", pl: "Sport na żywo" },
      image: `${UNSPLASH}photo-1574629810360-7efbbe195018`,
      alt: {
        en: "Football on the pitch – live sports in 4K with IPTV Poland",
        pl: "Piłka na boisku – sport na żywo w 4K z IPTV Polska",
      },
      badges: [
        { en: "Live", pl: "Na żywo" },
        { en: "Multi-Cam", pl: "Multi-Cam" },
      ],
      eyebrow: { en: "Live • 4K Sports", pl: "Na żywo • Sport 4K" },
      title: { en: "Champions League: Matchday Live", pl: "Liga Mistrzów: mecz na żywo" },
      meta: {
        en: "UEFA • Football • 2160p HDR • Multi-Camera & Commentary",
        pl: "UEFA • Piłka nożna • 2160p HDR • Wiele kamer i komentarz",
      },
      progress: 72,
      status: { en: "Live / 60FPS", pl: "Na żywo / 60FPS" },
    },
    {
      id: "tv",
      tab: { en: "Live TV", pl: "TV na żywo" },
      image: "/hero.jpeg",
      alt: {
        en: "Smart TV with a grid of live channels – IPTV Poland live TV",
        pl: "Smart TV z siatką kanałów na żywo – telewizja IPTV Polska",
      },
      badges: [
        { en: "Live", pl: "Na żywo" },
        { en: "EPG", pl: "EPG" },
      ],
      eyebrow: { en: "Live TV • 10,000+ Channels", pl: "TV na żywo • 10 000+ kanałów" },
      title: { en: "Polish & International TV", pl: "Polska i zagraniczna telewizja" },
      meta: {
        en: "Polsat • TVN • Canal+ • EPG & Catch-up • 7-Day Archive",
        pl: "Polsat • TVN • Canal+ • EPG i Catch-up • Archiwum 7 dni",
      },
      progress: 45,
      status: { en: "Live / 50FPS", pl: "Na żywo / 50FPS" },
    },
  ] satisfies MockupScreen[],
  stream: { en: "4K HEVC Stream • 28.4 Mbps", pl: "Strumień 4K HEVC • 28,4 Mb/s" },
  vod: {
    image: `${UNSPLASH}photo-1489599849927-2ee91cede3ba`,
    alt: { en: "Red cinema seats", pl: "Czerwone fotele kinowe" },
    label: { en: "VOD Library", pl: "Biblioteka VOD" },
    title: { en: "60,000+ Movies", pl: "60 000+ filmów" },
    sub: { en: "Updated Daily in 4K HDR", pl: "Nowości codziennie w 4K" },
  },
  sport: {
    image: `${UNSPLASH}photo-1522778119026-d647f0596c20`,
    alt: { en: "Football stadium under floodlights", pl: "Stadion piłkarski w świetle jupiterów" },
    live: { en: "Live", pl: "Live" },
    label: { en: "Sports 4K", pl: "Sport 4K" },
    fps: { en: "60 FPS", pl: "60 FPS" },
    title: { en: "Champions League", pl: "Liga Mistrzów" },
    sub: { en: "Stadium Feed • Zero Delay", pl: "Obraz ze stadionu • Bez opóźnień" },
  },
  categories: [
    { label: { en: "Cinema", pl: "Kino" }, dot: "bg-mk-pink" },
    { label: { en: "Sports PPV", pl: "Sport PPV" }, dot: "bg-mk-indigo" },
    { label: { en: "News & Kids", pl: "Wiadomości i bajki" }, dot: "bg-mk-cyan" },
  ],
  aria: {
    tabs: { en: "Content type", pl: "Rodzaj treści" },
    categories: { en: "Categories", pl: "Kategorie" },
    play: { en: "Play {name}", pl: "Odtwórz {name}" },
    scroll: { en: "Scroll to the next section", pl: "Przewiń do następnej sekcji" },
    stage: { en: "IPTV Poland on a Smart TV", pl: "IPTV Polska na Smart TV" },
  },
};
