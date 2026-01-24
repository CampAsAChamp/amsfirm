#!/usr/bin/env node

/**
 * Print Lighthouse scores summary to console with detailed diagnostics
 *
 * Reads the latest Lighthouse CI report and displays:
 * - Category scores (Performance, Accessibility, Best Practices, SEO)
 * - Core Web Vitals metrics (FCP, LCP, TBT, CLS, Speed Index)
 * - Performance opportunities with potential savings
 * - Diagnostics for failed tests
 */
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

/**
 * Read the numberOfRuns from a lighthouse config file
 * @param {string} configPath - Path to the lighthouse config file
 * @returns {number} Number of runs configured, defaults to 1 if not found
 */
function getNumberOfRuns(configPath) {
  try {
    const config = JSON.parse(fs.readFileSync(configPath, "utf8"))
    return config.ci?.collect?.numberOfRuns || 1
  } catch {
    return 1
  }
}

try {
  // Find the lighthouse directory (copied to test_results after running)
  const lighthouseDir = path.join(__dirname, "..", "test_results", "lighthouse")

  // Check if the directory exists
  if (!fs.existsSync(lighthouseDir)) {
    console.log("\n✅ Lighthouse CI completed successfully!")
    console.log("📊 View detailed scores in the uploaded report link above.\n")
    process.exit(0)
  }

  // Find all LHR JSON files
  const files = fs
    .readdirSync(lighthouseDir)
    .filter((file) => file.startsWith("lhr-") && file.endsWith(".json"))
    .map((file) => ({
      name: file,
      path: path.join(lighthouseDir, file),
      timestamp: parseInt(file.match(/lhr-(\d+)\.json/)?.[1] || "0"),
    }))
    .sort((a, b) => b.timestamp - a.timestamp) // Sort by newest first

  if (files.length === 0) {
    console.log("\n✅ Lighthouse CI completed successfully!")
    console.log("📊 View detailed scores in the uploaded report link above.\n")
    process.exit(0)
  }

  // Find links.json to get report URLs
  const linksPath = path.join(lighthouseDir, "links.json")
  let reportLinks = {}
  if (fs.existsSync(linksPath)) {
    try {
      reportLinks = JSON.parse(fs.readFileSync(linksPath, "utf8"))
    } catch {
      // Ignore if we can't read links
    }
  }

  // Read the numberOfRuns from config files
  const desktopConfigPath = path.join(__dirname, "..", ".lighthouserc.desktop.json")
  const mobileConfigPath = path.join(__dirname, "..", ".lighthouserc.mobile.json")
  const desktopRuns = getNumberOfRuns(desktopConfigPath)
  const mobileRuns = getNumberOfRuns(mobileConfigPath)

  // Check if we have both desktop and mobile results
  const isBothTests = files.length === desktopRuns + mobileRuns

  if (isBothTests) {
    // Split into desktop and mobile based on timestamp
    // Desktop runs first (older timestamps), mobile runs second (newer timestamps)
    const desktopFiles = files.slice(mobileRuns, mobileRuns + desktopRuns)
    const mobileFiles = files.slice(0, mobileRuns)

    console.log("\n📊 Lighthouse Scores Comparison:")
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")

    // Display desktop scores
    const desktopReport = JSON.parse(fs.readFileSync(desktopFiles[Math.floor(desktopFiles.length / 2)].path, "utf8"))
    displayScores("🖥️  Desktop", desktopReport, desktopRuns)

    console.log("")

    // Display mobile scores
    const mobileReport = JSON.parse(fs.readFileSync(mobileFiles[Math.floor(mobileFiles.length / 2)].path, "utf8"))
    displayScores("📱 Mobile", mobileReport, mobileRuns)

    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n")

    // Check thresholds and show detailed diagnostics for both
    const desktopPassed = checkThresholds("Desktop", desktopReport, reportLinks)
    const mobilePassed = checkThresholds("Mobile", mobileReport, reportLinks)

    // Show detailed diagnostics for failed tests
    if (!desktopPassed) {
      showDetailedDiagnostics("Desktop", desktopReport, reportLinks)
    }
    if (!mobilePassed) {
      showDetailedDiagnostics("Mobile", mobileReport, reportLinks)
    }
  } else {
    // Single test - detect if desktop or mobile
    const report = JSON.parse(fs.readFileSync(files[Math.floor(files.length / 2)].path, "utf8"))

    // Detect platform based on formFactor in configSettings
    const formFactor = report.configSettings?.formFactor || "desktop"
    const isMobile = formFactor === "mobile"
    const platformLabel = isMobile ? "📱 Mobile" : "🖥️  Desktop"
    const numberOfRuns = isMobile ? mobileRuns : desktopRuns

    const runsText = numberOfRuns === 1 ? "1 run" : `${numberOfRuns} runs`
    console.log(`\n📊 Lighthouse Scores - ${platformLabel} (averaged over ${runsText}):`)
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
    displayScores(null, report, numberOfRuns)
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n")

    const passed = checkThresholds(platformLabel, report, reportLinks)

    // Show detailed diagnostics if tests failed
    if (!passed) {
      showDetailedDiagnostics(platformLabel, report, reportLinks)
    }
  }
} catch {
  // If we can't read the reports, that's okay - they were already uploaded
  console.log("\n✅ Lighthouse CI completed successfully!")
  console.log("📊 View detailed scores in the uploaded report link above.\n")
  process.exit(0)
}

