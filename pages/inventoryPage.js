const { By } = require("selenium-webdriver"); // Mengimpor modul By dari Selenium WebDriver
const assert = require('assert'); // Mengimpor modul assert untuk melakukan validasi dalam pengujian


class InventoryPage{
    constructor(driver){
        this.driver = driver;

        // Locator untuk halaman Inventory
        this.titleText = By.css('.title');
        this.backpack = By.id('add-to-cart-sauce-labs-backpack');
        this.cartIcon = By.css('.shopping_cart_badge');
        this.btnCart = By.css('.shopping_cart_link');
    }

    // Mengambil teks dari judul halaman
    async getTitleText() {
        return await this.driver.findElement(this.titleText).getText();
    }

    // Memastikan teks judul halaman sesuai dengan yang diharapkan
    async asertTitleText(expectedTitle , assertMessage) {
        const titleText = await this.getTitleText();
        assert.strictEqual(await titleText.includes(expectedTitle), true, assertMessage);
    }

    // Menambahkan produk "Sauce Labs Backpack" ke keranjang belanja
    async addToCart() {
        await this.driver.findElement(this.backpack).click();
    }

    // Memeriksa apakah produk berhasil ditambahkan ke keranjang
    async assertAddToCart(assertMessage) {
        let cart = await this.driver.findElement(this.cartIcon);
        assert.strictEqual(await cart.isDisplayed(), true, assertMessage);
        
    }

    async goToCart() {
        await this.driver.findElement(this.btnCart).click();
    }
}

module.exports = InventoryPage;
