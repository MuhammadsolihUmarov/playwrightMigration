// @ts-ignore
import { Page } from "@playwright/test";

export class LayoutPage {
    constructor(private page: Page) {}

    async getMissingHeaderKeywords(expected: string[]): Promise<string[]> {
        return this.getMissingSectionKeywords('#ZUAiPc', expected);
    }

    async getMissingFooterKeywords(expected: string[]): Promise<string[]> {
        return this.getMissingSectionKeywords('#ZCHFDb', expected);
    }

    private async getMissingSectionKeywords(
        selector: string,
        expectedKeywords: string[]
    ): Promise<string[]> {
        const allTexts = await this.page.locator(selector).allInnerTexts();

        const visibleTexts = new Set<string>(
            allTexts
                .flatMap(text => text.split('\n'))
                .map(t => t.trim())
                .filter(Boolean)
        );

        return expectedKeywords.filter(word => !visibleTexts.has(word));
    }
}
