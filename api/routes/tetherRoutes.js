'use strict';
module.exports = function(app) {
  var snipper = require('../controllers/snippetController'),
  userCtrl = require('../controllers/userController');

  app.route('/snips')
    .get(snipper.listAllSnippets)
    .post(snipper.createSnippet);

  app.route('/snips/:snipId')
    .get(snipper.getSnippet)
    .put(snipper.updateSnippet)
    .delete(snipper.deleteSnippet);

  app.route('/users')
    .get(userCtrl.listAllUsers)
    .post(userCtrl.createUser);

  app.route('/users/:userId')
    .get(userCtrl.getUser)
    .put(userCtrl.updateUser);
};
