import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class SupportPage extends BasePage {
    headerSupportPage = this.page.locator('div.PN0Fre');

    constructor(page: Page) {
        super(page, '/products/pricing');
    }

    async isHeaderVisible(): Promise<boolean> {
        await this.headerSupportPage.waitFor({state: 'visible'});
        return await this.headerSupportPage.isVisible();
    }
}