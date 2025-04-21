import { test, expect } from '../../fixtures';
import { CalculatorPage } from "../../pageObject/CalculatorPage";

test.describe('Visual Regression Tests', () => {
    test('Calculator page matches expected screenshot', async ({ page, calculatorPage }) => {
        await calculatorPage.open();
        await calculatorPage.waitForPageReady();

        expect(await page.screenshot({ fullPage: true })).toMatchSnapshot('full-page.png');
    });

    test('Calculator form matches expected screenshot', async ({ page, calculatorPage }) => {
        await calculatorPage.open();

        await calculatorPage.openComputeEngine();

        expect(await page.screenshot({ fullPage: true })).toMatchSnapshot('calculator-form.png');
    });

    test('Share estimate dialog matches expected screenshot', async ({calculatorPage}) => {
        await calculatorPage.open();
        await calculatorPage.openComputeEngine();
        await calculatorPage.clickShareButton();

        const dialog = calculatorPage.getShareEstimateDialog();
        await expect(dialog).toBeVisible();
        await expect(await dialog.screenshot()).toMatchSnapshot('share-estimate-dialog.png');
    });
});
