//Converter Class 
var fs = require("fs");
var Converter = require("csvtojson").Converter;

var fieldValidator = require('../helper/fieldValidator');

var addTransactions = require('../helper/addTransactionsToDatabase').addTransactions;

global.generalResult = "";
global.result = [];
global.totalFail = false;
global.transactions = [];

var parseCSV = function(file, req, res) {

	var fileStream = fs.createReadStream(file);

	var converter = new Converter({

		constructResult : true

	});

	// end_parsed will be emitted once parsing finished
	converter.on("end_parsed", function(jsonObj) {

		if (global.totalFail) {
			res.render('upload', {
				generalResult : global.generalResult,
				result : [ {
					rowNumber : 0,
					rowError : "Process failed."
				} ]
			});
		} else {
			if (global.result.length > 0) {
				global.generalResult = "Some ignore errors occured";
			}
			else{
				global.generalResult = "";
			}
			
			addTransactions(global.transactions);
			res.render('upload', {
				succesfulNumber: "Successfuly added " + global.transactions.length + " rows.",
				generalResult : global.generalResult,
				result : global.result
			});
		}
	});

	// record_parsed will be emitted each time a row has been parsed.
	converter.on("record_parsed", function(resultRow, rawRow, rowIndex) {

		if (Object.keys(resultRow).length !== 4
				|| Object.keys(resultRow)[0] !== 'account'
				|| Object.keys(resultRow)[1] !== 'description'
				|| Object.keys(resultRow)[2] !== 'currency_code'
				|| Object.keys(resultRow)[3] !== 'amount') {
			global.generalResult = "Head row of the file is bad formed.";
			global.totalFail = true;
		}

		var accountError = fieldValidator.validateAccount(resultRow.account);
		var descriptionError = fieldValidator
				.validateDescription(resultRow.description);
		var currencyError = fieldValidator
				.validateCurrency(resultRow.currency_code);
		var amountError = fieldValidator.validateAmount(resultRow.amount);

		if (accountError !== "" || descriptionError !== ""
				|| currencyError !== "" || amountError !== "") {

			var errorMessage = accountError + "\n" + descriptionError + "\n"
					+ currencyError + "\n" + amountError;

			global.result.push({
				rowNumber : rowIndex,
				rowError : errorMessage
			});
		}
		else{
			global.transactions.push(resultRow);
		}
	});

	// read from file
	fileStream.pipe(converter);

};

module.exports.parseCSV = parseCSV;