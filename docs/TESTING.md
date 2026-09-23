# Testing Documentation

This project includes comprehensive testing for critical functionality using Vitest and Playwright.

## Test Structure

```
amsfirm/
├── src/
│   └── app/                              # Application source code
│       ├── (pages)/                      # Route pages (about, contact, faq, services)
│       ├── components/                   # Shared UI components
│       └── data/                         # Static content
├── test/
│   ├── unit/                             # Unit and integration tests
│   │   ├── setup.ts                      # Global test configuration
│   │   ├── helpers/                      # Mock utilities and fixtures
│   │   └── app/                          # Mirrors src/app structure
│   └── e2e/                              # End-to-end tests
│       ├── accessibility.spec.ts
│       ├── navigation.spec.ts
│       └── ...
├── vitest.config.ts                      # Vitest configuration
└── playwright.config.ts                  # Playwright configuration
```

## Running Tests

### All Tests

```bash
# Run all tests (unit, integration, and E2E)
yarn test:all
```

### Unit & Integration Tests (Vitest)

```bash
# Run tests once (default)
yarn test

# Run tests in watch mode (recommended during development)
yarn test:watch
```

### E2E Tests (Playwright)

```bash
yarn test:e2e
```

## Writing New Tests

### Unit Test Example

```typescript
import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import MyComponent from "./MyComponent"

describe("MyComponent", () => {
  it("renders correctly", () => {
    render(<MyComponent />)
    expect(screen.getByText("Hello")).toBeInTheDocument()
  })
})
```

### E2E Test Example

```typescript
import { expect, test } from "@playwright/test"

test("user can navigate to contact", async ({ page }) => {
  await page.goto("/")
  await page.getByRole("link", { name: "Contact" }).first().click()
  await expect(page).toHaveURL(/.*contact/)
  await expect(page.getByRole("heading", { name: /Office Information/i })).toBeVisible()
})
```

## Mocking Guidelines

### Framer Motion

Automatically mocked in `test/unit/setup.ts` to avoid animation issues.

### Next.js Navigation

Mocked in `test/unit/setup.ts` with basic router functions.

### Fetch API

Use `mockFetch()` helper from `test/unit/helpers/mocks.tsx`:

```typescript
import { mockFetch, mockSuccessResponse } from "@test/unit/mocks"

mockFetch(mockSuccessResponse())
```

## Continuous Integration

Tests can be run in CI/CD pipelines:

```yaml
# Example GitHub Actions workflow
- name: Run unit tests
  run: yarn test

- name: Run E2E tests
  run: yarn test:e2e
```

## Troubleshooting

### Tests fail with "matchMedia is not a function"

This is already handled in `test/unit/setup.ts`. If you see this error, ensure the setup file is being loaded.

### E2E tests can't find elements

- Use `screen.debug()` in unit tests to see the rendered HTML
- Use `await page.screenshot({ path: 'debug.png' })` in E2E tests
- Check that selectors match the actual rendered content

### Tests timeout

- Increase timeout in test file: `test('name', async () => {...}, 10000)`
- For E2E tests, check that the dev server is running properly

## Best Practices

1. **Test user behavior, not implementation details**
   - ✅ `screen.getByRole('button', { name: /submit/i })`
   - ❌ `container.querySelector('.submit-button')`

2. **Use semantic queries**
   - Prefer `getByRole`, `getByLabelText`, `getByText`
   - Avoid `getByTestId` unless necessary

3. **Mock external dependencies**
   - Always mock API calls and third-party services

4. **Keep tests focused**
   - One concept per test
   - Clear test names that describe behavior

5. **Clean up after tests**
   - Automatically handled by `afterEach(cleanup)` in setup

## Resources

- [Vitest Documentation](https://vitest.dev/)
- [Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Playwright Documentation](https://playwright.dev/)
