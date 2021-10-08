const { Telegraf } = require("telegraf");
const config = require("../config");
const { commands } = require("./commands");
const { hears } = require("./hears");
const { listeners } = require("./listeners");

require("dotenv").config();

const bot = new Telegraf(config.botToken);

commands(bot);
hears(bot);
listeners(bot);

bot.catch((err, ctx) => {
    console.log(`Ooops, encountered an error for ${ctx.updateType}`, err);
    ctx.reply("Xatolik yuz berdi");
});


bot.launch(
    {
        webhook: {
            domain: process.env.WEBSITE,
            port: process.env.PORT
        }
    }
).then(() => console.log("Bot started"));