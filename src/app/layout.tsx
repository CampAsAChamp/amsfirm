import "@/app/globals.css"

import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import Script from "next/script"

import { ThemeProvider } from "./components/common"
import StructuredData from "./components/common/StructuredData"
import Footer from "./components/layout/Footer"
import Navigation from "./components/layout/Navigation"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://annamschneiderlaw.com"

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Anna M Schneider Law - Wills & Trusts Attorney",
    template: "%s | Anna M Schneider Law",
  },
  description:
    "Professional legal services specializing in estate planning, wills, trusts, and probate. Protecting your family's future with expert legal guidance.",
  keywords: [
    "estate planning",
    "living trusts",
    "wills",
    "probate",
    "trust administration",
    "power of attorney",
    "estate planning attorney",
    "Torrance attorney",
    "California estate planning",
  ],
  authors: [{ name: "Anna M. Schneider" }],
  creator: "Anna M. Schneider Law",
  publisher: "Anna M. Schneider Law",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: baseUrl,
    siteName: "Anna M. Schneider Law",
    title: "Anna M Schneider Law - Wills & Trusts Attorney",
    description:
      "Professional legal services specializing in estate planning, wills, trusts, and probate. Protecting your family's future with expert legal guidance.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Anna M Schneider Law - Wills & Trusts Attorney",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Anna M Schneider Law - Wills & Trusts Attorney",
    description:
      "Professional legal services specializing in estate planning, wills, trusts, and probate. Protecting your family's future with expert legal guidance.",
    images: ["/opengraph-image"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
    other: [
      {
        rel: "android-chrome-192x192",
        url: "/android-chrome-192x192.png",
      },
      {
        rel: "android-chrome-512x512",
        url: "/android-chrome-512x512.png",
      },
    ],
  },
  manifest: "/site.webmanifest",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Prevent flash of unstyled content by applying theme before page renders */}
        <Script id="theme-script" strategy="beforeInteractive">
          {`
            (function() {
              const theme = localStorage.getItem('theme');
              const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
              if (theme === 'dark' || (!theme && prefersDark)) {
                document.documentElement.classList.add('dark');
              }
            })();
          `}
        </Script>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider>
          <StructuredData />
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-on-primary focus:rounded-lg focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary-hover focus:ring-offset-2"
          >
            Skip to main content
          </a>
          <Navigation />
          <main id="main-content" className="min-h-screen">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
