const config = {
	mongoURL: getConf("MONGO_URL", "mongodb://localhost:27017/bot"),
	botToken: getConf("BOT_TOKEN", "default"),
	groupInviteLink: getConf("GROUP_INVITE_LINK", "http://t.me")
};

function getConf(name, def = "") {
	if (process.env[name]) {
		return process.env[name];
	}
	return def;
}

module.exports = config;
