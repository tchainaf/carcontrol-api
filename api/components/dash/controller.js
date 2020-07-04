const sql = require('mssql');
const config = require('../../config');

const context = config.sqlConnection;

exports.getReason = (req, res) => {
	//#FT-06# Connect to database
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

		//#FT-06# Get main reason for exchange
		var request = new sql.Request(pool);
		request.input('usuario_id', req.userId);
		request.execute('carcontrol.spPrincipaisMotivos').then(result => {
			if (result.recordset.length == 0) {
				pool.close();
				return res.status(404).json({
					message: 'Informação não encontrada!'
				});
			}

			res.status(200).json({
				item: result.recordset[0],
				message: 'Informação encontrada!'
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

exports.getCategory = (req, res) => {
	//#FT-06# Connect to database
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

		//#FT-06# Get most exchanged category
		var request = new sql.Request(pool);
		request.input('usuario_id', req.userId);
		request.execute('carcontrol.spPrincipaisCategorias').then(result => {
			if (result.recordset.length == 0) {
				pool.close();
				return res.status(404).json({
					message: 'Informação não encontrada!'
				});
			}

			res.status(200).json({
				item: result.recordset[0],
				message: 'Informação encontrada!'
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

exports.getParts = (req, res) => {
	//#FT-06# Connect to database
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

		//#FT-06# Get number of parts
		var request = new sql.Request(pool);
		request.input('usuario_id', req.userId);
		request.execute('carcontrol.spQuantPecas').then(result => {
			if (result.recordset.length == 0) {
				pool.close();
				return res.status(404).json({
					message: 'Informação não encontrada!'
				});
			}

			res.status(200).json({
				item: result.recordset[0],
				message: 'Informação encontrada!'
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

exports.getNextExchange = (req, res) => {
	//#FT-06# Connect to database
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

		//#FT-06# Get next parts to be exchanged
		var request = new sql.Request(pool);
		request.input('usuario_id', req.userId);
		request.execute('carcontrol.spProximaTrocaPeca').then(result => {
			if (result.recordset.length == 0) {
				pool.close();
				return res.status(404).json({
					message: 'Informação não encontrada!'
				});
			}

			res.status(200).json({
				item: result.recordset[0],
				message: 'Informação encontrada!'
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
