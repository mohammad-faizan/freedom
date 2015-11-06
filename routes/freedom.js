var express 		= require('express');
var router			= express.Router();

var monk 				= require('monk');
var db 					= monk('localhost:27017/freedom');
var db = require('../lib/database_connector');

router.get('/', function(req, res){
	var collection = db.Comment;
	collection.find({}, function(err, comments){
		if(err) throw err;
		res.json(comments);
	});
});

router.post('/', function(req, res){
	var collection = db.Comment;
	var comment = {
		name: req.body.name,
		comment: req.body.comment,
		time: req.body.time
	};
	collection.insert(comment, function(err, comment){
		if(err) throw err;
		res.json(comment);
	});
});

router.get('/:id', function(req, res){
	var collection = db.Comment;
	collection.findOne({_id: req.params.id}, function(err, comment){
		if(err) throw err;
		res.json(comment);
	});
});

router.put('/:id', function(req, res){
	var collection = db.Comment;
	collection.update({
		_id: req.params.id
	},{
		name: req.body.name,
		comment: req.body.comment,
		time: req.body.time
	},function(err, comment){
		if(err) throw err;
		res.json(comment);
	});
});

router.delete('/:id', function(req, res){
	var collection = db.Comment;
	collection.remove({ _id: req.params.id }, function(err, comment){
		if(err) throw err;
		res.json(comment);
	});
});

module.exports = router;