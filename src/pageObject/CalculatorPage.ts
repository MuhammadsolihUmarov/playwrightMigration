import { Page } from '@playwright/test';
import { getText } from '../config/locales';
import { BasePage } from './BasePage';

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
}
