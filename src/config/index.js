const config = {
	mongoHost: getConf("MONGO_HOST", "localhost"),
	mongoPort: getConf("MONGO_PORT", "27017"),
	mongoDatabase: getConf("MONGO_DATABASE", "bot"),
	mongoUser: getConf("MONGO_USER", "bot"),
	mongoPassword: getConf("MONGO_PASSWORD", "default"),
	botToken: getConf("BOT_TOKEN", "default")
};

function getConf(name, def = "") {
	if (process.env[name]) {
		return process.env[name];
	}
	return def;
}

module.exports = config;
