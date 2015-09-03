var express = require('express');
var router = express.Router();
var pool = require('../helper/connectionPool').pool;
var rowsToShow;

var showTransactionsFromDatabase = function(req, res) {
	
	pool.getConnection(function(err, connection) {
		if (err) {
			console.log({
				"code" : 100,
				"status" : "Error in connection database"
			});
			return;
		}

		console.log('connected as id ' + connection.threadId);

		connection.query("select * from transaction ORDER BY id DESC limit 50", function(err, rows) {
			connection.release();
			if (!err) {
				res.render('transactions', {
					title : 'Transactions',
					transactions: rows,
					numberOfRows: rows.length
				});
			}
		});

		connection.on('error', function(err) {
			console.log({
				"code" : 100,
				"status" : "Error in connection database"
			});
			return;
		});
	});
};

router.get('/', function(req, res, next) {

	showTransactionsFromDatabase(req, res);

});

module.exports = router;
