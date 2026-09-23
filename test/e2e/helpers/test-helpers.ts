import { expect, Locator, Page, TestInfo } from "@playwright/test"

// eslint-disable-next-line no-restricted-imports
import { NAV_LINKS } from "../data/test-data"

/**
 * Navigate to a page and verify navigation succeeded
 * @param page - Playwright page object
 * @param linkName - Name of the navigation link to click
 * @param urlPattern - Expected URL pattern after navigation
 * @param verifyText - Optional text to verify on the destination page
 */
export async function navigateAndVerify(page: Page, linkName: string, urlPattern: RegExp, verifyText?: RegExp): Promise<void> {
  // Click the navigation link (use first() to handle multiple matches)
  await page.getByRole("link", { name: linkName }).first().click()

  // Verify URL changed
  await expect(page).toHaveURL(urlPattern)

  // Verify page content if specified
  if (verifyText) {
    await expect(page.getByText(verifyText).first()).toBeVisible()
  }
}

/**
 * Open the mobile menu
 * @param page - Playwright page object
 */
export async function openMobileMenu(page: Page): Promise<void> {
  const menuButton = page.getByRole("button", { name: /Open menu/i })
  await menuButton.click()

  // Wait for menu to open
  await expect(page.getByRole("button", { name: /Close menu/i })).toBeVisible()
  await page.waitForTimeout(500) // Allow animation to complete
}

/**
 * Close the mobile menu
 * @param page - Playwright page object
 */
export async function closeMobileMenu(page: Page): Promise<void> {
  const closeButton = page.getByRole("button", { name: /Close menu/i })
  await closeButton.click()

  // Wait for menu to close
  await expect(page.getByRole("button", { name: /Open menu/i })).toBeVisible()
  await page.waitForTimeout(500) // Allow animation to complete
}

/**
 * Check if test is running in mobile viewport
 * @param testInfo - Playwright test info object
 * @returns true if mobile viewport
 */
export function isMobileViewport(testInfo: TestInfo): boolean {
  return testInfo.project.name === "mobile" || testInfo.project.name === "mobile-android"
}

/**
 * Find a navigation link scoped to the main navigation
 * @param page - Playwright page object
 * @param linkName - Name of the link to find
 * @returns Locator for the navigation link
 */
export function findInNav(page: Page, linkName: keyof typeof NAV_LINKS): Locator {
  const nav = page.getByRole("navigation", { name: "Main navigation" })
  return nav.getByRole("link", { name: NAV_LINKS[linkName] })
}

/**
 * Navigate to a page and wait for it to be ready
 * Includes waiting for network idle and fonts to load
 * @param page - Playwright page object
 * @param path - Path to navigate to
 */
export async function gotoAndWait(page: Page, path: string): Promise<void> {
  await page.goto(path)
  await page.waitForLoadState("networkidle")
  await page.evaluate(() => document.fonts.ready)
}

/**
 * Click a link and wait for navigation to complete
 * @param page - Playwright page object
 * @param linkName - Name of the link to click
 * @param scope - Optional scope (e.g., 'main navigation')
 */
export async function clickLinkAndWait(page: Page, linkName: string, scope?: string): Promise<void> {
  let link: Locator

  if (scope) {
    const container = page.getByRole("navigation", { name: scope })
    link = container.getByRole("link", { name: linkName })
  } else {
    link = page.getByRole("link", { name: linkName }).first()
  }

  await link.click()
  await page.waitForLoadState("networkidle")
}

/**
 * Check if a mobile menu button is visible
 * @param page - Playwright page object
 * @returns true if mobile menu button is visible
 */
export async function isMobileMenuVisible(page: Page): Promise<boolean> {
  const menuButton = page.getByRole("button", { name: /open menu|close menu/i })
  return await menuButton.isVisible()
}

/**
 * Navigate through sequence of pages
 * @param page - Playwright page object
 * @param sequence - Array of [linkName, urlPattern] tuples
 */
export async function navigateSequence(page: Page, sequence: Array<[string, RegExp]>): Promise<void> {
  for (const [linkName, urlPattern] of sequence) {
    await page.getByRole("link", { name: linkName }).first().click()
    await expect(page).toHaveURL(urlPattern)
  }
}
