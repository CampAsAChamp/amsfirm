/**
 * Shared framer-motion animation configurations for FAQ components
 *
 * This file centralizes all animation timings and configurations to ensure
 * consistent motion design across the FAQ accordion. All durations and
 * easing functions are defined here for easy tuning.
 */

import { Transition, Variants } from "framer-motion"

/**
 * Answer section expand/collapse animation
 *
 * Used for:
 * - FAQ answer reveal/hide with smooth height transition
 * - Opacity fade-in/out for polished effect
 *
 * Animation flow:
 * - Starts collapsed (height: 0, opacity: 0)
 * - Expands to natural content height (height: "auto")
 * - Fades in content simultaneously (opacity: 1)
 * - Reverses on close
 *
 * Duration: 300ms - Fast enough to feel responsive, slow enough to be smooth
 * Easing: Custom cubic-bezier for balanced, natural motion
 */
export const answerAnimation: Variants = {
  initial: {
    height: 0,
    opacity: 0,
  },
  animate: {
    height: "auto",
    opacity: 1,
  },
  exit: {
    height: 0,
    opacity: 0,
  },
}

/**
 * Transition for answer section animation
 *
 * Uses custom easing curve matching navigation animations
 * for consistent feel across the site
 */
export const answerTransition: Transition = {
  duration: 0.3,
  ease: [0.42, 0, 0.58, 1] as const,
}

/**
 * Border accent color animation transition
 *
 * Used for:
 * - Left border color morph from transparent to primary cyan
 * - Smooth fade that complements the expand/collapse
 *
 * Duration: 300ms - Synchronized with answer animation
 * Easing: easeInOut - Balanced acceleration/deceleration for color change
 */
export const borderTransition: Transition = {
  duration: 0.3,
  ease: "easeInOut",
}

/**
 * Chevron icon rotation animation transition
 *
 * Used for:
 * - Smooth 180-degree rotation when toggling FAQ item
 * - Visual indicator of open/closed state
 *
 * Duration: 300ms - Synchronized with answer and border animations
 * Easing: easeInOut - Smooth rotation without abrupt start/stop
 */
export const chevronTransition: Transition = {
  duration: 0.3,
  ease: "easeInOut",
}
