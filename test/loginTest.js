const {
    Builder,
    By
} = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const LoginPage = require("../Pages/loginPage");
const InventoryPage = require("../Pages/inventoryPage");
const testData = require("../fixtures/testData.json");


describe("saucedemo login test", function () {
    let driver;
    let browserName = "chrome";
    let loginPage;
    let inventoryPage;
    let options = new chrome.Options();
    options.addArguments("--headless=new","--incognito");
    this.timeout(20000);

    beforeEach(async function () {
        //membuat koneksi dengan browser
        driver = await new Builder().forBrowser(browserName).setChromeOptions(options).build();
        loginPage = new LoginPage(driver);
        inventoryPage = new InventoryPage(driver);

        //mengakses website Saucedemo
        await loginPage.open(testData.baseUrl);
    });

    it("login success", async function () {
        //menginputkan username dan password
        await loginPage.login(
            testData.validUser.username,
            testData.validUser.password
          );

        // validasi apakah sudah berhasil menampilkan halaman dashboard
        await inventoryPage.asertTitleText('Products',"Title Does not include Products");
        await driver.sleep(5000);

        console.log("Test login success!");
    });

    it("login failed", async function () {
        //menginputkan username dan password
        await loginPage.login(
            testData.invalidUser.username,
            testData.invalidUser.password
          );

        // validasi error massage ketika gagal login
        await loginPage.assertLoginFailed('Username and password do not match any user in this service','Error massage not displayed properly');
        await driver.sleep(5000);

        console.log("Test login failed!");
    });

    afterEach(async function () {
        await driver.quit();
    });
})
