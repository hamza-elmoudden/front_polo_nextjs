// Generates resized WebP variants of /public images used with next/image.
// The custom loader (lib/image-loader.ts) disables /_next/image, so without these
// every srcset entry would download the full-size original.
// Run after adding or changing an image: `npm run images`.
import { mkdir, readdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const SOURCES = ["hero.jpeg", "hero-mobile.jpeg"];
const WIDTHS = [384, 640, 750, 828, 1080, 1200, 1920];
const OUT_DIR = "public/_img";

await rm(OUT_DIR, { recursive: true, force: true });
await mkdir(OUT_DIR, { recursive: true });

const manifest = {};
for (const file of SOURCES) {
  const input = path.join("public", file);
  const { width: original } = await sharp(input).metadata();
  const name = path.parse(file).name;
  const widths = [...new Set([...WIDTHS.filter((w) => w < original), original])];
  for (const w of widths) {
    await sharp(input).resize({ width: w }).webp({ quality: 72 }).toFile(path.join(OUT_DIR, `${name}-${w}.webp`));
  }
  manifest[`/${file}`] = { name, widths };
}
// Tiny copies of the movie posters for MoviesTrack's blurred backdrop (blur-2xl hides
// the detail, so 32px is enough). Same filenames, under /_img/blur/.
const BLUR_DIR = path.join(OUT_DIR, "blur");
await mkdir(BLUR_DIR, { recursive: true });
for (const file of await readdir("public/movies")) {
  await sharp(path.join("public/movies", file)).resize({ width: 32 }).webp({ quality: 60 }).toFile(path.join(BLUR_DIR, file));
}

await writeFile("lib/image-manifest.json", JSON.stringify(manifest, null, 2) + "\n");
console.log(manifest);
