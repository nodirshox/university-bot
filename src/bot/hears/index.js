const { organization } = require("./organization");
const { channel } = require("./channel");
const { group } = require("./group");
const { help } = require("./help");

const { BTN_UNIVERSITY, BTN_CHANNEL, BTN_GROUP, BTN_HELP } = require("../state");

exports.hears = (bot) => {
    bot.hears(BTN_UNIVERSITY, organization);
    bot.hears(BTN_CHANNEL, channel);
    bot.hears(BTN_GROUP, group);
    bot.hears(BTN_HELP, help);
};
