const { Builder, By } = require("selenium-webdriver"); // Mengimpor modul Selenium WebDriver
const chrome = require("selenium-webdriver/chrome");
const firefox = require("selenium-webdriver/firefox");
const testData = require("../fixtures/testData.json"); // Mengimpor data pengujian dari file JSON
const LoginPage = require("../Pages/loginPage"); // Mengimpor kelas LoginPage dari file loginPage.js
const InventoryPage = require("../Pages/inventoryPage"); // Mengimpor kelas InventoryPage dari file inventoryPage.js
const fs = require("fs"); // Mengimpor modul file system untuk menangani file
const path = require("path"); // Mengimpor modul path untuk manipulasi direktori atau file
// Menentukan direktori untuk menyimpan screenshot hasil pengujian
const screenshotDir = path.join(__dirname, "../screenshots");
if (!fs.existsSync(screenshotDir)) {
  fs.mkdirSync(screenshotDir);
}

describe("saucedemo add to cart test", function () {
  let driver;
  let browserName = "chrome";
  let loginPage;
  let inventoryPage;
  let options = new chrome.Options();
  options.addArguments("--headless=new","--incognito");
  this.timeout(20000);

  beforeEach(async function () {
    // // Menginisiasi  WebDriver untuk membuka browser 
    driver = await new Builder().forBrowser(browserName).setChromeOptions(options).build();

    // Menginisiasi variabel untuk menyimpan objek dari kelas agar dapat berinteraksi dengan halaman test
    loginPage = new LoginPage(driver);
    inventoryPage = new InventoryPage(driver);

    // Mengakses halaman login di Saucedemo
    await loginPage.open(testData.baseUrl);

    // Melakukan login dengan kredensial yang valid
    await loginPage.login(
      testData.validUser.username,
      testData.validUser.password
    );
    await driver.sleep(1000);

    // Memastikan halaman produk ditampilkan dengan judul yang sesuai
    await inventoryPage.asertTitleText('Products',"Title Does not include Products");
    await driver.sleep(3000);

    console.log("Login success!");
  });

  it("add to cart test", async function () {
    // Menambahkan produk ke dalam keranjang
    await inventoryPage.addToCart();
    // Memeriksa apakah produk berhasil ditambahkan ke keranjang
    await inventoryPage.assertAddToCart("You haven't selected a product yet");
    await driver.sleep(3000);
    console.log("Addtocart success!");  
  });

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
