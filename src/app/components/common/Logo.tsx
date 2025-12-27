"use client"

import Image from "next/image"

import { useTheme } from "@/app/components/common/ThemeProvider"

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
 * @example
 * ```tsx
 * <Logo width={360} height={120} className="h-8 w-auto" priority />
 * ```
 */
export default function Logo({ alt = "Schneider Law", width, height, className, priority }: LogoProps) {
  const { theme } = useTheme()

  return (
    <Image
      src={theme === "dark" ? "/schneider-law-logo-dark.svg" : "/schneider-law-logo-light.svg"}
      alt={alt}
      width={width}
      height={height}
      className={className}
      priority={priority}
    />
  )
}
