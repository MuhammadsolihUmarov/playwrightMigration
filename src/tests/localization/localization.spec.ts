import { test } from '@playwright/test';
import { LayoutPage } from '../../pageObject/LayoutPage';
import { getLocalizationData } from '../../utils/csvReader';
import { CalculatorPage } from '../../pageObject/CalculatorPage';

test.describe('Localization', () => {
    const dataSet = getLocalizationData();

    for (const { languageName, url, headerKeywords, footerKeywords } of dataSet) {
        test(`Verify Header/Footer in ${languageName}`, async ({ page }) => {
            const calculatorPage = new CalculatorPage(page, url);
            const layout = new LayoutPage(page);

            await calculatorPage.open();

            await layout.expectHeaderContains(headerKeywords);
            await layout.expectFooterContains(footerKeywords);
        });
    }
});