/**
 * Display scores for a report
 * @param {string|null} label - Label for the scores (e.g., "Desktop", "Mobile", or null for no label)
 * @param {object} report - Lighthouse report object
 * @param {number} numberOfRuns - Number of runs the scores are averaged over
 */
function displayScores(label, report, numberOfRuns) {
  const categories = report.categories
  const performance = Math.round(categories.performance.score * 100)
  const accessibility = Math.round(categories.accessibility.score * 100)
  const bestPractices = Math.round(categories["best-practices"].score * 100)
  const seo = Math.round(categories.seo.score * 100)

  if (label) {
    const runsText = numberOfRuns === 1 ? "1 run" : `${numberOfRuns} runs`
    console.log(`${label} (averaged over ${runsText}):`)
  }

  console.log(`  🚀 Performance:     ${performance.toString().padStart(3)} / 100  ${getScoreEmoji(performance)}`)
  console.log(`  ♿ Accessibility:   ${accessibility.toString().padStart(3)} / 100  ${getScoreEmoji(accessibility)}`)
  console.log(`  ✅ Best Practices:  ${bestPractices.toString().padStart(3)} / 100  ${getScoreEmoji(bestPractices)}`)
  console.log(`  🔍 SEO:             ${seo.toString().padStart(3)} / 100  ${getScoreEmoji(seo)}`)
}

/**
 * Check if scores meet thresholds and display warnings
 * @param {string|null} label - Label for the test (e.g., "Desktop", "Mobile", or null)
 * @param {object} report - Lighthouse report object
 * @returns {boolean} True if all thresholds passed
 */
function checkThresholds(label, report) {
  const categories = report.categories
  const performance = Math.round(categories.performance.score * 100)
  const accessibility = Math.round(categories.accessibility.score * 100)
  const bestPractices = Math.round(categories["best-practices"].score * 100)
  const seo = Math.round(categories.seo.score * 100)

  const thresholds = {
    performance: 85,
    accessibility: 90,
    bestPractices: 90,
    seo: 90,
  }

  const failures = []
  if (performance < thresholds.performance) failures.push(`Performance: ${performance} < ${thresholds.performance}`)
  if (accessibility < thresholds.accessibility) failures.push(`Accessibility: ${accessibility} < ${thresholds.accessibility}`)
  if (bestPractices < thresholds.bestPractices) failures.push(`Best Practices: ${bestPractices} < ${thresholds.bestPractices}`)
  if (seo < thresholds.seo) failures.push(`SEO: ${seo} < ${thresholds.seo}`)

  if (failures.length > 0) {
    const prefix = label ? `⚠️  Warning (${label})` : "⚠️  Warning"
    console.log(`${prefix}: Some scores are below thresholds:`)
    failures.forEach((failure) => console.log(`   • ${failure}`))
    console.log("")
    return false
  }
  return true
}

/**
 * Show detailed diagnostics for failed tests
 * @param {string} label - Label for the test (e.g., "Desktop", "Mobile")
 * @param {object} report - Lighthouse report object
 * @param {object} reportLinks - Links to uploaded reports
 */
function showDetailedDiagnostics(label, report, reportLinks) {
  console.log(`\n🔍 Detailed Diagnostics for ${label}:`)
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")

  // Show Core Web Vitals
  displayCoreWebVitals(report)

  // Show performance opportunities
  displayPerformanceOpportunities(report)

  // Show link to full report
  if (reportLinks && Object.keys(reportLinks).length > 0) {
    const url = Object.values(reportLinks)[0]
    if (url) {
      console.log(`\n📄 Full Report: ${url}`)
    }
  }

  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n")
}

/**
 * Display Core Web Vitals metrics
 * @param {object} report - Lighthouse report object
 */
