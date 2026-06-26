import { expect, Page, Locator } from "@playwright/test";

export class SearchPage {
    readonly page: Page;
    readonly searchBox: Locator;
    readonly searchButton: Locator;
    readonly resultText: Locator;
    readonly blankResultText: Locator;

    constructor(page: Page) {
        this.page = page;
        this.searchBox = this.page.getByRole('textbox', { name: 'Search..' });
        this.searchButton = this.page.getByRole('button');
        this.resultText = this.page.getByText('Found one result for');
        this.blankResultText = this.page.getByText('Please provide a search word.');
    }

    async goto() {
        await this.page.goto(process.env.BASE_URL + '/search');
    }

    async search(term: string = 'automation') {
        await this.searchBox.click();
        await this.searchBox.fill(term);
        await this.searchButton.click();
    }
    async searchResult(term: string = 'automation') {
        await expect(this.resultText).toBeVisible();
        const resultText = await this.resultText.textContent();
        console.log(`Search result text: ${resultText}`);
        expect(resultText?.toLowerCase()).toContain('found one result for');
        expect(resultText?.toLowerCase()).toContain(term.toLowerCase());
    }

    async searchBlank() {
        await this.searchBox.click();
        await this.searchBox.fill('');
        await this.searchButton.click();
    }
    async blankSearchResult() {
        await expect(this.blankResultText).toBeVisible();
        const resultText = await this.blankResultText.textContent();
        console.log(`Blank search result text: ${resultText}`);
        expect(resultText?.trim()).toContain('Please provide a search word.');
    }
}