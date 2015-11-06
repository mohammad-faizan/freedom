var monk 				= require('monk');
var db 					= monk('localhost:27017/freedom');

db.User = db.get('users');
db.Comment = db.get('comments');

module.exports = db;