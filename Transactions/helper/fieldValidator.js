var currencies = require('country-data').currencies;

var validateAccount = function(account) {

	var errorRecord = "";
	var letterNumber = /^[0-9A-Z-]+$/;

	if (!account.match(letterNumber)) {
		errorRecord = "Invalid account. Must be only capital letters or digits.";
	}

	return errorRecord;
};

var validateDescription = function(description) {

	var errorRecord = "";
	var rege = /^[^<>']+$/;

	if (!isNaN(description)) {
		errorRecord = "Invalid description type. Must be string.";
	}

	if (!description.match(rege)) {
		errorRecord = "Invalid description type.  Script may be used.";
	}

	return errorRecord;
};

var validateCurrency = function(currency) {

	var errorRecord = "";
	for (var i = 0; i < currencies.all.length; i++) {
		if (currencies.all[i].code === currency) {
			return errorRecord;
		}
	}

	errorRecord = "Invalid currency format. Must be a valid ISO 4217.";
	return errorRecord;
};

var validateAmount = function(amount) {

	var errorRecord = "";

	if (isNaN(amount)) {
		errorRecord = "Amount is NaN.";
	}

	return errorRecord;
};

module.exports.validateAccount = validateAccount;
module.exports.validateDescription = validateDescription;
module.exports.validateCurrency = validateCurrency;
module.exports.validateAmount = validateAmount;