import { test, expect } from '@playwright/test';
import { CalculatorPage } from "../../pageObject/CalculatorPage";

test.describe('Visual Regression Tests', () => {
    let calculatorPage: CalculatorPage;

    test.beforeEach(async ({ page }) => {
        calculatorPage = new CalculatorPage(page);
    });

    test('Calculator page matches expected screenshot', async ({ page }) => {
        await calculatorPage.open();
        await page.waitForTimeout(3000);

        expect(await page.screenshot({ fullPage: true })).toMatchSnapshot('full-page.png');
    });

    test('Calculator form matches expected screenshot', async ({ page }) => {
        await calculatorPage.open();

        await calculatorPage.openComputeEngine();
        await page.waitForTimeout(3000);

        expect(await page.screenshot({ fullPage: true })).toMatchSnapshot('calculator-form.png');
    });

    test.only('Share estimate dialog matches expected screenshot', async () => {
        await calculatorPage.open();
        await calculatorPage.openComputeEngine();
        await calculatorPage.clickShareButton();

        const dialog = calculatorPage.getShareEstimateDialog();
        await expect(dialog).toBeVisible();
        await expect(await dialog.screenshot()).toMatchSnapshot('share-estimate-dialog.png');
    });
});
