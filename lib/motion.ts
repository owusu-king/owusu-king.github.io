"use client";

import { useReducedMotion } from "framer-motion";
import type { Transition, Variants } from "framer-motion";

/**
 * Motion system.
 *
 * Two easing curves and three durations, mirroring the CSS tokens in
 * globals.css. Components import from here rather than inlining numbers, so
 * the choreography stays coherent across the site.
 *
 * IMPORTANT: the `prefers-reduced-motion` media query in globals.css only
 * governs CSS animations. Framer Motion animates via inline styles from JS and
 * is completely unaffected by it. Every animated component must therefore call
 * `useMotionPrefs()` and collapse its own motion when `reduced` is true.
 */

export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;
export const EASE_INOUT = [0.65, 0, 0.35, 1] as const;

export const DURATION = {
  fast: 0.18,
  base: 0.42,
  slow: 0.72,
} as const;

export type MotionPrefs = {
  reduced: boolean;
  /** Distance for enter transforms — collapses to 0 when motion is reduced. */
  shift: (px: number) => number;
  /** Duration helper — near-instant when motion is reduced. */
  duration: (seconds: number) => number;
  /** A ready-made transition honouring the user's preference. */
  transition: (seconds?: number, delay?: number) => Transition;
};

export function useMotionPrefs(): MotionPrefs {
  const reduced = useReducedMotion() ?? false;

  return {
    reduced,
    shift: (px) => (reduced ? 0 : px),
    duration: (seconds) => (reduced ? 0.01 : seconds),
    transition: (seconds = DURATION.base, delay = 0) => ({
      duration: reduced ? 0.01 : seconds,
      delay: reduced ? 0 : delay,
      ease: EASE_OUT_EXPO,
    }),
  };
}

/**
 * Staggered entrance for a group of siblings. Pass `reduced` so the stagger
 * collapses rather than playing a fast version of itself.
 */
export function buildStagger(reduced: boolean): {
  container: Variants;
  item: Variants;
} {
  return {
    container: {
      hidden: {},
      show: {
        transition: {
          staggerChildren: reduced ? 0 : 0.07,
          delayChildren: reduced ? 0 : 0.05,
        },
      },
    },
    item: {
      hidden: { opacity: 0, y: reduced ? 0 : 18 },
      show: {
        opacity: 1,
        y: 0,
        transition: {
          duration: reduced ? 0.01 : DURATION.slow,
          ease: EASE_OUT_EXPO,
        },
      },
    },
  };
}
