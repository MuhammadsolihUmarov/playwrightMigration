import { test } from "@playwright/test";
import { expect } from "@playwright/test";
import { PricingPage } from '../pageObject/PricingPage';
import { SupportPage } from "../pageObject/SupportPage";

test.describe('smoke', () => {
    let pricingPage: PricingPage;
    let supportPage: SupportPage;

    test.beforeEach(async ({ page }) => {
        pricingPage = new PricingPage(page);
        supportPage = new SupportPage(page);
        await pricingPage.open();
    });

    test('should open pricing page', async () => {
        const headerVisible = await pricingPage.isHeaderVisible();
        expect(headerVisible).toBeTruthy();
    });

    test('clicking on Request Quote button redirects to support page', async () => {
        await pricingPage.clickRequestQuoteButton();
        const headerVisible = await supportPage.isHeaderVisible();
        expect(headerVisible).toBeTruthy();
    });
});
