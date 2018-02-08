var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;
var User = require('../models/userModel');

passport.use(new BasicStrategy( (username, token, callback) => {
    User.findOne({ username: username }, (err, user) => {
        if (err) { 
            return callback(err); 
        }

        if (!user) { 
            return callback(null, false); 
        }

        user.validateToken(token, (err, isMatch)=> {
            if (err) {
                console.log("token validation error");
                return callback(err);
            } else if (!isMatch) {
                return callback(null, false);
            } else {
                return callback(null, user);
            }
        });

        // user.verifyPassword(password, (err, isMatch) => {
        //     if (err) { 
        //         return callback(err); 
        //     }

        //     // Password did not match
        //     if (!isMatch) { 
        //         return callback(null, false); 
        //     }

        //     // Success
        //     return callback(null, user);
        // });
    });
}));

exports.isAuthenticated = passport.authenticate('basic', { session : false });