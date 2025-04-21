import { test } from '../../fixtures';
import { getLocalizationData } from '../../utils/csvReader';

getLocalizationData().forEach(({ languageName, headerKeywords, footerKeywords }) => {
    test(`should verify header and footer in ${languageName}`, async ({ calculatorPage, layoutPage }) => {
        await calculatorPage.open();
        await layoutPage.expectHeaderContains(headerKeywords);
        await layoutPage.expectFooterContains(footerKeywords);
    });
});
