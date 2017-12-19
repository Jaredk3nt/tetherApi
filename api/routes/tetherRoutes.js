'use strict';
module.exports = function(app, authController) {
  var snipper = require('../controllers/snippetController'),
    userCtrl = require('../controllers/userController'),
    clientController = require('../controllers/clientController'),
    oauth2Controller = require('../controllers/oauth2');

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

  app.route('/clients')
    .post(authController.isAuthenticated, clientController.createClient)
    .get(authController.isAuthenticated, clientController.getClients);

  app.route('/oauth2/authorize')
    .get(authController.isAuthenticated, oauth2Controller.authorization)
    .post(authController.isAuthenticated, oauth2Controller.decision);

  app.route('/oauth2/token')
    .post(authController.isClientAuthenticated, oauth2Controller.token);
};
