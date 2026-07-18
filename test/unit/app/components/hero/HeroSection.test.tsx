import { TestWrapper } from "@test/unit/helpers/mocks"
import { render, screen } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"

import HeroSection from "@/app/components/hero/HeroSection"

// Mock next/navigation
vi.mock("next/navigation", () => ({
  usePathname: () => "/",
}))

describe("HeroSection", () => {
  it("renders title and subtitle", () => {
    render(<HeroSection title="Test Title" subtitle="Test Subtitle" primaryButtonText="Get Started" primaryButtonLink="/contact" />)

    expect(screen.getByText("Test Title")).toBeInTheDocument()
    expect(screen.getByText("Test Subtitle")).toBeInTheDocument()
  })

  it("renders primary button when provided", () => {
    render(<HeroSection title="Test" subtitle="Test" primaryButtonText="Contact" primaryButtonLink="/contact" />)

    const button = screen.getByRole("link", { name: /Contact/i })
    expect(button).toBeInTheDocument()
    expect(button).toHaveAttribute("href", "/contact")
  })

  it("renders secondary button when provided", () => {
    render(
      <HeroSection
        title="Test"
        subtitle="Test"
        primaryButtonText="Contact"
        primaryButtonLink="/contact"
        secondaryButtonText="Learn More"
        secondaryButtonLink="/about"
      />,
    )

    const button = screen.getByRole("link", { name: /Learn More/i })
    expect(button).toBeInTheDocument()
    expect(button).toHaveAttribute("href", "/about")
  })

  it("renders logo when showLogo is true", () => {
    render(
      <TestWrapper>
        <HeroSection title="Test" subtitle="Test" primaryButtonText="Contact" primaryButtonLink="/contact" showLogo={true} />
      </TestWrapper>,
    )

    const logos = screen.getAllByRole("img", { name: /Schneider Law/i })
    expect(logos.length).toBeGreaterThan(0)
  })

  it("does not render logo when showLogo is false", () => {
    render(<HeroSection title="Test" subtitle="Test" primaryButtonText="Contact" primaryButtonLink="/contact" showLogo={false} />)

    const logos = screen.queryAllByRole("img", { name: /Schneider Law/i })
    expect(logos).toHaveLength(0)
  })

  it("renders with only primary button", () => {
    render(<HeroSection title="Test Title" subtitle="Test Subtitle" primaryButtonText="Contact" primaryButtonLink="/contact" />)

    expect(screen.getByText("Test Title")).toBeInTheDocument()
    expect(screen.getByText("Test Subtitle")).toBeInTheDocument()
    expect(screen.getByRole("link", { name: /Contact/i })).toBeInTheDocument()
  })
})
