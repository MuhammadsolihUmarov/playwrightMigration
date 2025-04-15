import { test as base } from '@playwright/test';
import { PricingPage } from "../pageObject/PricingPage.js";

export const test = base.extend<{
    pricingPage: PricingPage;
}>({
    pricingPage: async ({ page }, use) => {
        await use(new PricingPage(page));
    },
});

export { expect } from '@playwright/test';
