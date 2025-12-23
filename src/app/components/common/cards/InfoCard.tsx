"use client"

import { AnimatedContainer } from "@/app/components/common"
import { InfoCardProps } from "@/types"

/**
 * InfoCard - A flexible card component for displaying information with an icon, title, and description.
 * Automatically adapts its styling and layout based on whether features are provided.
 *
 * @component
 *
 * ## Usage
 *
 * ### Simple Feature Card (centered, no features list)
 * ```tsx
 * <InfoCard
 *   icon={<CheckCircle className="w-12 h-12" />}
 *   title="Expert Guidance"
 *   description="Personalized attention for your unique situation"
 *   delay={0.2}
 * />
 * ```
 * - Renders with centered text
 * - Icon displayed in icon-circle style
 * - Animates on scroll into view
 *
 * ### Detailed Service Card (left-aligned, with features list)
 * ```tsx
 * <InfoCard
 *   icon={<FileText className="w-12 h-12" />}
 *   title="Estate Planning"
 *   description="Comprehensive planning to protect your assets"
 *   features={[
 *     "Living Trusts",
 *     "Pour-Over Wills",
 *     "Healthcare Directives"
 *   ]}
 *   delay={0}
 * />
 * ```
 * - Renders with card-base styling
 * - Icon in primary-hover color
 * - Includes bulleted feature list
 * - Animates on mount (not on scroll)
 *
 * ## Props
 * @param {React.ReactNode} icon - Icon or SVG element to display
 * @param {string} title - Card title/heading
 * @param {string} description - Card description text
 * @param {string[]} [features] - Optional array of feature items to display as bulleted list
 * @param {number} [delay=0] - Animation delay in seconds
 *
 * ## Behavior
 * - **Without features:** Centered layout, icon-circle style, scroll-reveal animation
 * - **With features:** Left-aligned layout, detailed styling, animates on mount
 *
 * @example
 * // Feature card for "Why Choose Us" section
 * <InfoCard
 *   icon={<Award />}
 *   title="32 Years Experience"
 *   description="Decades of expertise in estate planning"
 * />
 *
 * @example
 * // Service card for services overview
 * <InfoCard
 *   icon={<FileText />}
 *   title="Wills & Testaments"
 *   description="Create legally binding documents"
 *   features={["Simple Wills", "Complex Estates", "Regular Updates"]}
 * />
 */
export default function InfoCard({ icon, title, description, features, delay = 0 }: InfoCardProps) {
  const hasFeatures = features && features.length > 0

  // Compute all styles and props upfront for cleaner JSX
  const containerClass = hasFeatures ? "card-base" : "text-center"
  const iconClass = hasFeatures ? "text-primary-hover mb-4" : "icon-circle"
  const titleClass = hasFeatures ? "text-xl mb-4" : "text-lg mb-2"
  const descriptionClass = hasFeatures ? "mb-6" : ""
  const shouldAnimateOnMount = !hasFeatures

  return (
    <AnimatedContainer className={containerClass} delay={delay} animateOnMount={shouldAnimateOnMount}>
      <div className={iconClass}>{icon}</div>
      <h3 className={`font-semibold text-heading ${titleClass}`}>{title}</h3>
      <p className={`text-body ${descriptionClass}`}>{description}</p>
      {hasFeatures && (
        <ul className="text-sm text-body space-y-2">
          {features.map((feature, index) => (
            <li key={index}>• {feature}</li>
          ))}
        </ul>
      )}
    </AnimatedContainer>
  )
}
