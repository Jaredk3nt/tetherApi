'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SnipSchema = new Schema({
  body: {
    type: String,
    required: true
  },
  likes: {
    type: Number,
    default: 0
  },
  author: {
    type: String,
    required: true
  },
  parent: {
    type: String,
    default: ''
  },
  children: [],
  Created_date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Snippet', SnipSchema);
