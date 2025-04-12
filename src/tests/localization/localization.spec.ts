import { test } from '@playwright/test';
import { LayoutPage } from '../../pageObject/LayoutPage';
import { getLocalizationData } from '../../utils/csvReader';
import { CalculatorPage } from '../../pageObject/CalculatorPage';

getLocalizationData().forEach(({ languageName, url, headerKeywords, footerKeywords }) => {
    test(`Verify Header and Footer in ${languageName}`, async ({ page }) => {
        const calculatorPage = new CalculatorPage(page, url);
        const layout = new LayoutPage(page);

        await calculatorPage.open();
        await layout.expectHeaderContains(headerKeywords);
        await layout.expectFooterContains(footerKeywords);
    });
});
