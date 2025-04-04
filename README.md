# Playwright Migration

This guide documents the migration from our previous WebDriverIO-based test framework to [Playwright](https://playwright.dev). It covers updated setup steps, configuration changes, and the new project structure.

---

## Overview

- **Test Runner:** Replaced WebDriverIO + Mocha with Playwright's built-in test runner.
- **Selectors:** Updated to use Playwright’s native, resilient selectors (`getByText`, `getByRole`, `locator`, etc.).
- **Page Objects:** All page objects now extend a shared `BasePage` using Playwright’s `Page` API.
- **Utilities:** Helper functions like `getLastPathSegments` simplify tasks such as URL validation.
- **Test Structure:** Tests are written using `test()` and `expect()` from Playwright and are organized by suite (e.g., `smoke`).

---

## Setup & Installation

### 1. Install dependencies

```bash
npm install --save-dev @playwright/test cross-env rimraf
```

### 2. Install Playwright browsers

```bash
npx playwright install
```

---

## Project Structure

```
src/
├── config/           # Configuration files (e.g., locales.ts)
├── pageObject/       # Page objects for each page
│   ├── BasePage.ts
│   ├── CalculatorPage.ts
│   ├── PricingPage.ts
│   └── SupportPage.ts
├── utils/            # Utility functions
│   └── urlUtils.ts   # e.g., getLastPathSegments()
└── tests/            # Test specs
    ├── calculator.spec.ts
    ├── pricing.spec.ts
    └── support.spec.ts
```

---

## ✅ Scripts (Examples)

Run smoke tests in English locale:

```bash
npm run test:smoke:en
```

### Script definition (in `package.json`):

```json
"scripts": {
  "test:smoke:en": "cross-env LOCALE=en npx playwright test --grep smoke"
}
```

---

## 📚 References

- [Playwright Docs](https://playwright.dev/docs/intro)
- [Playwright Test API](https://playwright.dev/docs/test-intro)
- [Playwright CLI](https://playwright.dev/docs/test-cli)

---

```