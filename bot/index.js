require("dotenv").config()
const { Telegraf } = require("telegraf");
const TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const bot = new Telegraf(TOKEN);

const web_link = "https://taxi-web-app-client.vercel.app/select-taxi/";

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

bot.launch().then(() => {
  console.log("Bot is launched!");
});

module.exports = bot;
