const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sql = require('mssql');
const config = require('../../config');

const context = config.sqlConnection;

//#FT-01# Validate user and password
exports.login = (req, res) => {
	//#FT-01# Connect to database
	var pool = new sql.ConnectionPool(context);
	pool.connect(err => {
		if (err) {
			console.log(err);
			pool.close();
			return res.status(500).json({
				message: 'Não foi possível conectar ao banco de dados.',
				details: err.message
			});
		}

		//#FT-01# Get user through email
		var request = new sql.Request(pool);
		request.input('email', req.body.email);
		request.execute('carcontrol.spConsultaLogin').then(result => {
			//#FT-01# Stores user data
			var user = result.recordset[0];
			if (user == null) {
				pool.close();
				return res.status(404).send({
					auth: false,
					token: null,
					message: 'E-mail não cadastrado!'
				});
			}

			//#FT-01# Check password
			if (!bcrypt.compareSync(req.body.senha, user.senha)) {
				pool.close();
				return res.status(401).send({
					auth: false,
					token: null,
					message: 'Senha incorreta!'
				});
			}

			//#FT-01# Create a token
			var userData = { id: user.Usuario_ID, nome: user.nome };
			var token = jwt.sign({ userData }, config.jwt_key, {
				expiresIn: "4h"
			});

			res.status(200).json({
				auth: true,
				token: token,
				message: 'Usuário autenticado!'
			});
			pool.close();
		}).catch(err => {
			console.log(err);
			pool.close();
			res.status(500).json({
				auth: false,
				token: null,
				message: 'Erro interno no banco de dados.',
				details: err.message
			});
		});
	});
}

//#FT-01# Remove the user token
exports.logout = (req, res) => {
	res.status(200).send({
		auth: false,
		token: null,
		message: 'Sessão finalizada!'
	});
}
