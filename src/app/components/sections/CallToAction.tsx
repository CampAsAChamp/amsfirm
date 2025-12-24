"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"

import { CallToActionProps } from "@/types"
import { useActiveLink } from "@/app/components/layout/navigation/useActiveLink"

export default function CallToAction({
  title,
  subtitle,
  buttonText,
  buttonLink,
  backgroundClass = "bg-gradient-to-r from-primary-hover to-primary-dark",
}: CallToActionProps) {
  const pathname = usePathname()
  const { setClickedLink, getIsActive } = useActiveLink(pathname)

  return (
    <section className={`${backgroundClass} text-on-primary py-16`}>
      <div className="section-container text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-hero-heading">{title}</h2>
        <p className="text-xl mb-8 text-hero-body max-w-2xl mx-auto">{subtitle}</p>
        <div className="relative inline-block">
          <Link href={buttonLink} onClick={() => setClickedLink(buttonLink)} className="btn-hero-secondary">
            {buttonText}
          </Link>
          {getIsActive(buttonLink) && (
            <motion.div
              layoutId="ctaButtonIndicator"
              className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-l-transparent border-r-transparent border-t-on-primary"
              transition={{
                type: "spring",
                stiffness: 500,
                damping: 30,
              }}
            />
          )}
        </div>
      </div>
    </section>
  )
}
