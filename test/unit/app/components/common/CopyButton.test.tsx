import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"

import CopyButton from "@/app/components/common/CopyButton"

describe("CopyButton", () => {
  beforeEach(() => {
    vi.spyOn(console, "error").mockImplementation(() => {})
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it("renders button with correct initial state", () => {
    render(<CopyButton textToCopy="test text" />)

    const button = screen.getByRole("button")
    expect(button).toBeInTheDocument()
    expect(button).toHaveAttribute("title", "Copy")
  })

  it("renders with custom label", () => {
    render(<CopyButton textToCopy="test text" label="Copy Address" />)

    const button = screen.getByRole("button")
    expect(button).toHaveAttribute("title", "Copy Address")
    expect(button).toHaveAttribute("aria-label", "Copy Address")
  })

  it("applies custom className", () => {
    render(<CopyButton textToCopy="test text" className="custom-class" />)

    const button = screen.getByRole("button")
    expect(button).toHaveClass("custom-class")
  })

  it("displays copy icon initially", () => {
    const { container } = render(<CopyButton textToCopy="test text" />)

    // Check for copy icon SVG
    const copyIcon = container.querySelector('svg[viewBox="0 0 24 24"]')
    expect(copyIcon).toBeInTheDocument()
  })

  it("shows copied state after successful copy", async () => {
    const user = userEvent.setup()

    render(<CopyButton textToCopy="test text" />)

    const button = screen.getByRole("button")
    await user.click(button)

    await waitFor(() => {
      expect(button).toHaveAttribute("title", "Copied!")
    })
  })

  it("has correct accessibility attributes", () => {
    render(<CopyButton textToCopy="test text" label="Copy Email" />)

    const button = screen.getByRole("button")
    expect(button).toHaveAttribute("aria-label", "Copy Email")
  })

  it("applies base styling classes", () => {
    render(<CopyButton textToCopy="test text" />)

    const button = screen.getByRole("button")
    expect(button).toHaveClass("transition-colors")
    expect(button).toHaveClass("p-1")
    expect(button).toHaveClass("cursor-pointer")
  })
})
