import { test } from '@playwright/test';
import { LoginPage } from '../POMs/login-page';

test('Login Success', async ({ page }) => {
  await page.goto('/login');

  const loginPage = new LoginPage(page);
  await loginPage.userNameField();
  await loginPage.passwordField();
  await loginPage.signIn();
  await loginPage.verifyWelcomeMessage();
  await page.close();
}
);

test('Login Failure A - Wrong Username and Password', async ({ page }) => {
  await page.goto('/login');

  const loginPage = new LoginPage(page);
  await loginPage.userNameField('invaliduser');
  await loginPage.passwordField('invalidpassword');
  await loginPage.signIn();
  await loginPage.verifyWrongCredentials();
  await page.close();
}
);

test('Login Fields Blank', async ({ page }) => {
  await page.goto('/login');

  const loginPage = new LoginPage(page);
  await loginPage.userNameField('');
  await loginPage.passwordField('');
  await loginPage.signIn();
  await loginPage.verifyBlankCredentials();
  await page.close();
}
);