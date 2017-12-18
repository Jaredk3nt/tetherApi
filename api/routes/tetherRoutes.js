'use strict';

module.exports = function(app) {
    var snipper = require('../controllers/storyController'),
    userCtrl = require('../controllers/userController');

    app.route('/stories')
        .get(snipper.listAllStories)
        .post(snipper.createStory);

    app.route('/stories/:storyId')
        .get(snipper.getStory)
        .put(snipper.updateStory)
        .delete(snipper.deleteStory);

    app.route('/users')
        .get(userCtrl.listAllUsers)
        .post(userCtrl.createUser);

    app.route('/users/:userId')
        .get(userCtrl.getUser)
        .put(userCtrl.updateUser);
};
