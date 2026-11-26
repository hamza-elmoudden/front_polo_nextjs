"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { btnPrimary, cardOldPrice, cardPrice, cardSave } from "@/lib/ui";

export type PlanCardData = {
  id: string;
  href: string;
  title: string;
  shortDescription: string;
  description: string;
  price: string;
  oldPrice?: string;
  savePercent?: number;
  imageUrl?: string;
  imageAlt: string;
  salesCount?: number;
  featured: boolean;
};

type Labels = {
  bestSeller: string;
  sold: string;
  save: string;
  showDetails: string;
  hideDetails: string;
  oneTime: string;
  cta: string;
};

export function PlanCard({ plan, labels }: { plan: PlanCardData; labels: Labels }) {
  const router = useRouter();

  // Clicking the card body opens the plan page; its own links/buttons keep their behavior.
  const onCardClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest("a, button")) return;
    router.push(plan.href);
  };

  const featured = plan.featured;

  return (
    <article
      className={`group relative isolate flex cursor-pointer flex-col rounded-3xl bg-card px-8 pt-10 pb-8 text-center transition-all duration-300 max-md:w-full max-md:px-5 active:-translate-y-0.5 ${
        featured
          ? "shadow-glow hover:-translate-y-2 hover:shadow-glow-lg"
          : "shadow-[0_20px_50px_-30px_rgb(0_0_0/0.8)] hover:-translate-y-1.5 hover:shadow-glow"
      }`}
      onClick={onCardClick}
    >
      {/* Gradient outline: always on for the featured plan, fades in on hover for the others. */}
      <span
        aria-hidden
        className={`gradient-border absolute inset-0 transition-opacity duration-300 ${
          featured ? "bg-gradient-accent p-[1.5px]" : "bg-gradient-brand p-px opacity-35 group-hover:opacity-100"
        }`}
      />
      {/* Soft gradient wash behind the card header, fading out downwards. */}
      <span
        aria-hidden
        className={`pointer-events-none absolute inset-x-0 top-0 -z-10 h-56 rounded-t-3xl mask-[linear-gradient(#000,transparent)] transition-opacity duration-300 ${
          featured ? "bg-gradient-accent opacity-25 group-hover:opacity-35" : "bg-gradient-brand opacity-12 group-hover:opacity-20"
        }`}
      />
      {/* Accent tab on the top edge */}
      <span
        aria-hidden
        className={`absolute top-0 left-1/2 h-[3px] w-20 -translate-x-1/2 rounded-b-full transition-all duration-300 group-hover:w-28 ${
          featured ? "bg-gradient-spot" : "bg-gradient-brand"
        }`}
      />

      {featured && (
        <div className="absolute -top-3.5 left-1/2 z-2 -translate-x-1/2 rounded-full bg-gradient-spot px-4 py-1 text-[0.72rem] font-extrabold tracking-[0.04em] whitespace-nowrap text-bg uppercase shadow-[0_6px_20px_-6px_var(--color-dusty-rose)]">
          {labels.bestSeller}
        </div>
      )}

      {plan.imageUrl ? (
        <div className="relative mx-auto mb-[1.2rem] aspect-[16/10] w-full overflow-hidden rounded-2xl border border-line bg-gradient-dusk">
          <Image
            src={plan.imageUrl}
            alt={plan.imageAlt}
            fill
            sizes="(max-width: 768px) 90vw, 360px"
            className="object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      ) : (
        <div
          className={`mx-auto mb-[1.2rem] flex size-14 items-center justify-center rounded-2xl text-2xl transition-transform duration-300 group-hover:scale-110 ${
            featured ? "bg-gradient-accent shadow-glow" : "bg-gradient-brand shadow-glow-warm"
          }`}
          aria-hidden
        >📺</div>
      )}

      <h3 className="mb-[0.4rem] text-[1.35rem] font-extrabold text-white">{plan.title}</h3>
      <div className="mb-[1.2rem] text-[0.82rem] font-semibold text-dusty-rose">
        {plan.salesCount ? `${plan.salesCount}+ ${labels.sold}` : "\u00a0"}
      </div>

      <div className="mb-[1.2rem] border-y border-line py-5">
        <div className={cardPrice}>{plan.price}</div>
        {plan.oldPrice && (
          <div className={cardOldPrice}>
            <s className="opacity-80">{plan.oldPrice}</s>
            {plan.savePercent ? (
              <span className={cardSave}>
                {labels.save} {plan.savePercent}%
              </span>
            ) : null}
          </div>
        )}
        <div className="text-[0.78rem] text-muted">{labels.oneTime}</div>
      </div>

      {/* Cards show only the short description; the full one lives on the plan page. */}
      <p className="mb-6 min-h-[72px] text-left text-[0.95rem] leading-[1.7] whitespace-pre-line text-muted">{plan.shortDescription}</p>

      {featured ? (
        <Link href={plan.href} className={`${btnPrimary} mt-auto w-full`}>
          {labels.cta}
        </Link>
      ) : (
        // Outlined with the brand gradient; the fill fades in on hover/press.
        <Link
          href={plan.href}
          className="group/cta relative isolate mt-auto block w-full cursor-pointer rounded-full p-[0.8rem] text-[0.95rem] font-bold text-white transition-all duration-300 hover:scale-[1.03] hover:shadow-glow-warm active:scale-[0.98]"
        >
          <span aria-hidden className="gradient-border absolute inset-0 bg-gradient-brand p-px" />
          <span
            aria-hidden
            className="absolute inset-0 -z-10 rounded-full bg-gradient-brand opacity-0 transition-opacity duration-300 group-hover/cta:opacity-100 group-active/cta:opacity-100"
          />
          {labels.cta}
        </Link>
      )}
    </article>
  );
}
