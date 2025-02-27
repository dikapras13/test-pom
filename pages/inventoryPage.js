const{By} = require("selenium-webdriver");
const assert = require('assert');

class InventoryPage{
    constructor(driver){
        this.driver = driver;
        this.titleText = By.css('.title');
    }

    async getTitleText() {
        return await this.driver.findElement(this.titleText).getText();
    }

    async asertTitleText(expectedTitle , assertMessage) {
        const titleText = await this.getTitleText();
        assert.strictEqual(await titleText.includes(expectedTitle), true, assertMessage);
    }

    async addToCart() {
        await this.driver.findElement(By.id('add-to-cart-sauce-labs-backpack')).click();
    }

    async assertAddToCart(assertMessage) {
        let cart = await this.driver.findElement(By.css('.shopping_cart_badge'));
        assert.strictEqual(await cart.isDisplayed(), true, assertMessage);
        
    }
}

module.exports = InventoryPage;
