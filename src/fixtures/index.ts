import { test as base, expect as baseExpect } from '@playwright/test';
import { CalculatorPage } from "../pageObject/CalculatorPage";

type CalculatorFixtures = {
    calculatorPage: CalculatorPage;
};

export const test = base.extend<CalculatorFixtures>({
    calculatorPage: async ({ page }, use) => {
        const calculatorPage = new CalculatorPage(page);
        await use(calculatorPage);
    },
});

export const expect = baseExpect;