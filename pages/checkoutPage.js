const { By } = require("selenium-webdriver"); // Mengimpor modul By dari Selenium WebDriver
const assert = require("assert"); // Mengimpor modul assert untuk melakukan validasi dalam pengujian

class CheckoutPage {
  constructor(driver) {
    this.driver = driver;

    // Locator untuk halaman Cart
    this.titleText = By.css(".title");
    this.btnRemoveBackpack = By.id("remove-sauce-labs-backpack");
    this.btnCheckout = By.id("checkout");
    this.btnBackShopping = By.id("continue-shopping");
    this.inputFirstName = By.id("first-name");
    this.inputLastName = By.id("last-name");
    this.inputPostalCode = By.id("postal-code");
    this.btnContinue = By.id("continue");
    this.btnFinish = By.id("finish");
    this.itemName = By.css(".inventory_item_name");
    this.itemPrice = By.css(".inventory_item_price");
    this.successHeader = By.css(".complete-header");
    this.successText = By.css(".complete-text");
  }

  async checkoutCart() {
    await this.driver.findElement(this.btnCheckout).click();
  }

  async assertCartItem(dataItemName,dataItemPrice,assertMessage) {
    let expectedItemName = await this.driver.findElement(this.itemName).getText();
    assert.strictEqual(
        expectedItemName.includes(dataItemName),
      true,assertMessage
    );

    let expectedItemPrice = await this.driver.findElement(this.itemPrice).getText();
    assert.strictEqual(
        expectedItemPrice.includes(dataItemPrice),
      true,assertMessage
    );
  }

  async checkoutInformation(dataFirstName, dataLastName, dataPostalCode) {
    await this.driver.findElement(this.inputFirstName).sendKeys(dataFirstName);
    await this.driver.findElement(this.inputLastName).sendKeys(dataLastName);
    await this.driver
      .findElement(this.inputPostalCode)
      .sendKeys(dataPostalCode);

    await this.driver.sleep(3000);
    await this.driver.findElement(this.btnContinue).click();
  }

  async checkoutOverview() {
    await this.driver.findElement(this.btnFinish).click();
  }

  async removeItem() {
    await this.driver.findElement(this.btnRemoveBackpack).click();
  }

  async backShopping() {
    await this.driver.findElement(this.btnBackShopping).click();
  }


  async assertCheckoutSuccess(dataSuccessHeader,dataSuccessText,assertMessage) {
    let expectedSuccessHeader = await this.driver.findElement(this.successHeader).getText();
    assert.strictEqual(
        expectedSuccessHeader.includes(dataSuccessHeader),
      true,assertMessage
    );

    let expectedSuccessText = await this.driver.findElement(this.successText).getText();
    assert.strictEqual(
        expectedSuccessText.includes(dataSuccessText),
      true,assertMessage
    );
  }
}

module.exports = CheckoutPage;
