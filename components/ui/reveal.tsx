"use client";

import { Children, cloneElement, isValidElement } from "react";
import { motion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

const variants: Variants = {
  hidden: { opacity: 0, y: 28, filter: "blur(6px)" },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay },
  }),
};

const VIEWPORT = { once: true, margin: "-60px" } as const;

/**
 * Scroll-triggered entrance. `once` keeps sections from re-animating on the
 * way back up, which reads as noise on a long page.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "li" | "article";
}) {
  const MotionTag = motion[as];
  return (
    <MotionTag
      className={cn(className)}
      variants={variants}
      custom={delay}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
    >
      {children}
    </MotionTag>
  );
}

/**
 * Staggers its `RevealItem` children.
 *
 * Each item triggers its own `whileInView` with an injected delay rather than
 * relying on parent `staggerChildren` propagation — these grids are rendered
 * from Server Components, and orchestration through the server/client boundary
 * left every child stranded at opacity 0.
 */
export function RevealGroup({
  children,
  className,
  stagger = 0.08,
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
}) {
  return (
    <div className={cn(className)}>
      {Children.map(children, (child, i) =>
        isValidElement<{ delay?: number }>(child)
          ? cloneElement(child, { delay: i * stagger })
          : child,
      )}
    </div>
  );
}

/** Child of `RevealGroup` — `delay` is injected by the parent. */
export function RevealItem({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={cn(className)}
      variants={variants}
      custom={delay}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
    >
      {children}
    </motion.div>
  );
}
