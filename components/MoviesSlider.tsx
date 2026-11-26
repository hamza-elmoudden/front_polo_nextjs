import { MoviesTrack } from "@/components/MoviesTrack";
import { altText } from "@/lib/i18n";
import { getI18n } from "@/lib/locale";
import { sectionHeadCenter, sectionLabel, sectionSubCenter, sectionTitle } from "@/lib/ui";

// Posters in public/movies/ (WebP, 360px wide). Filenames contain spaces and Polish characters, so they are URL-encoded.
const MOVIES: { file: string; title: string }[] = [
  { file: "game of thrones.webp", title: "Game of Thrones" },
  { file: "Boże Ciało.webp", title: "Boże Ciało" },
  { file: "iptv peaky balnders netflex free.webp", title: "Peaky Blinders" },
  { file: "the hobbit.webp", title: "The Hobbit" },
  { file: "Chlopi.webp", title: "Chłopi" },
  { file: "vikings.webp", title: "Vikings" },
  { file: "aquaman movies iptv.webp", title: "Aquaman" },
  { file: "Kawulski.webp", title: "Jak zostałem gangsterem" },
  { file: "iptv netflix dark.webp", title: "Dark" },
  { file: "titanic  movies free .webp", title: "Titanic" },
  { file: "Bogowie .webp", title: "Bogowie" },
  { file: "movies lucifer free.webp", title: "Lucifer" },
  { file: "troy movies.webp", title: "Troy" },
  { file: "movies 1899.webp", title: "1899" },
  { file: "unchart movies iptv.webp", title: "Uncharted" },
  { file: "juman fro free.webp", title: "Jumanji" },
];

export async function MoviesSlider() {
  const { ui } = await getI18n();

  return (
    <section id="movies" className="relative isolate overflow-x-clip py-24 max-[480px]:py-16" aria-labelledby="movies-title">
      {/* Section identity: purple → blue glow from the matching gradient. */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-1/3 -z-[5] mx-auto h-72 max-w-[900px] rounded-full bg-linear-to-r from-amethyst/20 via-periwinkle/15 to-azure/20 blur-[100px]" />
      <div className={`${sectionHeadCenter} px-8`}>
        <span className={sectionLabel}>{ui.movies.label}</span>
        <h2 id="movies-title" className={sectionTitle}>
          {ui.movies.title}
        </h2>
        <p className={sectionSubCenter}>{ui.movies.sub}</p>
      </div>

      <MoviesTrack movies={MOVIES.map((m) => ({ ...m, alt: altText(ui.alt.movie, m.title) }))} />
    </section>
  );
}
