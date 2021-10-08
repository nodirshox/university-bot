const { callbackQuery } = require('./callbackQuery');
const { inlineQuery } = require('./inlineQuery')

exports.listeners = (bot) => {
    bot.on('callback_query', (ctx) => callbackQuery(ctx));
    bot.on('inline_query', (ctx) => inlineQuery(ctx));
}