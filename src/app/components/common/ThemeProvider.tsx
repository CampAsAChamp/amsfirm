"use client"

import { createContext, useContext, useEffect, useState } from "react"

type Theme = "light" | "dark"

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

/**
 * ThemeProvider Component
 * Manages theme state and persistence for dark mode support
 *
 * Features:
 * - Persists theme preference in localStorage
 * - Respects system preference on first visit
 * - Provides theme toggle function to child components
 * - Applies theme class to document root
 * - Animated theme color transitions using CSS transitions
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light")

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const stored = localStorage.getItem("theme") as Theme | null

    if (stored) {
      setTheme(stored)
      // Theme is already applied by the script in layout.tsx, just sync state
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark")
      // Theme is already applied by the script in layout.tsx, just sync state
    }
  }, [])

  /**
   * Apply theme to document root
   * Helper function used by both toggle and persistence
   */
  const applyTheme = (newTheme: Theme, animated = false) => {
    const root = document.documentElement

    if (animated) {
      // Add transition class
      root.classList.add("theme-transitioning")

      // Force reflow
      void root.offsetWidth

      // Apply theme change
      requestAnimationFrame(() => {
        if (newTheme === "dark") {
          root.classList.add("dark")
        } else {
          root.classList.remove("dark")
        }

        // Remove transition class after animation
        setTimeout(() => {
          root.classList.remove("theme-transitioning")
        }, 500)
      })
    } else {
      // Apply immediately without animation
      if (newTheme === "dark") {
        root.classList.add("dark")
      } else {
        root.classList.remove("dark")
      }
    }

    localStorage.setItem("theme", newTheme)
  }

  /**
   * Toggle between light and dark theme with smooth animation
   */
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light"
    applyTheme(newTheme, true)
    setTheme(newTheme)
  }

  // Always provide context, even before mounting to prevent SSR errors
  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>
}

/**
 * useTheme Hook
 * Access theme state and toggle function from any component
 *
 * @returns Object with current theme and toggleTheme function
 * @throws Error if used outside ThemeProvider
 */
export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}
