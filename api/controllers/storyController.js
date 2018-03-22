'use strict';

var mongoose = require('mongoose'),
    Story = mongoose.model('Story'),
    User = mongoose.model('User');

exports.listAllStories = (req, res) => {
    Story.find({}, (err, story) => {
        if(err) {
            console.log("Story: list all");
            res.send(err);
        }
        res.json(story);
    });
};

exports.createStory = (req, res) => {
    var user = req.user.user;
    var newStory = new Story({
        body: req.body.body,
        author: user.username,
        parent: req.body.parent
    });

    newStory.save((err, story) => {
        if(err) {
            res.send(err);
        }
        /* Update the parent to include the snip in its children list */
        if (newStory.parent != "") {
            Story.findByIdAndUpdate(
                newStory.parent,
                {$push: {'children': newStory._id}},
                {safe: true, new : true},
                function(err, story) {
                    if(err) {
                        console.log("Story: new story -- find story by id and update")
                        console.log('error: ' + err);
                    }
                }
            );
        }
        /* Update the user to link to the new snippet */
        User.findByIdAndUpdate(
            user.userid,
            {$push: {'stories': newStory._id}},
            {safe: true, new : true},
            function(err, user) {
                if(err) {
                    console.log("Story: new story -- find user by id and update");
                    console.log('error: ' + err);
                }
            }
        );

        res.json(story);
    });
};

exports.getStory = (req, res) => {
    Story.findById(req.params.storyId, (err, story) => {
        if(err) {
            console.log("Story: find by id");
            res.send(err);
        }
        res.json(story);
    });
};

exports.updateStory = (req, res) => {
    Story.findByIdAndUpdate({ _id: req.params.storyId, author: req.user._id }, {body: req.body.body}, {new: true}, (err, story) => {
        if(err) {
            console.log("Story: update");
            res.send(err);
        }
        res.json(story);
    });
};

exports.deleteStory = (req, res) => {
    Story.remove({_id: req.params.storyId, author: req.user._id}, (err, story) => {
        if(err) {
            console.log("Story: delete");
            res.send(err);
        }
        res.json(story);
    });
};
