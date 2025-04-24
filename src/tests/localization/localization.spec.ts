// @ts-ignore
import { test, expect } from '../../fixtures';
import { getLocalizationData } from '../../utils/jsonReader';

getLocalizationData().forEach(({ languageName, headerKeywords, footerKeywords }) => {
    test(`should verify header and footer in ${languageName}`, async ({ calculatorPage, layoutPage }) => {
        await calculatorPage.open();

        const missingFooter = await layoutPage.getMissingFooterKeywords(footerKeywords);
        expect(missingFooter, `Missing footer keywords in ${languageName}`).toEqual([]);

        const missingHeader = await layoutPage.getMissingHeaderKeywords(headerKeywords);
        expect(missingHeader, `Missing header keywords in ${languageName}`).toEqual([]);
    });
});
