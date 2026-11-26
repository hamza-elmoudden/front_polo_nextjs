"use client";

import { useEffect, useRef, useState } from "react";

export function PlanSlider({ children, prev, next }: { children: React.ReactNode; prev: string; next: string }) {
  const ref = useRef<HTMLDivElement>(null);

  // Start with the middle card centered in view.
  useEffect(() => {
    const el = ref.current;
    const mid = el?.children[Math.floor(el.children.length / 2)] as HTMLElement | undefined;
    if (el && mid) el.scrollLeft = mid.offsetLeft - (el.clientWidth - mid.offsetWidth) / 2;
  }, []);

  const scroll = (dir: 1 | -1) => {
    const el = ref.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement | null;
    // Move exactly one card (card width + the 24px gap).
    el.scrollBy({ left: dir * ((card?.offsetWidth ?? el.clientWidth) + 24), behavior: "smooth" });
  };

  const [paused, setPaused] = useState(false);

  // Auto-advance one card every few seconds, only when some cards are out of view.
  useEffect(() => {
    const el = ref.current;
    if (!el || paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => {
      if (el.scrollWidth <= el.clientWidth + 4) return; // everything is visible
      const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4;
      if (atEnd) el.scrollTo({ left: 0, behavior: "smooth" });
      else scroll(1);
    }, 4000);
    return () => clearInterval(id);
  }, [paused]);


  const arrow =
    "absolute top-1/2 z-10 flex size-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-line bg-card/90 text-xl text-teal-light backdrop-blur transition-all duration-300 hover:scale-110 hover:border-transparent hover:bg-gradient-accent hover:text-white hover:shadow-glow active:scale-95";

  return (
    <div
      className="relative mx-auto max-w-[1200px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
      onTouchEnd={() => setTimeout(() => setPaused(false), 6000)}
    >
      <button type="button" aria-label={prev} onClick={() => scroll(-1)} className={`${arrow} -left-5 max-md:hidden`}>
        ‹
      </button>
      <div
        ref={ref}
        className="flex snap-x justify-center-safe snap-mandatory items-start gap-6 overflow-x-auto scroll-smooth px-4 pt-8 pb-14 max-md:grid max-md:grid-cols-1 max-md:gap-8 max-md:overflow-visible max-md:snap-none max-md:px-0 max-md:pb-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {children}
      </div>
      <button type="button" aria-label={next} onClick={() => scroll(1)} className={`${arrow} -right-5 max-md:hidden`}>
        ›
      </button>
    </div>
  );
}
