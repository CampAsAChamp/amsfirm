/**
 * Semantic Release Configuration
 * Automates versioning, changelog generation, and GitHub releases
 * @see https://semantic-release.gitbook.io/
 */
module.exports = {
  branches: ["main"],
  plugins: [
    /**
     * Analyze commits to determine version bump
     * Uses conventional commit format (already enforced by commitlint)
     */
    [
      "@semantic-release/commit-analyzer",
      {
        preset: "conventionalcommits",
        releaseRules: [
          { type: "feat", release: "minor" },
          { type: "fix", release: "patch" },
          { type: "perf", release: "patch" },
          { type: "revert", release: "patch" },
          { type: "docs", release: false },
          { type: "style", release: false },
          { type: "refactor", release: false },
          { type: "test", release: false },
          { type: "build", release: false },
          { type: "ci", release: false },
          { type: "chore", release: false },
        ],
      },
    ],

    /**
     * Generate release notes for GitHub releases
     */
    [
      "@semantic-release/release-notes-generator",
      {
        preset: "conventionalcommits",
        presetConfig: {
          types: [
            { type: "feat", section: "Features" },
            { type: "fix", section: "Bug Fixes" },
            { type: "perf", section: "Performance Improvements" },
            { type: "revert", section: "Reverts" },
            { type: "docs", section: "Documentation", hidden: false },
            { type: "style", section: "Styles", hidden: true },
            { type: "refactor", section: "Code Refactoring", hidden: true },
            { type: "test", section: "Tests", hidden: true },
            { type: "build", section: "Build System", hidden: true },
            { type: "ci", section: "Continuous Integration", hidden: true },
            { type: "chore", section: "Chores", hidden: true },
          ],
        },
      },
    ],

    /**
     * Generate/update CHANGELOG.md in docs folder
     */
    [
      "@semantic-release/changelog",
      {
        changelogFile: "docs/CHANGELOG.md",
        changelogTitle:
          "# Changelog\n\nAll notable changes to this project will be documented in this file.\n\nThe format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),\nand this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).",
      },
    ],

    /**
     * Update version in package.json
     */
    "@semantic-release/npm",

    /**
     * Create GitHub release with release notes
     */
    [
      "@semantic-release/github",
      {
        assets: [],
      },
    ],

    /**
     * Commit updated package.json and CHANGELOG.md back to repository
     */
    [
      "@semantic-release/git",
      {
        assets: ["package.json", "docs/CHANGELOG.md"],
        message: "chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}",
      },
    ],
  ],
}
