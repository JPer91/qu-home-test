 import { expect, Locator, Page } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  readonly loginPage: Locator;
  readonly userName: Locator;
  readonly password: Locator;
  readonly signInButton: Locator;
  readonly welcomeMessage: Locator;
  readonly userWelcome: Locator;
  readonly wrongCredentials: Locator;
  readonly blankCredentials: Locator;

  constructor(page: Page) {
    this.page = page;
    this.loginPage = page.getByRole('link', { name: 'Login Page' });
    this.userName = page.getByRole('textbox', { name: 'USERNAME' });
    this.password = page.getByRole('textbox', { name: 'PASSWORD' });
    this.signInButton = page.getByRole('button', { name: 'Sign In' });
    this.welcomeMessage = page.getByRole('heading', { name: 'Welcome' });
    this.userWelcome = page.getByText('johndoe19');
    this.wrongCredentials = page.getByRole('heading', { name: 'Wrong credentials' });
    this.blankCredentials = page.getByRole('heading', { name: 'Fields can not be empty' });
  }

  async loginLink(){
    await this.loginPage.isVisible({ timeout: 5000 });
    await this.loginPage.click();
  }

  async userNameField(username: string = process.env.LOGIN_USERNAME as string){
    await this.userName.isVisible({ timeout: 5000 });
    await this.password.isVisible({ timeout: 5000 });
    await this.signInButton.isVisible({ timeout: 5000 });
    await this.userName.click();
    await this.userName.fill(username);
  }

  async passwordField(password: string = process.env.LOGIN_PASSWORD as string){
    await this.password.click();
    await this.password.fill(password);
  }

  async signIn(){
    await this.signInButton.click();
  }

  async verifyWelcomeMessage(){
    await expect(this.welcomeMessage).toBeVisible({ timeout: 5000 });
    await expect(this.userWelcome).toBeVisible({ timeout: 5000 });
    const welcomeHeaderText = await this.welcomeMessage.textContent();
    console.log('Welcome message text:', welcomeHeaderText);
    const welcomeText = await this.userWelcome.textContent();
    console.log('User welcome text:', welcomeText);
    expect(welcomeHeaderText?.trim()).toContain('Welcome');
    expect(welcomeText?.trim()).toBe(process.env.LOGIN_USERNAME);
    return { welcomeHeaderText, welcomeText };
  }
async verifyWrongCredentials(){
    await expect(this.wrongCredentials).toBeVisible({ timeout: 5000 });
    const wrongCredentialsMessage = await this.wrongCredentials.textContent();
    console.log('Wrong credentials message:', wrongCredentialsMessage);
    expect(wrongCredentialsMessage?.trim()).toContain('Wrong credentials');
    return wrongCredentialsMessage;
  }
  async verifyBlankCredentials(){
    await expect(this.blankCredentials).toBeVisible({ timeout: 5000 });
    const blankCredentialsMessage = await this.blankCredentials.textContent();
    console.log('Blank credentials message:', blankCredentialsMessage);
    expect(blankCredentialsMessage?.trim()).toContain('Fields can not be empty');
    return blankCredentialsMessage;
  }
}
