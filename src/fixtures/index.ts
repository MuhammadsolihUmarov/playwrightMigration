import { test as base } from '@playwright/test';
import { LayoutPage } from '../pageObject/LayoutPage';
import { CalculatorPage } from '../pageObject/CalculatorPage';

type Fixtures = {
    layoutPage: LayoutPage;
    calculatorPage: CalculatorPage;
};

export const test = base.extend<Fixtures>({
    layoutPage: async ({ page }, use) => {
        await use(new LayoutPage(page));
    },
    calculatorPage: async ({ page }, use) => {
        await use(new CalculatorPage(page));
    },
});
