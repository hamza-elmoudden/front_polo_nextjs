"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { btnPrimary } from "@/lib/ui";

type Props = {
  href: string;
  label: string;
  /** Countdown text; `{s}` is replaced by the seconds left. */
  redirectText: string;
  seconds?: number;
};

export function RedirectHome({ href, label, redirectText, seconds = 3 }: Props) {
  const router = useRouter();
  const [left, setLeft] = useState(seconds);

  useEffect(() => {
    router.prefetch(href);
    const tick = setInterval(() => setLeft((s) => Math.max(s - 1, 0)), 1000);
    const go = setTimeout(() => router.replace(href), seconds * 1000);
    return () => {
      clearInterval(tick);
      clearTimeout(go);
    };
  }, [href, router, seconds]);

  return (
    <>
      <p className="mb-6 text-sm opacity-80" aria-live="polite">
        {redirectText.replace("{s}", String(left))}
      </p>
      <Link href={href} replace className={btnPrimary}>
        {label}
      </Link>
    </>
  );
}
