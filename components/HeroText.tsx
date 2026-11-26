const CHAR_MS = 35; // typing speed per character
const START_MS = 250; // delay before typing starts

/** When the headline finishes typing; the blocks below the title fade in relative to this. */
export const heroTypeEndMs = (text: string) => START_MS + Array.from(text).length * CHAR_MS;

/**
 * Hero headline: types itself in once, then a caret blinks at the end.
 * Pure CSS, so the characters start hidden in the server HTML: no flash of the full
 * text before hydration and nothing to download first. Reduced motion shows it as-is.
 */
export function HeroTitle({ text, className }: { text: string; className?: string }) {
  const words = text.split(" ");
  let i = 0;

  return (
    <h1 className={`text-white ${className ?? ""}`} aria-label={text}>
      {words.map((w, wi) => (
        <span
          key={wi}
          aria-hidden
          className="inline-block whitespace-nowrap motion-safe:animate-word-hue"
          style={{ animationDelay: `${-8 + wi * 0.6}s` }}
        >
          {Array.from(w).map((c, j) => (
            <span
              key={j}
              className="motion-safe:animate-char-in"
              style={{ animationDelay: `${START_MS + i++ * CHAR_MS}ms` }}
            >
              {c}
            </span>
          ))}
          {wi < words.length - 1 && (i++, " ")}
        </span>
      ))}
      <span
        aria-hidden
        className="ml-1 inline-block h-[0.85em] w-[3px] translate-y-[0.1em] rounded-full bg-teal-light motion-safe:animate-caret motion-reduce:hidden"
        style={{ animationDelay: `${heroTypeEndMs(text)}ms` }}
      />
    </h1>
  );
}
