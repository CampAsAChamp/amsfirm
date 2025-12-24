import { describe, it, expect } from "vitest"
import { isValidEmail } from "@/utils/validation"

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
