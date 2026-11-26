import type { LocaleValue } from "./sanity/types";

export const LOCALES = ["en", "pl"] as const;
export type Locale = (typeof LOCALES)[number];

/** Language that locale-less URLs open in (NEXT_PUBLIC_SITE_LOCALE, default "pl"). */
export const DEFAULT_LOCALE: Locale = process.env.NEXT_PUBLIC_SITE_LOCALE === "en" ? "en" : "pl";

export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && (LOCALES as readonly string[]).includes(value);
}

/** Reads a Sanity localeString/localeText in `locale`, falling back to the other language. */
export function t(field: LocaleValue, locale: Locale): string {
  if (!field) return "";
  return field[locale] || field.en || field.pl || "";
}

/** Prefixes an app path with the locale: ("pl", "/plans") → "/pl/plans", ("en", "/#plans") → "/en#plans". */
export function localePath(locale: Locale, path: string) {
  if (path === "/" || path === "") return `/${locale}`;
  if (path.startsWith("/#") || path.startsWith("/?")) return `/${locale}${path.slice(1)}`;
  return `/${locale}${path}`;
}

/**
 * Language that `x-default` and cross-language canonicals point to:
 * DEFAULT_LOCALE when the page exists in it, otherwise the first available one.
 */
export function preferredLocale(available: readonly Locale[]): Locale {
  return available.includes(DEFAULT_LOCALE) ? DEFAULT_LOCALE : (available[0] ?? DEFAULT_LOCALE);
}

/** Swaps the locale segment of a pathname (used by the language switcher). */
export function switchLocalePath(pathname: string, to: Locale) {
  const rest = pathname.replace(/^\/(en|pl)(?=\/|$)/, "");
  return `/${to}${rest}`;
}

