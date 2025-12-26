import { render, screen } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"

import AnimatedContainer from "@/app/components/common/AnimatedContainer"

interface MockMotionDivProps {
  children: React.ReactNode
  className?: string
  variants?: object
  initial?: string
  animate?: string
  whileInView?: string
  viewport?: object
  transition?: object
}

// Mock framer-motion
vi.mock("framer-motion", () => ({
  motion: {
    div: ({
      children,
      className,
      variants,
      initial,
      animate,
      whileInView,
      viewport,
      transition,
    }: MockMotionDivProps) => (
      <div
        className={className}
        data-variants={JSON.stringify(variants)}
        data-initial={initial}
        data-animate={animate}
        data-while-in-view={whileInView}
        data-viewport={JSON.stringify(viewport)}
        data-transition={JSON.stringify(transition)}
      >
        {children}
      </div>
    ),
  },
}))

describe("AnimatedContainer", () => {
  it("renders children", () => {
    render(
      <AnimatedContainer>
        <div>Test Content</div>
      </AnimatedContainer>
    )

    expect(screen.getByText("Test Content")).toBeInTheDocument()
  })

  it("applies default card className", () => {
    const { container } = render(
      <AnimatedContainer>
        <div>Test</div>
      </AnimatedContainer>
    )

    const motionDiv = container.firstChild as HTMLElement
    expect(motionDiv).toHaveClass("card")
  })

  it("applies custom className", () => {
    const { container } = render(
      <AnimatedContainer className="custom-class">
        <div>Test</div>
      </AnimatedContainer>
    )

    const motionDiv = container.firstChild as HTMLElement
    expect(motionDiv).toHaveClass("custom-class")
  })

  it("uses whileInView by default (animateOnMount=false)", () => {
    const { container } = render(
      <AnimatedContainer>
        <div>Test</div>
      </AnimatedContainer>
    )

    const motionDiv = container.firstChild as HTMLElement
    expect(motionDiv.getAttribute("data-while-in-view")).toBe("animate")
    expect(motionDiv.getAttribute("data-animate")).toBeNull()
  })

  it("uses animate when animateOnMount=true", () => {
    const { container } = render(
      <AnimatedContainer animateOnMount={true}>
        <div>Test</div>
      </AnimatedContainer>
    )

    const motionDiv = container.firstChild as HTMLElement
    expect(motionDiv.getAttribute("data-animate")).toBe("animate")
    expect(motionDiv.getAttribute("data-while-in-view")).toBeNull()
  })

  it("applies default delay of 0", () => {
    const { container } = render(
      <AnimatedContainer>
        <div>Test</div>
      </AnimatedContainer>
    )

    const motionDiv = container.firstChild as HTMLElement
    const transition = JSON.parse(motionDiv.getAttribute("data-transition") || "{}")
    expect(transition.delay).toBe(0)
  })

  it("applies custom delay", () => {
    const { container } = render(
      <AnimatedContainer delay={0.5}>
        <div>Test</div>
      </AnimatedContainer>
    )

    const motionDiv = container.firstChild as HTMLElement
    const transition = JSON.parse(motionDiv.getAttribute("data-transition") || "{}")
    expect(transition.delay).toBe(0.5)
  })

  it("sets viewport configuration for scroll-based animation", () => {
    const { container } = render(
      <AnimatedContainer>
        <div>Test</div>
      </AnimatedContainer>
    )

    const motionDiv = container.firstChild as HTMLElement
    const viewport = JSON.parse(motionDiv.getAttribute("data-viewport") || "{}")
    expect(viewport.once).toBe(true)
    expect(viewport.amount).toBe(0.1)
  })

  it("uses spring transition", () => {
    const { container } = render(
      <AnimatedContainer>
        <div>Test</div>
      </AnimatedContainer>
    )

    const motionDiv = container.firstChild as HTMLElement
    const transition = JSON.parse(motionDiv.getAttribute("data-transition") || "{}")
    expect(transition.type).toBe("spring")
    expect(transition.stiffness).toBe(200)
    expect(transition.damping).toBe(20)
  })

  it("renders nested motion.div for content", () => {
    const { container } = render(
      <AnimatedContainer>
        <div data-testid="content">Test</div>
      </AnimatedContainer>
    )

    // Should have nested structure
    const outerMotion = container.firstChild as HTMLElement
    const innerMotion = outerMotion.firstChild as HTMLElement
    expect(innerMotion).toBeInTheDocument()
    expect(screen.getByTestId("content")).toBeInTheDocument()
  })
})
