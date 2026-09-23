/**
 * Shared test data for E2E tests
 * Centralizes common routes and navigation data
 */

/**
 * Page routes with URL patterns and verification selectors
 */
export const PAGE_ROUTES = {
  home: {
    path: "/",
    urlPattern: /^.*\/$/,
    verifySelector: { role: "heading", name: /estate planning|welcome/i },
  },
  about: {
    path: "/about",
    urlPattern: /.*about/,
    verifySelector: { text: /attorney.*profile|meet.*attorney/i },
  },
  services: {
    path: "/services",
    urlPattern: /.*services/,
    verifySelector: { text: /estate planning|wills|trust/i },
  },
  faq: {
    path: "/faq",
    urlPattern: /.*faq/,
    verifySelector: { text: /frequently asked questions|common questions/i },
  },
  contact: {
    path: "/contact",
    urlPattern: /.*contact/,
    verifySelector: { text: /office information/i },
  },
} as const

/**
 * Navigation link names
 */
export const NAV_LINKS = {
  home: "Home",
  about: "About",
  services: "Services",
  faq: "FAQ",
  contact: "Contact",
} as const

/**
 * Common viewport sizes for testing
 */
export const VIEWPORTS = {
  mobile: { width: 375, height: 667 },
  mobileAndroid: { width: 412, height: 915 },
  tablet: { width: 768, height: 1024 },
  desktop: { width: 1280, height: 720 },
  largeDesktop: { width: 1920, height: 1080 },
} as const

/**
 * Common test timeouts (in milliseconds)
 */
export const TIMEOUTS = {
  animation: 1000,
  apiCall: 5000,
  pageLoad: 15000,
} as const
