var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;
var User = require('../models/userModel');

passport.use(new BasicStrategy( (username, password, callback) => {
    User.findOne({ username: username }, (err, user) => {
      if (err) { 
        return callback(err); 
      }

      if (!user) { 
        return callback(null, false); 
      }

      user.verifyPassword(password, (err, isMatch) => {
        if (err) { 
          return callback(err); 
        }

        // Password did not match
        if (!isMatch) { 
          return callback(null, false); 
        }

        // Success
        return callback(null, user);
      });
    });
  }
));

exports.isAuthenticated = passport.authenticate('basic', { session : false });