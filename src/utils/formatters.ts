// Formatting utility functions
// Functions for formatting phone numbers, addresses, and other display values

import { Address } from "@/types"

/**
 * Format a phone number to a standard format
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
