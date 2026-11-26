"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { MOCKUP } from "@/lib/device-mockup";
import type { Locale } from "@/lib/i18n";

// Film-grain overlay (tiny inline SVG, no request).
const NOISE =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

const glass =
  "border border-white/8 bg-mk-glass shadow-[0_24px_60px_-20px_rgb(0_0_0/0.85)] backdrop-blur-[16px]";
const label = "text-[0.6rem] font-bold tracking-[0.08em] uppercase";

/** Max tilt is ±6deg: the pointer offset runs from -0.5 to 0.5 of the box. */
const TILT = 12;

/**
 * Layered "TV + floating glass cards" visual for the home about section. Text and images
 * come from MOCKUP in lib/device-mockup.ts. Sized by container queries (`@md` = 28rem):
 * above it the cards overlap the screen edges, below it they stack under the screen.
 */
export function DeviceMockup({ locale }: { locale: Locale }) {
  const t = (v: Record<Locale, string>) => v[locale];
  const id = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const [shown, setShown] = useState(false);

  // Entrance: cards fade/slide in once the composition scrolls into view.
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // 3D tilt following the mouse; skipped on touch and with reduced motion.
  useEffect(() => {
    const host = rootRef.current;
    const stage = stageRef.current;
    if (!host || !stage) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)").matches) return;
    let raf = 0;
    const move = (e: PointerEvent) => {
      const r = host.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        stage.style.transform = `rotateX(${(-y * TILT).toFixed(2)}deg) rotateY(${(x * TILT).toFixed(2)}deg)`;
      });
    };
    const leave = () => {
      cancelAnimationFrame(raf);
      stage.style.transform = "";
    };
    host.addEventListener("pointermove", move);
    host.addEventListener("pointerleave", leave);
    return () => {
      cancelAnimationFrame(raf);
      host.removeEventListener("pointermove", move);
      host.removeEventListener("pointerleave", leave);
    };
  }, []);

  const screens = MOCKUP.screens;
  const screen = screens[active];
  const tabId = (i: number) => `${id}-tab-${i}`;
  const panelId = `${id}-panel`;

  const onTabKey = (e: KeyboardEvent) => {
    const step = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!step) return;
    e.preventDefault();
    const next = (active + step + screens.length) % screens.length;
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  const scrollNext = () => {
    const section = rootRef.current?.closest("section");
    if (!section) return;
    const nav = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--nav-h")) || 72;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({
      top: section.getBoundingClientRect().bottom + window.scrollY - nav,
      behavior: reduce ? "auto" : "smooth",
    });
  };

  return (
    <div ref={rootRef} className="@container relative perspective-[1200px]">
      <div
        ref={stageRef}
        role="group"
        aria-label={t(MOCKUP.aria.stage)}
        className="relative isolate rounded-[28px] border border-white/8 bg-mk-navy px-3 pt-4 pb-6 shadow-[0_40px_100px_-40px_rgb(0_0_0/0.9)] transition-transform duration-300 ease-out @md:px-10 @md:pt-7 @md:pb-8"
      >
        {/* Background: colour glows, grain and vignette. */}
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-[inherit]">
          <div className="absolute -bottom-1/4 -left-1/4 size-3/4 rounded-full bg-mk-pink opacity-35 blur-[90px]" />
          <div className="absolute -top-1/3 left-1/5 size-2/3 rounded-full bg-mk-purple opacity-40 blur-[90px]" />
          <div className="absolute top-1/5 -right-1/4 size-2/3 rounded-full bg-mk-blue opacity-30 blur-[90px]" />
          <div className="absolute inset-0 opacity-[0.08] mix-blend-overlay" style={{ backgroundImage: NOISE }} />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgb(0_0_0/0.6)_100%)]" />
        </div>

        {/* Stream indicator + tabs, overlapping the top edge of the screen. */}
        <div className="relative z-20 -mb-4 flex flex-wrap items-center justify-between gap-2 @md:-mx-3">
          <Float shown={shown} delay={0} bob={[0, 6]}>
            <p className={`${glass} inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[0.7rem] font-semibold whitespace-nowrap text-white`}>
              <LiveDot color="bg-mk-green" />
              {t(MOCKUP.stream)}
            </p>
          </Float>
          <Float shown={shown} delay={100} bob={[-3, 7]} className="max-w-full min-w-0">
            <div className="max-w-full overflow-x-auto rounded-full [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <div role="tablist" aria-label={t(MOCKUP.aria.tabs)} onKeyDown={onTabKey} className={`${glass} flex w-max gap-1 rounded-full p-1`}>
                {screens.map((s, i) => (
                  <button
                    key={s.id}
                    ref={(el) => {
                      tabRefs.current[i] = el;
                    }}
                    id={tabId(i)}
                    type="button"
                    role="tab"
                    aria-selected={i === active}
                    aria-controls={panelId}
                    tabIndex={i === active ? 0 : -1}
                    onClick={() => setActive(i)}
                    className={`cursor-pointer rounded-full px-3 py-1.5 text-[0.7rem] font-semibold whitespace-nowrap transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-mk-cyan ${
                      i === active ? "bg-gradient-mk text-white shadow-[0_6px_20px_-6px_var(--color-mk-pink)]" : "text-white/55 hover:text-white"
                    }`}
                  >
                    {t(s.tab)}
                  </button>
                ))}
              </div>
            </div>
          </Float>
        </div>

        {/* TV: screen, stand and the cards that overlap its corners. */}
        <div className="relative">
          <div className="relative z-10 rounded-[20px] border border-white/8 bg-[#05070d] p-1.5 shadow-[0_30px_80px_-20px_rgb(0_0_0/0.95)]">
            <div id={panelId} role="tabpanel" aria-labelledby={tabId(active)} className="relative aspect-4/3 overflow-hidden @md:aspect-16/10 rounded-[14px] bg-black">
              {screens.map((s, i) => (
                <Image
                  key={s.id}
                  src={s.image}
                  alt={i === active ? t(s.alt) : ""}
                  aria-hidden={i !== active}
                  fill
                  sizes="(max-width: 768px) 100vw, 520px"
                  className={`object-cover transition-[opacity,scale] duration-700 ${i === active ? "scale-100 opacity-100" : "scale-105 opacity-0"}`}
                />
              ))}
              <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/30 to-transparent" />

              <div className="absolute top-7 left-3 flex gap-2 @md:top-8 @md:left-4">
                <span className={`${label} inline-flex items-center gap-1.5 rounded-full bg-mk-red px-2.5 py-1 text-white shadow-[0_6px_18px_-6px_var(--color-mk-red)]`}>
                  <LiveDot color="bg-white" />
                  {t(screen.badges[0])}
                </span>
                <span className={`${label} rounded-full border border-white/12 bg-black/45 px-2.5 py-1 text-white/85 backdrop-blur-md`}>
                  {t(screen.badges[1])}
                </span>
              </div>

              <div className="absolute inset-x-0 bottom-0 flex items-end gap-3 p-3 @md:p-5">
                <div key={screen.id} className="min-w-0 flex-1 animate-fade-up motion-reduce:animate-none">
                  <p className="truncate text-[0.6rem] font-bold tracking-[0.12em] text-mk-cyan uppercase @md:text-[0.66rem]">{t(screen.eyebrow)}</p>
                  <p className="mt-1 text-[0.95rem] leading-tight font-extrabold text-balance text-white @md:text-xl @lg:text-2xl">{t(screen.title)}</p>
                  <p className="mt-1 truncate text-[0.7rem] text-white/60 @max-[19rem]:hidden @md:text-xs">{t(screen.meta)}</p>
                  <div className="mt-3 flex items-center gap-3">
                    <div aria-hidden className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-white/12">
                      <div className="relative h-full overflow-hidden rounded-full bg-gradient-mk transition-[width] duration-700 ease-out" style={{ width: `${screen.progress}%` }}>
                        <span className="absolute inset-y-0 left-0 w-1/3 animate-shimmer bg-linear-to-r from-transparent via-white/60 to-transparent motion-reduce:hidden" />
                      </div>
                    </div>
                    <span className={`${label} shrink-0 text-white/70`}>{t(screen.status)}</span>
                  </div>
                </div>
                <button
                  type="button"
                  aria-label={t(MOCKUP.aria.play).replace("{name}", t(screen.title))}
                  className="grid size-11 shrink-0 cursor-pointer place-items-center rounded-full bg-gradient-mk text-white shadow-[0_0_30px_-4px_var(--color-mk-pink)] transition-transform duration-300 hover:scale-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mk-cyan active:scale-95 @md:size-14"
                >
                  <svg viewBox="0 0 24 24" aria-hidden className="ml-0.5 size-4 fill-current @md:size-5">
                    <path d="M8 5.14v13.72a1 1 0 0 0 1.5.86l11-6.86a1 1 0 0 0 0-1.72l-11-6.86A1 1 0 0 0 8 5.14Z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          {/* Stand */}
          <div aria-hidden className="mx-auto h-3 w-14 bg-linear-to-b from-[#1c2232] to-[#0b0e16] [clip-path:polygon(18%_0,82%_0,100%_100%,0_100%)]" />
          <div aria-hidden className="mx-auto h-1.5 w-36 rounded-full bg-linear-to-r from-transparent via-white/25 to-transparent" />

          {/* Stacked under the screen on narrow containers; overlapping its corners from @md. */}
          <div className="mt-5 grid gap-3 @md:contents">
            <Float shown={shown} delay={250} bob={[-1.5, 7]} className="z-20 @md:absolute @md:top-[16%] @md:-right-7 @md:w-60">
              <div className={`${glass} flex items-center gap-3 rounded-[18px] p-2.5 pr-4`}>
                <div className="relative size-12 shrink-0 overflow-hidden rounded-xl">
                  <Image src={MOCKUP.vod.image} alt={t(MOCKUP.vod.alt)} fill sizes="48px" className="object-cover" />
                </div>
                <div className="min-w-0">
                  <p className={`${label} text-mk-cyan`}>{t(MOCKUP.vod.label)}</p>
                  <p className="text-sm font-extrabold text-white">{t(MOCKUP.vod.title)}</p>
                  <p className="truncate text-[0.7rem] text-white/55">{t(MOCKUP.vod.sub)}</p>
                </div>
              </div>
            </Float>
            <Float shown={shown} delay={400} bob={[-4, 8]} className="z-20 @md:absolute @md:-bottom-11 @md:-left-7 @md:w-58">
              <div className={`${glass} relative flex items-center gap-3 rounded-[18px] p-2.5 pr-4`}>
                <div className="relative size-12 shrink-0 overflow-hidden rounded-xl">
                  <Image src={MOCKUP.sport.image} alt={t(MOCKUP.sport.alt)} fill sizes="48px" className="object-cover" />
                  <span className="absolute bottom-1 left-1 rounded-sm bg-mk-red px-1 text-[0.5rem] leading-[1.4] font-bold tracking-[0.08em] text-white uppercase">
                    {t(MOCKUP.sport.live)}
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className={`${label} pr-12 text-mk-pink`}>{t(MOCKUP.sport.label)}</p>
                  <p className="truncate text-sm font-extrabold text-white">{t(MOCKUP.sport.title)}</p>
                  <p className="truncate text-[0.7rem] text-white/55">{t(MOCKUP.sport.sub)}</p>
                </div>
                <span className={`${label} absolute top-2.5 right-3 text-white/70`}>{t(MOCKUP.sport.fps)}</span>
              </div>
            </Float>
          </div>
        </div>

        {/* Categories + scroll-down button. Extra top margin from @md clears the hanging sports card. */}
        <Float shown={shown} delay={550} bob={[-2, 6.5]} className="mt-6 @md:mt-16">
          <ul aria-label={t(MOCKUP.aria.categories)} className="flex flex-wrap justify-center gap-2">
            {MOCKUP.categories.map((c) => (
              <li key={c.label.en} className={`${glass} inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[0.72rem] font-semibold text-white/85`}>
                <span aria-hidden className={`size-2 rounded-full ${c.dot}`} />
                {t(c.label)}
              </li>
            ))}
          </ul>
        </Float>
        <Float shown={shown} delay={700} bob={[-5, 5]} className="mt-4 flex justify-center">
          <button
            type="button"
            onClick={scrollNext}
            aria-label={t(MOCKUP.aria.scroll)}
            className={`${glass} grid size-10 cursor-pointer place-items-center rounded-full text-white/80 transition-colors duration-300 hover:text-white focus-visible:outline-2 focus-visible:outline-mk-cyan`}
          >
            <svg viewBox="0 0 24 24" aria-hidden className="size-4 fill-none stroke-current stroke-2 [stroke-linecap:round] [stroke-linejoin:round]">
              <path d="M12 5v14M6 13l6 6 6-6" />
            </svg>
          </button>
        </Float>
      </div>
    </div>
  );
}

/** Entrance (fade + slide, staggered by `delay` ms) around a gently bobbing inner layer. */
function Float({
  shown,
  delay,
  bob: [bobDelay, bobDuration],
  className = "",
  children,
}: {
  shown: boolean;
  delay: number;
  /** [animation-delay, duration] in seconds; negative delays desync the cards. */
  bob: [number, number];
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={`${shown ? "animate-fade-up" : "opacity-0"} motion-reduce:animate-none motion-reduce:opacity-100 ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="animate-bob motion-reduce:animate-none" style={{ animationDelay: `${bobDelay}s`, animationDuration: `${bobDuration}s` }}>
        {children}
      </div>
    </div>
  );
}

/** Solid dot with a soft expanding ring. */
function LiveDot({ color }: { color: string }) {
  return (
    <span aria-hidden className="relative flex size-2 shrink-0">
      <span className={`absolute inset-0 animate-ping-soft rounded-full motion-reduce:hidden ${color}`} />
      <span className={`relative size-2 rounded-full ${color}`} />
    </span>
  );
}
