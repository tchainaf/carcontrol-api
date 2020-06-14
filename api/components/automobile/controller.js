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
		request.input('idtipo', req.params.idtipo);
		request.execute('carcontrol.spConsultaAutomovel').then(result => {
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
