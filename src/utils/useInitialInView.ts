"use client"

import { useRef } from "react"

/**
 * Custom hook to detect if an element is initially visible in the viewport on mount.
 * Returns viewport configuration that triggers animation immediately for visible elements,
 * or on scroll for elements below the fold.
 *
 * @returns Object with:
 *   - ref: Ref to attach to the element you want to check
 *   - getViewportConfig: Function that returns viewport config based on element position
 *
 * @example
 * ```tsx
 * const { ref, getViewportConfig } = useInitialInView()
 *
 * <motion.div
 *   ref={ref}
 *   initial={{ opacity: 0 }}
 *   whileInView={{ opacity: 1 }}
 *   viewport={getViewportConfig()}
 * >
 *   Content
 * </motion.div>
 * ```
 */
export function useInitialInView() {
  const ref = useRef<HTMLDivElement>(null)

  /**
   * Get viewport configuration based on element's initial position
   * If element is in viewport, use large amount (1.0) to trigger immediately
   * If element is below fold, use small amount (0.1) for smooth scroll trigger
   */
  const getViewportConfig = () => {
    if (!ref.current) {
      return { once: true, amount: 0.3 as const }
    }

    const rect = ref.current.getBoundingClientRect()
    const windowHeight = window.innerHeight || document.documentElement.clientHeight

    // Check if element is in or near the viewport on mount
    const isInViewport = rect.top < windowHeight && rect.bottom > 0

    if (isInViewport) {
      // Element is visible: use high amount threshold to trigger immediately
      // and no margin to ensure it fires right away
      return { once: true, amount: 0.1 as const, margin: "0px" }
    } else {
      // Element is below fold: use standard scroll animation settings
      return { once: true, amount: 0.1 as const, margin: "-100px" }
    }
  }

  return { ref, getViewportConfig }
}
