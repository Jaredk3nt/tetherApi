'use strict';
module.exports = function(app, authController) {
    var storyController = require('../controllers/storyController'),
        userController = require('../controllers/userController');

    app.route('/stories')
        .get(storyController.listAllStories)
        .post(authController.isAuthenticated, storyController.createStory);

    app.route('/stories/:storyId')
        .get(authController.isAuthenticated, storyController.getStory)
        .put(authController.isAuthenticated, storyController.updateStory)
        .delete(authController.isAuthenticated, storyController.deleteStory);

    app.route('/users')
        .get(authController.isAuthenticated, userController.listAllUsers)
        .post(userController.createUser);

    app.route('/users/:userId')
        .get(authController.isAuthenticated, userController.getUser)
        .put(authController.isAuthenticated, userController.updateUser);
};
