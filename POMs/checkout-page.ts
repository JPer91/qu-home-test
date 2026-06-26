import { expect, Locator, Page } from "@playwright/test";

export class checkoutPage {
  readonly page: Page;
  readonly fullNameInput: Locator;
  readonly emailInput: Locator;
  readonly addressInput: Locator;
  readonly cityInput: Locator;
  readonly stateInput: Locator;
  readonly zipInput: Locator;
  readonly shippingAddressSameCheckbox: Locator;
  readonly nameOnCardInput: Locator;
  readonly creditCardNumberInput: Locator;
  readonly expMonthSelect: Locator;
  readonly expYearInput: Locator;
  readonly cvvInput: Locator;
  readonly checkoutButton: Locator;
  readonly orderConfirmationMessage: Locator;
  readonly orderNumber: Locator;

  constructor(page: Page) {
    this.page = page;
    this.fullNameInput = page.getByRole('textbox', { name: ' Full Name' });
    this.emailInput = page.getByRole('textbox', { name: ' Email' });
    this.addressInput = page.getByRole('textbox', { name: ' Address' });
    this.cityInput = page.getByRole('textbox', { name: ' City' });
    this.stateInput = page.getByRole('textbox', { name: 'State' });
    this.zipInput = page.getByRole('textbox', { name: 'Zip' });
    this.shippingAddressSameCheckbox = page.getByRole('checkbox', { name: 'Shipping address same as' });
    this.nameOnCardInput = page.getByRole('textbox', { name: 'Name on Card' });
    this.creditCardNumberInput = page.getByRole('textbox', { name: 'Credit card number' });
    this.expMonthSelect = page.getByLabel('Exp Month');
    this.expYearInput = page.getByRole('textbox', { name: 'Exp Year' });
    this.cvvInput = page.getByRole('textbox', { name: 'CVV' });
    this.checkoutButton = page.getByRole('button', { name: 'Continue to checkout' });
    this.orderConfirmationMessage = page.getByRole('heading', { name: 'Order Confirmed' });
    this.orderNumber = page.getByRole('heading', { name: 'Order Number' });
  }

  async goto() {
    await this.page.goto(process.env.BASE_URL + '/checkout');
  }

  async fillBillingAddress() {
    await this.fullNameInput.fill('Test User');
    await this.emailInput.fill('Test@Test.com');
    await this.addressInput.fill('123 Test St');
    await this.cityInput.fill('Testing');
    await this.stateInput.fill('MA');
    await this.zipInput.fill('11111');
  }

  async fillPaymentInfo() {
    await this.nameOnCardInput.fill('Test User');
    await this.creditCardNumberInput.fill('4111111111111111');
    await this.expMonthSelect.selectOption('June');
    await this.expYearInput.fill('2028');
    await this.cvvInput.fill('123');
  }

  async shippingAddressCheckbox() {
    const isChecked = await this.shippingAddressSameCheckbox.isChecked();
        console.log(`Shipping address checkbox checked: ${isChecked}`);

    if (!isChecked) {
      await this.shippingAddressSameCheckbox.check();
    }
        console.log('Shipping address checkbox checked');
  };

  async shippingAddressCheckboxUncheck() {
    const isChecked = await this.shippingAddressSameCheckbox.isChecked();
        console.log(`Shipping address checkbox checked: ${isChecked}`);

    if (isChecked) {
      await this.shippingAddressSameCheckbox.uncheck();
    }
        console.log('Shipping address checkbox unchecked');
  };

async continueToCheckout() {
  await this.checkoutButton.click();
};

async continueToCheckoutExpectAlert() {
  const dialogPromise = this.page.waitForEvent('dialog', { timeout: 5000 });
  await this.checkoutButton.click();
  const dialog = await dialogPromise;
  await dialog.accept();
  await expect(this.checkoutButton).toBeVisible();
  await this.fullNameInput.fill('Test User'); // Confirms that the page is interactive after the alert is accepted
};

  async verifyOrderConfirmation() {
    await expect(this.orderConfirmationMessage).toBeVisible();
    const orderConfirmation = await this.orderConfirmationMessage.textContent();
    console.log(`Order Confirmation: ${orderConfirmation}`);
    expect(orderConfirmation?.trim()).toContain('Order Confirmed');

    await expect(this.page.locator('p[data-id="ordernumber"]')).toBeVisible();
    const orderNumber = await this.page.locator('p[data-id="ordernumber"]').textContent();
    console.log(`Order Number: ${orderNumber}`);
    expect(orderNumber?.trim()).not.toBe('');
  }

  async assertCartTotals() {
    const expectedProducts = [
      { name: 'Product1' },
      { name: 'Product2' },
      { name: 'Product3' },
      { name: 'Product4' },
      { name: 'Product5' },
      { name: 'Product6' },
    ];

    let total = 0;

    for (const product of expectedProducts) {
      const row = this.page.locator('p').filter({ hasText: product.name }).first();
      await row.waitFor();
      const text = await row.textContent();
      const priceText = text?.match(/\$(\d+(?:\.\d+)?)/)?.[1];

      if (!priceText) {
        throw new Error(`Could not find price for ${product.name}`);
      }

      const price = parseFloat(priceText);
      total += price;
      console.log(`${product.name} price pulled from page: $${price}`);
    }

    const totalText = await this.page.locator('p').filter({ hasText: 'Total' }).last().textContent();
    const displayedTotal = parseFloat(totalText?.replace(/[^0-9.]/g, '') || '0');

    console.log(`Cart total check: computed=${total.toFixed(2)}, displayed=${displayedTotal}`);

    if (displayedTotal !== Number(total.toFixed(2))) {
      throw new Error(`Total mismatch: expected ${total.toFixed(2)}, got ${displayedTotal}`);
    }
  }
};