const dictionary = {
  en: {
    nav: {
      home: "Home",
      about: "About",
      plans: "Plans",
      faq: "FAQ",
      blog: "Blog",
      contact: "Contact",
    },
    subscribeNow: "Subscribe Now",
    explorePlans: "Explore Plans",
    contactUs: "Contact Us",
    menu: "Menu",
    backToTop: "Back to top",
    hero: {
      badge: "Professional IPTV Service",
      title: "Experience a World of Entertainment Without Limits",
      desc: "Enjoy thousands of live channels, movies, and series in stunning quality, anytime and anywhere.",
      stats: [
        ["+10K", "Live Channels"],
        ["4K", "Picture Quality"],
        ["24/7", "Support"],
        ["99%", "Uptime"],
      ],
    },
    channelsLabel: "Channels included",
    alt: {
      hero: "IPTV Poland: live Polish TV channels, sports and movies on a Smart TV",
      channel: "{name} logo – live TV channel on IPTV Poland",
      movie: "{name} poster – stream it with IPTV Poland",
      plan: "{name} – IPTV Poland subscription plan",
      post: "{name} – IPTV Poland blog",
      section: "{name} – IPTV Poland streaming service",
    },
    movies: {
      label: "Movies & Series",
      title: "Blockbusters and Hit Series",
      sub: "The latest films and the most popular series, ready to stream whenever you want.",
    },
    features: {
      label: "Why choose us",
      title: "Everything You Need in One Subscription",
      sub: "Live TV, movies, sports and 4K streaming on every device — all in a single plan.",
    },
    language: "Language",
    about: {
      label: "About Us",
      title: "An Entertainment Experience Like No Other",
      imageAlt: "IPTV Poland streaming service on Smart TV, phone and tablet",
    },
    plans: {
      label: "Plans",
      title: "Choose the Plan That Fits You",
      sub: "Enjoy the best streaming experience with flexible plans built around your needs.",
      bestSeller: "⭐ Best Seller",
      sold: "sold",
      save: "Save",
      showDetails: "Show details",
      hideDetails: "Hide details",
      prev: "Previous plans",
      next: "Next plans",
      empty: "Plans will be available soon.",
      oneTime: "One-time payment",
    },
    faq: {
      label: "FAQ",
      title: "Everything You Need to Know",
      empty: "No questions yet.",
    },
    blog: {
      label: "Blog",
      title: "News & Guides",
      readMore: "Read more →",
      empty: "No articles published yet.",
      back: "← Back to blog",
      prev: "← Newer",
      next: "Older →",
      by: "by",
    },
    order: {
      title: "Order this plan",
      sub: "Leave your details and we will contact you to activate your subscription.",
      fullname: "Full name",
      phone: "Phone",
      phoneCode: "Country code",
      email: "Email",
      submit: "Place order",
      sending: "Sending…",
      success: "Thank you! Your order was received. We will contact you shortly.",
      whatsapp: "Message us on WhatsApp",
      back: "← All plans",
    },
    contact: {
      label: "Contact",
      title: "Get in Touch",
      sub: "Questions about a plan or setup? Send us a message and we will reply quickly.",
      fullname: "Full name",
      phone: "Phone",
      phoneCode: "Country code",
      email: "Email",
      subject: "Subject",
      message: "Message",
      submit: "Send message",
      sending: "Sending…",
      success: "Thank you! Your message was sent.",
      whatsapp: "WhatsApp",
      emailLabel: "Email",
      facebook: "Facebook",
      address: "Address",
    },
    form: {
      required: "Please fill in all required fields.",
      invalidEmail: "Please enter a valid email address.",
      invalidPhone: "Please enter a valid phone number.",
      failed: "Something went wrong. Please try again or contact us on WhatsApp.",
    },
    footer: {
      quickLinks: "Quick Links",
      contact: "Contact Us",
      rights: "All rights reserved",
      tagline: "Unlimited Entertainment 🎬",
      sitemap: "Sitemap",
      policy: "Refund Policy",
      desc: "Premium IPTV with diverse content and effortless streaming on any screen.",
    },
    policy: {
      label: "Policy",
      title: "Delivery & Refund Policy",
      sub: "How you receive your subscription, the free trial, and how refunds work.",
      sections: [
        [
          "📩 Delivery",
          "IPTV Pro is a digital service: nothing is shipped. After your payment is confirmed, we send your activation code and setup instructions by email or WhatsApp. Delivery is free and usually takes a few minutes, at most 24 hours.",
        ],
        [
          "🎁 1-day free trial",
          "Before you buy, you can ask for a free 24-hour test so you can check the channels, picture quality and stability on your own devices. Contact us to request your trial.",
        ],
        [
          "💸 Refunds",
          "You can ask for a full refund within 6 days of your purchase. To request it, contact us by email or WhatsApp with your order details. Refunds are free and go back to your original payment method.",
        ],
        [
          "📞 Questions",
          "If anything is unclear, contact us and we will help you.",
        ],
      ],
    },
    sitemap: {
      label: "Sitemap",
      title: "Sitemap",
      sub: "Every page of our site in one place: plans, guides and help.",
      pages: "Pages",
      plans: "Plans",
      blog: "Blog articles",
      otherLanguage: "Available in Polish only",
      updated: "Updated",
    },
    notFound: {
      title: "Page not found",
      text: "The page you are looking for does not exist or was moved.",
      back: "Back to home",
      redirect: "Redirecting to the home page in {s}s…",
    },
  },
  pl: {
    nav: {
      home: "Strona główna",
      about: "O nas",
      plans: "Pakiety",
      faq: "FAQ",
      blog: "Blog",
      contact: "Kontakt",
    },
    subscribeNow: "Kup teraz",
    explorePlans: "Zobacz pakiety",
    contactUs: "Kontakt",
    menu: "Menu",
    backToTop: "Do góry",
    hero: {
      badge: "Profesjonalna usługa IPTV",
      title: "Świat rozrywki bez ograniczeń",
      desc: "Tysiące kanałów na żywo, filmów i seriali w świetnej jakości — zawsze i wszędzie.",
      stats: [
        ["+10K", "Kanałów na żywo"],
        ["4K", "Jakość obrazu"],
        ["24/7", "Wsparcie"],
        ["99%", "Dostępność"],
      ],
    },
    channelsLabel: "Dostępne kanały",
    alt: {
      hero: "IPTV Polska: polskie kanały na żywo, sport i filmy na Smart TV",
      channel: "Logo {name} – kanał na żywo w IPTV Polska",
      movie: "Plakat {name} – oglądaj w IPTV Polska",
      plan: "{name} – pakiet abonamentu IPTV Polska",
      post: "{name} – blog IPTV Polska",
      section: "{name} – usługa IPTV Polska",
    },
    movies: {
      label: "Filmy i seriale",
      title: "Hity kinowe i najpopularniejsze seriale",
      sub: "Najnowsze filmy i najchętniej oglądane seriale — gotowe do oglądania, kiedy tylko chcesz.",
    },
    features: {
      label: "Dlaczego my",
      title: "Wszystko, czego potrzebujesz, w jednej subskrypcji",
      sub: "Telewizja na żywo, filmy, sport i streaming 4K na każdym urządzeniu — w jednym pakiecie.",
    },
    language: "Język",
    about: {
      label: "O nas",
      title: "Rozrywka, jakiej jeszcze nie znasz",
      imageAlt: "Usługa IPTV Polska na Smart TV, telefonie i tablecie",
    },
    plans: {
      label: "Pakiety",
      title: "Wybierz pakiet dla siebie",
      sub: "Najlepsze doświadczenie streamingu w elastycznych pakietach dopasowanych do Ciebie.",
      bestSeller: "⭐ Najczęściej wybierany",
      sold: "sprzedanych",
      save: "Oszczędzasz",
      showDetails: "Pokaż szczegóły",
      hideDetails: "Ukryj szczegóły",
      prev: "Poprzednie plany",
      next: "Następne plany",
      empty: "Pakiety będą dostępne wkrótce.",
      oneTime: "Płatność jednorazowa",
    },
    faq: {
      label: "FAQ",
      title: "Wszystko, co musisz wiedzieć",
      empty: "Brak pytań.",
    },
    blog: {
      label: "Blog",
      title: "Aktualności i poradniki",
      readMore: "Czytaj dalej →",
      empty: "Brak opublikowanych artykułów.",
      back: "← Wróć do bloga",
      prev: "← Nowsze",
      next: "Starsze →",
      by: "autor:",
    },
    order: {
      title: "Zamów ten pakiet",
      sub: "Zostaw swoje dane, a skontaktujemy się z Tobą, aby aktywować subskrypcję.",
      fullname: "Imię i nazwisko",
      phone: "Telefon",
      phoneCode: "Kierunkowy kraju",
      email: "E-mail",
      submit: "Złóż zamówienie",
      sending: "Wysyłanie…",
      success: "Dziękujemy! Otrzymaliśmy Twoje zamówienie. Wkrótce się odezwiemy.",
      whatsapp: "Napisz do nas na WhatsApp",
      back: "← Wszystkie pakiety",
    },
    contact: {
      label: "Kontakt",
      title: "Skontaktuj się z nami",
      sub: "Pytania o pakiet lub instalację? Napisz do nas — odpowiemy szybko.",
      fullname: "Imię i nazwisko",
      phone: "Telefon",
      phoneCode: "Kierunkowy kraju",
      email: "E-mail",
      subject: "Temat",
      message: "Wiadomość",
      submit: "Wyślij wiadomość",
      sending: "Wysyłanie…",
      success: "Dziękujemy! Wiadomość została wysłana.",
      whatsapp: "WhatsApp",
      emailLabel: "E-mail",
      facebook: "Facebook",
      address: "Adres",
    },
    form: {
      required: "Uzupełnij wszystkie wymagane pola.",
      invalidEmail: "Podaj poprawny adres e-mail.",
      invalidPhone: "Podaj poprawny numer telefonu.",
      failed: "Coś poszło nie tak. Spróbuj ponownie lub napisz do nas na WhatsApp.",
    },
    footer: {
      quickLinks: "Szybkie linki",
      contact: "Kontakt",
      rights: "Wszelkie prawa zastrzeżone",
      tagline: "Rozrywka bez limitu 🎬",
      sitemap: "Mapa strony",
      policy: "Polityka zwrotów",
      desc: "Premium IPTV z bogatą ofertą i wygodnym oglądaniem na każdym ekranie.",
    },
    policy: {
      label: "Regulamin",
      title: "Polityka dostawy i zwrotów",
      sub: "Jak otrzymujesz subskrypcję, darmowy test i zasady zwrotu pieniędzy.",
      sections: [
        [
          "📩 Dostawa",
          "IPTV Pro to usługa cyfrowa — niczego nie wysyłamy pocztą. Po potwierdzeniu płatności wysyłamy kod aktywacyjny i instrukcję konfiguracji e-mailem lub przez WhatsApp. Dostawa jest bezpłatna i zwykle trwa kilka minut, maksymalnie 24 godziny.",
        ],
        [
          "🎁 Darmowy test na 1 dzień",
          "Przed zakupem możesz poprosić o bezpłatny 24-godzinny test, aby sprawdzić kanały, jakość obrazu i stabilność na swoich urządzeniach. Skontaktuj się z nami, aby otrzymać test.",
        ],
        [
          "💸 Zwroty",
          "Możesz poprosić o pełny zwrot pieniędzy w ciągu 6 dni od zakupu. Aby to zrobić, napisz do nas e-mailem lub przez WhatsApp, podając dane zamówienia. Zwrot jest bezpłatny i trafia na pierwotną metodę płatności.",
        ],
        [
          "📞 Pytania",
          "Jeśli coś jest niejasne, skontaktuj się z nami — chętnie pomożemy.",
        ],
      ],
    },
    sitemap: {
      label: "Mapa strony",
      title: "Mapa strony",
      sub: "Wszystkie strony serwisu w jednym miejscu: pakiety, poradniki i pomoc.",
      pages: "Strony",
      plans: "Pakiety",
      blog: "Artykuły na blogu",
      otherLanguage: "Dostępne tylko po angielsku",
      updated: "Aktualizacja",
    },
    notFound: {
      title: "Nie znaleziono strony",
      text: "Strona, której szukasz, nie istnieje lub została przeniesiona.",
      back: "Wróć na stronę główną",
      redirect: "Przekierowanie na stronę główną za {s} s…",
    },
  },
} as const;

type Widen<T> = T extends string ? string : T extends readonly (infer U)[] ? readonly Widen<U>[] : { [K in keyof T]: Widen<T[K]> };
export type Dict = Widen<(typeof dictionary)["en"]>;

export function getDict(locale: Locale): Dict {
  return dictionary[locale];
}

/** Fills an `alt` template from the dictionary, e.g. altText(ui.alt.movie, "Titanic"). */
export function altText(template: string, name: string) {
  return template.replaceAll("{name}", name);
}
