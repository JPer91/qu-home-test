import { test } from '@playwright/test';
import { MenuPage } from '../POMs/menu-page';


test('Grid Item Test', async ({ page }) => {
  const menuPage = new MenuPage(page);
    await menuPage.goto();
    await menuPage.assertItemName();
    await menuPage.assertItemPrice();
  await page.close();
});

test('Grid All Items Test ', async ({ page }) => {
  const menuPage = new MenuPage(page);
    await menuPage.goto();
    await menuPage.assertAllItemsHaveRequiredContent();
  await page.close();
})

