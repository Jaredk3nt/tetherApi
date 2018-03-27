'use strict';
module.exports = function(app, authController) {
    var storyController = require('../controllers/storyController'),
        userController = require('../controllers/userController');

    app.route('/api/stories')
        .get(storyController.listAllStories)
        .post(authController.authenticate, storyController.createStory);

    app.route('/api/stories/:storyId')
        .get(storyController.getStory)
        .put(authController.authenticate, storyController.updateStory)
        .delete(authController.authenticate, storyController.deleteStory);

    app.route('/api/children/:storyId')
        .get(storyController.getStoryChildren);

    app.route('/api/parents/:storyId')
        .get(storyController.getFullParentStory);

    app.route('/api/users')
        .get(authController.authenticate, userController.listAllUsers)
        .post(userController.createUser);

    app.route('/api/users/:userId')
        .get(authController.authenticate, userController.getUser)
        .put(authController.authenticate, userController.updateUser);

    app.route('/api/login')
        .post(userController.login);
};
