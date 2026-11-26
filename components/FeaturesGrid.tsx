"use client";

import { useEffect, useRef, type PointerEvent, type ReactNode } from "react";

/**
 * Wraps the features list: reveals the cards (staggered fade-up) when the grid scrolls into
 * view, and feeds the pointer position to each card's spotlight through --x/--y.
 * Cards stay visible without JS, with reduced motion, and when the grid is already on screen
 * at hydration; they are only hidden once we know the grid is off screen.
 */
export function FeaturesGrid({ className, children }: { className?: string; children: ReactNode }) {
  const ref = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (el.dataset.reveal === "hidden") el.dataset.reveal = "shown";
          io.disconnect();
        } else if (!el.dataset.reveal) {
          el.dataset.reveal = "hidden";
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  function onPointerMove(e: PointerEvent<HTMLUListElement>) {
    if (e.pointerType !== "mouse") return;
    const card = (e.target as HTMLElement).closest<HTMLElement>("[data-card]");
    if (!card) return;
    const r = card.getBoundingClientRect();
    card.style.setProperty("--x", `${e.clientX - r.left}px`);
    card.style.setProperty("--y", `${e.clientY - r.top}px`);
  }

  return (
    <ul ref={ref} className={`group/grid ${className ?? ""}`} onPointerMove={onPointerMove}>
      {children}
    </ul>
  );
}
