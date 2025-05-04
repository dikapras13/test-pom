const { By } = require("selenium-webdriver"); // Mengimpor modul By dari Selenium WebDriver
const assert = require('assert'); // Mengimpor modul assert untuk melakukan validasi dalam pengujian


class InventoryPage{
    constructor(driver){
        this.driver = driver;

        // Locator untuk judul halaman
        this.titleText = By.css('.title');
        this.backpack = By.id('add-to-cart-sauce-labs-backpack');
        this.cartIcon = By.xpath("//span[@class='shopping_cart_badge']");
        this.cartIcon1 = By.css('.shopping_cart_badge');
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
        let cart = await this.driver.findElement(this.cartIcon1);
        assert.strictEqual(await cart.isDisplayed(), true, assertMessage);
        
    }
}

module.exports = InventoryPage;
