'use strict';
module.exports = function(app, authController) {
    var storyController = require('../controllers/storyController'),
        userController = require('../controllers/userController');

    app.route('/stories')
        .get(storyController.listAllStories)
        .post(authController.authenticate, storyController.createStory);

    app.route('/stories/:storyId')
        .get(storyController.getStory)
        .put(authController.authenticate, storyController.updateStory)
        .delete(authController.authenticate, storyController.deleteStory);

    app.route('/children/:storyId')
        .get(storyController.getStoryChildren);

    app.route('/parents/:storyId')
        .get(storyController.getFullParentStory);

    app.route('/users')
        .get(authController.authenticate, userController.listAllUsers)
        .post(userController.createUser);

    app.route('/users/:userId')
        .get(authController.authenticate, userController.getUser)
        .put(authController.authenticate, userController.updateUser);

    app.route('/login')
        .post(userController.login);
};
