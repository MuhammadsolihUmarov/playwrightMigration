// @ts-ignore
import { test as base, expect as baseExpect } from '@playwright/test';
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

export const expect = baseExpect;