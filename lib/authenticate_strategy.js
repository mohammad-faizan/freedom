var LocalStrategy = require('passport-local');
var db = require('./database_connector');

var strategy = new LocalStrategy({
	passReqToCallback: true
}, function(username, password, done){
	db.User.findOne({username: username}, function(err, user){
		if(err) return done(err);

		if(!user) return done(null, false, {message: 'Incorrect username/password'});

		if(!user.validPassword) return done(null, false, {message: 'Incorrect username/password'});

		return done(null, user);
	});
});

module.exports = strategy;