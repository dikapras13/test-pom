const {
    By
} = require("selenium-webdriver"); // Mengimpor modul By dari Selenium WebDriver
const assert = require('assert'); // Mengimpor modul assert untuk melakukan validasi dalam pengujian

class LoginPage {
    constructor(driver) {
        this.driver = driver;
       
        this.usernameInput = By.id('user-name');  // Locator untuk input username       
        this.passwordInput = By.id('password'); // Locator untuk input password        
        this.loginButton = By.id('login-button');  // Locator untuk tombol login       
        this.errorMassage = By.css('.error-message-container'); // Locator untuk pesan error jika login gagal
    }

    // Membuka halaman dengan URL yang diberikan
    async open(url) {
        await this.driver.get(url);
    }

    // Melakukan login dengan username dan password
    async login(username, password) {
        await this.driver.findElement(this.usernameInput).sendKeys(username);
        await this.driver.findElement(this.passwordInput).sendKeys(password);
        await this.driver.findElement(this.loginButton).click();
    }

    // Mengambil pesan error jika login gagal
    async getErrorMessage() {
        return await this.driver.findElement(this.errorMassage).getText();
    }

    // Memeriksa apakah pesan error sesuai dengan yang diharapkan
    async assertLoginFailed(expectedErrorMessage, assertMessage) {
        const errorMassage = await this.getErrorMessage();
        assert.strictEqual( errorMassage.includes(expectedErrorMessage), true, assertMessage);
    }
}

module.exports = LoginPage;