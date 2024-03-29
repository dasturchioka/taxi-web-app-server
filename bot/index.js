require("dotenv").config();
const { Telegraf } = require("telegraf");
const TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const bot = new Telegraf(TOKEN);
const Promise = require("bluebird");

Promise.config({
  cancellation: true,
});

const web_link = "https://taxi-web-app-client.vercel.app/";

bot.start((ctx) =>
  ctx.reply(
    "😊 Assalomu alaykum, taxi ilovamizga xush kelibsiz! Taxi chaqirish uchun pastdagi tugmani bosing",
    {
      reply_markup: {
        keyboard: [[{ text: "Taxi chaqirish 🚕", web_app: { url: web_link } }]],
        resize_keyboard: true,
      },
    }
  )
);

bot.launch(
  {
    webhook: {
      domain: "https://taxi-web-app-server-novda.koyeb.app/",
      port: 3001,
    },
  },
  () => {
    console.log("Bot is launched!");
  }
);

module.exports = bot;
