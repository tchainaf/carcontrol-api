const bcrypt = require('bcrypt');
const sql = require('mssql');
const config = require('../../config');

const context = config.sqlConnection;

exports.createUser = (req, res) => {
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

		//#FT-01# Create a new user
		var request = new sql.Request(pool);
		request.input('id_automovel', req.body.id_automovel);
		request.input('nome', req.body.nome);
		request.input('sobrenome', req.body.sobrenome);
		request.input('telefone', req.body.telefone);
		request.input('email', req.body.email);
		request.input('senha', bcrypt.hashSync(req.body.senha, 5)); //#FT-01# Encrypt password
		request.input('km', req.body.quilometragem);
		request.execute('carcontrol.spInsereUser').then(() => {
			res.status(200).json({
				message: 'Usuário criado!'
			});
			pool.close();
		}).catch(err => {
			console.log(err);
			pool.close();
			res.status(500).json({
				message: 'Erro interno no banco de dados.',
				details: err.message
			});
		});
	});
}
