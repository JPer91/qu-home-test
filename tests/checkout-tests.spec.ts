import { test, expect } from '@playwright/test';
import { checkoutPage } from '../POMs/checkout-page';

test('Checkout Success', async ({ page }) => {
  const checkoutPageInstance = new checkoutPage(page);
    await checkoutPageInstance.goto();
    await checkoutPageInstance.fillBillingAddress();
    await checkoutPageInstance.shippingAddressCheckbox();
    await checkoutPageInstance.fillPaymentInfo();
    await checkoutPageInstance.continueToCheckout();
    await checkoutPageInstance.verifyOrderConfirmation();
  await page.close();
});

test('Checkout Alert', async ({ page }) => {
  const checkoutPageInstance = new checkoutPage(page);
    await checkoutPageInstance.goto();
    await checkoutPageInstance.fillBillingAddress();
    await checkoutPageInstance.shippingAddressCheckboxUncheck();
    await checkoutPageInstance.fillPaymentInfo();
    const alertMessage = await checkoutPageInstance.continueToCheckoutExpectAlert();
    expect(alertMessage).toContain('Shipping address same as billing checkbox must be selected.');
  await page.close();
});

test('Cart Total Correct', async ({ page }) => {
  const checkoutPageInstance = new checkoutPage(page);
    await checkoutPageInstance.goto();
    await checkoutPageInstance.assertCartTotals();
  await page.close();
});