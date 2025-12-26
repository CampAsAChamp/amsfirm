"use client"

import { motion } from "framer-motion"

import { FeatureItemProps } from "@/types"

/**
 * FeatureItem - A reusable component for displaying features, benefits, or services with an icon, title, and description.
 * Uses a consistent staggered offset animation pattern across the site.
 *
 * @component
 *
 * ## Usage
 *
 * ### Simple Feature Card (centered, no features list)
 * ```tsx
 * <FeatureItem
 *   icon={<CheckCircle className="w-8 h-8 text-primary-hover" />}
 *   title="Expert Guidance"
 *   description="Personalized attention for your unique situation"
 *   delay={0.35}
 * />
 * ```
 * - Renders with centered text
 * - Icon displayed in icon-circle style
 * - Animates on scroll into view with offset animation
 *
 * ### Detailed Service Card (left-aligned, with features list)
 * ```tsx
 * <FeatureItem
 *   icon={<FileText className="w-12 h-12 text-primary-hover" />}
 *   title="Estate Planning"
 *   description="Comprehensive planning to protect your assets"
 *   features={[
 *     "Living Trusts",
 *     "Pour-Over Wills",
 *     "Healthcare Directives"
 *   ]}
 *   delay={0.35}
 * />
 * ```
 * - Renders with card-base styling
 * - Includes bulleted feature list
 * - Animates on scroll into view
 *
 * ## Animation Pattern
 * Uses the same staggered offset animation as ProcessStep:
 * - Fades in from below (y: 30 → 0)
 * - Opacity transition (0 → 1)
 * - Triggers when scrolling into view
 * - Smooth easing for professional feel
 *
 * ## Props
 * @param {React.ReactNode} icon - Icon or SVG element to display
 * @param {string} title - Card title/heading
 * @param {string} description - Card description text
 * @param {string[]} [features] - Optional array of feature items to display as bulleted list
 * @param {number} [delay=0] - Animation delay in seconds (use baseDelay + index * 0.2 for staggering)
 *
 * ## Behavior
 * - **Without features:** Centered layout, icon-circle style
 * - **With features:** Left-aligned layout, detailed styling with feature list
 * - Both variants use consistent scroll-reveal animation
 *
 * @example
 * // Feature card for "Why Choose Us" section with staggered animation
 * const baseDelay = 0.35
 * {features.map((feature, index) => (
 *   <FeatureItem
 *     key={index}
 *     icon={feature.icon}
 *     title={feature.title}
 *     description={feature.description}
 *     delay={baseDelay + index * 0.2}
 *   />
 * ))}
 *
 * @example
 * // Service card for services overview
 * <FeatureItem
 *   icon={<FileText className="w-12 h-12 text-primary-hover" />}
 *   title="Wills & Testaments"
 *   description="Create legally binding documents"
 *   features={["Simple Wills", "Complex Estates", "Regular Updates"]}
 *   delay={0.35}
 * />
 */
export default function FeatureItem({ icon, title, description, features, delay = 0 }: FeatureItemProps) {
  const hasFeatures = features && features.length > 0

  // Compute all styles and props upfront for cleaner JSX
  const containerClass = hasFeatures ? "card-base" : "text-center"
  const iconClass = hasFeatures ? "text-primary-hover mb-4" : "icon-circle"
  const titleClass = hasFeatures ? "text-xl mb-4" : "text-lg mb-2"
  const descriptionClass = hasFeatures ? "mb-6" : ""

  return (
    <motion.div
      className={containerClass}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.5,
        delay,
        ease: [0.25, 0.4, 0.25, 1],
      }}
    >
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
    </motion.div>
  )
}
