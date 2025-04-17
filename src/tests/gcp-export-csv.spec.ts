import { test, expect } from '../fixtures/downloadsFixture';
import { CalculatorPage } from "../pageObject/CalculatorPage";
import { DownloadHelper } from "../utils/downloadHelper";

test.describe('file-upload', () => {
    test('should export Compute Engine estimate as CSV and verify its content', async ({ page, downloadsPath  }) => {
        const calculator = new CalculatorPage(page);
        await calculator.gotoCalculatorPage();
        await calculator.openComputeEngine();
        const download = await calculator.downloadCSVEstimate();
        const filePath = await download.path();

        const csvTotal = DownloadHelper.extractTotalFromCSV(filePath);
        const uiTotal = await calculator.getEstimatedCost();
        expect(csvTotal).toBeCloseTo(uiTotal, 2);

        await DownloadHelper.validateCSVStructure(filePath);
    });
});
