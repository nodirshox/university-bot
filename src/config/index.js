const config = {
	mongoURL: getConf("MONGO_URL", "mongodb://localhost:27017/bot"),
	botToken: getConf("BOT_TOKEN", "default")
};

function getConf(name, def = "") {
	if (process.env[name]) {
		return process.env[name];
	}
	return def;
}

module.exports = config;
