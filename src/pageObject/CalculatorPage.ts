import { getText } from '../config/locales';
import { BasePage } from './BasePage';
import { Page } from "@playwright/test";

export class CalculatorPage extends BasePage {
    private okCookieButtonLocator = this.page.getByText(getText('okCookie'));
    private addEstimateButtonLocator = this.page.getByText(getText('addToEstimate'));
    private configurationBlockLocator = this.page.locator('#ucc-5');
    private computeEngineLocator = this.page.locator('h2', { hasText: getText('computeEngine') });
    private totalCostLocator = this.page.locator('div.KgqeZe label');
    private incrementButtonLocator = this.page.locator('button.CXjg4d', {
        has: this.page.locator('i', { hasText: getText('add')}),
    });

    constructor(page: Page) {
        super(page, '/products/calculator');
    }

    async acceptCookiesIfAppear(): Promise<this> {
        if (await this.okCookieButtonLocator.isVisible()) {
            await this.okCookieButtonLocator.click();
        }
        return this;
    }

    async clickAddEstimate(): Promise<this> {
        await this.addEstimateButtonLocator.first().click();
        return this;
    }

    async selectComputeEngine(): Promise<this> {
        await this.computeEngineLocator.first().click();
        return this;
    }

    async verifyConfigurationBlock(): Promise<boolean> {
        await this.configurationBlockLocator.waitFor({ state: 'visible' });
        return true;
    }

    async addInstances(count: number): Promise<this> {
        for (let i = 0; i < count; i++) {
            await this.incrementButtonLocator.first().click();
        }
        return this;
    }

    async getTotalCost(): Promise<string> {
        const cost = await this.totalCostLocator.textContent();
        return cost ? cost.trim() : '';
    }

    async gotoCalculatorPage() {
        await this.page.goto('https://cloud.google.com/products/calculator');
    }

    async openComputeEngine() {
        await this.page.locator('//i[text()="add"]').first().click();
        await this.page.locator('//h2[text()="Compute Engine"]').click();
    }

    async downloadCSVEstimate(downloadPath: string) {
        const [download] = await Promise.all([
            this.page.waitForEvent('download'),
            this.page.getByLabel('Download estimate as .csv').click()
        ]);

        return download;
    }

    async getEstimatedCost(): Promise<number> {
        const text = await this.page.locator('//div[text()="Estimated cost"]/following-sibling::div//label').textContent();
        return parseFloat(text?.replace(/[^\d.]/g, '') ?? '0');
    }
}
