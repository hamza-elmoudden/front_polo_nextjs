import { getI18n } from "@/lib/locale";
import type { FaqPage } from "@/lib/sanity/types";
import { emptyNote, section, sectionHeadCenter, sectionLabel, sectionTitle } from "@/lib/ui";
import { FaqAccordion } from "./FaqAccordion";

export async function FaqSection({ faq, showHeader = true }: { faq: FaqPage; showHeader?: boolean }) {
  const { ui, tr } = await getI18n();
  const items = (faq?.questions ?? [])
    .map((q) => ({ question: tr(q.question), answer: tr(q.answer) }))
    .filter((q) => q.question);

  return (
    <section id="faq" className={`${section} relative isolate overflow-hidden bg-linear-to-b from-bg via-surface to-bg`}>
      {/* Section identity: deep violet → steel wash (generic gradient, cool end). */}
      <div aria-hidden className="pointer-events-none absolute top-1/4 left-1/2 -z-10 h-[420px] w-[min(900px,100%)] -translate-x-1/2 rounded-full bg-gradient-dusk opacity-40 blur-[120px]" />
      <div className="mx-auto max-w-[760px]">
        {showHeader ? (
          <div className={sectionHeadCenter}>
            <span className={sectionLabel}>{ui.faq.label}</span>
            <h2 className={sectionTitle}>{tr(faq?.title) || ui.faq.title}</h2>
          </div>
        ) : (
          <h2 className="sr-only">{ui.faq.label}</h2>
        )}
        {items.length ? <FaqAccordion items={items} /> : <p className={emptyNote}>{ui.faq.empty}</p>}
      </div>
    </section>
  );
}
