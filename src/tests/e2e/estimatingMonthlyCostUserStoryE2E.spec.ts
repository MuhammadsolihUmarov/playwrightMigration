import { expect, test } from "../../fixtures/index.js";

test.describe('e2e', () => {
    test.beforeEach(async ({ calculatorPage }) => {
        await calculatorPage.open();
        await calculatorPage.clickAddEstimate();
        await calculatorPage.selectComputeEngine();
    });

    test('should estimate the cost of Compute Engine instance with valid inputs', async ({page, calculatorPage}) => {
        await calculatorPage.addInstances(4);
        const uiTotal = await calculatorPage.getEstimatedCost(349);

        expect(uiTotal).toEqual(349.92);
    });

    test('machine type update should change estimated cost', async ({page, calculatorPage}) => {
        const uiInitialTotal = await calculatorPage.getEstimatedCost(69);

        await calculatorPage.chooseMachineType("n4-standard-4");
        const uiTotal = await calculatorPage.getEstimatedCost(139);

        expect(uiTotal).not.toBe(uiInitialTotal);
    });

    test('should be able to compare cost between two configurations', async ({page, calculatorPage}) => {
        await calculatorPage.chooseMachineType("n4-standard-2");
        let firstUITotal = await calculatorPage.getEstimatedCost(69);

        await calculatorPage.clickAddEstimate();
        await calculatorPage.selectComputeEngine();
        await calculatorPage.addInstances(4);
        let secondUITotal = await calculatorPage.getEstimatedCost(419);

        expect(firstUITotal).not.toBe(secondUITotal);

        let firstTotalCostDetails = await calculatorPage.getDisplayedCostsOnCostDetails(1);
        let secondTotalCostDetails = await calculatorPage.getDisplayedCostsOnCostDetails(2);

        expect(firstTotalCostDetails).not.toBe(secondTotalCostDetails);
    });

    test('should realtime update the cost estimation on instance value change', async ({page, calculatorPage}) => {
        await calculatorPage.addInstances(1);
        let firstUITotal = await calculatorPage.getEstimatedCost(13);

        await calculatorPage.addInstances(2);
        let secondUITotal = await calculatorPage.getEstimatedCost(27);

        expect(firstUITotal).not.toBe(secondUITotal);
    });

    test('should estimate cost with minimum values', async ({page, calculatorPage}) => {
        await calculatorPage.setInstanceTime("5");
        await calculatorPage.chooseSpotProvisionModel();
        await calculatorPage.setBootDiskSize("1");
        let uiTotal = await calculatorPage.getEstimatedCost(0);

        expect(uiTotal).toBe(0.27);
    });

    test('should estimate cost with maximum values', async ({page, calculatorPage}) => {
        await calculatorPage.setInstanceTime("36500000");
        await calculatorPage.chooseMachineType("n4-standard-80");
        await calculatorPage.chooseMachineFamily("storage-optimized");
        await calculatorPage.setBootDiskSize("65536");
        let uiTotal = await calculatorPage.getEstimatedCost(73);

        expect(uiTotal).toBe(736644346);
    });

    test('should not estimate cost specifying 0 number to instances', async ({page, calculatorPage}) => {
        await calculatorPage.setInstanceTime("0");

        await expect(calculatorPage.getEstimatedCost("--")).toBeTruthy();
    });

    test('should not estimate cost with negative input in instance time field', async ({page, calculatorPage}) => {
        await calculatorPage.setInstanceTime("-1");

        await expect(calculatorPage.getEstimatedCost("--")).toBeTruthy();
    });

    test('should not estimate cost with huge input in instance time field', async ({page, calculatorPage}) => {
        await calculatorPage.setInstanceTime("9999999999999999999999");

        await expect(calculatorPage.getEstimatedCost("--")).toBeTruthy();
    });

    test('should not estimate cost with negative input in instance count field', async ({page, calculatorPage}) => {
        await calculatorPage.setInstances("-1");

        await expect(calculatorPage.getEstimatedCost("--")).toBeTruthy();
    });

    test('should not estimate cost with huge input in instance count field', async ({page, calculatorPage}) => {
        await calculatorPage.setInstances("9999999999999999999999");

        await expect(calculatorPage.getEstimatedCost("--")).toBeTruthy();
    });
});