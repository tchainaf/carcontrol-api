const bcrypt = require('bcrypt');
const sql = require('mssql');
const config = require('../../config');

const context = config.sqlConnection;

exports.getTypes = (req, res) => {
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

		//#FT-01# Get all types
		var request = new sql.Request(pool);
		request.execute('carcontrol.spConsultaTipoAutomovel').then(result => {
			res.status(200).json({
				items: result.recordset,
				message: 'Tipos encontrados!'
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

exports.getListByType = (req, res) => {
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

		//#FT-01# Get all automobiles
		var request = new sql.Request(pool);
		request.input('tipo_id', req.params.id_type);
		request.execute('carcontrol.spConsultaAutomovelporTipo').then(result => {
			var itemsList = [];
			result.recordset.forEach(item => {
				itemsList.push({
					Automovel_ID: item.Automovel_ID,
					desc: item.marca + " " + item.modelo + " " + item.ano + " " + item.cor
				})
			});

			res.status(200).json({
				items: itemsList,
				message: 'Automóveis encontrados!'
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

exports.getAutomobile = (req, res) => {
	//#FT-03# Connect to database
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

		//#FT-03# Get automobile data
		var request = new sql.Request(pool);
		request.input('usuario_id', req.userId); //#BF-01#
		request.execute('carcontrol.spConsultaAutomovel').then(result => {
			if (result.recordset.length == 0) {
				pool.close();
				return res.status(404).json({
					message: 'Automóvel não encontrado!'
				});
			}

			res.status(200).json({
				auto: result.recordset[0],
				message: 'Automóvel encontrado!'
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

exports.updateAutomobile = (req, res) => {
	//#FT-03# Connect to database
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

		//#FT-03# Update automobile from user
		var request = new sql.Request(pool);
		request.input('usuario_id', req.userId);
		request.input('automovel_id', req.body.automovel_id); //#BF-01#
		request.input('quilometragem', req.body.quilometragem);
		request.execute('carcontrol.spAlteraVeiculoUsuario').then(() => {
			res.status(200).json({
				message: 'Automóvel alterado!'
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

exports.updateKilometers = (req, res) => {
	//#FT-05# Connect to database
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

		//#FT-05# Update user's automobile kilometers
		var request = new sql.Request(pool);
		request.input('usuario_id', req.userId);
		request.input('quilometragem', req.body.quilometragem);
		request.execute('carcontrol.spAtualizaQuilometragem').then(() => {
			res.status(200).json({
				message: 'Quilometragem atualizada!'
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
