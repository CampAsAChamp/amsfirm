import Image from "next/image"

interface LogoProps {
  /**
   * Alt text for the logo image
   */
  alt?: string
  /**
   * Width of the logo in pixels
   */
  width: number
  /**
   * Height of the logo in pixels
   */
  height: number
  /**
   * Additional CSS classes for the image
   */
  className?: string
  /**
   * Whether to prioritize loading this image
   */
  priority?: boolean
  /**
   * Logo variant. `"auto"` (default) switches with the theme via CSS.
   * `"light"` / `"dark"` lock to that asset regardless of theme.
   */
  variant?: "auto" | "light" | "dark"
}

/**
 * Logo component that automatically switches between light and dark mode versions
 *
 * Renders both variants and lets CSS (`.dark`) pick which is visible, so the
 * correct logo shows on first paint — a JS/theme-state swap would otherwise
 * race the browser's preload of the SSR-default (light) variant.
 *
 * Pass `variant="dark"` or `variant="light"` to lock a single asset (e.g. on
 * a colored hero background that should not change with the theme).
 *
 * @example
 * ```tsx
 * <Logo width={360} height={120} className="h-8 w-auto" priority />
 * <Logo width={400} height={133} className="h-40 w-auto" variant="dark" priority />
 * ```
 */
export default function Logo({ alt = "Schneider Law", width, height, className, priority, variant = "auto" }: LogoProps) {
  if (variant !== "auto") {
    return (
      <Image
        src={variant === "dark" ? "/schneider-law-logo-dark.svg" : "/schneider-law-logo-light.svg"}
        alt={alt}
        width={width}
        height={height}
        className={className}
        priority={priority}
      />
    )
  }

  return (
    <>
      <Image
        src="/schneider-law-logo-light.svg"
        alt={alt}
        width={width}
        height={height}
        className={`${className ?? ""} logo-light`}
        priority={priority}
      />
      <Image
        src="/schneider-law-logo-dark.svg"
        alt={alt}
        width={width}
        height={height}
        className={`${className ?? ""} logo-dark`}
        priority={priority}
      />
    </>
  )
}
