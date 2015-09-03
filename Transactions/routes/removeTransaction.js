var express = require('express');
var router = express.Router();
var pool = require('../helper/connectionPool').pool;

function removeTransaction(req, res) {
	pool.getConnection(function(err, connection) {
		if (err) {
			console.log({
				"code" : 100,
				"status" : "Error in connection database"
			});
			
			return;
		}

		console.log('connected as id ' + connection.threadId);

		connection.query("DELETE FROM transaction WHERE id=" + req.param('id'),
				function(err, rows) {
					connection.release();
				});

		connection.on('error', function(err) {
			console.log({
				"code" : 100,
				"status" : "Error in connection database"
			});
			return;
		});
	});
}

router.post('/', function(req, res, next) {
	removeTransaction(req, res);
	var backURL = req.header('Referer') || '/';
	res.redirect(backURL);
});

module.exports = router;
