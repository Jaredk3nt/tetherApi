'use strict';
module.exports = function(app, authController) {
    var storyController = require('../controllers/storyController'),
        userController = require('../controllers/userController');

    app.route('/api/stories')
        .get(storyController.listAllStories)
        .post(authController.authenticate, storyController.createStory);

    app.route('/api/stories/:userId')
        .get(userController.getUsersStories);

    app.route('/api/story/:storyId')
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

    app.route('/api/user/:userId')
        .get(authController.authenticate, userController.getUser)
        .put(authController.authenticate, userController.updateUser);

    app.route('/api/login')
        .get(authController.checkLogin)
        .post(userController.login);

    app.route('/api/like/:storyId')
        .post(authController.authenticate, storyController.likeStory);
};
