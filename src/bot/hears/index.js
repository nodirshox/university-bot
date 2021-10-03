const { organization } = require("./organization");

exports.hears = (bot) => {
    bot.hears("Barcha universitetlar", organization);
};
