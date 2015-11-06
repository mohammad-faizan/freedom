var express = require('express');
var router = express.Router();
var db = require('../lib/database_connector');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/', function(req, res){

	console.log('Received request for new user');
	var user = {
		email: req.body.email,
		name: req.body.name,
		age: req.body.age,
		gender: req.body.gender,
		password: '123456',
		created_at: new Date(),
		updated_at: new Date()
	};

	try{
		db.User.insert(user, function(err, u){
			if(err) throw err;
			console.log('New user created successfully');
			res.json(u);
		});
	}catch(err){
		console.log(err);
	}

});

module.exports = router;
