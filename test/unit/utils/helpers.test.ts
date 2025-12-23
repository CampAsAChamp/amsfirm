import { describe, it, expect } from "vitest"
import { formatPhoneNumber, isValidEmail, formatAddressSingleLine, formatAddressMultiLine } from "@/utils/helpers"
import { Address } from "@/types"

describe("formatPhoneNumber", () => {
  it("formats a 10-digit phone number correctly", () => {
    expect(formatPhoneNumber("1234567890")).toBe("(123) 456-7890")
  })

  it("formats a phone number with existing formatting", () => {
    expect(formatPhoneNumber("(123) 456-7890")).toBe("(123) 456-7890")
  })

  it("formats a phone number with dashes", () => {
    expect(formatPhoneNumber("123-456-7890")).toBe("(123) 456-7890")
  })

  it("formats a phone number with spaces", () => {
    expect(formatPhoneNumber("123 456 7890")).toBe("(123) 456-7890")
  })

  it("formats a phone number with mixed characters", () => {
    expect(formatPhoneNumber("(123)-456.7890")).toBe("(123) 456-7890")
  })

  it("returns original input for invalid phone numbers (too short)", () => {
    expect(formatPhoneNumber("123")).toBe("123")
  })

  it("returns original input for invalid phone numbers (too long)", () => {
    expect(formatPhoneNumber("12345678901234")).toBe("12345678901234")
  })

  it("handles empty string", () => {
    expect(formatPhoneNumber("")).toBe("")
  })

  it("handles phone number with letters (returns as-is)", () => {
    // Letters are not converted to numbers, returned as-is
    expect(formatPhoneNumber("1-800-LAWYER")).toBe("1-800-LAWYER")
  })

  it("handles partial phone numbers", () => {
    expect(formatPhoneNumber("12345")).toBe("12345")
  })
})

describe("isValidEmail", () => {
  it("validates a correct email address", () => {
    expect(isValidEmail("test@example.com")).toBe(true)
  })

  it("validates email with subdomain", () => {
    expect(isValidEmail("test@mail.example.com")).toBe(true)
  })

  it("validates email with plus sign", () => {
    expect(isValidEmail("test+tag@example.com")).toBe(true)
  })

  it("validates email with numbers", () => {
    expect(isValidEmail("test123@example.com")).toBe(true)
  })

  it("validates email with hyphens", () => {
    expect(isValidEmail("test-user@example.com")).toBe(true)
  })

  it("validates email with underscores", () => {
    expect(isValidEmail("test_user@example.com")).toBe(true)
  })

  it("rejects email without @", () => {
    expect(isValidEmail("testexample.com")).toBe(false)
  })

  it("rejects email without domain", () => {
    expect(isValidEmail("test@")).toBe(false)
  })

  it("rejects email without local part", () => {
    expect(isValidEmail("@example.com")).toBe(false)
  })

  it("rejects email without TLD", () => {
    expect(isValidEmail("test@example")).toBe(false)
  })

  it("rejects email with spaces", () => {
    expect(isValidEmail("test user@example.com")).toBe(false)
  })

  it("rejects empty string", () => {
    expect(isValidEmail("")).toBe(false)
  })

  it("rejects email with multiple @", () => {
    expect(isValidEmail("test@@example.com")).toBe(false)
  })
})

describe("formatAddressSingleLine", () => {
  const mockAddress: Address = {
    street: "123 Main St",
    suite: "Suite 100",
    city: "San Francisco",
    state: "CA",
    zip: "94102",
  }

  it("formats a complete address as single line", () => {
    expect(formatAddressSingleLine(mockAddress)).toBe("123 Main St, Suite 100, San Francisco, CA 94102")
  })

  it("handles address without suite", () => {
    const addressWithoutSuite: Address = {
      ...mockAddress,
      suite: "",
    }
    expect(formatAddressSingleLine(addressWithoutSuite)).toBe("123 Main St, , San Francisco, CA 94102")
  })

  it("handles address with different state", () => {
    const nyAddress: Address = {
      street: "456 Broadway",
      suite: "Apt 2B",
      city: "New York",
      state: "NY",
      zip: "10013",
    }
    expect(formatAddressSingleLine(nyAddress)).toBe("456 Broadway, Apt 2B, New York, NY 10013")
  })
})

describe("formatAddressMultiLine", () => {
  const mockAddress: Address = {
    street: "123 Main St",
    suite: "Suite 100",
    city: "San Francisco",
    state: "CA",
    zip: "94102",
  }

  it("formats a complete address as multiple lines", () => {
    const result = formatAddressMultiLine(mockAddress)
    expect(result).toHaveLength(3)
    expect(result[0]).toBe("123 Main St")
    expect(result[1]).toBe("Suite 100")
    expect(result[2]).toBe("San Francisco, CA 94102")
  })

  it("includes empty suite in array", () => {
    const addressWithoutSuite: Address = {
      ...mockAddress,
      suite: "",
    }
    const result = formatAddressMultiLine(addressWithoutSuite)
    expect(result).toHaveLength(3)
    expect(result[0]).toBe("123 Main St")
    expect(result[1]).toBe("")
    expect(result[2]).toBe("San Francisco, CA 94102")
  })

  it("handles different addresses correctly", () => {
    const nyAddress: Address = {
      street: "456 Broadway",
      suite: "Floor 3",
      city: "New York",
      state: "NY",
      zip: "10013",
    }
    const result = formatAddressMultiLine(nyAddress)
    expect(result[0]).toBe("456 Broadway")
    expect(result[1]).toBe("Floor 3")
    expect(result[2]).toBe("New York, NY 10013")
  })
})
