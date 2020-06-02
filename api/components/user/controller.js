const sql = require('mssql');
const config = require('../../config');

const context = config.sqlConnection;

exports.getUsers = (req, res) => {
	return res.status(200).json({
		message: 'get users'
	});
}
