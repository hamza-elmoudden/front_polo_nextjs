"use client";

type Gsap = typeof import("gsap").gsap;
type Ctx = { revert(): void };

/**
 * Loads gsap on demand so it stays out of the initial JS bundle (the animations are
 * decorative). Call from useEffect and return the result as the cleanup: `setup` runs
 * once gsap is loaded, and its context is reverted on unmount, even if that happens first.
 * `onFail` runs if the chunk can't be loaded (e.g. to un-hide content hidden in advance).
 */
export function loadGsap(setup: (gsap: Gsap) => Ctx | void, onFail?: () => void): () => void {
  let ctx: Ctx | void;
  let cancelled = false;
  import("gsap").then(
    ({ gsap }) => {
      if (!cancelled) ctx = setup(gsap);
    },
    () => {
      if (!cancelled) onFail?.();
    },
  );
  return () => {
    cancelled = true;
    ctx?.revert();
  };
}
