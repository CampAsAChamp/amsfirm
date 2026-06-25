# CLAUDE.md — AMS Law Firm

This file is read automatically by Claude Code at the start of every session.

## Project Overview

Next.js 15 + React 19 website for Anna M. Schneider Law, deployed on Cloudflare Workers via OpenNext. Uses Tailwind CSS v4, TypeScript, Vitest for unit tests, Playwright for E2E, and Resend for email.

**Package manager:** Yarn 4 (`yarn` not `npm`)
**Node:** ≥22 (enforced by `scripts/check-node-version.mjs`)

## Key Commands

```bash
yarn dev          # start dev server
yarn build        # Next.js build
yarn test         # Vitest unit tests (--run)
yarn test:watch   # Vitest watch mode
yarn test:e2e     # Playwright E2E
yarn lint         # ESLint + Prettier check
yarn lint:fix     # ESLint --fix + Prettier write
yarn format       # Prettier write
yarn deploy       # OpenNext Cloudflare build + deploy
```

## Architecture

```
src/
  app/
    (pages)/        # Route groups: /about, /contact, /faq, /services
    api/contact/    # Resend email API route
    components/
      common/       # Shared: AnimatedContainer, Logo, ThemeProvider, ThemeToggle, etc.
      hero/         # HeroSection
      layout/       # Navigation, Footer
      sections/     # CallToAction, SectionHeader
    data/           # Static content: services, faq, reviews, contact, navigation, features
    globals.css     # ALL color variables + custom utility classes
    layout.tsx      # Root layout
  types/            # TypeScript types (barrel export via index.ts)
  utils/            # Utility functions (barrel export via index.ts)
test/
  unit/             # Mirrors src/ structure, .test.tsx files
  e2e/              # Playwright specs, .spec.ts files
```

## Color / Styling Rules (strict)

**Never hardcode colors.** Always use CSS variables and utility classes defined in `src/app/globals.css`.

| Purpose                | Class                  |
| ---------------------- | ---------------------- |
| Headings on colored bg | `text-hero-heading`    |
| Body on colored bg     | `text-hero-body`       |
| Regular headings       | `text-heading`         |
| Body text              | `text-body`            |
| Muted text             | `text-muted`           |
| Footer content         | `text-footer`          |
| Footer links           | `text-footer-muted`    |
| Nav text               | `text-nav`             |
| Text on primary bg     | `text-on-primary`      |
| Page background        | `bg-page`              |
| Card/surface           | `bg-surface`           |
| Alternate section      | `bg-surface-secondary` |
| Subtle bg              | `bg-surface-tertiary`  |
| Primary blue           | `bg-primary`           |
| Primary blue hover     | `bg-primary-hover`     |

Buttons: `btn-hero-primary`, `btn-hero-secondary`, `btn-cta`, `btn-nav`, `btn-nav-mobile`, `btn-primary`, `btn-secondary`

The ONLY place hex colors (`#00AEEF`, etc.) should appear is in `src/app/globals.css`.

Dark mode is fully supported via CSS variable overrides in `.dark` selector — the ThemeProvider handles persistence and system preference.

## Code Style

- TypeScript everywhere; functional components with hooks
- `"use client"` at top of any file using hooks, event handlers, or browser APIs
- **Imports:** Always use `@/` absolute alias; prefer barrel exports (`@/app/data`, `@/types`, `@/utils`)
- No relative imports for local files (except Next.js core: `next/link`, `next/image`)
- Components: PascalCase filenames; utility functions: camelCase
- CSS classes: kebab-case for custom classes, Tailwind utilities as-is
- Animation configs go in separate `animationConfig.ts` files (co-located with the component)
- Barrel exports named `index.ts` in all component/data/type/util directories
- No comments unless the _why_ is non-obvious

## Testing

- Unit tests: `test/unit/` mirroring `src/` structure, `.test.tsx` extension
- E2E tests: `test/e2e/`, `.spec.ts` extension
- Mock `next/navigation` hooks (`usePathname`, `useRouter`) in unit tests
- Mock `ThemeProvider` context when testing components that depend on it
- Use `getByRole`, `getByLabelText` (accessibility-first queries)

## Accessibility (WCAG AA required)

- Semantic HTML: `<nav>`, `<main>`, `<footer>`, `<button>`, etc.
- `aria-label` on icon-only buttons; `aria-expanded` on accordions/menus
- `aria-hidden="true"` on decorative icons
- Focus trap in modals and mobile menus; restore focus on close
- Escape key closes modals/menus
- `sr-only` for screen-reader-only text
- All form inputs have associated labels

## SEO

- Export `metadata` from every page component
- Use `%s | Anna M Schneider Law` title template
- Structured data via `StructuredData` component (Schema.org JSON-LD)
- `NEXT_PUBLIC_SITE_URL` env var used in sitemap and OG images

## Commits & Releases

Conventional Commits enforced by commitlint + husky:

| Type                                          | Release    |
| --------------------------------------------- | ---------- |
| `feat:`                                       | minor bump |
| `fix:` / `perf:`                              | patch bump |
| `feat!:` / `BREAKING CHANGE:`                 | major bump |
| `docs:` `style:` `refactor:` `test:` `chore:` | no release |

**Never manually edit `docs/CHANGELOG.md`** — generated by semantic-release on merge to `main`.

## Environment Variables

See `.env.example` for all required vars. `NEXT_PUBLIC_SITE_URL` must be set in production.
