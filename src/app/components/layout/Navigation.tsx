"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { Logo } from "@/app/components/common"
import ThemeToggle from "@/app/components/common/ThemeToggle"
import { navigationLinks } from "@/app/data"

import DesktopNav from "./navigation/DesktopNav"
import MobileMenuButton from "./navigation/MobileMenuButton"
import MobileNav from "./navigation/MobileNav"
import { useActiveLink } from "./navigation/useActiveLink"

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const { setClickedLink, getIsActive } = useActiveLink(pathname)

  return (
    <nav className="bg-surface shadow-lg sticky top-0 z-50" role="navigation" aria-label="Main navigation">
      <div className="container-page">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center" aria-label="Schneider Law home">
              <Logo width={360} height={120} className="h-6 md:h-8 w-auto" priority />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="flex items-center gap-4">
            <DesktopNav links={navigationLinks} getIsActive={getIsActive} onLinkClick={setClickedLink} />
            <div className="hidden md:block">
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile controls */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <MobileMenuButton
              isOpen={isMenuOpen}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close mobile menu" : "Open mobile menu"}
              aria-expanded={isMenuOpen}
            />
          </div>
        </div>

        {/* Mobile Navigation */}
        <MobileNav
          isOpen={isMenuOpen}
          links={navigationLinks}
          getIsActive={getIsActive}
          onLinkClick={setClickedLink}
          onClose={() => setIsMenuOpen(false)}
        />
      </div>
    </nav>
  )
}
