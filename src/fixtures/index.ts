import { test as base, expect as baseExpect } from '@playwright/test';
import { CalculatorPage } from "../pageObject/CalculatorPage";

type Fixtures = {
    calculatorPage: CalculatorPage;
};

export const test = base.extend<Fixtures>({
    calculatorPage: async ({ page }, use) => {
        const calculatorPage = new CalculatorPage(page);
        await calculatorPage.open();
        await calculatorPage.acceptCookiesIfAppear();
        await use(calculatorPage);
    },
});

export const expect = baseExpect;
