import { test as base } from '@playwright/test';
import { CalculatorPage } from '../pageObject/CalculatorPage.js';
import { PricingPage } from '../pageObject/PricingPage.js';
import { SupportPage } from '../pageObject/SupportPage.js';
import { DownloadHelper } from '../utils/downloadHelper.js';
import { downloadPath } from "../utils/paths.js";

type PageFixtures = {
    calculatorPage: CalculatorPage;
    pricingPage: PricingPage;
    supportPage: SupportPage;
    cleanDownloads: void;
};

export const test = base.extend<PageFixtures>({
    calculatorPage: async ({ page }, use) => {
        await use(new CalculatorPage(page));
    },
    pricingPage: async ({ page }, use) => {
        await use(new PricingPage(page));
    },
    supportPage: async ({ page }, use) => {
        await use(new SupportPage(page));
    },
    cleanDownloads: async ({}, use) => {
        await DownloadHelper.cleanup(downloadPath);
        await use(undefined);
        await DownloadHelper.cleanup(downloadPath);
    },
});

export { expect } from '@playwright/test';
