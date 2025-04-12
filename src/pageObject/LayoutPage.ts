import { Page, expect } from '@playwright/test';

export class LayoutPage {
    constructor(private page: Page) {}

    async expectHeaderContains(keywords: string[]) {
        const text = await this.page.locator('.ZUAiPc').innerText();
        for (const word of keywords) {
            if (!text.includes(word)) {
                throw new Error(`❌ Header keyword not found: "${word}"`);
            }
        }
    }


    async expectFooterContains(keywords: string[]) {
        const text = await this.page.locator('#ZCHFDb').innerText();

        for (const word of keywords) {
            if (!text.includes(word)) {
                throw new Error(`❌ Footer keyword not found: "${word}"`);
            }
        }
    }
}
