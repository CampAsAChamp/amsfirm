# AGENTS.md — AMS Law Firm

Quick reference for AI agents working in this repo. Detailed rules live in `.cursor/rules/`.

## Project

Next.js 15 + React 19 law firm website for Anna M. Schneider Law. Deployed on Cloudflare Workers via OpenNext. Tailwind CSS v4, TypeScript, Vitest, Playwright, Resend email.

**Package manager:** Yarn 4 (`yarn`, not `npm`)  
**Node:** ≥22 (enforced by `scripts/check-node-version.mjs`)

## Commands

```bash
yarn dev          # dev server
yarn build        # production build
yarn test         # unit tests
yarn test:e2e     # Playwright E2E
yarn lint         # ESLint + Prettier check
yarn lint:fix     # auto-fix lint issues
yarn deploy       # OpenNext Cloudflare build + deploy
```

## Architecture

```
src/app/
  (pages)/          # Routes: /, /about, /services, /faq, /contact
  api/contact/      # Resend email API
  components/       # common/, hero/, layout/, sections/
  data/             # Static content (navigation, services, faq, etc.)
  globals.css       # ALL colors — never hardcode elsewhere
test/unit/          # Mirrors src/
test/e2e/           # Playwright specs
```

## Non-negotiables

1. **Colors:** CSS variable utility classes only — see `.cursor/rules/colors-and-styling.mdc`
2. **Imports:** `@/` absolute paths; prefer barrel exports (`@/app/data`, `@/types`, `@/utils`)
3. **Accessibility:** WCAG AA — keyboard nav, ARIA, focus management
4. **SEO:** `metadata` on every page; update `sitemap.ts` for new routes
5. **Tests:** Mirror `src/` structure in `test/unit/`
6. **Docs:** Update `README.md` for new features, env vars, or setup changes

## Repo-specific skills

| Skill                           | When to use                     |
| ------------------------------- | ------------------------------- |
| `.cursor/skills/add-page/`      | Adding a new route/page         |
| `.cursor/skills/add-component/` | Adding a reusable component     |
| `.cursor/skills/deploy/`        | Deploying to Cloudflare Workers |

## Related files

- `.cursor/rules/` — scoped project rules (preferred over legacy `.cursorrules`)
- `CLAUDE.md` — Claude Code session context
- `.env.example` — required environment variables
- `README.md` — full setup and feature documentation
