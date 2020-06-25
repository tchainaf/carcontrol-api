var config = {}

// SQL Connection
config.sqlConnection = {
	user: 'api_reader',
	password: '@api_reader',
	server: 'carcontrol.cjyihpknblow.sa-east-1.rds.amazonaws.com',
	database: 'carcontrol',
	port: 1433
}

// JWT
config.jwt_key = 'c@rc0ntrol';

module.exports = config;
