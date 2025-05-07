const { Builder, By } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const LoginPage = require("../Pages/loginPage");
const InventoryPage = require("../Pages/inventoryPage");
const CheckoutPage = require("../Pages/checkoutPage");
const testData = require("../fixtures/testData.json");
const fs = require("fs"); // Mengimpor modul file system untuk menangani file
const path = require("path"); // Mengimpor modul path untuk manipulasi direktori atau file
// Menentukan direktori untuk menyimpan screenshot hasil pengujian
const screenshotDir = path.join(__dirname, "../screenshots");
if (!fs.existsSync(screenshotDir)) {
  fs.mkdirSync(screenshotDir);
}

describe("saucedemo checkout test", function () {
  let driver;
  let browserName = "chrome";
  let loginPage;
  let inventoryPage;
  let checkoutPage;
  let options = new chrome.Options();
  options.addArguments("--start-maximized","--incognito");
  this.timeout(20000);

  beforeEach(async function () {
    //membuat koneksi dengan browser
    driver = await new Builder()
      .forBrowser(browserName)
      .setChromeOptions(options)
      .build();
    loginPage = new LoginPage(driver);
    inventoryPage = new InventoryPage(driver);
    checkoutPage = new CheckoutPage(driver);

    //mengakses website Saucedemo
    await loginPage.open(testData.baseUrl);

    await loginPage.login(
      testData.validUser.username,
      testData.validUser.password
    );
    // Memastikan halaman produk ditampilkan dengan judul yang sesuai
    await inventoryPage.asertTitleText(
      "Products",
      "Title Does not include Products"
    );
    await driver.sleep(3000);

    // Menambahkan produk ke dalam keranjang
    await inventoryPage.addToCart();
    // Memeriksa apakah produk berhasil ditambahkan ke keranjang
    await inventoryPage.assertAddToCart("You haven't selected a product yet");
    await driver.sleep(3000);
    console.log("Addtocart success!");
  });

  it("checkout success", async function () {
    await inventoryPage.goToCart(); // Masuk ke halaman Cart

    await checkoutPage.assertCartItem('Sauce Labs Backpack','29.99',"Products detail not correct");

    await checkoutPage.checkoutCart(); // Count'd ke halaman Checkout Information

    // Input checkout information
    await checkoutPage.checkoutInformation(
      testData.checkoutData.firstname,
      testData.checkoutData.lastname,
      testData.checkoutData.postalcode
    );

    await checkoutPage.checkoutOverview();

    await checkoutPage.assertCheckoutSuccess('header salah','text salah','Success Massage not correct!!!');

    await driver.sleep(3000);
  });


  it("remove item from cart", async function () {
    await inventoryPage.goToCart(); // Masuk ke halaman Cart

    await checkoutPage.removeItem(); // Hapus item dari Cart

    await driver.sleep(3000);
  });

  //   it("login failed", async function () {});

  afterEach(async function () {
    // Mengambil screenshot hasil pengujian
    const image = await driver.takeScreenshot();
    fs.writeFileSync(
      path.join(
        screenshotDir,
        `${this.test.title.replace(/[^a-zA-Z0-9-_]/g, "_")}.png`
      ),
      image,
      "base64"
    );
    // console.log("Capture success!");

    // Menutup browser setelah pengujian selesai
    await driver.quit();
  });
});
