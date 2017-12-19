var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;
var BearerStrategy = require('passport-http-bearer').Strategy
var User = require('../models/userModel');
var Client = require('../models/clientModel');
var Token = require('../models/tokenModel');

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

passport.use('client-basic', new BasicStrategy((username, password, callback) => {
    Client.findOne({ id: username }, (err, client) => {
      if (err) {
        return callback(err);
      }

      // No client found with that id or bad password
      if (!client || client.secret !== password) {
       return callback(null, false);
      }

      // Success
      return callback(null, client);
    });
  }
));

passport.use(new BearerStrategy((accessToken, callback) => {
    Token.findOne({ value: accessToken }, (err, token) => {
      if (err) { 
        return callback(err); 
      }

      if (!token) { 
        return callback(null, false); 
      }

      User.findOne({ _id: token.userId }, (err, user) => {
        if (err) { 
          return callback(err); 
        }

        if (!user) { 
          return callback(null, false); 
        }

        // Simple example with no scope
        callback(null, user, { scope: '*' });
      });
    });
  }
));

// exports.isAuthenticated = passport.authenticate('basic', { session : false });
exports.isAuthenticated = passport.authenticate(['basic', 'bearer'], { session : false });
exports.isClientAuthenticated = passport.authenticate('client-basic', { session : false });
exports.isBearerAuthenticated = passport.authenticate('bearer', { session: false });