import { test as base } from '@playwright/test';
import { SupportPage } from "../pageObject/SupportPage.js";

export const test = base.extend<{
    supportPage: SupportPage;
}>({
    supportPage: async ({ page }, use) => {
        await use(new SupportPage(page));
    },
});

export { expect } from '@playwright/test';
