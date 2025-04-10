import { test } from "@playwright/test";
import { expect } from "@playwright/test";
import { DownloadHelper } from "../../utils/downloadHelper";
import { CalculatorPage } from "../../pageObject/CalculatorPage";

const downloadPath = './downloads';

test.describe('file-upload', () => {
    test.beforeEach(async () => {
        await DownloadHelper.cleanup(downloadPath);
    });

    test.afterEach(async () => {
        await DownloadHelper.cleanup(downloadPath);
    });

    test('should export Compute Engine estimate as CSV and verify its content', async ({ page }) => {
        const calculator = new CalculatorPage(page);
        await calculator.gotoCalculatorPage();
        await calculator.openComputeEngine();
        const download = await calculator.downloadCSVEstimate(downloadPath);
        const filePath = await download.path();

        expect(filePath).not.toBeNull();
        DownloadHelper.validateFileExtension(download, '.csv');

        const csvTotal = DownloadHelper.extractTotalFromCSV(filePath);
        const uiTotal = await calculator.getEstimatedCost();
        expect(csvTotal).toBeCloseTo(uiTotal, 2);

        DownloadHelper.validateCSVStructure(filePath);
    });
});