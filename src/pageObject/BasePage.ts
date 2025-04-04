import { Page } from '@playwright/test';

export class BasePage {
    constructor(protected page: Page, private readonly path: string) {}

    async open(): Promise<this> {
        await this.page.goto(this.path);
        return this;
    }
}
