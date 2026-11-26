import { PageHero } from "@/components/PageHero";
import { RedirectHome } from "@/components/RedirectHome";
import { section } from "@/lib/ui";
import { getI18n } from "@/lib/locale";

export default async function NotFound() {
  const { ui, href } = await getI18n();
  return (
    <>
      <PageHero label="404" title={ui.notFound.title} sub={ui.notFound.text} />
      <section className={`${section} text-center`}>
        <RedirectHome
          href={href("/")}
          label={ui.notFound.back}
          redirectText={ui.notFound.redirect}
          seconds={3}
        />
      </section>
    </>
  );
}
