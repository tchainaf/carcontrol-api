const bcrypt = require('bcrypt');
const sql = require('mssql');
const config = require('../../config');

const context = config.sqlConnection;

exports.getCategories = (req, res) => {
	//#FT-04# Connect to database
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

		//#FT-04# Get all categories
		var request = new sql.Request(pool);
		request.execute('carcontrol.spConsultaCategoria').then(result => {
			res.status(200).json({
				items: result.recordset,
				message: 'Categorias encontradas!'
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

exports.getListByCategory = (req, res) => {
	//#FT-04# Connect to database
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

		//#FT-04# Get all parts of this category
		var request = new sql.Request(pool);
		request.input('categoria', req.params.category);
		request.input('usuario_id', req.userId);
		request.execute('carcontrol.spConsultaPecaporCategoria').then(result => {
			res.status(200).json({
				items: result.recordset,
				message: 'Peças encontradas!'
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

exports.getPart = (req, res) => {
	//#FT-04# Connect to database
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

		//#FT-04# Get data of part
		var request = new sql.Request(pool);
		request.input('categoria', req.params.category);
		request.input('usuario_id', req.userId);
		request.execute('carcontrol.spConsultaPecaDetalhada').then(result => {
			if (result.recordset.length == 0) {
				pool.close();
				return res.status(404).json({
					message: 'Peça não encontrada!'
				});
			}

			res.status(200).json({
				part: result.recordset[0],
				message: 'Peça encontrada!'
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

exports.putPart = (req, res) => {
	//#FT-04# Connect to database
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

		//#FT-04# Send new part data
		var request = new sql.Request(pool);
		request.input('automovel_id', req.body.id_automovel);
		request.input('peca_id', req.body.id_peca);
		request.input('motivo_id', req.body.id_motivo);
		request.input('usuario_id', req.idUser);
		request.execute('carcontrol.spIncluiPeca').then(() => {
			res.status(200).json({
				message: 'Peça atualizada!'
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
