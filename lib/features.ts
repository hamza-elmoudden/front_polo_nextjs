import type { Locale } from "./i18n";

type L = Record<Locale, string>;

export type FeatureIcon = "tv" | "film" | "trophy" | "uhd" | "devices" | "clock";

export type Feature = {
  icon: FeatureIcon;
  /** Accent colour: icon, hover border, glow and spotlight. */
  accent: string;
  pill: L;
  title: L;
  text: L;
};

/** Cards of the home page "Features" section (components/FeaturesSection.tsx). */
export const FEATURES: Feature[] = [
  {
    icon: "tv",
    accent: "#f43f5e",
    pill: { en: "18,000+ Channels", pl: "18 000+ kanałów" },
    title: { en: "Live TV Channels", pl: "Kanały TV na żywo" },
    text: {
      en: "Access thousands of international, national, news, documentary, and entertainment networks from the US, UK, Europe, Middle East, and worldwide.",
      pl: "Tysiące kanałów międzynarodowych, krajowych, informacyjnych, dokumentalnych i rozrywkowych z USA, Wielkiej Brytanii, Europy, Bliskiego Wschodu i całego świata.",
    },
  },
  {
    icon: "film",
    accent: "#a855f7",
    pill: { en: "60,000+ VOD", pl: "60 000+ VOD" },
    title: { en: "Movies & TV Series", pl: "Filmy i seriale" },
    text: {
      en: "Binge the latest box-office premieres, trending series, and classic cinema on demand with multi-language subtitles and Dolby Surround sound.",
      pl: "Najnowsze premiery kinowe, popularne seriale i klasyka kina na żądanie — z napisami w wielu językach i dźwiękiem Dolby Surround.",
    },
  },
  {
    icon: "trophy",
    accent: "#38bdf8",
    pill: { en: "PPV & 60 FPS", pl: "PPV i 60 FPS" },
    title: { en: "Live Sports", pl: "Sport na żywo" },
    text: {
      en: "Never miss a goal or knockout. Watch top football leagues, Formula 1, UFC PPV events, NBA, and NFL in smooth 60fps feeds.",
      pl: "Nie przegap żadnego gola ani nokautu. Najlepsze ligi piłkarskie, Formuła 1, gale UFC PPV, NBA i NFL w płynnym obrazie 60 kl./s.",
    },
  },
  {
    icon: "uhd",
    accent: "#ec4899",
    pill: { en: "4K UHD / HEVC", pl: "4K UHD / HEVC" },
    title: { en: "HD & 4K Streaming", pl: "Streaming HD i 4K" },
    text: {
      en: "Powered by H.265 HEVC compression and adaptive bitrate streaming so you enjoy razor-sharp 4K, Full HD, and HD playback on any internet speed.",
      pl: "Kompresja H.265 HEVC i adaptacyjny bitrate zapewniają ostry jak brzytwa obraz 4K, Full HD i HD przy każdej prędkości internetu.",
    },
  },
  {
    icon: "devices",
    accent: "#3b82f6",
    pill: { en: "All Platforms", pl: "Wszystkie platformy" },
    title: { en: "Multi-Device Compatibility", pl: "Działa na każdym urządzeniu" },
    text: {
      en: "Stream effortlessly across Samsung & LG Smart TVs, Amazon Firestick, Apple TV, Android boxes, iOS, Windows, Mac, and MAG portals.",
      pl: "Oglądaj bez problemu na telewizorach Samsung i LG Smart TV, Amazon Firestick, Apple TV, przystawkach Android, iOS, Windows, Mac i portalach MAG.",
    },
  },
  {
    icon: "clock",
    accent: "#fb7185",
    pill: { en: "EPG + Catch-Up", pl: "EPG + Catch-Up" },
    title: { en: "24/7 Entertainment", pl: "Rozrywka 24/7" },
    text: {
      en: "Non-stop round-the-clock streaming complete with a real-time Electronic Program Guide (EPG), 7-day TV catch-up, and dedicated 24/7 assistance.",
      pl: "Streaming bez przerwy przez całą dobę, z elektronicznym przewodnikiem po programach (EPG) w czasie rzeczywistym, 7-dniowym catch-up i wsparciem 24/7.",
    },
  },
];
