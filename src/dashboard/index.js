require('dotenv').config();
const express = require('express');
var path = require('path');
var serveStatic = require('serve-static');
const config = require('../config');

const app = express();
app.use(serveStatic(path.join(__dirname, 'dist')));
const router = require('./router');

app.use(express.urlencoded({extended: true})); 

app.use(express.static('public'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use('/', router);

// Bot
const { Telegraf } = require("telegraf");
const { commands } = require("../bot/commands");
const { hears } = require("../bot/hears");
const { listeners } = require("../bot/listeners");
const bot = new Telegraf(config.botToken);

commands(bot);
hears(bot);
listeners(bot);

bot.catch((err, ctx) => {
    console.log(`Ooops, encountered an error for ${ctx.updateType}`, err);
    ctx.reply("Xatolik yuz berdi");
});

app.use(bot.webhookCallback("/bot"));
bot.telegram.setWebhook(`${process.env.WEBSITE}/bot`);

module.exports = app;
