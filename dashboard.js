require('dotenv').config();
const express = require('express');
var path = require('path');
var serveStatic = require('serve-static');
const config = require('./src/config');

const app = express();
app.use(serveStatic(path.join(__dirname, 'dist')));
const router = require('./src/dashboard/router');

app.use(express.json());
app.use(express.urlencoded({extended: true})); 

app.use(express.static('public'));
app.set('views', 'views');
app.set('view engine', 'ejs');

// Bot
const { Telegraf } = require("telegraf");
const { commands } = require("./src/bot/commands");
const { hears } = require("./src/bot/hears");
const { listeners } = require("./src/bot/listeners");
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

app.use('/', router);

module.exports = app;
