---
name: add-page
description: Add a new page/route to the AMS Law site. Use when creating a new route, page, or adding a page to navigation and sitemap.
---

# Add a Page

## Checklist

1. Create route folder: `src/app/(pages)/[route]/page.tsx`
2. Export `metadata` (title + description)
3. Compose from existing sections: `HeroSection`, `CallToAction`, domain components
4. Add nav link in `src/app/data/navigation.tsx` if the page should appear in the header
5. Add URL entry in `src/app/sitemap.ts`
6. Update `README.md` Site Structure section
7. Add unit tests in `test/unit/` mirroring the new files
8. Consider E2E coverage in `test/e2e/` for critical user flows

## Page template

```tsx
import type { Metadata } from "next"

import HeroSection from "@/app/components/hero/HeroSection"
import CallToAction from "@/app/components/sections/CallToAction"

export const metadata: Metadata = {
  title: "Page Title | Anna M Schneider Law",
  description: "Descriptive summary for search engines.",
}

export default function PageName() {
  return (
    <div className="bg-page">
      <HeroSection title="Page Title" subtitle="Supporting subtitle." primaryButtonText="Contact" primaryButtonLink="/contact" />
      {/* Page-specific sections */}
      <CallToAction title="Ready to Get Started?" subtitle="Schedule a consultation today." buttonText="Contact" buttonLink="/contact" />
    </div>
  )
}
```

## Navigation entry

In `src/app/data/navigation.tsx`:

```tsx
{ href: "/your-route", label: "Your Label" }
```

Contact uses `isButton: true` — only the CTA button should have that flag.

## Sitemap entry

In `src/app/sitemap.ts`:

```tsx
{
  url: `${baseUrl}/your-route`,
  lastModified: new Date(),
  changeFrequency: "monthly",
  priority: 0.7,
}
```

## Conventions

- Use `bg-page` on the page wrapper
- Never hardcode colors — use utility classes from `globals.css`
- Page-specific components stay in the route folder; shared ones go in `src/app/components/`
- Use `@/` imports only
