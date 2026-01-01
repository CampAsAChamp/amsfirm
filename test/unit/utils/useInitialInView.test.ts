import { renderHook } from "@testing-library/react"
import { beforeEach, describe, expect, it, vi } from "vitest"

import { useInitialInView } from "@/utils/useInitialInView"

describe("useInitialInView", () => {
  let mockGetBoundingClientRect: ReturnType<typeof vi.fn>
  let originalInnerHeight: number

  beforeEach(() => {
    // Save original innerHeight
    originalInnerHeight = window.innerHeight

    // Reset mocks
    mockGetBoundingClientRect = vi.fn()
  })

  afterEach(() => {
    // Restore original innerHeight
    Object.defineProperty(window, "innerHeight", {
      writable: true,
      configurable: true,
      value: originalInnerHeight,
    })
  })

  const mockElementPosition = (top: number, bottom: number) => {
    mockGetBoundingClientRect.mockReturnValue({
      top,
      bottom,
      left: 0,
      right: 0,
      width: 100,
      height: Math.abs(bottom - top),
      x: 0,
      y: top,
      toJSON: () => ({}),
    })
  }

  const setViewportHeight = (height: number) => {
    Object.defineProperty(window, "innerHeight", {
      writable: true,
      configurable: true,
      value: height,
    })
  }

  describe("Hook structure", () => {
    it("returns ref and getViewportConfig function", () => {
      const { result } = renderHook(() => useInitialInView())

      expect(result.current).toHaveProperty("ref")
      expect(result.current).toHaveProperty("getViewportConfig")
      expect(typeof result.current.getViewportConfig).toBe("function")
      expect(result.current.ref).toHaveProperty("current")
    })

    it("ref starts as null", () => {
      const { result } = renderHook(() => useInitialInView())

      expect(result.current.ref.current).toBeNull()
    })
  })

  describe("getViewportConfig for elements in viewport", () => {
    it("returns config with 0px margin for element at top of viewport", () => {
      const { result } = renderHook(() => useInitialInView())

      // Mock element at top of viewport
      setViewportHeight(1000)
      mockElementPosition(100, 300)

      // Attach mock to ref
      if (result.current.ref.current) {
        result.current.ref.current.getBoundingClientRect = mockGetBoundingClientRect
      } else {
        // Create a mock element and attach it
        const mockElement = document.createElement("div")
        mockElement.getBoundingClientRect = mockGetBoundingClientRect
        // @ts-expect-error - Assigning mock element to ref
        result.current.ref.current = mockElement
      }

      const config = result.current.getViewportConfig()

      expect(config).toEqual({
        once: true,
        amount: 0.1,
        margin: "0px",
      })
    })

    it("returns config with 0px margin for element in middle of viewport", () => {
      const { result } = renderHook(() => useInitialInView())

      setViewportHeight(1000)
      mockElementPosition(500, 700)

      const mockElement = document.createElement("div")
      mockElement.getBoundingClientRect = mockGetBoundingClientRect
      // @ts-expect-error - Assigning mock element to ref
      result.current.ref.current = mockElement

      const config = result.current.getViewportConfig()

      expect(config).toEqual({
        once: true,
        amount: 0.1,
        margin: "0px",
      })
    })

    it("returns config with 0px margin for element at bottom of viewport", () => {
      const { result } = renderHook(() => useInitialInView())

      setViewportHeight(1000)
      mockElementPosition(950, 1050) // Partially visible at bottom

      const mockElement = document.createElement("div")
      mockElement.getBoundingClientRect = mockGetBoundingClientRect
      // @ts-expect-error - Assigning mock element to ref
      result.current.ref.current = mockElement

      const config = result.current.getViewportConfig()

      expect(config).toEqual({
        once: true,
        amount: 0.1,
        margin: "0px",
      })
    })
  })

  describe("getViewportConfig for elements below viewport", () => {
    it("returns config with -100px margin for element below fold", () => {
      const { result } = renderHook(() => useInitialInView())

      setViewportHeight(1000)
      mockElementPosition(1200, 1400) // Below viewport

      const mockElement = document.createElement("div")
      mockElement.getBoundingClientRect = mockGetBoundingClientRect
      // @ts-expect-error - Assigning mock element to ref
      result.current.ref.current = mockElement

      const config = result.current.getViewportConfig()

      expect(config).toEqual({
        once: true,
        amount: 0.1,
        margin: "-100px",
      })
    })

    it("returns config with -100px margin for element far below viewport", () => {
      const { result } = renderHook(() => useInitialInView())

      setViewportHeight(1000)
      mockElementPosition(3000, 3200) // Far below viewport

      const mockElement = document.createElement("div")
      mockElement.getBoundingClientRect = mockGetBoundingClientRect
      // @ts-expect-error - Assigning mock element to ref
      result.current.ref.current = mockElement

      const config = result.current.getViewportConfig()

      expect(config).toEqual({
        once: true,
        amount: 0.1,
        margin: "-100px",
      })
    })
  })

  describe("Different viewport sizes", () => {
    it("works correctly on mobile viewport (375x667)", () => {
      const { result } = renderHook(() => useInitialInView())

      setViewportHeight(667)

      // Element in viewport
      mockElementPosition(300, 400)
      const mockElement1 = document.createElement("div")
      mockElement1.getBoundingClientRect = mockGetBoundingClientRect
      // @ts-expect-error - Assigning mock element to ref
      result.current.ref.current = mockElement1

      const config1 = result.current.getViewportConfig()
      expect(config1.margin).toBe("0px")

      // Element below viewport
      mockElementPosition(800, 900)
      const mockElement2 = document.createElement("div")
      mockElement2.getBoundingClientRect = mockGetBoundingClientRect
      // @ts-expect-error - Assigning mock element to ref
      result.current.ref.current = mockElement2

      const config2 = result.current.getViewportConfig()
      expect(config2.margin).toBe("-100px")
    })

    it("works correctly on tablet viewport (768x1024)", () => {
      const { result } = renderHook(() => useInitialInView())

      setViewportHeight(1024)

      // Element in viewport
      mockElementPosition(500, 700)
      const mockElement1 = document.createElement("div")
      mockElement1.getBoundingClientRect = mockGetBoundingClientRect
      // @ts-expect-error - Assigning mock element to ref
      result.current.ref.current = mockElement1

      const config1 = result.current.getViewportConfig()
      expect(config1.margin).toBe("0px")

      // Element below viewport
      mockElementPosition(1200, 1400)
      const mockElement2 = document.createElement("div")
      mockElement2.getBoundingClientRect = mockGetBoundingClientRect
      // @ts-expect-error - Assigning mock element to ref
      result.current.ref.current = mockElement2

      const config2 = result.current.getViewportConfig()
      expect(config2.margin).toBe("-100px")
    })

    it("works correctly on desktop viewport (1920x1080)", () => {
      const { result } = renderHook(() => useInitialInView())

      setViewportHeight(1080)

      // Element in viewport
      mockElementPosition(800, 1000)
      const mockElement1 = document.createElement("div")
      mockElement1.getBoundingClientRect = mockGetBoundingClientRect
      // @ts-expect-error - Assigning mock element to ref
      result.current.ref.current = mockElement1

      const config1 = result.current.getViewportConfig()
      expect(config1.margin).toBe("0px")

      // Element below viewport
      mockElementPosition(1500, 1700)
      const mockElement2 = document.createElement("div")
      mockElement2.getBoundingClientRect = mockGetBoundingClientRect
      // @ts-expect-error - Assigning mock element to ref
      result.current.ref.current = mockElement2

      const config2 = result.current.getViewportConfig()
      expect(config2.margin).toBe("-100px")
    })
  })

  describe("Edge cases", () => {
    it("returns default config when ref is not attached", () => {
      const { result } = renderHook(() => useInitialInView())

      // Don't attach ref
      const config = result.current.getViewportConfig()

      expect(config).toEqual({
        once: true,
        amount: 0.3,
      })
    })

    it("handles element at exact viewport boundary (top = windowHeight)", () => {
      const { result } = renderHook(() => useInitialInView())

      setViewportHeight(1000)
      mockElementPosition(1000, 1200) // Top exactly at viewport height

      const mockElement = document.createElement("div")
      mockElement.getBoundingClientRect = mockGetBoundingClientRect
      // @ts-expect-error - Assigning mock element to ref
      result.current.ref.current = mockElement

      const config = result.current.getViewportConfig()

      // Should be treated as below viewport
      expect(config.margin).toBe("-100px")
    })

    it("handles element partially visible at bottom (bottom > windowHeight)", () => {
      const { result } = renderHook(() => useInitialInView())

      setViewportHeight(1000)
      mockElementPosition(900, 1100) // Partially visible

      const mockElement = document.createElement("div")
      mockElement.getBoundingClientRect = mockGetBoundingClientRect
      // @ts-expect-error - Assigning mock element to ref
      result.current.ref.current = mockElement

      const config = result.current.getViewportConfig()

      // Should be treated as in viewport
      expect(config.margin).toBe("0px")
    })

    it("handles element above viewport (negative top)", () => {
      const { result } = renderHook(() => useInitialInView())

      setViewportHeight(1000)
      mockElementPosition(-200, -100) // Above viewport (scrolled past)

      const mockElement = document.createElement("div")
      mockElement.getBoundingClientRect = mockGetBoundingClientRect
      // @ts-expect-error - Assigning mock element to ref
      result.current.ref.current = mockElement

      const config = result.current.getViewportConfig()

      // Element not in viewport (bottom <= 0)
      expect(config.margin).toBe("-100px")
    })

    it("handles very tall element spanning entire viewport", () => {
      const { result } = renderHook(() => useInitialInView())

      setViewportHeight(1000)
      mockElementPosition(-500, 1500) // Very tall element

      const mockElement = document.createElement("div")
      mockElement.getBoundingClientRect = mockGetBoundingClientRect
      // @ts-expect-error - Assigning mock element to ref
      result.current.ref.current = mockElement

      const config = result.current.getViewportConfig()

      // Should be treated as in viewport (top < windowHeight && bottom > 0)
      expect(config.margin).toBe("0px")
    })
  })

  describe("Config properties", () => {
    it("always returns once: true", () => {
      const { result } = renderHook(() => useInitialInView())

      setViewportHeight(1000)
      mockElementPosition(100, 300)

      const mockElement = document.createElement("div")
      mockElement.getBoundingClientRect = mockGetBoundingClientRect
      // @ts-expect-error - Assigning mock element to ref
      result.current.ref.current = mockElement

      const config = result.current.getViewportConfig()

      expect(config.once).toBe(true)
    })

    it("always returns amount: 0.1 when ref is attached", () => {
      const { result } = renderHook(() => useInitialInView())

      setViewportHeight(1000)

      // Test in viewport
      mockElementPosition(100, 300)
      const mockElement1 = document.createElement("div")
      mockElement1.getBoundingClientRect = mockGetBoundingClientRect
      // @ts-expect-error - Assigning mock element to ref
      result.current.ref.current = mockElement1

      const config1 = result.current.getViewportConfig()
      expect(config1.amount).toBe(0.1)

      // Test below viewport
      mockElementPosition(1200, 1400)
      const mockElement2 = document.createElement("div")
      mockElement2.getBoundingClientRect = mockGetBoundingClientRect
      // @ts-expect-error - Assigning mock element to ref
      result.current.ref.current = mockElement2

      const config2 = result.current.getViewportConfig()
      expect(config2.amount).toBe(0.1)
    })
  })
})
