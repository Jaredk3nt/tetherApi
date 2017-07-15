'use strict';

var mongoose = require('mongoose'),
  User = mongoose.model('User');

exports.listAllUsers = (req, res) => {
  User.find({}, (err, user) => {
    if(err) {
      res.send(err);
    }
    res.json(user);
  })
};

/* update this to work with passwords */
exports.createUser = (req, res) => {
  var newUser = new User({
    username: req.body.username,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    profileImg: req.body.profileImg
  });

  newUser.save((err, user) => {
    if(err) {
      res.send(err);
    }
    res.json(user);
  })
};

exports.getUser = (req, res) => {
  User.findById(req.params.userId, (err, user) => {
    if(err) {
      res.send(err);
    }
    res.json(user);
  })
};

exports.updateUser = (req, res) => {
  User.findByIdAndUpdate(req.params.userId, {
    username: req.body.username,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    profileImg: req.body.profileImg
  }, (err, user) => {
    if(err) {
      res.send(err);
    }
    res.json(user);
  });
};
