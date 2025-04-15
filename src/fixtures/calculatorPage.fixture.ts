import { test as base } from '@playwright/test';
import { CalculatorPage } from "../pageObject/CalculatorPage.js";

export const test = base.extend<{
    calculatorPage: CalculatorPage;
}>({
    calculatorPage: async ({ page }, use) => {
        await use(new CalculatorPage(page));
    },
});

export { expect } from '@playwright/test';
