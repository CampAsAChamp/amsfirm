"use client"

import { motion } from "framer-motion"

import { FeatureCardProps } from "@/types"

/**
 * FeatureCard - A reusable component for displaying features, benefits, or services with an icon, title, and description.
 * Supports simple features list or complex sections with headings. Uses consistent staggered animation patterns.
 *
 * @component
 *
 * ## Usage
 *
 * ### Simple Feature Card (centered, no features list)
 * ```tsx
 * <FeatureCard
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
 * <FeatureCard
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
 * ### Complex Service Card (with sections and headings)
 * ```tsx
 * <FeatureCard
 *   icon={<FileSignature className="w-16 h-16" />}
 *   title="Wills & Testaments"
 *   description="Foundation of estate planning"
 *   sections={[
 *     { heading: "What I Include:", items: ["Last Will", "Asset Planning"] },
 *     { heading: "Benefits:", items: ["Control", "Protection"] }
 *   ]}
 *   delay={0.1}
 *   animateOnMount={true}
 * />
 * ```
 *
 * ## Animation Pattern
 * - Fades in from below (y: 30 → 0)
 * - Opacity transition (0 → 1)
 * - Triggers when scrolling into view (default) or on mount (with animateOnMount)
 * - Smooth easing for professional feel
 *
 * ## Props
 * @param {React.ReactNode} icon - Icon or SVG element to display
 * @param {string} title - Card title/heading
 * @param {string} description - Card description text
 * @param {string[]} [features] - Optional array of feature items to display as bulleted list
 * @param {Array} [sections] - Optional array of sections with optional headings and items (strings or React nodes)
 * @param {number} [delay=0] - Animation delay in seconds (use baseDelay + index * 0.2 for staggering)
 * @param {boolean} [animateOnMount=false] - If true, animates on mount instead of on scroll
 *
 * ## Behavior
 * - **Without features/sections:** Centered layout, icon-circle style
 * - **With features:** Left-aligned layout, simple bulleted list
 * - **With sections:** Left-aligned layout, multiple sections with optional headings
 * - Priority: sections > features > simple card
 */
export default function FeatureCard({
  icon,
  title,
  description,
  features,
  sections,
  delay = 0,
  animateOnMount = false,
}: FeatureCardProps) {
  const hasSections = sections && sections.length > 0
  const hasFeatures = features && features.length > 0
  const hasContent = hasSections || hasFeatures

  // Sections rendering (detailed services page)
  if (hasSections) {
    return (
      <motion.div
        className="card-base"
        initial={{ opacity: 0, y: 30 }}
        animate={animateOnMount ? { opacity: 1, y: 0 } : undefined}
        whileInView={!animateOnMount ? { opacity: 1, y: 0 } : undefined}
        viewport={{ once: true }}
        transition={{
          duration: 0.5,
          delay,
          ease: [0.25, 0.4, 0.25, 1],
        }}
      >
        <div className="text-primary-hover mb-6">{icon}</div>
        <h2 className="text-2xl font-bold text-heading mb-4">{title}</h2>
        <p className="text-body mb-6">{description}</p>

        {sections.map((section, index) => (
          <div key={index} className="mb-6">
            {section.heading && <h3 className="text-lg font-semibold text-heading mb-3">{section.heading}</h3>}
            {section.items.length === 1 ? (
              <p className="text-body">{section.items[0]}</p>
            ) : (
              <ul className="text-body space-y-2">
                {section.items.map((item, itemIndex) => (
                  <li key={itemIndex}>• {item}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </motion.div>
    )
  }

  // Features/simple rendering (homepage and feature grids)
  const containerClass = hasContent ? "card-base" : "text-center"
  const iconClass = hasContent ? "text-primary-hover mb-4" : "icon-circle"
  const titleClass = hasContent ? "text-xl mb-4" : "text-lg mb-2"
  const descriptionClass = hasContent ? "mb-6" : ""

  return (
    <motion.div
      className={containerClass}
      initial={{ opacity: 0, y: 30 }}
      animate={animateOnMount ? { opacity: 1, y: 0 } : undefined}
      whileInView={!animateOnMount ? { opacity: 1, y: 0 } : undefined}
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
