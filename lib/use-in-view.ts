"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

interface InViewOptions {
  /** Stop observing after the element first enters the viewport. */
  once?: boolean;
  rootMargin?: string;
  threshold?: number;
}

/** Tracks whether an element is inside the viewport via IntersectionObserver. */
export function useInView<T extends Element>({
  once = true,
  rootMargin = "0px 0px -10% 0px",
  threshold = 0.15,
}: InViewOptions = {}) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { rootMargin, threshold },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [once, rootMargin, threshold]);

  return [ref, inView] as const;
}

const reducedMotionQuery = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(callback: () => void) {
  const media = window.matchMedia(reducedMotionQuery);
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
}

/** `true` when the user has asked the OS to minimise motion. */
export function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia(reducedMotionQuery).matches,
    () => false,
  );
}

const noopSubscribe = () => () => {};

/** `false` during SSR and the hydration pass, `true` afterwards. */
export function useHydrated() {
  return useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );
}
