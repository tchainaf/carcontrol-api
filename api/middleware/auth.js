var jwt = require('jsonwebtoken');
var config = require('../config');

//#FT-01# Check the request auth token
function verifyToken(req, res, next) {

	//#FT-01# Don't validate some specific requests
	if (req.originalUrl === '/api/auth/login' || req.originalUrl === '/api/user/create')
		return next();

	//#FT-01# Get token from request headers
	var token = req.headers.authorization;
	if (!token) {
		return res.status(403).send({
			auth: false,
			message: 'Não há token de autenticação, faça login.'
		});
	}

	//#FT-01# Validate token
	jwt.verify(token, config.jwt_key, function (err, decoded) {
		if (err) {
			return res.status(500).send({
				auth: false,
				message: 'Token de autenticação inválido, faça login novamente.'
			});
		}

		//#FT-01# Stores user id in request for later uses
		req.userId = decoded.id_usuario;
		next();
	});
}

module.exports = verifyToken;
