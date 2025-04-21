import { getText } from '../config/locales';
import { BasePage } from './BasePage';
import { Locator, Page } from "@playwright/test";

export class CalculatorPage extends BasePage {
    private addEstimateButtonLocator = this.page.locator('.jirROd');
    private totalCostLocator = this.page.locator('div.KgqeZe label');

    constructor(page: Page) {
        super(page, '/products/calculator');
    }

    async openComputeEngine() {
        await this.page.locator('//i[text()="add"]').first().click();
        await this.page.locator('//h2[text()="Compute Engine"]').click();
        await this.totalCostLocator.waitFor({ state: 'visible' });
    }

    async clickShareButton() {
        await this.page.locator('//button[@aria-label="Open Share Estimate dialog"]').click();
    }

    getShareEstimateDialog(): Locator {
        return this.page.locator('//div[@aria-label="Share Estimate Dialog"]');
    }

    async waitForPageReady() {
        await this.addEstimateButtonLocator.waitFor({ state: 'visible' });
    }
}
