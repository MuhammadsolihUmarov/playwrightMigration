import { test } from "@playwright/test";
import { expect } from "@playwright/test";
import { CalculatorPage } from '../pageObject/CalculatorPage';
import { getLastPathSegments } from "../utils/urlUtils";

test.describe('smoke', () => {
    let calculatorPage: CalculatorPage;

    test.beforeEach(async ({ page }) => {
        calculatorPage = new CalculatorPage(page);
        await calculatorPage.open();
        await calculatorPage.acceptCookiesIfAppear();
    });

    test('should estimate the cost of Compute Engine instance with valid inputs', async ({page}) => {
        await calculatorPage.clickAddEstimate();
        await calculatorPage.selectComputeEngine();

        await calculatorPage.addInstances(4);
        await page.waitForTimeout(2000);
        const uiTotal = await calculatorPage.getEstimatedCost();

        expect(uiTotal).toEqual(698.5);
    })

    test('should open the calculator URL', async ({ page }) => {
        const lastTwo = getLastPathSegments(page.url(), 2);
        expect(lastTwo).toBe('products/calculator');
    });

    test('should add new entities to calculator', async () => {
        await calculatorPage.clickAddEstimate();
        await calculatorPage.selectComputeEngine();
        const configDisplayed = await calculatorPage.verifyConfigurationBlock();
        expect(configDisplayed).toBeTruthy();
    });

    test('should correctly add two new instances', async () => {
        await calculatorPage.clickAddEstimate();
        await calculatorPage.selectComputeEngine();
        await calculatorPage.addInstances(2);
        const totalCost = await calculatorPage.getTotalCost();
        expect(totalCost).toBe('$419.10');
    });
});
