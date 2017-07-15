'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  username: {
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

module.exports = mongoose.model('User', UserSchema);
