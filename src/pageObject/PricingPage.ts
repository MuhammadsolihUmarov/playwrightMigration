import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class PricingPage extends BasePage {
    header = this.page.locator('h1.o2Zj5b');
    quoteRequestLocator = this.page.locator('a[aria-label="Request a quote "]');

    constructor(page: Page) {
        super(page, '/products/pricing');
    }

    async isHeaderVisible(): Promise<boolean> {
        await this.header.waitFor({ state: 'visible' });
        return await this.header.isVisible();
    }

    async clickRequestQuoteButton() {
        await this.quoteRequestLocator.click()
    }
}
