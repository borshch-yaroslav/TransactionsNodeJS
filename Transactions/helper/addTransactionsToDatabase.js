var pool = require('../helper/connectionPool').pool;

function addTransactions(transactions) {
	pool
			.getConnection(function(err, connection) {
				if (err) {
					console.log({
						"code" : 100,
						"status" : "Error in connection database"
					});

					return;
				}

				console.log('connected as id ' + connection.threadId);

				console.log(transactions);

				var queryString = "";
				
				for (var i = 0; i < transactions.length; i++) {
					queryString += "('" + transactions[i].account + "', '"
							+ transactions[i].description + "', '"
							+ transactions[i].currency_code + "', "
							+ transactions[i].amount + "),";
				}

				var fullQueryString = "INSERT INTO transaction (account,description,currency_code, amount) VALUES"
						+ queryString.substring(0, queryString.length-1);
				console.log(fullQueryString);

				connection.query(fullQueryString, function(err, rows) {
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

module.exports.addTransactions = addTransactions;