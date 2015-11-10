var passport = require('passport');

var localStrategy = require('./authenticate_strategy');

var db = require('./database_connector');

passport.use(localStrategy);

passport.serializeUser(function(user, done){
	done(null, user._id);
});

passport.deserializeUser(function(id, done){
	db.User.find({ _id: id }, function(err, user){
		done(err, user);
	});
});

module.exports = passport;