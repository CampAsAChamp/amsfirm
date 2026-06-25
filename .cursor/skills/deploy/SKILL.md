---
name: deploy
description: Deploy the AMS Law site to Cloudflare Workers. Use when deploying, releasing, or troubleshooting Cloudflare/OpenNext deployment.
---

# Deploy to Cloudflare Workers

## Prerequisites

- Node.js ≥22
- Yarn 4
- Cloudflare credentials configured for OpenNext
- Environment variables set (see `.env.example`); `NEXT_PUBLIC_SITE_URL` required in production

## Pre-deploy checks

Run locally before deploying:

```bash
yarn lint
yarn test
yarn build
```

Fix any failures before deploying.

## Deploy command

```bash
yarn deploy
```

This runs:

1. `scripts/check-node-version.mjs` — verifies Node ≥22
2. `opennextjs-cloudflare build` — OpenNext production build
3. `opennextjs-cloudflare deploy` — deploy to Cloudflare Workers

## CI/CD

Pushes to `main` trigger automatic build and deployment on Cloudflare Workers. Manual `yarn deploy` is for local/preview deploys.

## After deploy

- Verify live site at [amsfirm.com](https://amsfirm.com)
- Check contact form email delivery (Resend)
- Confirm new routes appear in sitemap if pages were added

## Troubleshooting

| Issue              | Check                                          |
| ------------------ | ---------------------------------------------- |
| Build fails        | Run `yarn build` locally for full error output |
| Node version error | Use Node 22+ (`node -v`)                       |
| Missing env vars   | Compare against `.env.example`                 |
| Email not sending  | Resend API key and domain verification         |

## Releases

Version bumps and changelog are handled by semantic-release on merge to `main`. Do not manually edit `docs/CHANGELOG.md`.
