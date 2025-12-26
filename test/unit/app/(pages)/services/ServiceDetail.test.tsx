import { render, screen } from "@testing-library/react"
import { FileText } from "lucide-react"
import { describe, expect, it, vi } from "vitest"

import ServiceDetail from "@/app/(pages)/services/ServiceDetail"

// Mock AnimatedContainer
vi.mock("@/app/components/common", () => ({
  AnimatedContainer: ({
    children,
    delay,
    animateOnMount,
  }: {
    children: React.ReactNode
    delay?: number
    animateOnMount?: boolean
  }) => (
    <div data-testid="animated-container" data-delay={delay} data-animate-on-mount={animateOnMount}>
      {children}
    </div>
  ),
}))

describe("ServiceDetail", () => {
  const mockIcon = <FileText data-testid="mock-icon" />
  const mockTitle = "Estate Planning"
  const mockDescription = "Comprehensive planning to protect your assets"

  describe("Basic rendering", () => {
    it("renders icon, title, and description", () => {
      const mockSections = [
        {
          heading: "Services",
          items: ["Item 1", "Item 2"],
        },
      ]

      render(<ServiceDetail icon={mockIcon} title={mockTitle} description={mockDescription} sections={mockSections} />)

      expect(screen.getByTestId("mock-icon")).toBeInTheDocument()
      expect(screen.getByText(mockTitle)).toBeInTheDocument()
      expect(screen.getByText(mockDescription)).toBeInTheDocument()
    })

    it("wraps content in AnimatedContainer", () => {
      const mockSections = [{ items: ["Item 1"] }]

      const { container } = render(
        <ServiceDetail icon={mockIcon} title={mockTitle} description={mockDescription} sections={mockSections} />
      )

      expect(container.querySelector('[data-testid="animated-container"]')).toBeInTheDocument()
    })

    it("passes animateOnMount as false by default", () => {
      const mockSections = [{ items: ["Item 1"] }]

      const { container } = render(
        <ServiceDetail icon={mockIcon} title={mockTitle} description={mockDescription} sections={mockSections} />
      )

      const animatedContainer = container.querySelector('[data-testid="animated-container"]')
      expect(animatedContainer).toHaveAttribute("data-animate-on-mount", "false")
    })

    it("passes animateOnMount as true when explicitly set", () => {
      const mockSections = [{ items: ["Item 1"] }]

      const { container } = render(
        <ServiceDetail
          icon={mockIcon}
          title={mockTitle}
          description={mockDescription}
          sections={mockSections}
          animateOnMount={true}
        />
      )

      const animatedContainer = container.querySelector('[data-testid="animated-container"]')
      expect(animatedContainer).toHaveAttribute("data-animate-on-mount", "true")
    })

    it("applies default delay of 0", () => {
      const mockSections = [{ items: ["Item 1"] }]

      const { container } = render(
        <ServiceDetail icon={mockIcon} title={mockTitle} description={mockDescription} sections={mockSections} />
      )

      const animatedContainer = container.querySelector('[data-testid="animated-container"]')
      expect(animatedContainer).toHaveAttribute("data-delay", "0")
    })

    it("applies custom delay when provided", () => {
      const mockSections = [{ items: ["Item 1"] }]

      const { container } = render(
        <ServiceDetail
          icon={mockIcon}
          title={mockTitle}
          description={mockDescription}
          sections={mockSections}
          delay={0.5}
        />
      )

      const animatedContainer = container.querySelector('[data-testid="animated-container"]')
      expect(animatedContainer).toHaveAttribute("data-delay", "0.5")
    })
  })

  describe("Styling", () => {
    it("applies correct styling to icon", () => {
      const mockSections = [{ items: ["Item 1"] }]

      const { container } = render(
        <ServiceDetail icon={mockIcon} title={mockTitle} description={mockDescription} sections={mockSections} />
      )

      const iconWrapper = container.querySelector('[class*="text-primary-hover"]')
      expect(iconWrapper).toBeInTheDocument()
      expect(iconWrapper).toHaveClass("mb-6")
    })

    it("applies correct styling to title", () => {
      const mockSections = [{ items: ["Item 1"] }]

      render(<ServiceDetail icon={mockIcon} title={mockTitle} description={mockDescription} sections={mockSections} />)

      const title = screen.getByRole("heading", { level: 2 })
      expect(title).toHaveClass("text-2xl")
      expect(title).toHaveClass("font-bold")
      expect(title).toHaveClass("text-heading")
      expect(title).toHaveClass("mb-4")
    })

    it("applies correct styling to description", () => {
      const mockSections = [{ items: ["Item 1"] }]

      render(<ServiceDetail icon={mockIcon} title={mockTitle} description={mockDescription} sections={mockSections} />)

      const description = screen.getByText(mockDescription)
      expect(description).toHaveClass("text-body")
      expect(description).toHaveClass("mb-6")
    })
  })

  describe("Sections with single item", () => {
    it("renders single item as paragraph", () => {
      const mockSections = [
        {
          heading: "Overview",
          items: ["This is a single item paragraph."],
        },
      ]

      render(<ServiceDetail icon={mockIcon} title={mockTitle} description={mockDescription} sections={mockSections} />)

      const paragraph = screen.getByText("This is a single item paragraph.")
      expect(paragraph.tagName).toBe("P")
      expect(paragraph).toHaveClass("text-body")
    })

    it("renders single item without heading", () => {
      const mockSections = [
        {
          items: ["Single item without heading"],
        },
      ]

      render(<ServiceDetail icon={mockIcon} title={mockTitle} description={mockDescription} sections={mockSections} />)

      expect(screen.getByText("Single item without heading")).toBeInTheDocument()
      expect(screen.queryByRole("heading", { level: 3 })).not.toBeInTheDocument()
    })
  })

  describe("Sections with multiple items", () => {
    it("renders multiple items as list", () => {
      const mockSections = [
        {
          heading: "Services",
          items: ["Living Trusts", "Pour-Over Wills", "Healthcare Directives"],
        },
      ]

      const { container } = render(
        <ServiceDetail icon={mockIcon} title={mockTitle} description={mockDescription} sections={mockSections} />
      )

      const list = container.querySelector("ul")
      expect(list).toBeInTheDocument()
      expect(list).toHaveClass("text-body")
      expect(list).toHaveClass("space-y-2")

      const listItems = container.querySelectorAll("li")
      expect(listItems).toHaveLength(3)
    })

    it("renders list items with bullet points", () => {
      const mockSections = [
        {
          items: ["Item 1", "Item 2", "Item 3"],
        },
      ]

      render(<ServiceDetail icon={mockIcon} title={mockTitle} description={mockDescription} sections={mockSections} />)

      expect(screen.getByText((content) => content.includes("• Item 1"))).toBeInTheDocument()
      expect(screen.getByText((content) => content.includes("• Item 2"))).toBeInTheDocument()
      expect(screen.getByText((content) => content.includes("• Item 3"))).toBeInTheDocument()
    })
  })

  describe("Section headings", () => {
    it("renders section heading when provided", () => {
      const mockSections = [
        {
          heading: "Key Features",
          items: ["Feature 1", "Feature 2"],
        },
      ]

      render(<ServiceDetail icon={mockIcon} title={mockTitle} description={mockDescription} sections={mockSections} />)

      const heading = screen.getByRole("heading", { level: 3, name: "Key Features" })
      expect(heading).toBeInTheDocument()
      expect(heading).toHaveClass("text-lg")
      expect(heading).toHaveClass("font-semibold")
      expect(heading).toHaveClass("text-heading")
      expect(heading).toHaveClass("mb-3")
    })

    it("does not render section heading when not provided", () => {
      const mockSections = [
        {
          items: ["Item 1", "Item 2"],
        },
      ]

      render(<ServiceDetail icon={mockIcon} title={mockTitle} description={mockDescription} sections={mockSections} />)

      const headings = screen.queryAllByRole("heading", { level: 3 })
      expect(headings).toHaveLength(0)
    })
  })

  describe("Multiple sections", () => {
    it("renders multiple sections correctly", () => {
      const mockSections = [
        {
          heading: "Section 1",
          items: ["Item 1A", "Item 1B"],
        },
        {
          heading: "Section 2",
          items: ["Item 2A", "Item 2B", "Item 2C"],
        },
        {
          heading: "Section 3",
          items: ["Single item"],
        },
      ]

      render(<ServiceDetail icon={mockIcon} title={mockTitle} description={mockDescription} sections={mockSections} />)

      expect(screen.getByText("Section 1")).toBeInTheDocument()
      expect(screen.getByText("Section 2")).toBeInTheDocument()
      expect(screen.getByText("Section 3")).toBeInTheDocument()

      expect(screen.getByText((content) => content.includes("Item 1A"))).toBeInTheDocument()
      expect(screen.getByText((content) => content.includes("Item 2B"))).toBeInTheDocument()
      expect(screen.getByText("Single item")).toBeInTheDocument()
    })

    it("applies mb-6 to each section", () => {
      const mockSections = [
        {
          heading: "Section 1",
          items: ["Item 1"],
        },
        {
          heading: "Section 2",
          items: ["Item 2"],
        },
      ]

      const { container } = render(
        <ServiceDetail icon={mockIcon} title={mockTitle} description={mockDescription} sections={mockSections} />
      )

      const sectionDivs = container.querySelectorAll('[class*="mb-6"]')
      // Should have at least the sections with mb-6
      expect(sectionDivs.length).toBeGreaterThanOrEqual(2)
    })
  })

  describe("React nodes as items", () => {
    it("renders React nodes in list items", () => {
      const mockSections = [
        {
          heading: "Features",
          items: [
            "Plain text item",
            <span key="custom" data-testid="custom-item">
              Custom React Node
            </span>,
            "Another plain text",
          ],
        },
      ]

      render(<ServiceDetail icon={mockIcon} title={mockTitle} description={mockDescription} sections={mockSections} />)

      expect(screen.getByText((content) => content.includes("Plain text item"))).toBeInTheDocument()
      expect(screen.getByTestId("custom-item")).toBeInTheDocument()
      expect(screen.getByText("Custom React Node")).toBeInTheDocument()
    })

    it("renders React node as single item paragraph", () => {
      const mockSections = [
        {
          heading: "Description",
          items: [
            <div key="custom" data-testid="custom-paragraph">
              Custom paragraph content
            </div>,
          ],
        },
      ]

      render(<ServiceDetail icon={mockIcon} title={mockTitle} description={mockDescription} sections={mockSections} />)

      expect(screen.getByTestId("custom-paragraph")).toBeInTheDocument()
      expect(screen.getByText("Custom paragraph content")).toBeInTheDocument()
    })
  })

  describe("Edge cases", () => {
    it("handles empty sections array", () => {
      const mockSections: Array<{ heading?: string; items: (string | React.ReactNode)[] }> = []

      render(<ServiceDetail icon={mockIcon} title={mockTitle} description={mockDescription} sections={mockSections} />)

      expect(screen.getByText(mockTitle)).toBeInTheDocument()
      expect(screen.getByText(mockDescription)).toBeInTheDocument()
    })

    it("handles section with empty items array", () => {
      const mockSections = [
        {
          heading: "Empty Section",
          items: [],
        },
      ]

      render(<ServiceDetail icon={mockIcon} title={mockTitle} description={mockDescription} sections={mockSections} />)

      expect(screen.getByText("Empty Section")).toBeInTheDocument()
      // Should not render list or paragraph for empty items
    })

    it("handles long title", () => {
      const longTitle = "This is a very long title that might wrap to multiple lines in the UI"

      const mockSections = [{ items: ["Item"] }]

      render(<ServiceDetail icon={mockIcon} title={longTitle} description={mockDescription} sections={mockSections} />)

      expect(screen.getByText(longTitle)).toBeInTheDocument()
    })

    it("handles long description", () => {
      const longDescription = "This is a very long description. ".repeat(20).trim()

      const mockSections = [{ items: ["Item"] }]

      render(<ServiceDetail icon={mockIcon} title={mockTitle} description={longDescription} sections={mockSections} />)

      expect(screen.getByText((content) => content.includes(longDescription))).toBeInTheDocument()
    })

    it("handles complex icon", () => {
      const complexIcon = (
        <div data-testid="complex-icon">
          <svg>
            <circle cx="10" cy="10" r="5" />
          </svg>
        </div>
      )

      const mockSections = [{ items: ["Item"] }]

      render(
        <ServiceDetail icon={complexIcon} title={mockTitle} description={mockDescription} sections={mockSections} />
      )

      expect(screen.getByTestId("complex-icon")).toBeInTheDocument()
    })
  })
})
