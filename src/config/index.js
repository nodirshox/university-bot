const config = {
	mongoURL: getConf("MONGO_URL", "mongodb://localhost:27017/bot"),
	botToken: getConf("BOT_TOKEN", "default"),
	httpPort: getConf("PORT", 3000),
	botPort: getConf("BOT_PORT", 3001),
	website: getConf("WEBSITE", "")
};

function getConf(name, def = "") {
	if (process.env[name]) {
		return process.env[name];
	}
	return def;
}

module.exports = config;
