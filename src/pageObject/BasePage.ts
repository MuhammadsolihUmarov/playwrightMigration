import { Page } from '@playwright/test';
import { getText } from '../config/locales.js';

export class BasePage {
    private okCookieButtonLocator;

    constructor(protected page: Page, private readonly path: string) {
        this.okCookieButtonLocator = this.page.getByText(getText('okCookie'));

        this.page.addLocatorHandler(this.okCookieButtonLocator, async (locator) => {
            if (await locator.isVisible()) {
                await locator.click();
            }
        });
    }

    async open(): Promise<this> {
        await this.page.goto(this.path);
        return this;
    }
}
