"use client";

import { useId, useState } from "react";

type Item = { question: string; answer: string };

/** One item open at a time, like the design's accordion. */
export function FaqAccordion({ items }: { items: Item[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const baseId = useId();

  return (
    <div>
      {items.map((item, i) => {
        const open = openIndex === i;
        const panelId = `${baseId}-panel-${i}`;
        return (
          <div
            key={i}
            className={`relative mb-[0.8rem] overflow-hidden rounded-[14px] border transition-all duration-300 before:absolute before:inset-y-0 before:left-0 before:w-[3px] before:bg-gradient-brand before:transition-opacity before:duration-300 ${
              open ? "border-amethyst/40 shadow-glow before:opacity-100" : "border-line before:opacity-0 hover:border-white/15"
            }`}
          >
            <h3>
              <button
                type="button"
                className={`flex w-full cursor-pointer items-center justify-between gap-4 px-6 py-[1.2rem] text-left text-[0.98rem] font-semibold transition-colors duration-300 hover:bg-card active:bg-card ${open ? "bg-card text-white" : "bg-card/60 text-fg"}`}
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpenIndex(open ? null : i)}
              >
                <span>{item.question}</span>
                <span className={`flex size-7 min-w-7 items-center justify-center rounded-full border text-xs transition-all duration-300 ${open ? "rotate-180 border-transparent bg-gradient-accent text-white" : "border-line text-teal-light"}`} aria-hidden>▼</span>
              </button>
            </h3>
            <div id={panelId} role="region" className={`grid transition-[grid-template-rows] duration-350 ease-in-out ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`} aria-hidden={!open}>
              <div className="overflow-hidden">
                <p className="bg-card px-6 pt-4 pb-[1.4rem] text-[0.92rem] leading-[1.8] whitespace-pre-line text-muted">{item.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
