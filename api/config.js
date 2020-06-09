var config = {}

// SQL Connection
config.sqlConnection = {
	user: 'api',
	password: 'c@rc0ntrol',
	server: 'carcontrol.cjyihpknblow.sa-east-1.rds.amazonaws.com',
	database: 'carcontrol',
	port: 1433
}

// JWT
config.jwt_key = 'c@rc0ntrol';

module.exports = config;
