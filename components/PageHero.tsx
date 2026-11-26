type Props = { label?: string; title: string; sub?: string };

/** Inner-page header: hero photo under the generic (brand) gradient, fading into the page. */
export function PageHero({ label, title, sub }: Props) {
  return (
    <header className="relative isolate overflow-hidden px-8 pt-18 pb-14 text-center max-[480px]:px-[1.2rem]">
      <div aria-hidden className="absolute inset-0 -z-20 bg-[url('/_img/hero-1376.webp')] bg-cover bg-center bg-no-repeat" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-bg/55" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-brand opacity-75" />
      <div aria-hidden className="absolute -top-24 left-[15%] -z-10 size-[380px] rounded-full bg-azure/25 blur-[110px]" />
      <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-1/2 bg-linear-to-t from-bg to-transparent" />
      {label && (
        <span className="mb-4 inline-block rounded-full border border-blush/30 bg-black/25 px-4 py-1 text-xs font-bold tracking-[0.14em] text-blush uppercase backdrop-blur-sm">
          {label}
        </span>
      )}
      <h1 className="mb-4 text-[clamp(2rem,4.5vw,3rem)] leading-[1.2] font-black text-white drop-shadow-[0_2px_12px_rgb(0_0_0/0.4)]">{title}</h1>
      {sub && <p className="mx-auto max-w-[560px] text-base leading-[1.8] whitespace-pre-line text-fg/90">{sub}</p>}
    </header>
  );
}
