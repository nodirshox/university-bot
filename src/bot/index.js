const { Telegraf } = require("telegraf");
const config = require("../config");
const {commands} = require("./commands");

require("dotenv").config();

const bot = new Telegraf(config.botToken);

commands(bot);

bot.launch().then(() => console.log("Bot started"));