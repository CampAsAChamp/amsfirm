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
}

/**
 * Logo component that automatically switches between light and dark mode versions
 *
 * Renders both variants and lets CSS (`.dark`) pick which is visible, so the
 * correct logo shows on first paint — a JS/theme-state swap would otherwise
 * race the browser's preload of the SSR-default (light) variant.
 *
 * @example
 * ```tsx
 * <Logo width={360} height={120} className="h-8 w-auto" priority />
 * ```
 */
export default function Logo({ alt = "Schneider Law", width, height, className, priority }: LogoProps) {
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
