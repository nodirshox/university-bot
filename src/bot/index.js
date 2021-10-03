const { Telegraf } = require("telegraf");
const config = require("../config");
const { commands } = require("./commands");
const { hears } = require("./hears");

require("dotenv").config();

const bot = new Telegraf(config.botToken);

commands(bot);
hears(bot);

bot.launch().then(() => console.log("Bot started"));