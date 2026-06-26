import { Locator, Page, expect } from "@playwright/test";

export class MenuPage {
  readonly page: Page;
  readonly item: Locator;
  readonly price: Locator;

  constructor(page: Page,) {
    this.page = page;
    this.item = this.page.locator('div:nth-child(7)');
    this.price = this.page.locator('div:nth-child(7) > p');
  }

  async goto() {
    await this.page.goto(process.env.BASE_URL + '/grid');
  }

  async assertItemName(){
        await this.item.isVisible();
        await expect(this.item).toContainText('Super Pepperoni');
        console.log('Verified item at position 7: Super Pepperoni');
  }

  async assertItemPrice(){
        await this.item.isVisible();
        await expect(this.item).toContainText('$10');
        console.log('Verified item at position 7: $10');
  }

  async assertAllItemsHaveRequiredContent() {
    const items = this.page.locator('div').filter({ has: this.page.locator('img') });
    const count = await items.count();

    for (let i = 0; i < count; i++) {
      const item = items.nth(i);
      const title = item.locator('h1, h2, h3, h4, p').first();
      const price = item.locator('p').filter({ hasText: '$' }).first();
      const image = item.locator('img').first();
      const button = item.locator('button, .btn').first();

      const titleText = await title.textContent();
      const priceText = await price.textContent();

      expect(titleText?.trim()).not.toBe('');
      expect(priceText?.trim()).not.toBe('');
      await expect(image).toBeVisible();
      await expect(button).toBeVisible();

      console.log(`Verified item ${i + 1} has title, price, image, and button`);
    }
  }
}