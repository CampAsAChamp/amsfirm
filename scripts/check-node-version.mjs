#!/usr/bin/env node

/**
 * Check Node.js version before running tests
 * This script ensures tests don't hang when run with an incompatible Node version
 */
import { readFileSync } from "fs"
import { dirname, join } from "path"
import { fileURLToPath } from "url"

/**
 * Extracts the major version number from a version string
 * @param {string} versionString - Version string (e.g., "18.20.8" or ">=22.0.0")
 * @returns {number} The major version number (e.g., 18 or 22)
 */
function extractMajorVersion(versionString) {
  // Remove any non-digit and non-period characters (like >=, ^, ~) then split and get first part
  return parseInt(versionString.replace(/[^\d.]/g, "").split(".")[0], 10)
}

/**
 * Reads the required Node.js version from package.json
 * @returns {string} The required Node.js version string (e.g., ">=22.0.0")
 */
function getRequiredNodeVersion() {
  const __dirname = dirname(fileURLToPath(import.meta.url))
  const packageJsonPath = join(__dirname, "..", "package.json")
  const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf-8"))

  // Get the required version from package.json engines.node
  return packageJson.engines?.node || ">=22.0.0"
}

/**
 * Checks if the current Node.js version meets the required version
 * @param {string} currentVersion - Current Node.js version string (e.g., "18.20.8")
 * @param {string} requiredVersion - Required Node.js version string (e.g., ">=22.0.0")
 */
function checkNodeVersion(currentVersion, requiredVersion) {
  const currentMajorVersion = extractMajorVersion(currentVersion)
  const requiredMajorVersion = extractMajorVersion(requiredVersion)

  if (currentMajorVersion < requiredMajorVersion) {
    console.error("\n❌ ERROR: Incompatible Node.js version detected\n")
    console.error(`  Current version: v${currentVersion}`)
    console.error(`  Required version: >=${requiredMajorVersion}.0.0\n`)
    console.error("This project requires Node.js 22 or higher due to:")
    console.error("  - jsdom 27.3.0 (requires Node 22+)")
    console.error("  - Vitest 4.x and other modern dependencies\n")
    console.error("To fix this issue:")
    console.error("  1. Run: nvm use    (uses version from .nvmrc file)")
    console.error("  2. Or: nvm install 22 && nvm use 22\n")
    console.error("⚠️  Note: Running tests with Node 18 causes them to hang indefinitely.\n")
    process.exit(1)
  }
  // If version check passes, continue silently
}

const currentNodeVersion = process.versions.node
const requiredNodeVersion = getRequiredNodeVersion()

checkNodeVersion(currentNodeVersion, requiredNodeVersion)

