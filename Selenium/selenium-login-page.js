const { By, until } = require('selenium-webdriver');

class SeleniumLoginPage {
    constructor(driver) {
        this.driver = driver;
        this.loginLink = By.xpath("//a[contains(text(),'Login Page')]");
        this.usernameInput = By.id("username");
        this.passwordInput = By.id("password");
        this.signInButton = By.id("signin-button");
        this.welcomeHeading = By.xpath("//h1[contains(text(),'Welcome')] | //h2[contains(text(),'Welcome')]");
        this.welcomeUsername = By.xpath("//h2[contains(normalize-space(),'Welcome')]/following-sibling::p[1]");
    }

    async clickLoginLink() {
        const link = await this.driver.wait(until.elementLocated(this.loginLink), 5000);
        await this.driver.wait(until.elementIsVisible(link), 5000);
        await link.click();
    }

    async enterUsername(username) {
        const usernameField = await this.driver.wait(until.elementLocated(this.usernameInput), 5000);
        await this.driver.wait(until.elementIsVisible(usernameField), 5000);
        await usernameField.sendKeys(username);
    }

    async enterPassword(password) {
        const passwordField = await this.driver.wait(until.elementLocated(this.passwordInput), 5000);
        await this.driver.wait(until.elementIsVisible(passwordField), 5000);
        await passwordField.sendKeys(password);
    }

    async clickSignInButton() {
        const signInButton = await this.driver.wait(until.elementLocated(this.signInButton), 5000);
        await this.driver.wait(until.elementIsVisible(signInButton), 5000);
        await signInButton.click();
    }

    async getWelcomeText(){
        const welcomeHeading = await this.driver.wait(until.elementLocated(this.welcomeHeading), 5000);
        await this.driver.wait(until.elementIsVisible(welcomeHeading), 5000);
        return await welcomeHeading.getText();
    }

    async getUsernameOnWelcomePage() {
        const usernameText = await this.driver.wait(until.elementLocated(this.welcomeUsername), 5000);
        await this.driver.wait(until.elementIsVisible(usernameText), 5000);
        return await usernameText.getText();
    }
}

module.exports = { SeleniumLoginPage };