"use client"

import { useEffect, useRef, useState } from "react"

import { formatPhoneInput } from "@/utils"

/**
 * Returns the index in the formatted string where the cursor should be placed
 * so that exactly `digitsBeforeCursor` digits appear before it. Advances past
 * any formatting (e.g. ") ", "-") so the cursor sits where the next digit goes.
 */
function getCursorPositionAfterFormat(formattedValue: string, digitsBeforeCursor: number): number {
  if (digitsBeforeCursor <= 0) return 0
  let digitsSeen = 0
  let i = 0
  for (; i < formattedValue.length; i++) {
    if (/\d/.test(formattedValue[i])) {
      digitsSeen++
      if (digitsSeen >= digitsBeforeCursor) break
    }
  }
  let pos = i + 1
  // Move cursor past closing paren, space, or dash so it's after the formatting
  while (pos < formattedValue.length && !/\d/.test(formattedValue[pos])) {
    pos++
  }
  return pos
}

/**
 * Counts how many digits appear before the given position in the string.
 */
function countDigitsBeforePosition(value: string, position: number): number {
  let count = 0
  for (let i = 0; i < position && i < value.length; i++) {
    if (/\d/.test(value[i])) count++
  }
  return count
}

export interface PhoneInputProps {
  id: string
  name: string
  label: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  required?: boolean
  placeholder?: string
}

const baseInputClasses =
  "w-full px-3 py-2 bg-surface text-body border border-surface-tertiary rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all placeholder:text-placeholder"

export default function PhoneInput({
  id,
  name,
  label,
  value,
  onChange,
  required = false,
  placeholder = "(555) 123-4567",
}: PhoneInputProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [isFocused, setIsFocused] = useState(false)
  const cursorRef = useRef<number | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target
    const rawValue = e.target.value
    const formattedValue = formatPhoneInput(rawValue)
    const currentDigits = value.replace(/\D/g, "")

    // Backspace on a formatting character (space, ") ", "-"): formatting gets re-added
    // and the value stays the same. Treat as "delete the last digit" instead.
    if (formattedValue === value && currentDigits.length > 0 && rawValue.replace(/\D/g, "") === currentDigits) {
      const digitsWithoutLast = currentDigits.slice(0, -1)
      const newValue = formatPhoneInput(digitsWithoutLast)
      cursorRef.current = getCursorPositionAfterFormat(newValue, digitsWithoutLast.length)
      onChange({
        ...e,
        target: { ...e.target, name, value: newValue },
      })
      return
    }

    const digitsBeforeCursor = countDigitsBeforePosition(input.value, input.selectionStart ?? 0)
    cursorRef.current = getCursorPositionAfterFormat(formattedValue, digitsBeforeCursor)
    onChange({
      ...e,
      target: { ...e.target, name, value: formattedValue },
    })
  }

  useEffect(() => {
    if (cursorRef.current === null || !inputRef.current) return
    const pos = cursorRef.current
    cursorRef.current = null
    inputRef.current.setSelectionRange(pos, pos)
  }, [value])

  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-bold text-nav mb-2"
        style={{
          color: isFocused ? "var(--cyan-500)" : "var(--text-nav)",
        }}
      >
        {label} {required && <span className="text-red-600">*</span>}
      </label>
      <input
        ref={inputRef}
        type="tel"
        id={id}
        name={name}
        value={value}
        onChange={handleChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        required={required}
        className={baseInputClasses}
        placeholder={placeholder}
        aria-label={label}
      />
    </div>
  )
}
