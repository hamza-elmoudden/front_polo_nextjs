import type { CSSProperties, ReactNode } from "react";
import { FeaturesGrid } from "@/components/FeaturesGrid";
import { FEATURES, type FeatureIcon } from "@/lib/features";
import { getI18n } from "@/lib/locale";
import { section, sectionHeadCenter, sectionSubCenter } from "@/lib/ui";

// Lucide-style outline icons (24×24, stroke = currentColor).
const ICONS: Record<FeatureIcon, ReactNode> = {
  tv: (
    <>
      <rect width="20" height="15" x="2" y="7" rx="2" />
      <path d="m17 2-5 5-5-5" />
    </>
  ),
  film: (
    <>
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <path d="M7 3v18M17 3v18M3 12h18M3 7.5h4M3 16.5h4M17 7.5h4M17 16.5h4" />
    </>
  ),
  trophy: (
    <>
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6M18 9h1.5a2.5 2.5 0 0 0 0-5H18M4 22h16" />
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </>
  ),
  uhd: (
    <>
      <rect width="20" height="14" x="2" y="3" rx="2" />
      <path d="M8 21h8M12 17v4" />
      <text x="12" y="12.6" textAnchor="middle" fontSize="6.5" fontWeight="800" fill="currentColor" stroke="none">
        4K
      </text>
    </>
  ),
  devices: (
    <>
      <path d="M18 8V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h8M10 19v-4M7 19h5" />
      <rect width="6" height="10" x="16" y="12" rx="2" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </>
  ),
};

// Shared reveal state lives on the <ul> (FeaturesGrid); --i staggers each card by 80ms.
const revealItem =
  "transition-[opacity,translate] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] delay-[calc(var(--i)*80ms)] group-data-[reveal=hidden]/grid:translate-y-5 group-data-[reveal=hidden]/grid:opacity-0 group-data-[reveal=hidden]/grid:duration-0";

const card =
  "group relative flex h-full flex-col overflow-hidden rounded-[20px] border border-white/6 bg-[#151826] p-8 transition-[translate,border-color,box-shadow] duration-300 ease-out hover:-translate-y-1.5 hover:border-(--accent)/40 hover:shadow-[0_24px_60px_-24px_color-mix(in_srgb,var(--accent)_55%,transparent)] max-[480px]:p-6 motion-reduce:hover:translate-y-0";

/** Radial spotlight that follows the pointer (--x/--y are set by FeaturesGrid). */
const spotlight: CSSProperties = {
  background:
    "radial-gradient(360px circle at var(--x, 50%) var(--y, 0%), color-mix(in srgb, var(--accent) 12%, transparent), transparent 65%)",
};

/** "Why choose us" grid of six feature cards (home page, between About and Movies). */
export async function FeaturesSection() {
  const { locale, ui } = await getI18n();

  return (
    <section
      id="features"
      aria-labelledby="features-title"
      className={`${section} relative isolate overflow-hidden bg-mk-navy`}
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        {/* Dot grid, faded towards the edges */}
        <div className="absolute inset-0 bg-[radial-gradient(rgb(255_255_255/0.05)_1px,transparent_1px)] bg-size-[22px_22px] mask-[radial-gradient(ellipse_at_center,#000_40%,transparent_80%)]" />
        {/* Faint pink/blue glow, bottom-right */}
        <div className="absolute -right-40 -bottom-40 size-[560px] rounded-full bg-linear-135 from-mk-pink/15 to-mk-blue/15 blur-[120px]" />
      </div>

      <div className={`${sectionHeadCenter} mx-auto max-w-[760px]`}>
        <span className="mb-4 inline-block text-xs font-bold tracking-[0.16em] text-mk-cyan uppercase">
          {ui.features.label}
        </span>
        <h2
          id="features-title"
          className="mb-4 text-[clamp(1.75rem,4vw,2.75rem)] leading-[1.2] font-extrabold text-white"
        >
          {ui.features.title}
        </h2>
        <p className={sectionSubCenter}>{ui.features.sub}</p>
      </div>

      <FeaturesGrid className="mx-auto grid max-w-[1280px] grid-cols-3 gap-8 max-lg:grid-cols-2 max-md:grid-cols-1 lg:gap-10">
        {FEATURES.map((f, i) => (
          <li key={f.icon} className={revealItem} style={{ "--i": i } as CSSProperties}>
            <article data-card className={card} style={{ "--accent": f.accent } as CSSProperties}>
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={spotlight}
              />
              <div className="relative flex items-start justify-between gap-4">
                <div className="flex size-16 shrink-0 items-center justify-center rounded-[14px] border border-white/8 bg-white/3 transition-colors duration-300 group-hover:border-(--accent)/30 group-hover:bg-(--accent)/10">
                  <svg
                    aria-hidden
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="size-7 text-(--accent) transition-transform duration-300 group-hover:scale-110 motion-reduce:group-hover:scale-100"
                  >
                    {ICONS[f.icon]}
                  </svg>
                </div>
                <span className="rounded-full border border-white/10 bg-white/4 px-3.5 py-1.5 text-[13px] font-semibold whitespace-nowrap text-slate-300">
                  {f.pill[locale]}
                </span>
              </div>
              <h3 className="relative mt-10 text-[22px] leading-tight font-bold text-white">{f.title[locale]}</h3>
              <p className="relative mt-3 text-base leading-[1.75] text-slate-400">{f.text[locale]}</p>
            </article>
          </li>
        ))}
      </FeaturesGrid>
    </section>
  );
}
