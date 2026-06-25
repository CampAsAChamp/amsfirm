---
name: add-component
description: Add a reusable React component to the AMS Law site. Use when creating new UI components, sections, or shared widgets.
---

# Add a Component

## Choose location

| Type                | Location                                            |
| ------------------- | --------------------------------------------------- |
| Shared across pages | `src/app/components/{common,hero,layout,sections}/` |
| Page-specific only  | `src/app/(pages)/[route]/ComponentName.tsx`         |
| Static content/data | `src/app/data/`                                     |

## Checklist

1. Create component file (PascalCase filename)
2. Add `"use client"` if using hooks, handlers, or browser APIs
3. Export from folder's `index.ts` barrel if shared
4. Use CSS variable utility classes — never hardcode colors
5. Follow WCAG AA (semantic HTML, ARIA, keyboard focus)
6. Add unit test at `test/unit/` mirroring the source path
7. Extract animation config to co-located `animationConfig.ts` if using Framer Motion

## Component template

```tsx
"use client" // only if needed

interface MyComponentProps {
  title: string
}

export default function MyComponent({ title }: MyComponentProps) {
  return (
    <section className="bg-surface-secondary py-16">
      <h2 className="text-heading text-2xl font-bold">{title}</h2>
      <p className="text-body mt-4">Content here.</p>
    </section>
  )
}
```

## Barrel export

In the folder's `index.ts`:

```tsx
export { default as MyComponent } from "./MyComponent"
```

## Imports

```tsx
// or from barrel:
import { MyComponent } from "@/app/components/sections"
import MyComponent from "@/app/components/sections/MyComponent"
```

## Testing

Mirror path: `test/unit/app/components/sections/MyComponent.test.tsx`

- Use `getByRole`, `getByLabelText`
- Mock `ThemeProvider` if component uses theme
- Mock `next/navigation` if component uses routing hooks
