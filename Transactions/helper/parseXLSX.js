//Converter Class 
var fs = require("fs");
var xlsx = require('node-xlsx');

var fieldValidator = require('../helper/fieldValidator');

var addTransactions = require('../helper/addTransactionsToDatabase').addTransactions;



var parseXLSX = function(file, req, res) {
	
	var generalResult = "";
	var result = [];
	var totalFail = false;
	var transactions = [];

	var obj = xlsx.parse(file)[0].data;
	
	if (obj[0].length !== 4 || obj[0][0] !== 'account'
		|| obj[0][1] !== 'description'
		|| obj[0][2] !== 'currency_code'
		|| obj[0][3] !== 'amount') {
		generalResult = "Head row of the file is bad formed.";
		totalFail = true;
	}
	
	for (var i = 1; i < obj.length; i++) {
		
		console.log(obj);
		
		var accountError = fieldValidator.validateAccount(obj[i][0]);
		var descriptionError = fieldValidator
				.validateDescription(obj[i][1]);
		var currencyError = fieldValidator.validateCurrency(obj[i][2]);
		var amountError = fieldValidator.validateAmount(obj[i][3]);

		if (accountError !== "" || descriptionError !== ""
				|| currencyError !== "" || amountError !== "") {

			var errorMessage = accountError + "\n" + descriptionError + "\n"
					+ currencyError + "\n" + amountError;
			
			result.push({
				rowNumber : i,
				rowError : errorMessage
			});
		} else {
			var transaction = {
				account : obj[i][0],
				description : obj[i][1],
				currency_code : obj[i][2],
				amount : obj[i][3]
			};
			
			transactions.push(transaction);
		}
	}

	if (totalFail) {
		res.render('upload', {
			generalResult : generalResult,
			result : [ {
				rowNumber : 0,
				rowError : "Process failed."
			} ]
		});
	} else {
		if (result.length > 0) {
			generalResult = "Some ignore errors occured";
		} else {
			generalResult = "";
		}

		console.log(transactions);
		addTransactions(transactions);
		res.render('upload', {
			succesfulNumber : "Successfuly added " + transactions.length
					+ " rows.",
			generalResult : generalResult,
			result : result
		});
	}
};

module.exports.parseXLSX = parseXLSX;