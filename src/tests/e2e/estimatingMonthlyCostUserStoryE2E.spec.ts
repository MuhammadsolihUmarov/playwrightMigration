import { expect, test } from "@playwright/test";
import { CalculatorPage } from "../../pageObject/CalculatorPage";

test.describe('e2e', () => {
    let calculatorPage: CalculatorPage;

    test.beforeEach(async ({page}) => {
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
    });

    test('machine type update should change estimated cost', async ({page}) => {
        await calculatorPage.clickAddEstimate();
        await calculatorPage.selectComputeEngine();
        await page.waitForTimeout(1000);
        const uiInitialTotal = await calculatorPage.getEstimatedCost();

        await calculatorPage.chooseMachineType("n1-standard-2");
        await page.waitForTimeout(2000);
        const uiTotal = await calculatorPage.getEstimatedCost();

        expect(uiTotal).not.toBe(uiInitialTotal);
        expect(uiTotal).toEqual(70.35);
    });

    test('should be able to compare cost between two configurations', async ({page}) => {
        await calculatorPage.clickAddEstimate();
        await calculatorPage.selectComputeEngine();
        await page.waitForTimeout(1000);
        await calculatorPage.chooseMachineType("n1-standard-2");
        await page.waitForTimeout(2000);
        let firstUITotal = await calculatorPage.getEstimatedCost();

        await calculatorPage.goBackIntoEstimaes();
        await calculatorPage.clickAddEstimate();
        await calculatorPage.selectComputeEngine();
        await calculatorPage.addInstances(4);
        await page.waitForTimeout(2000);
        let secondUITotal = await calculatorPage.getEstimatedCost();

        expect(firstUITotal).not.toBe(secondUITotal);

        firstUITotal = await calculatorPage.getDisplayedCostsOnCostDetails(1);
        secondUITotal = await calculatorPage.getDisplayedCostsOnCostDetails(2);

        expect(firstUITotal).not.toBe(secondUITotal);
    });

    test('should realtime update the cost estimation on instance value change', async ({page}) => {
        await calculatorPage.clickAddEstimate();
        await calculatorPage.selectComputeEngine();
        await page.waitForTimeout(1000);
        await calculatorPage.addInstances(1);
        await page.waitForTimeout(2000);
        let firstUITotal = await calculatorPage.getEstimatedCost();

        await calculatorPage.addInstances(2);
        await page.waitForTimeout(2000);
        let secondUITotal = await calculatorPage.getEstimatedCost();

        expect(firstUITotal).not.toBe(secondUITotal);
    });

    test('should estimate cost with minimum values', async ({page}) => {
        await calculatorPage.clickAddEstimate();
        await calculatorPage.selectComputeEngine();

        await calculatorPage.setInstanceTime("5");
        await calculatorPage.chooseSpotProvisionModel();
        await calculatorPage.chooseMachineType("f1-micro");
        await calculatorPage.chooseStandardPersistentDisk();
        await calculatorPage.setBootDiskSize("1");
        await page.waitForTimeout(2000);
        let uiTotal = await calculatorPage.getEstimatedCost();

        expect(uiTotal).toBe(0.02);
    });

    test('should estimate cost with maximum values', async ({page}) => {
        await calculatorPage.clickAddEstimate();
        await calculatorPage.selectComputeEngine();

        await calculatorPage.setInstanceTime("36500000");
        await calculatorPage.chooseMachineType("n1-highcpu-96");
        await calculatorPage.chooseMachineFamily("storage-optimized");
        await calculatorPage.setBootDiskSize("65536");
        await page.waitForTimeout(2000);
        let uiTotal = await calculatorPage.getEstimatedCost();

        expect(uiTotal).toBe(736644346);
    });

    test('should not estimate cost specifying 0 number to instances', async ({page}) => {
        await calculatorPage.clickAddEstimate();
        await calculatorPage.selectComputeEngine();

        await calculatorPage.setInstanceTime("0");
        await page.waitForTimeout(2000);
        const uiTotal = await calculatorPage.getEstimatedCost();

        expect(uiTotal).toBeNaN();
    });

    test('should not estimate cost with negative input in instance time field', async ({page}) => {
        await calculatorPage.clickAddEstimate();
        await calculatorPage.selectComputeEngine();

        await calculatorPage.setInstanceTime("-1");
        await page.waitForTimeout(2000);
        const uiTotal = await calculatorPage.getEstimatedCost();

        expect(uiTotal).toBeNaN();
    });

    test('should not estimate cost with huge input in instance time field', async ({page}) => {
        await calculatorPage.clickAddEstimate();
        await calculatorPage.selectComputeEngine();

        await calculatorPage.setInstanceTime("9999999999999999999999");
        await page.waitForTimeout(2000);
        const uiTotal = await calculatorPage.getEstimatedCost();

        expect(uiTotal).toBeNaN();
    });

    test('should not estimate cost with negative input in instance count field', async ({page}) => {
        await calculatorPage.clickAddEstimate();
        await calculatorPage.selectComputeEngine();

        await calculatorPage.setInstances("-1");
        await page.waitForTimeout(2000);
        const uiTotal = await calculatorPage.getEstimatedCost();

        expect(uiTotal).toBeNaN();
    });

    test('should not estimate cost with huge input in instance count field', async ({page}) => {
        await calculatorPage.clickAddEstimate();
        await calculatorPage.selectComputeEngine();

        await calculatorPage.setInstances("9999999999999999999999");
        await page.waitForTimeout(2000);
        const uiTotal = await calculatorPage.getEstimatedCost();

        expect(uiTotal).toBeNaN();
    });
});