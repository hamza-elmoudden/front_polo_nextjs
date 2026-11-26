import Link from "next/link";
import { getI18n } from "@/lib/locale";
import type { HomePage } from "@/lib/sanity/types";
import { btnOutline, btnPrimary } from "@/lib/ui";
import { HeroTitle } from "@/components/HeroText";
import { localSrcSet, localVariant } from "@/lib/local-images";

/** Paragraph, buttons and stats fade up one after another while the title types. */
const fadeUp = "motion-safe:animate-fade-up";
const delay = (k: number) => ({ animationDelay: `${400 + k * 150}ms` });

export async function Hero({ home }: { home: HomePage }) {
  const { ui, tr, href } = await getI18n();
  const title = tr(home?.title) || ui.hero.title;
  const desc = tr(home?.shortDescription) || ui.hero.desc;

  return (
    <section
      id="hero"
      className="relative isolate flex min-h-[calc(100svh-var(--nav-h))] items-center overflow-hidden py-12"
    >
      {/* Art direction: phones (<768px) get the portrait crop, larger screens the wide one.
          A <picture> lets the browser download only the image that matches. */}
      <picture>
        <source media="(max-width: 767px)" srcSet={localSrcSet("/hero-mobile.jpeg")} sizes="100vw" />
        <img
          src={localVariant("/hero.jpeg", 1376) ?? "/hero.jpeg"}
          srcSet={localSrcSet("/hero.jpeg")}
          sizes="100vw"
          alt={ui.alt.hero}
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 -z-20 size-full object-cover"
        />
      </picture>
      {/* Darken behind the text so it stays readable over the image. */}
      <div className="absolute inset-0 -z-10 bg-linear-to-r from-bg/95 via-bg/70 to-bg/10 max-md:bg-bg/75" />
      {/* Brand tint and two soft glows (generic gradient), kept low so the photo still reads. */}
      <div className="absolute inset-0 -z-10 bg-gradient-brand opacity-30 mix-blend-soft-light" />
      <div className="absolute top-[15%] -left-40 -z-10 size-[560px] rounded-full bg-plum/25 blur-[140px] max-md:size-[340px]" />
      <div className="absolute -right-32 -bottom-40 -z-10 size-[480px] rounded-full bg-violet/30 blur-[140px] max-md:hidden" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-linear-to-t from-bg to-transparent" />

      <div className="relative z-2 ml-[8%] max-w-[760px] px-8 max-md:ml-0 max-[480px]:px-[1.2rem]">
        <div
          style={delay(0)}
          className={`mb-[1.8rem] inline-flex items-center gap-2 rounded-full border border-dusty-rose/40 bg-dusty-rose/12 px-4 py-[0.4rem] text-[0.82rem] font-semibold text-blush backdrop-blur-sm ${fadeUp}`}
        >
          <span className="size-[7px] animate-pulse-dot rounded-full bg-dusty-rose shadow-[0_0_10px_var(--color-dusty-rose)]" />
          {ui.hero.badge}
        </div>

        <HeroTitle
          text={title}
          className="mb-[1.4rem] text-[clamp(1.7rem,7vw,2.2rem)] leading-[1.2] font-black drop-shadow-[0_2px_12px_rgb(0_0_0/0.6)] md:text-[clamp(2rem,5vw,3.6rem)]"
        />

        <p
          style={delay(1)}
          className={`mb-[2.4rem] max-w-[580px] text-[0.95rem] leading-[1.8] text-fg/90 md:text-[1.08rem] ${fadeUp}`}
        >
          {desc}
        </p>

        <div style={delay(2)} className={`flex flex-wrap gap-4 max-[480px]:flex-col ${fadeUp}`}>
          <Link href={href("/#plans")} className={btnPrimary}>
            🎬 {ui.explorePlans}
          </Link>
          <Link href={href("/contact")} className={btnOutline}>
            {ui.contactUs}
          </Link>
        </div>

        <div
          style={delay(3)}
          className={`mt-12 flex gap-10 border-t border-line pt-8 max-md:gap-6 max-[480px]:flex-wrap ${fadeUp}`}
        >
          {ui.hero.stats.map(([num, label]) => (
            <div className="text-center" key={label}>
              <span className="inline-block bg-gradient-spot text-[1.8rem] font-black text-gradient">{num}</span>
              <span className="block text-[0.8rem] font-medium text-muted">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