function displayCoreWebVitals(report) {
  const metrics = report.audits?.metrics?.details?.items?.[0]
  if (!metrics) {
    console.log("\n⚠️  Core Web Vitals data not available")
    return
  }

  console.log("\n⚡ Core Web Vitals:")
  console.log(
    `  • First Contentful Paint (FCP):    ${formatMilliseconds(metrics.firstContentfulPaint)} ${getMetricEmoji(
      metrics.firstContentfulPaint,
      1800,
      3000,
    )}`,
  )
  console.log(
    `  • Largest Contentful Paint (LCP):  ${formatMilliseconds(metrics.largestContentfulPaint)} ${getMetricEmoji(
      metrics.largestContentfulPaint,
      2500,
      4000,
    )}`,
  )
  console.log(
    `  • Total Blocking Time (TBT):       ${formatMilliseconds(metrics.totalBlockingTime)} ${getMetricEmoji(
      metrics.totalBlockingTime,
      200,
      600,
    )}`,
  )
  console.log(
    `  • Cumulative Layout Shift (CLS):   ${metrics.cumulativeLayoutShift?.toFixed(3) || "0.000"} ${getMetricEmoji(
      metrics.cumulativeLayoutShift * 1000,
      100,
      250,
    )}`,
  )
  console.log(
    `  • Speed Index:                     ${formatMilliseconds(metrics.speedIndex)} ${getMetricEmoji(metrics.speedIndex, 3400, 5800)}`,
  )
}

/**
 * Display performance opportunities
 * @param {object} report - Lighthouse report object
 */
function displayPerformanceOpportunities(report) {
  const audits = report.audits
  if (!audits) return

  // Find all opportunities (audits with metricSavings and score < 1)
  const opportunities = []
  for (const [key, audit] of Object.entries(audits)) {
    if (audit.scoreDisplayMode === "metricSavings" && audit.score !== null && audit.score < 1) {
      const totalSavings = (audit.metricSavings?.FCP || 0) + (audit.metricSavings?.LCP || 0)
      if (totalSavings > 0 || audit.numericValue > 0) {
        opportunities.push({
          id: key,
          title: audit.title,
          description: audit.description,
          numericValue: audit.numericValue || 0,
          displayValue: audit.displayValue || "",
          metricSavings: audit.metricSavings || {},
          details: audit.details,
        })
      }
    }
  }

  // Sort by total savings (FCP + LCP)
  opportunities.sort((a, b) => {
    const aTotal = (a.metricSavings.FCP || 0) + (a.metricSavings.LCP || 0)
    const bTotal = (b.metricSavings.FCP || 0) + (b.metricSavings.LCP || 0)
    return bTotal - aTotal
  })

  if (opportunities.length === 0) {
    console.log("\n✨ No significant performance opportunities found")
    return
  }

  console.log("\n💡 Performance Opportunities:")
  const topOpportunities = opportunities.slice(0, 5) // Show top 5

  topOpportunities.forEach((opp, index) => {
    console.log(`\n  ${index + 1}. ${opp.title}`)
    if (opp.displayValue) {
      console.log(`     Savings: ${opp.displayValue}`)
    }
    if (opp.metricSavings.FCP || opp.metricSavings.LCP) {
      const savings = []
      if (opp.metricSavings.FCP) savings.push(`FCP: ${formatMilliseconds(opp.metricSavings.FCP)}`)
      if (opp.metricSavings.LCP) savings.push(`LCP: ${formatMilliseconds(opp.metricSavings.LCP)}`)
      console.log(`     Metric Savings: ${savings.join(", ")}`)
    }

    // Show some details if available
    if (opp.details?.items && opp.details.items.length > 0) {
      const itemCount = opp.details.items.length
      if (itemCount === 1) {
        console.log(`     Affects: 1 resource`)
      } else if (itemCount > 1) {
        console.log(`     Affects: ${itemCount} resources`)
      }
    }
  })

  if (opportunities.length > 5) {
    console.log(`\n  ... and ${opportunities.length - 5} more opportunities (see full report)`)
  }
}

/**
 * Get an emoji indicator based on the score
 * @param {number} score - Score from 0-100
 * @returns {string} Emoji indicator
 */
function getScoreEmoji(score) {
  if (score >= 90) return "🟢"
  if (score >= 50) return "🟡"
  return "🔴"
}

/**
 * Get an emoji indicator for a metric
 * @param {number} value - Metric value
 * @param {number} goodThreshold - Threshold for good (green)
 * @param {number} poorThreshold - Threshold for poor (red)
 * @returns {string} Emoji indicator
 */
function getMetricEmoji(value, goodThreshold, poorThreshold) {
  if (value <= goodThreshold) return "🟢"
  if (value <= poorThreshold) return "🟡"
  return "🔴"
}

/**
 * Format milliseconds for display
 * @param {number} ms - Milliseconds
 * @returns {string} Formatted string
 */
function formatMilliseconds(ms) {
  if (ms < 1000) {
    return `${Math.round(ms)}ms`
  }
  return `${(ms / 1000).toFixed(2)}s`
}
