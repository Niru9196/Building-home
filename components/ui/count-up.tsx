"use client";

import { useEffect, useState } from "react";

import { useHydrated, useInView, usePrefersReducedMotion } from "@/lib/use-in-view";

interface CountUpProps {
  value: number;
  suffix?: string;
  duration?: number;
  className?: string;
}

const formatter = new Intl.NumberFormat("en-IN");
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

/**
 * Animates a number from 0 to `value` once it enters the viewport.
 * Screen readers always get the final value; SSR / no-JS / reduced motion
 * render the final value directly.
 */
export function CountUp({ value, suffix = "", duration = 1600, className }: CountUpProps) {
  const [ref, inView] = useInView<HTMLSpanElement>({ threshold: 0.4 });
  const reducedMotion = usePrefersReducedMotion();
  const hydrated = useHydrated();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!inView || reducedMotion) return;

    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      setCurrent(Math.round(value * easeOutCubic(progress)));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, reducedMotion, value, duration]);

  const animate = hydrated && !reducedMotion;
  const shown = animate ? current : value;
  const finalText = `${formatter.format(value)}${suffix}`;

  return (
    <span ref={ref} className={className} data-final={finalText}>
      <span aria-hidden="true" data-count>
        {formatter.format(shown)}
        {suffix}
      </span>
      <span className="visually-hidden">{finalText}</span>
    </span>
  );
}
