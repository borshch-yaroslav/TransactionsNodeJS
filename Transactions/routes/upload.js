var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	res.render('upload', {
		title : 'Upload',
		result : {
		}
	});
});

module.exports = router;
