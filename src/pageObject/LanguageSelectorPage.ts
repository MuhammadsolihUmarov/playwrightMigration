import { Page } from '@playwright/test';

export class LanguageSelectorPage {
    constructor(private page: Page) {}

    async openLanguageSelector() {
        await this.page.getByRole('button', { name: /language/i }).click();
    }

    async selectLanguage(language: string) {
        await this.page.getByRole('option', { name: language }).click();
    }
}