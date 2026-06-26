const test = require('node:test');
const assert = require('node:assert/strict');
const { Builder } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const edge = require('selenium-webdriver/edge');
const firefox = require('selenium-webdriver/firefox');
require('dotenv').config();

const { SeleniumLoginPage } = require('./selenium-login-page');

const browsers = ['chrome', 'MicrosoftEdge', 'firefox'];

function createBrowserDriver(browserName) {
    if (browserName === 'chrome') {
        const options = new chrome.Options()
            .addArguments('--headless=new')
            .addArguments('--no-sandbox')
            .addArguments('--disable-dev-shm-usage')
            .addArguments('--disable-gpu');

        return new Builder()
            .forBrowser('chrome')
            .setChromeOptions(options)
            .build();
    }

    if (browserName === 'MicrosoftEdge') {
        const options = new edge.Options()
            .addArguments('--headless=new')
            .addArguments('--no-sandbox')
            .addArguments('--disable-dev-shm-usage')
            .addArguments('--disable-gpu');

        return new Builder()
            .forBrowser('MicrosoftEdge')
            .setEdgeOptions(options)
            .build();
    }

    const options = new firefox.Options().addArguments('-headless');
    return new Builder()
        .forBrowser('firefox')
        .setFirefoxOptions(options)
        .build();
}

for (const browserName of browsers) {
    test(`Login Test - ${browserName}`, async (t) => {
        const baseUrl = process.env.BASE_URL;
        const loginUsername = process.env.LOGIN_USERNAME;
        const loginPassword = process.env.LOGIN_PASSWORD;

        assert.ok(baseUrl, 'BASE_URL is missing');
        assert.ok(loginUsername, 'LOGIN_USERNAME is missing');
        assert.ok(loginPassword, 'LOGIN_PASSWORD is missing');

        let driver;
        try {
            driver = await createBrowserDriver(browserName);
        } catch (error) {
            t.skip(`Skipping ${browserName}: ${error.message}`);
            return;
        }

        try {
            console.log(`Running browser: ${browserName}`);
            await driver.get(baseUrl);

            const loginPage = new SeleniumLoginPage(driver);
            await loginPage.clickLoginLink();
            await loginPage.enterUsername(loginUsername);
            await loginPage.enterPassword(loginPassword);
            await loginPage.clickSignInButton();

            const welcomeText = await loginPage.getWelcomeText();
            console.log('Welcome message:', welcomeText);
            assert.strictEqual(welcomeText, 'Welcome!', 'Expected welcome text not found');

            const displayedUsername = await loginPage.getUsernameOnWelcomePage();
            console.log('Logged in username:', displayedUsername);
            assert.strictEqual(displayedUsername, loginUsername, 'Displayed username does not match the expected username');
        } finally {
            await driver.quit();
        }
    });
}
