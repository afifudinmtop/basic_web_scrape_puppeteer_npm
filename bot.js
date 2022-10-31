const fs = require("node:fs");
const pptr = require("puppeteer");

let hasil = [];

const bot = {
  browser: null,
  page: null,

  init: async () => {
    bot.browser = await pptr.launch({ headless: true });
    bot.page = await bot.browser.newPage();
    bot.page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36"
    );
  },

  start: async () => {
    for (let index = 1; index < 2; index++) {
      console.log("Halaman " + index);
      const urlWeb =
        "https://books.toscrape.com/catalogue/page-" + index + ".html";
      await bot.page.goto(urlWeb, { waitUntil: "networkidle2" });
      await bot.scrape();
    }

    fs.writeFileSync("./data.json", JSON.stringify(hasil));
  },

  scrape: async () => {
    let targets = await bot.page.$$("article");

    for (const target of targets) {
      try {
        const judul = await target.$eval("h3", (el) => el.innerText);
        const harga = await target.$eval(".price_color", (el) => el.innerText);
        hasil.push({ judul, harga });
      } catch (error) {
        console.log(error);
      }
    }
  },
};

module.exports = bot;
