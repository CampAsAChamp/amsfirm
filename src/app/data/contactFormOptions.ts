// Contact form dropdown options - single source of truth for form and email display
// Plain objects preserve insertion order (ES2015+), so dropdown order is guaranteed.

export interface ContactFormOption {
  value: string
  label: string
}

/** Subject options: value -> label. Order is preserved for dropdown derivation. */
export const subjectLabelByValue: Record<string, string> = {
  "": "Select a subject",
  wills: "Wills & Testaments",
  trusts: "Trust Planning",
  probate: "Probate & Administration",
  "estate-planning": "Comprehensive Estate Planning",
  general: "General Inquiry",
  other: "Other",
}

/** Preferred contact options: value -> label. Order is preserved for dropdown derivation. */
export const preferredContactLabelByValue: Record<string, string> = {
  "": "Select a contact method",
  email: "Email",
  phone: "Phone",
  either: "Either Email or Phone",
}

function optionsFromMap(map: Record<string, string>): ContactFormOption[] {
  return Object.entries(map).map(([value, label]) => ({ value, label }))
}

/** Derived for form dropdowns; order matches subjectLabelByValue. */
export const subjectOptions: ContactFormOption[] = optionsFromMap(subjectLabelByValue)

/** Derived for form dropdowns; order matches preferredContactLabelByValue. */
export const preferredContactOptions: ContactFormOption[] = optionsFromMap(preferredContactLabelByValue)
