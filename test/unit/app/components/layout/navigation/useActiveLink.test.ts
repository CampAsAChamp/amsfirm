import { act, renderHook, waitFor } from "@testing-library/react"
import { beforeEach, describe, expect, it, vi } from "vitest"

import { useActiveLink } from "@/app/components/layout/navigation/useActiveLink"

describe("useActiveLink", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("returns correct initial state", () => {
    const { result } = renderHook(() => useActiveLink("/home"))

    expect(result.current.clickedLink).toBeNull()
    expect(typeof result.current.setClickedLink).toBe("function")
    expect(typeof result.current.getIsActive).toBe("function")
  })

  it("getIsActive returns true for matching pathname", () => {
    const { result } = renderHook(() => useActiveLink("/about"))

    expect(result.current.getIsActive("/about")).toBe(true)
    expect(result.current.getIsActive("/contact")).toBe(false)
  })

  it("getIsActive returns true for clicked link (optimistic state)", () => {
    const { result } = renderHook(() => useActiveLink("/home"))

    act(() => {
      result.current.setClickedLink("/about")
    })

    expect(result.current.getIsActive("/about")).toBe(true)
    expect(result.current.clickedLink).toBe("/about")
  })

  it("clicked link state clears when navigation completes", async () => {
    const { result, rerender } = renderHook(({ pathname }) => useActiveLink(pathname), {
      initialProps: { pathname: "/home" },
    })

    // Click a link
    act(() => {
      result.current.setClickedLink("/about")
    })

    expect(result.current.clickedLink).toBe("/about")
    expect(result.current.getIsActive("/about")).toBe(true)

    // Simulate navigation completing by updating pathname
    rerender({ pathname: "/about" })

    await waitFor(() => {
      expect(result.current.clickedLink).toBeNull()
    })

    // Should still be active based on pathname match
    expect(result.current.getIsActive("/about")).toBe(true)
  })

  it("handles multiple rapid clicks", () => {
    const { result } = renderHook(() => useActiveLink("/home"))

    act(() => {
      result.current.setClickedLink("/about")
    })
    expect(result.current.clickedLink).toBe("/about")

    act(() => {
      result.current.setClickedLink("/services")
    })
    expect(result.current.clickedLink).toBe("/services")

    act(() => {
      result.current.setClickedLink("/contact")
    })
    expect(result.current.clickedLink).toBe("/contact")

    // Only the last clicked link should be active
    expect(result.current.getIsActive("/contact")).toBe(true)
    expect(result.current.getIsActive("/services")).toBe(false)
    expect(result.current.getIsActive("/about")).toBe(false)
  })

  it("handles navigation to different route without clearing clickedLink if not matching", () => {
    const { result, rerender } = renderHook(({ pathname }) => useActiveLink(pathname), {
      initialProps: { pathname: "/home" },
    })

    act(() => {
      result.current.setClickedLink("/about")
    })

    expect(result.current.clickedLink).toBe("/about")

    // Navigate to a different route (not the clicked one)
    rerender({ pathname: "/services" })

    // clickedLink should remain because pathname doesn't match
    expect(result.current.clickedLink).toBe("/about")
  })

  it("getIsActive handles both pathname match and optimistic state simultaneously", () => {
    const { result } = renderHook(() => useActiveLink("/home"))

    // Current page is /home
    expect(result.current.getIsActive("/home")).toBe(true)

    // Click on /about
    act(() => {
      result.current.setClickedLink("/about")
    })

    // Both should be "active" (current page + optimistic state)
    expect(result.current.getIsActive("/home")).toBe(true)
    expect(result.current.getIsActive("/about")).toBe(true)
  })

  it("allows setting clickedLink to null manually", () => {
    const { result } = renderHook(() => useActiveLink("/home"))

    act(() => {
      result.current.setClickedLink("/about")
    })
    expect(result.current.clickedLink).toBe("/about")

    act(() => {
      result.current.setClickedLink(null)
    })
    expect(result.current.clickedLink).toBeNull()
  })

  it("does not clear clickedLink if pathname changes to non-matching route", async () => {
    const { result, rerender } = renderHook(({ pathname }) => useActiveLink(pathname), {
      initialProps: { pathname: "/home" },
    })

    act(() => {
      result.current.setClickedLink("/about")
    })

    // Change pathname to something other than the clicked link
    rerender({ pathname: "/contact" })

    // Give time for useEffect to potentially run
    await new Promise((resolve) => setTimeout(resolve, 100))

    // clickedLink should NOT be cleared
    expect(result.current.clickedLink).toBe("/about")
  })
})
