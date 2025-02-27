const {
    By
} = require("selenium-webdriver");
const assert = require('assert');

class LoginPage {
    constructor(driver) {
        this.driver = driver;
        this.usernameInput = By.id('user-name');
        this.passwordInput = By.id('password');
        this.loginButton = By.id('login-button');
        this.errorMassage = By.css('.error-message-container');
    }

    async open(url) {
        await this.driver.get(url);
    }

    async login(username, password) {
        await this.driver.findElement(this.usernameInput).sendKeys(username);
        await this.driver.findElement(this.passwordInput).sendKeys(password);
        await this.driver.findElement(this.loginButton).click();
    }

    async getErrorMessage() {
        return await this.driver.findElement(this.errorMassage).getText();
    }

    async assertLoginFailed(expectedErrorMessage, assertMessage) {
        const errorMassage = await this.getErrorMessage();
        assert.strictEqual( errorMassage.includes(expectedErrorMessage), true, assertMessage);
    }
}

module.exports = LoginPage;