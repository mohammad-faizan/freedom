var express = require('express');
var router = express.Router();
var db = require('../lib/database_connector');

router.get('/', function(req, res){
	res.render('login');
});

router.post('/', function(req, res){
	db.User.findOne({email: req.email}, function(err, user){
		if(err) throw err;
		res.json({
			status: 200,
			user: user
		});
	});
});

module.exports = router;