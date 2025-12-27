"use client"

import { Moon, Sun } from "lucide-react"

import { useTheme } from "./ThemeProvider"

/**
 * ThemeToggle Component
 * Button to toggle between light and dark mode
 *
 * Features:
 * - Displays sun icon in dark mode, moon icon in light mode
 * - Accessible with proper ARIA labels
 * - Keyboard accessible
 */
export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg bg-surface-secondary hover:bg-surface-tertiary transition-colors cursor-pointer"
      aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
      title={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
    >
      {theme === "light" ? (
        <Moon className="w-5 h-5 text-nav" aria-hidden="true" />
      ) : (
        <Sun className="w-5 h-5 text-nav" aria-hidden="true" />
      )}
    </button>
  )
}
