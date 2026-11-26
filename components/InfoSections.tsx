import Image from "next/image";
import { Fragment } from "react";
import { DeviceMockup } from "@/components/DeviceMockup";
import { EagleBackground } from "@/components/EagleBackground";
import { WaveDivider } from "@/components/WaveDivider";
import { altText } from "@/lib/i18n";
import { getI18n } from "@/lib/locale";
import { hasImage, urlFor } from "@/lib/sanity/image";
import type { InfoSection } from "@/lib/sanity/types";
import { featureIcon, infoCard, infoCardHover, section, sectionLabel, sectionSub, sectionTitle } from "@/lib/ui";
import sectionImage from "@/public/hero.jpeg";

type Feature = { icon?: string; text: string };

type Props = {
  sections: InfoSection[];
  /** Optional feature rows rendered under the first section (aboutPage.list). */
  features?: Feature[];
  id?: string;
  /** Show the animated eagle background (home and about pages). */
  eagles?: boolean;
  /** Replace the first section's image with the animated device mockup (home page). */
  mockup?: boolean;
};

/** "About" block(s) driven by Sanity `infoSection` documents. */
export async function InfoSections({ sections, features, id = "about", eagles = false, mockup = false }: Props) {
  const { locale, ui, tr } = await getI18n();
  const items: (InfoSection | null)[] = sections.length ? sections : [null];

  return (
    <section id={id} className={`${section} relative isolate overflow-hidden`}>
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 animate-rainbow bg-gradient-brand-loop bg-size-[400%_400%] opacity-30 motion-reduce:animate-none" />
        <div className="absolute inset-0 animate-rainbow bg-gradient-brand-loop bg-size-[400%_400%] opacity-30 [animation-delay:-7s] mask-[linear-gradient(90deg,transparent_25%,#000_75%)] motion-reduce:animate-none max-md:mask-[linear-gradient(180deg,transparent_25%,#000_75%)]" />
        {/* Darkens the wash slightly so body text keeps its contrast. */}
        <div className="absolute inset-0 bg-bg/35" />
        {eagles && <EagleBackground />}
      </div>
      {items.map((s, i) => {
        const title = s ? tr(s.title) : ui.about.title;
        const text = s ? tr(s.text) : "";
        const imageLeft = s?.imagePosition === "left";
        const alt = s && title ? altText(ui.alt.section, title) : ui.about.imageAlt;

        return (
          <Fragment key={s?._id ?? i}>
          {i > 0 && <WaveDivider variant={i % 2 ? "g" : "f"} />}
          <div className="relative mx-auto grid max-w-[1200px] grid-cols-2 items-center gap-20 not-first:mt-24 max-lg:gap-12 max-md:grid-cols-1">
            <div className={`max-md:order-2 ${imageLeft ? "order-2" : "order-1"}`}>
              {i === 0 && <span className={sectionLabel}>{ui.about.label}</span>}
              <h2 className={sectionTitle}>{title}</h2>
              {text && <p className={sectionSub}>{text}</p>}

              {i === 0 && features && features.length > 0 && (
                <div className="mt-10 flex flex-col gap-4">
                  {features.map((f, j) => (
                    <div className={`${infoCard} ${infoCardHover}`} key={j}>
                      <div className={featureIcon} aria-hidden>{f.icon || "✓"}</div>
                      <h3 className="text-[0.95rem] font-semibold text-fg">{f.text}</h3>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {i === 0 && mockup ? (
              <div className={`max-md:order-1 ${imageLeft ? "order-1" : "order-2"}`}>
                <DeviceMockup locale={locale} />
              </div>
            ) : (
            <div className={`group/media relative transition-transform duration-300 hover:-translate-y-1 max-md:order-1 ${imageLeft ? "order-1" : "order-2"}`}>
              <div className="gradient-border absolute -inset-2 rounded-3xl bg-gradient-spot p-px opacity-50 transition-opacity duration-300 group-hover/media:opacity-100" />
              <div className="pointer-events-none absolute -inset-px z-1 rounded-[20px] bg-linear-135 from-plum/20 via-periwinkle/10 to-transparent to-60%" />
              {s && hasImage(s.image) ? (
                <Image
                  src={urlFor(s.image).width(1200).url()}
                  alt={alt}
                  width={1200}
                  height={800}
                  sizes="(max-width: 768px) 100vw, 600px"
                  className="block h-auto w-full rounded-[20px] shadow-glow-warm"
                />
              ) : (
                <Image
                  src={sectionImage}
                  alt={alt}
                  placeholder="blur"
                  sizes="(max-width: 768px) 100vw, 600px"
                  className="block h-auto w-full rounded-[20px] shadow-glow-warm"
                />
              )}
            </div>
            )}
          </div>
          </Fragment>
        );
      })}
    </section>
  );
}
