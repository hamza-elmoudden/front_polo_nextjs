/**
 * Tailwind class strings shared by several components. Kept in one place so the
 * design stays consistent; Tailwind picks the classes up because it scans this file.
 */

// Layout
export const section = "px-8 py-24 max-[480px]:px-[1.2rem] max-[480px]:py-16";
export const sectionTop = `${section} pt-[calc(var(--nav-h)+3rem)] max-[480px]:pt-[calc(var(--nav-h)+3rem)]`;
export const sectionHeadCenter = "mb-14 text-center";
export const emptyNote = "py-8 text-center text-muted";

// Section typography
/** Small eyebrow above section titles: spot-palette gradient text with an accent dash. */
export const sectionLabel =
  "mb-4 inline-flex items-center gap-2 bg-gradient-spot text-xs font-bold tracking-[0.14em] uppercase text-gradient before:h-0.5 before:w-6 before:rounded-full before:bg-gradient-accent";
export const sectionTitle =
  "mb-4 bg-gradient-heading text-[clamp(1.6rem,3.5vw,2.5rem)] leading-[1.3] font-extrabold text-gradient";
export const sectionSub = "max-w-[560px] text-base leading-[1.8] whitespace-pre-line text-muted";
export const sectionSubCenter = `${sectionSub} mx-auto`;
export const proseText = "text-base leading-[1.85] whitespace-pre-line text-fg";
export const backLink = "mb-6 inline-block text-[0.9rem] font-semibold text-teal-light transition-colors duration-300 hover:text-white";

// Buttons
// The accent gradient is drawn 200% wide; hover slides it towards the blue end, stopping at
// 60% so white text stays ≥ 4.3:1 (the teal tail of the gradient is too light for it).
// `hover:` only fires on devices that can hover, so touch gets an `active:` press state instead.
export const btnPrimary =
  "inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-gradient-accent bg-size-[200%_100%] bg-left px-8 py-[0.85rem] text-base font-bold text-white shadow-glow [text-shadow:0_1px_2px_rgb(0_0_0/0.25)] transition-all duration-300 hover:scale-[1.03] hover:bg-position-[60%_0] hover:shadow-glow-lg active:scale-[0.98] disabled:cursor-wait disabled:opacity-60 disabled:hover:scale-100";
export const btnOutline =
  "inline-flex cursor-pointer items-center justify-center rounded-full border border-white/20 bg-white/4 px-8 py-[0.85rem] text-base font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:scale-[1.03] hover:border-teal-light/60 hover:bg-white/8 hover:shadow-[0_0_28px_-8px_var(--color-teal-light)] active:scale-[0.98]";

// Cards
/** Surface used by standalone blocks (policy articles, sitemap groups). */
export const panel = "rounded-[20px] border border-line bg-card/80 p-7 max-[480px]:px-[1.2rem] max-[480px]:py-6";
export const infoCard =
  "group flex items-center gap-4 rounded-xl border border-line bg-card/80 px-[1.2rem] py-4 backdrop-blur-sm transition-all duration-300";
export const infoCardHover =
  "hover:-translate-y-0.5 hover:border-amethyst/40 hover:shadow-glow active:translate-y-0";
export const featureIcon =
  "flex size-10 min-w-10 items-center justify-center rounded-[10px] bg-gradient-brand text-[1.1rem] shadow-glow-warm transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6";
/** Inline-block so the gradient spans the number itself, not the whole card width. */
export const cardPrice =
  "mb-[0.3rem] inline-block bg-gradient-heading text-[2.4rem] leading-none font-black text-gradient";
export const cardOldPrice = "mb-[0.3rem] text-[0.95rem] text-muted";
export const cardSave =
  "ml-[0.4rem] inline-block rounded-full border border-dusty-rose/40 bg-dusty-rose/12 px-[0.55rem] py-[0.1rem] text-[0.72rem] font-bold text-blush";
export const chip =
  "inline-block rounded-full border border-current px-[0.6rem] py-[0.15rem] text-[0.7rem] font-bold text-teal-light";

// Forms
export const formCard =
  "rounded-[20px] border border-line bg-card/80 p-8 shadow-[0_30px_80px_-40px_var(--color-violet)] backdrop-blur-sm max-[480px]:px-[1.2rem] max-[480px]:py-6";
export const formGrid = "grid gap-4";
export const fieldLabel = "mb-[0.4rem] block text-[0.82rem] font-semibold text-muted";
const fieldBase =
  "rounded-xl border border-line bg-bg/70 py-[0.8rem] text-[0.95rem] text-fg transition duration-300 hover:border-white/15 focus:border-teal-light focus:ring-3 focus:ring-teal/25 focus:outline-none";
export const fieldInput = `${fieldBase} w-full px-4`;
/** Fixed-width country-code select that sits left of the phone input. */
export const fieldSelect = `${fieldBase} w-[6.5rem] shrink-0 cursor-pointer px-2`;
export const honeypot = "absolute -left-[10000px] size-px overflow-hidden";
const formMsg = "rounded-xl border px-4 py-[0.8rem] text-[0.9rem] leading-[1.6]";
export const formMsgOk = `${formMsg} border-teal/40 bg-teal/12 text-teal-light`;
export const formMsgErr = `${formMsg} border-crimson/40 bg-crimson/12 text-blush`;
