import { render, screen } from "@testing-library/react"
import { CheckCircle } from "lucide-react"
import { describe, expect, it, vi } from "vitest"

import InfoCard from "@/app/components/common/cards/InfoCard"

// Mock AnimatedContainer to simplify testing
vi.mock("@/app/components/common", () => ({
  AnimatedContainer: ({
    children,
    className,
    delay,
    animateOnMount,
  }: {
    children: React.ReactNode
    className?: string
    delay?: number
    animateOnMount?: boolean
  }) => (
    <div className={className} data-delay={delay} data-animate-on-mount={animateOnMount}>
      {children}
    </div>
  ),
}))

describe("InfoCard", () => {
  const mockIcon = <CheckCircle data-testid="mock-icon" className="w-12 h-12" />
  const mockTitle = "Expert Guidance"
  const mockDescription = "Personalized attention for your unique situation"

  describe("Without features (simple card)", () => {
    it("renders icon, title, and description", () => {
      render(<InfoCard icon={mockIcon} title={mockTitle} description={mockDescription} />)

      expect(screen.getByTestId("mock-icon")).toBeInTheDocument()
      expect(screen.getByText(mockTitle)).toBeInTheDocument()
      expect(screen.getByText(mockDescription)).toBeInTheDocument()
    })

    it("applies centered text layout", () => {
      const { container } = render(<InfoCard icon={mockIcon} title={mockTitle} description={mockDescription} />)

      const wrapper = container.querySelector('[class*="text-center"]')
      expect(wrapper).toBeInTheDocument()
    })

    it("applies icon-circle class to icon wrapper", () => {
      const { container } = render(<InfoCard icon={mockIcon} title={mockTitle} description={mockDescription} />)

      const iconWrapper = container.querySelector('[class*="icon-circle"]')
      expect(iconWrapper).toBeInTheDocument()
    })

    it("applies smaller title size", () => {
      render(<InfoCard icon={mockIcon} title={mockTitle} description={mockDescription} />)

      const title = screen.getByText(mockTitle)
      expect(title).toHaveClass("text-lg")
      expect(title).toHaveClass("mb-2")
    })

    it("does not render feature list", () => {
      const { container } = render(<InfoCard icon={mockIcon} title={mockTitle} description={mockDescription} />)

      const list = container.querySelector("ul")
      expect(list).not.toBeInTheDocument()
    })

    it("passes animateOnMount as true to AnimatedContainer", () => {
      const { container } = render(<InfoCard icon={mockIcon} title={mockTitle} description={mockDescription} />)

      const animatedContainer = container.firstChild as HTMLElement
      expect(animatedContainer).toHaveAttribute("data-animate-on-mount", "true")
    })

    it("applies default delay of 0", () => {
      const { container } = render(<InfoCard icon={mockIcon} title={mockTitle} description={mockDescription} />)

      const animatedContainer = container.firstChild as HTMLElement
      expect(animatedContainer).toHaveAttribute("data-delay", "0")
    })

    it("applies custom delay when provided", () => {
      const { container } = render(
        <InfoCard icon={mockIcon} title={mockTitle} description={mockDescription} delay={0.5} />
      )

      const animatedContainer = container.firstChild as HTMLElement
      expect(animatedContainer).toHaveAttribute("data-delay", "0.5")
    })
  })

  describe("With features (detailed card)", () => {
    const mockFeatures = ["Living Trusts", "Pour-Over Wills", "Healthcare Directives"]

    it("renders icon, title, description, and features", () => {
      render(<InfoCard icon={mockIcon} title={mockTitle} description={mockDescription} features={mockFeatures} />)

      expect(screen.getByTestId("mock-icon")).toBeInTheDocument()
      expect(screen.getByText(mockTitle)).toBeInTheDocument()
      expect(screen.getByText(mockDescription)).toBeInTheDocument()
      expect(screen.getByText((content) => content.includes("Living Trusts"))).toBeInTheDocument()
      expect(screen.getByText((content) => content.includes("Pour-Over Wills"))).toBeInTheDocument()
      expect(screen.getByText((content) => content.includes("Healthcare Directives"))).toBeInTheDocument()
    })

    it("applies card-base class to container", () => {
      const { container } = render(
        <InfoCard icon={mockIcon} title={mockTitle} description={mockDescription} features={mockFeatures} />
      )

      const wrapper = container.querySelector('[class*="card-base"]')
      expect(wrapper).toBeInTheDocument()
    })

    it("applies text-primary-hover to icon wrapper", () => {
      const { container } = render(
        <InfoCard icon={mockIcon} title={mockTitle} description={mockDescription} features={mockFeatures} />
      )

      const iconWrapper = container.querySelector('[class*="text-primary-hover"]')
      expect(iconWrapper).toBeInTheDocument()
    })

    it("applies larger title size", () => {
      render(<InfoCard icon={mockIcon} title={mockTitle} description={mockDescription} features={mockFeatures} />)

      const title = screen.getByText(mockTitle)
      expect(title).toHaveClass("text-xl")
      expect(title).toHaveClass("mb-4")
    })

    it("applies margin to description", () => {
      render(<InfoCard icon={mockIcon} title={mockTitle} description={mockDescription} features={mockFeatures} />)

      const description = screen.getByText(mockDescription)
      expect(description).toHaveClass("mb-6")
    })

    it("renders features as bulleted list", () => {
      const { container } = render(
        <InfoCard icon={mockIcon} title={mockTitle} description={mockDescription} features={mockFeatures} />
      )

      const list = container.querySelector("ul")
      expect(list).toBeInTheDocument()

      const listItems = container.querySelectorAll("li")
      expect(listItems).toHaveLength(3)
    })

    it("features have bullet points", () => {
      render(<InfoCard icon={mockIcon} title={mockTitle} description={mockDescription} features={mockFeatures} />)

      // Check that each feature is prefixed with a bullet
      expect(screen.getByText((content) => content.includes("• Living Trusts"))).toBeInTheDocument()
      expect(screen.getByText((content) => content.includes("• Pour-Over Wills"))).toBeInTheDocument()
      expect(screen.getByText((content) => content.includes("• Healthcare Directives"))).toBeInTheDocument()
    })

    it("passes animateOnMount as false to AnimatedContainer", () => {
      const { container } = render(
        <InfoCard icon={mockIcon} title={mockTitle} description={mockDescription} features={mockFeatures} />
      )

      const animatedContainer = container.firstChild as HTMLElement
      expect(animatedContainer).toHaveAttribute("data-animate-on-mount", "false")
    })

    it("renders with single feature", () => {
      const singleFeature = ["Single Feature"]
      const { container } = render(
        <InfoCard icon={mockIcon} title={mockTitle} description={mockDescription} features={singleFeature} />
      )

      const listItems = container.querySelectorAll("li")
      expect(listItems).toHaveLength(1)
      expect(screen.getByText("• Single Feature")).toBeInTheDocument()
    })

    it("renders with many features", () => {
      const manyFeatures = ["Feature 1", "Feature 2", "Feature 3", "Feature 4", "Feature 5", "Feature 6"]
      const { container } = render(
        <InfoCard icon={mockIcon} title={mockTitle} description={mockDescription} features={manyFeatures} />
      )

      const listItems = container.querySelectorAll("li")
      expect(listItems).toHaveLength(6)
    })
  })

  describe("Edge cases", () => {
    it("treats empty features array as no features", () => {
      const { container } = render(
        <InfoCard icon={mockIcon} title={mockTitle} description={mockDescription} features={[]} />
      )

      const list = container.querySelector("ul")
      expect(list).not.toBeInTheDocument()

      // Should use centered layout
      const wrapper = container.querySelector('[class*="text-center"]')
      expect(wrapper).toBeInTheDocument()
    })

    it("applies correct heading styles", () => {
      render(<InfoCard icon={mockIcon} title={mockTitle} description={mockDescription} />)

      const heading = screen.getByRole("heading", { level: 3 })
      expect(heading).toHaveClass("font-semibold")
      expect(heading).toHaveClass("text-heading")
    })

    it("applies correct body text styles", () => {
      render(<InfoCard icon={mockIcon} title={mockTitle} description={mockDescription} />)

      const description = screen.getByText(mockDescription)
      expect(description).toHaveClass("text-body")
    })

    it("renders with custom delay", () => {
      const { container } = render(
        <InfoCard icon={mockIcon} title={mockTitle} description={mockDescription} delay={1.5} />
      )

      const animatedContainer = container.firstChild as HTMLElement
      expect(animatedContainer).toHaveAttribute("data-delay", "1.5")
    })

    it("renders complex icon element", () => {
      const complexIcon = (
        <div data-testid="complex-icon">
          <svg>
            <path d="M10 10" />
          </svg>
        </div>
      )

      render(<InfoCard icon={complexIcon} title={mockTitle} description={mockDescription} />)

      expect(screen.getByTestId("complex-icon")).toBeInTheDocument()
    })

    it("handles long title text", () => {
      const longTitle = "This is a very long title that might wrap to multiple lines"
      render(<InfoCard icon={mockIcon} title={longTitle} description={mockDescription} />)

      expect(screen.getByText(longTitle)).toBeInTheDocument()
    })

    it("handles long description text", () => {
      const longDescription = "This is a very long description. ".repeat(10).trim()
      render(<InfoCard icon={mockIcon} title={mockTitle} description={longDescription} />)

      expect(screen.getByText((content) => content.includes(longDescription))).toBeInTheDocument()
    })

    it("handles long feature text", () => {
      const longFeatures = [
        "This is a very long feature description that might wrap to multiple lines",
        "Another long feature with lots of text",
      ]

      render(<InfoCard icon={mockIcon} title={mockTitle} description={mockDescription} features={longFeatures} />)

      expect(screen.getByText((content) => content.includes(longFeatures[0]))).toBeInTheDocument()
      expect(screen.getByText((content) => content.includes(longFeatures[1]))).toBeInTheDocument()
    })
  })
})
