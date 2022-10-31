const bot = require("./bot");

async function coba() {
  try {
    await bot.init();
    await bot.start();
    await bot.browser.close();
  } catch (error) {
    console.log(error);
  }
}
coba();
