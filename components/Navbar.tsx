"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { LOCALES, switchLocalePath, type Locale } from "@/lib/i18n";
import type { NavItem } from "@/lib/site";
import { Logo } from "./Logo";

const navCta =
  "inline-block rounded-full bg-gradient-accent bg-size-[200%_100%] bg-left text-white shadow-glow transition-all duration-300 hover:scale-[1.04] hover:bg-position-[60%_0] hover:shadow-glow-lg active:scale-[0.98]";

type Props = {
  items: NavItem[];
  locale: Locale;
  homeHref: string;
  ctaHref: string;
  ctaLabel: string;
  menuLabel: string;
  languageLabel: string;
};

function LanguageSwitch({
  locale,
  pathname,
  label,
  mobile = false,
}: {
  locale: Locale;
  pathname: string;
  label: string;
  mobile?: boolean;
}) {
  return (
    <div
      className="inline-flex rounded-full border border-line bg-white/4 p-[3px]"
      role="group"
      aria-label={label}
    >
      {LOCALES.map((l) => (
        <Link
          key={l}
          href={switchLocalePath(pathname, l)}
          className={`rounded-full font-bold tracking-[0.04em] text-muted transition-colors duration-300 hover:text-white aria-[current=true]:bg-gradient-accent aria-[current=true]:text-white ${
            mobile ? "px-[0.9rem] py-[0.35rem] text-[0.85rem]" : "px-[0.7rem] py-[0.3rem] text-[0.78rem]"
          }`}
          hrefLang={l}
          lang={l}
          aria-current={l === locale ? "true" : undefined}
        >
          {l.toUpperCase()}
        </Link>
      ))}
    </div>
  );
}

export function Navbar({ items, locale, homeHref, ctaHref, ctaLabel, menuLabel, languageLabel }: Props) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on navigation.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  const isActive = (href: string) =>
    href === homeHref ? pathname === homeHref : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-100">
      <nav
        className={`relative z-100 flex h-[calc(var(--nav-h)+env(safe-area-inset-top,0px))] items-center justify-between border-b px-8 pt-[env(safe-area-inset-top,0px)] backdrop-blur-lg transition duration-300 after:pointer-events-none after:absolute after:inset-x-0 after:-bottom-px after:h-px after:bg-gradient-brand after:transition-opacity after:duration-300 max-md:px-[1.2rem] ${
          scrolled || open
            ? "border-transparent bg-bg/92 shadow-[0_8px_30px_rgb(0_0_0/0.45)] after:opacity-70"
            : "border-line bg-bg/60 after:opacity-0"
        }`}
      >
        <Logo href={homeHref} />

        <div className="max-md:hidden">
          <ul className="flex items-center gap-8">
            {items.map((item) => (
              <li key={item.href + item.label}>
                <Link
                  href={item.href}
                  className="relative py-2 text-[0.95rem] font-medium text-fg/75 transition-colors duration-200 after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:origin-center after:scale-x-0 after:rounded-full after:bg-gradient-accent after:transition-transform after:duration-300 hover:text-white hover:after:scale-x-100 aria-[current=page]:text-white aria-[current=page]:after:scale-x-100"
                  aria-current={isActive(item.href) ? "page" : undefined}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center gap-4 max-md:hidden">
          <LanguageSwitch locale={locale} pathname={pathname} label={languageLabel} />
          <Link href={ctaHref} className={`${navCta} px-[1.4rem] py-2 font-bold`}>
            {ctaLabel}
          </Link>
        </div>

        <div className="hidden items-center gap-3 max-md:flex">
        <LanguageSwitch locale={locale} pathname={pathname} label={languageLabel} mobile />
        <button
          type="button"
          className="group flex cursor-pointer flex-col gap-[5px] border-0 bg-transparent p-1"
          aria-label={menuLabel}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="block h-0.5 w-6 rounded-xs bg-fg transition duration-300 group-aria-expanded:translate-y-[7px] group-aria-expanded:rotate-45 group-aria-expanded:bg-dusty-rose" />
          <span className="block h-0.5 w-6 rounded-xs bg-fg transition duration-300 group-aria-expanded:opacity-0" />
          <span className="block h-0.5 w-6 rounded-xs bg-fg transition duration-300 group-aria-expanded:-translate-y-[7px] group-aria-expanded:-rotate-45 group-aria-expanded:bg-teal-light" />
        </button>
        </div>
      </nav>

      <div
        id="mobile-menu"
        className={`absolute inset-x-0 top-full z-99 flex-col gap-4 border-b border-line bg-bg/98 px-8 py-6 backdrop-blur-xl md:hidden ${
          open ? "flex" : "hidden"
        }`}
      >
        {items.map((item) => (
          <Link
            key={item.href + item.label}
            href={item.href}
            className="border-b border-line py-2 text-[1.05rem] font-medium text-fg transition-colors duration-300 hover:text-teal-light active:text-teal-light aria-[current=page]:border-teal-light/40 aria-[current=page]:text-teal-light"
            aria-current={isActive(item.href) ? "page" : undefined}
            onClick={() => setOpen(false)}
          >
            {item.label}
          </Link>
        ))}
        <Link
          href={ctaHref}
          className={`${navCta} mt-2 self-start px-[1.8rem] py-[0.7rem] text-[1.05rem] font-bold`}
          onClick={() => setOpen(false)}>
          {ctaLabel}
        </Link>
      </div>
    </header>
  );
}
