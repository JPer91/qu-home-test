import { test, expect } from '@playwright/test';
import { SearchPage } from '../POMs/search-page';

test('Search Test', async ({ page }) => {
const searchPage = new SearchPage(page);
        await searchPage.goto();
        await searchPage.search();
        await searchPage.searchResult();
    await page.close();
});

test('Blank Search Test', async ({ page }) => {
    const searchPage = new SearchPage(page);
        await searchPage.goto();
        await searchPage.searchBlank();
        await searchPage.blankSearchResult();
    await page.close();
});