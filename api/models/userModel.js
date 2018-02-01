'use strict';
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    default: ''
  },
  lastName: {
    type: String,
    default: ''
  },
  profileImg: {
    type: String,
    default: ''
  },
  snippets: []
});

//Before each save we want to verify an update to the password
UserSchema.pre('save', function(callback) {
  var user = this;

  //Hash the password so it isnt saved in plaintext
  bcrypt.genSalt(5, function(err, salt) {
    if (err) 
      return callback(err);

    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) 
        return callback(err);

      user.password = hash;
      callback();
    });
  });
});

UserSchema.methods.verifyPassword = function(password, callback) {
  bcrypt.compare(password, this.password, function(err, isMatch) {
    if (err) 
      return callback(err);

    callback(null, isMatch);
  });
};

module.exports = mongoose.model('User', UserSchema);
