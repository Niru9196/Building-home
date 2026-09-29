"use client";

import type { CSSProperties, ElementType, ReactNode } from "react";

import { useInView } from "@/lib/use-in-view";

interface RevealProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** Delay in ms, useful for staggering siblings. */
  delay?: number;
  id?: string;
}

/**
 * Fades and lifts its content into view the first time it scrolls on screen.
 * Content is only hidden when JS has run (`html.js`) and the user has not
 * requested reduced motion, so it is never lost.
 */
export function Reveal({ children, as: Tag = "div", className, delay = 0, id }: RevealProps) {
  const [ref, inView] = useInView<HTMLElement>();

  return (
    <Tag
      ref={ref}
      id={id}
      className={className}
      data-reveal=""
      data-visible={inView ? "true" : "false"}
      style={delay ? ({ "--reveal-delay": `${delay}ms` } as CSSProperties) : undefined}
    >
      {children}
    </Tag>
  );
}
