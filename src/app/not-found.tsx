import Link from "next/link"
import { Home, Phone } from "lucide-react"

/**
 * Custom 404 Not Found Page
 * Displayed when a user navigates to a page that doesn't exist
 */
export default function NotFound() {
  return (
    <div className="min-h-screen bg-page flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        {/* Error Code */}
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-primary">404</h1>
          <div className="h-1 w-24 bg-primary mx-auto mt-4"></div>
        </div>

        {/* Error Message */}
        <h2 className="text-3xl md:text-4xl font-bold text-heading mb-4">Page Not Found</h2>
        <p className="text-xl text-body mb-8">
          Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have been moved or doesn&apos;t exist.
        </p>

        {/* Navigation Links */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <Link href="/" className="btn-hero-primary inline-flex items-center gap-2">
            <Home className="w-5 h-5" />
            Return Home
          </Link>
          <Link href="/contact" className="btn-hero-secondary inline-flex items-center gap-2">
            <Phone className="w-5 h-5" />
            Contact Us
          </Link>
        </div>

        {/* Helpful Links */}
        <div className="mt-12 pt-8 border-t border-surface-tertiary">
          <p className="text-muted mb-4">You might be looking for:</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/services" className="text-primary hover:text-primary-hover transition-colors hover:underline">
              Services
            </Link>
            <Link href="/about" className="text-primary hover:text-primary-hover transition-colors hover:underline">
              About
            </Link>
            <Link href="/faq" className="text-primary hover:text-primary-hover transition-colors hover:underline">
              FAQ
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
