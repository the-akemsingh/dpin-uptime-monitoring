"use client";

import { useEffect, useRef } from "react";

type ScrollRevealOptions = {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
};

/**
 * useScrollReveal — attaches an IntersectionObserver that toggles
 * `data-revealed="true"` on the returned ref element when it enters
 * the viewport. CSS handles the actual animation via [data-revealed].
 */
export function useScrollReveal<T extends HTMLElement>(
  options: ScrollRevealOptions = {}
) {
  const { threshold = 0.12, rootMargin = "0px 0px -60px 0px", once = true } =
    options;
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        if (entry.isIntersecting) {
          el.dataset.revealed = "true";
          if (once) observer.disconnect();
        } else if (!once) {
          delete el.dataset.revealed;
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return ref;
}
