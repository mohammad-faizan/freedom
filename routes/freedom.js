var express 		= require('express');
var router			= express.Router();

var monk 				= require('monk');
var db 					= monk('localhost:27017/freedom');

router.get('/', function(req, res){
	var collection = db.get('comments');
	collection.find({}, function(err, comments){
		if(err) throw err;
		res.json(comments);
	});
});

module.exports = router;