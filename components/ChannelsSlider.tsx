import Image from "next/image";
import { altText } from "@/lib/i18n";
import { getI18n } from "@/lib/locale";

// Logos in public/channel/. Filenames contain spaces and "+", so they are URL-encoded.
const CHANNELS: { file: string; name: string }[] = [
  { file: "Polsat.webp", name: "Polsat" },
  { file: "TVN.webp", name: "TVN" },
  { file: "Sky Sports.webp", name: "Sky Sports" },
  { file: "DAZN.webp", name: "DAZN" },
  { file: "bein.webp", name: "beIN Sports" },
  { file: "espn premiun.webp", name: "ESPN" },
  { file: "nextflex.webp", name: "Netflix" },
  { file: "hbo_max.webp", name: "HBO Max" },
  { file: "Disney+.webp", name: "Disney+" },
  { file: "primevideo.webp", name: "Prime Video" },
  { file: "paramount.webp", name: "Paramount+" },
  { file: "Ankiety TV.webp", name: "Ankiety TV" },
  { file: "tv.webp", name: "Live TV" },
];

export async function ChannelsSlider() {
  const { ui } = await getI18n();
  // The list is rendered twice so the -50% translate loops seamlessly.
  const loop = [...CHANNELS, ...CHANNELS];
  return (
    <div id="brands" aria-label={ui.channelsLabel} className="relative z-10 overflow-hidden bg-surface py-10 before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-accent before:opacity-60 after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-gradient-accent after:opacity-60">
      <div className="relative overflow-hidden before:pointer-events-none before:absolute before:inset-y-0 before:right-0 before:z-2 before:w-20 before:bg-linear-to-l before:from-surface before:to-transparent after:pointer-events-none after:absolute after:inset-y-0 after:left-0 after:z-2 after:w-20 after:bg-linear-to-r after:from-surface after:to-transparent">
        <div className="flex w-max animate-scroll-ltr gap-12 hover:[animation-play-state:paused] motion-reduce:animate-none">
          {loop.map((c, i) => (
            <div className="group flex shrink-0 flex-col items-center gap-2 px-4 py-2 transition-transform duration-300 hover:scale-110" key={i} aria-hidden={i >= CHANNELS.length}>
              <div className="relative size-16 overflow-hidden rounded-[14px] border border-line bg-card transition-all duration-300 group-hover:border-amethyst/60 group-hover:shadow-glow">
                <Image
                  src={`/channel/${encodeURIComponent(c.file)}`}
                  alt={i < CHANNELS.length ? altText(ui.alt.channel, c.name) : ""}
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </div>
              <span className="text-xs font-semibold tracking-[0.03em] text-muted transition-colors duration-300 group-hover:text-teal-light">{c.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
