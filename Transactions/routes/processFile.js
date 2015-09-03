var express = require('express');
var router = express.Router();

var multer = require('multer');
var upload = multer({
	dest : 'uploads/'
});
var type = upload.single('transactionsFile');

var parseCSV = require('../helper/parseCSV').parseCSV;
var parseXLSX = require('../helper/parseXLSX').parseXLSX;

router.post('/', type, function(req, res, next) {

	var dotPosition = req.file.originalname.lastIndexOf(".") + 1;

	if (req.file.originalname.substring(dotPosition) === "csv") {
		parseCSV(req.file.path, req, res);
	}
	else {
		parseXLSX(req.file.path, req, res);
	}
});

module.exports = router;