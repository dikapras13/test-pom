const {
    Builder,
    By
} = require("selenium-webdriver");
const assert = require('assert');
const LoginPage = require("../pages/loginPage");
const InventoryPage = require("../pages/inventoryPage");


describe("saucedemo login test", function () {
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
        await loginPage.open("https://www.saucedemo.com/");
    });

    it("login success", async function () {
        //menginputkan username dan password
        await loginPage.login("standard_user","secret_sauce");

        // validasi apakah sudah berhasil menampilkan halaman dashboard
        await inventoryPage.asertTitleText('Products',"Title Does not include Swag Labs");
        await driver.sleep(5000);

        console.log("Test login success!");
    });

    it("login failed", async function () {
        //menginputkan username dan password
        await loginPage.login("standart_user","123456");

        // validasi error massage ketika gagal login
        await loginPage.assertLoginFailed('Username and password do not match any user in this service','Error massage not displayed properly');
        await driver.sleep(5000);

        console.log("Test login failed!");
    });

    afterEach(async function () {
        await driver.quit();
    });
})
