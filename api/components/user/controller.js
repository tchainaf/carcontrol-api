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
		request.input('automovel_id', req.body.id_automovel);
		request.input('nome', req.body.nome);
		request.input('sobrenome', req.body.sobrenome);
		request.input('telefone', req.body.telefone);
		request.input('email', req.body.email);
		request.input('senha', bcrypt.hashSync(req.body.senha, 5)); //#FT-01# Encrypt password
		request.input('quilometragem', req.body.quilometragem);
		request.execute('carcontrol.spIncluiOuAlteraUsuario').then(() => {
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

exports.readUser = (req, res) => {
	//#FT-02# Connect to database
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

		//#FT-02# Get user data
		var request = new sql.Request(pool);
		request.input('usuario_id', req.params.id);
		request.execute('carcontrol.spConsultaUsuario').then(result => {
			if (result.recordset.length == 0) {
				pool.close();
				return res.status(404).json({
					message: 'Usuário não encontrado!'
				});
			}

			res.status(200).json({
				user: result.recordset[0],
				message: 'Usuário encontrado!'
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

exports.updateUser = (req, res) => {
	//#FT-02# Connect to database
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

		//#FT-02# Update user data
		var request = new sql.Request(pool);
		request.input('usuario_id', req.body.id_usuario);
		request.input('automovel_id', req.body.id_automovel);
		request.input('nome', req.body.nome);
		request.input('sobrenome', req.body.sobrenome);
		request.input('telefone', req.body.telefone);
		request.input('email', req.body.email);
		request.input('senha', bcrypt.hashSync(req.body.senha, 5)); //#FT-01# Encrypt password
		request.input('quilometragem', req.body.quilometragem);
		request.execute('carcontrol.spIncluiOuAlteraUsuario').then(() => {
			res.status(200).json({
				message: 'Usuário alterado!'
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

exports.deleteUser = (req, res) => {
	//#FT-02# Connect to database
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

		//#FT-02# Delete user data
		var request = new sql.Request(pool);
		request.input('usuario_id', req.params.id);
		request.execute('carcontrol.spApagaUsuario').then(() => {
			res.status(200).json({
				message: 'Usuário removido!'
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
