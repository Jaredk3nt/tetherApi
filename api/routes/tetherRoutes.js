'use strict';
module.exports = function(app, authController) {
  var storyController = require('../controllers/storyController'),
  userController = require('../controllers/userController');

  app.route('/snips')
    .get(authController.isAuthenticated, snipper.listAllSnippets)
    .post(authController.isAuthenticated, snipper.createSnippet);

  app.route('/snips/:snipId')
    .get(authController.isAuthenticated, snipper.getSnippet)
    .put(authController.isAuthenticated, snipper.updateSnippet)
    .delete(authController.isAuthenticated, snipper.deleteSnippet);

  app.route('/users')
    .get(authController.isAuthenticated, userCtrl.listAllUsers)
    .post(userCtrl.createUser);

  app.route('/users/:userId')
    .get(authController.isAuthenticated, userCtrl.getUser)
    .put(authController.isAuthenticated, userCtrl.updateUser);
};
