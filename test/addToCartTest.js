const {
    Builder,
    By
} = require("selenium-webdriver");
const assert = require('assert');
const testData = require("../fixtures/testData.json");
const LoginPage = require("../pages/loginPage");
const InventoryPage = require("../pages/inventoryPage");
const fs = require("fs")
const path = require("path")
const screenshotDir = path.join(__dirname, '../screenshots');
if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir);
}

describe("saucedemo add to cart", function () {
    let driver;
    let browserName = "chrome";
    let loginPage;
    let inventoryPage;
    this.timeout(20000);

    beforeEach(async function () {
        //membuat koneksi dengan browser
        driver = await new Builder().forBrowser(browserName).build();
        loginPage = new LoginPage(driver);
        inventoryPage = new InventoryPage(driver);

        //mengakses website Saucedemo
        await loginPage.open(testData.baseUrl);


        //menginputkan username dan password
        await loginPage.login(testData.validUser.username, testData.validUser.password);
        await driver.sleep(1000);

        // validasi apakah sudah berhasil menampilkan halaman dashboard
        await inventoryPage.getTitleText('Products', "Title does not include Products");
        await driver.sleep(3000);

    });

    it("add to cart test", async function () {

        // Menambahkan produk ke keranjang belanja
        await inventoryPage.addToCart();

        // Validasi apakah produk berhasil ditambahkan ke keranjang
        await inventoryPage.assertAddToCart("You haven't selected a product yet");
        await driver.sleep(3000);

        console.log("Test login success!");
    });

    afterEach(async function () {
        const image = await driver.takeScreenshot();
        fs.writeFileSync(path.join(screenshotDir, `${this.test.title.replace(/[^a-zA-Z0-9-_]/g, "_")}.png`), image, "base64");
        await driver.quit();
    });
})