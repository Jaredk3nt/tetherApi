'use strict';

var mongoose = require('mongoose'),
  Snippet = mongoose.model('Snippet'),
  User = mongoose.model('User');

exports.listAllSnippets = (req, res) => {
  Snippet.find({}, (err, snip) => {
    if(err) {
      res.send(err);
    }
    res.json(snip);
  });
};

exports.createSnippet = (req, res) => {
  var newSnip = new Snippet({
    body: req.body.body,
    author: req.user._id,
    parent: req.body.parent
  });

  newSnip.save((err, snip) => {

    if(err) {
      res.send(err);
    }

    /* Update the parent to include the snip in its children list */
    Snippet.findByIdAndUpdate(
      newSnip.parent,
      {$push: {'children': newSnip._id}},
      {safe: true, new : true},
      function(err, snip) {
        if(err) {
          console.log('error: ' + err);
        }
      }
    );

    /* Update the user to link to the new snippet */
    User.findByIdAndUpdate(
      newSnip.author,
      {$push: {'snippets': newSnip._id}},
      {safe: true, new : true},
      function(err, user) {
        if(err) {
          console.log('error: ' + err);
        }
      }
    );

    res.json(snip);
  });
};

exports.getSnippet = (req, res) => {
  Snippet.findById(req.params.snipId, (err, snip) => {
    if(err) {
      res.send(err);
    }
    
    res.json(snip);
  });
};

exports.updateSnippet = (req, res) => {
  Snippet.update({ _id: req.params.snipId, author: req.user._id }, {body: req.body.body}, {new: true}, (err, snip) => {
    if(err) {
      res.send(err);
    }

    res.json(snip);
  });
};

exports.deleteSnippet = (req, res) => {
  Snippet.remove({ _id: req.params.snipId, author: req.user._id }, (err, snip) => {
    if(err) {
      res.send(err);
    }

    res.json(snip);
  });
};
