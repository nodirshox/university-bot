const { callbackQuery } = require("./callbackQuery");

exports.listeners = (bot) => {
    bot.on('callback_query', (ctx) => callbackQuery(ctx));
}