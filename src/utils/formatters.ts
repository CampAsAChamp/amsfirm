// Formatting utility functions
// Functions for formatting phone numbers, addresses, and other display values

import { Address } from "@/types"

/**
 * Format a phone number to a standard format (for display of complete numbers)
 * @param phone - The phone number to format
 * @returns Formatted phone number
 */
export function formatPhoneNumber(phone: string): string {
  const cleaned = phone.replace(/\D/g, "")
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`
  }
  return phone
}

/**
 * Format phone input as the user types: (XXX) XXX-XXXX or +1 (XXX) XXX-XXXX.
 * Closes paren after 3 digits, adds dash after 6 digits. Optional leading 1 becomes +1.
 * @param value - Current input value (may include digits and existing formatting)
 * @returns Formatted string for display
 */
export function formatPhoneInput(value: string): string {
  const digits = value.replace(/\D/g, "")
  const hasCountryCode = digits.length > 0 && digits[0] === "1"
  const work = hasCountryCode ? digits.slice(1, 11) : digits.slice(0, 10)
  const prefix = hasCountryCode ? "+1 " : ""

  if (work.length === 0) return prefix

  if (work.length <= 3) {
    return prefix + "(" + work + (work.length === 3 ? ") " : "")
  }
  if (work.length <= 6) {
    return prefix + "(" + work.slice(0, 3) + ") " + work.slice(3) + (work.length === 6 ? "-" : "")
  }
  return prefix + "(" + work.slice(0, 3) + ") " + work.slice(3, 6) + "-" + work.slice(6)
}

/**
 * Format an address as a single line
 * @param address - Address object
 * @returns Formatted single-line address
 */
export function formatAddressSingleLine(address: Address): string {
  return `${address.street}, ${address.suite}, ${address.city}, ${address.state} ${address.zip}`
}

/**
 * Format an address as multiple lines
 * @param address - Address object
 * @returns Array of address lines
 */
export function formatAddressMultiLine(address: Address): string[] {
  return [address.street, address.suite, `${address.city}, ${address.state} ${address.zip}`]
}
