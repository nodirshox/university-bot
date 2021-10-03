const { start } = require("./start");
const { contact } = require("./contact");
exports.commands = (bot) => {
    bot.command("start", start);
    bot.on("contact", contact);
};