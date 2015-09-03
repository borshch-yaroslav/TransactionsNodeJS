var mysql = require('mysql');

var pool = mysql.createPool({
	connectionLimit : 100, // important
	host : 'localhost',
	user : 'root',
	password : '',
	database : 'transaction_data',
	debug : false
});

var getConnection = function(callback) {
    pool.getConnection(function(err, connection) {
        callback(err, connection);
    });
};

module.exports.connection = getConnection;
module.exports.pool = pool;