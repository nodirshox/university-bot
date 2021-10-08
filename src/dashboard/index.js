require("dotenv").config();
const express = require("express");
const config = require("../config");
var path = require("path");
var serveStatic = require("serve-static");

const app = express();
app.use(serveStatic(path.join(__dirname, "dist")));
app.use(express.json());
app.use(express.urlencoded({extended: true})); 

app.use(express.static(__dirname + "src/dashboard/public"));
app.set("views", path.join(__dirname, "./views"));
app.set("view engine", "ejs");

const router = require('./router');
app.use('/', router);

// Bot
const { Telegraf } = require("telegraf");
const { commands } = require("../bot/commands");
const { hears } = require("../bot/hears");
const { listeners } = require("../bot/listeners");
const bot = new Telegraf(config.botToken);

bot.telegram.setWebhook(`${process.env.WEBSITE}/bot${config.botToken}`);
app.use(bot.webhookCallback(`/bot${config.botToken}`));

commands(bot);
hears(bot);
listeners(bot);

bot.catch((err, ctx) => {
    console.log(`Ooops, encountered an error for ${ctx.updateType}`, err);
    ctx.reply("Xatolik yuz berdi");
});

module.exports = app;
