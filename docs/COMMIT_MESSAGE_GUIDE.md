# Commit Message Guide

Quick reference for writing commit messages in this repository.

## Format

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

## Types

| Type       | Description                                   | Example                                      |
| ---------- | --------------------------------------------- | -------------------------------------------- |
| `feat`     | New feature                                   | `feat: add contact form validation`          |
| `fix`      | Bug fix                                       | `fix: resolve mobile menu not closing`       |
| `docs`     | Documentation changes                         | `docs: update setup instructions`            |
| `style`    | Code style/formatting (no functional changes) | `style: format navigation component`         |
| `refactor` | Code refactoring (no bug fix or feature)      | `refactor: extract button styles to utility` |
| `perf`     | Performance improvements                      | `perf: optimize image loading`               |
| `test`     | Adding or updating tests                      | `test: add unit tests for contact form`      |
| `build`    | Build system or dependencies                  | `build: upgrade next.js to v15`              |
| `ci`       | CI/CD configuration                           | `ci: add deployment workflow`                |
| `chore`    | Other changes (tooling, configs, etc)         | `chore: add commitlint configuration`        |
| `revert`   | Revert a previous commit                      | `revert: remove experimental feature`        |

## Scope (Optional)

The scope provides additional context about what part of the codebase is affected:

```bash
feat(nav): add mobile menu animation
fix(contact): resolve email validation
docs(readme): update deployment section
test(hero): add snapshot tests
```

Common scopes:

- `nav` - Navigation
- `hero` - Hero section
- `contact` - Contact page/form
- `about` - About page
- `services` - Services page
- `faq` - FAQ page
- `api` - API routes
- `theme` - Theme/styling

## Examples

### Simple commits

```bash
feat: add dark mode toggle
fix: resolve layout shift on mobile
docs: update README with new features
test: add E2E tests for navigation
chore: update dependencies
```

### With scope

```bash
feat(contact): add phone number validation
fix(nav): resolve focus trap in mobile menu
style(hero): improve button spacing
refactor(theme): consolidate color variables
```

### With body

```bash
feat: implement Yelp reviews integration

- Add API endpoint for fetching reviews
- Create ReviewCard component
- Add reviews section to about page
- Include error handling and loading states
```

### Breaking changes

```bash
feat!: redesign navigation API

BREAKING CHANGE: Navigation component now requires theme prop.
Update all instances to include theme="light" or theme="dark".
```

## Rules

✅ **DO:**

- Use imperative mood: "add" not "added" or "adds"
- Keep description under 72 characters
- Use lowercase for description (except proper nouns)
- Be specific and descriptive
- Use the body to explain "what" and "why"

❌ **DON'T:**

- Don't capitalize the first letter of description
- Don't add a period at the end of description
- Don't use past tense
- Don't be vague ("fix bug", "update code")

## Common Patterns

### Multiple files, same purpose

```bash
refactor: extract navigation components

- Split DesktopNav into separate file
- Split MobileNav into separate file
- Create barrel export in navigation/index.ts
```

### Bug fix with context

```bash
fix(contact): prevent form submission with invalid email

The email validation regex was not catching certain invalid formats.
Updated to use a more comprehensive pattern and added tests.

Fixes #123
```

### New feature with breaking change

```bash
feat!: upgrade to React 19

BREAKING CHANGE: Some APIs have changed.
See MIGRATION.md for upgrade guide.

- Update all components to new JSX transform
- Replace deprecated lifecycle methods
- Update testing library
```

## Validation

All commits are automatically validated by commitlint. Invalid commits will be rejected:

```bash
# ❌ This will fail
git commit -m "updated files"

# ✅ This will succeed
git commit -m "chore: update configuration files"
```

## Resources

- [Conventional Commits](https://www.conventionalcommits.org/)
- [Commitlint](https://commitlint.js.org/)
- [Repository Git Hooks Documentation](./GIT_HOOKS.md)
