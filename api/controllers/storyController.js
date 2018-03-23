'use strict';

var mongoose = require('mongoose'),
    Story = mongoose.model('Story'),
    User = mongoose.model('User');

exports.listAllStories = (req, res) => {

    var pageOptions = {
        page: req.query.page || 0,
        limit: req.query.limit || 50
    }
    
    Story.find()
        .skip(pageOptions.page * pageOptions.limit)
        .limit(pageOptions.limit)
        .exec(function (err, doc) {
            if(err) { 
                res.status(500).json(err); 
                return; 
            };
            res.status(200).json(doc);
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
            res.send(err);
        }
        res.json(story);
    });
};

exports.updateStory = (req, res) => {
    Story.findByIdAndUpdate({ _id: req.params.storyId, author: req.user._id }, {body: req.body.body}, {new: true}, (err, story) => {
        if(err) {
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


exports.getStoryChildren = (req, res) => {
    console.log(req.params.storyId)
    Story.findById(req.params.storyId, (err, story) => {
        if(err) {
            res.code(400)
                .json({ message: `story with id: ${req.params.storyId} could not be found`});

        }
        getChildren(story.children).then( (childlist) => {
            res.send(childlist);
        })
    })
}

async function getChildren(children) {
    let childList = []
    for (let childId of children) {
        let child = await Story.findById(childId);
        childList.push(child)
    }
    return childList;
}