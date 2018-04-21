'use strict';

var mongoose = require('mongoose'),
    Story = mongoose.model('Story'),
    User = mongoose.model('User');


async function getChildren(children) {
    let childList = []
    for (let childId of children) {
        let child = await Story.findById(childId);
        childList.push(child)
    }
    return childList;
}

async function getParents(story) {
    let currentStory = story;
    let parents = [currentStory]
    while( currentStory.parent.length > 0 ) {
        let parent = await Story.findById(currentStory.parent);
        parents.push(parent);
        currentStory = parent;
    }
    return parents.reverse();
}

exports.listAllStories = (req, res) => {
    var pageOptions = {
        page: req.query.page || 0,
        limit: req.query.limit || 50
    }
    
    Story.find()
        .sort({Created_date: -1})
        .skip(pageOptions.page * pageOptions.limit)
        .limit(pageOptions.limit)
        .exec(function (err, doc) {
            if (err) { 
                res.status(500).json({ message: err.message });
            } else {
                res.status(200).json(doc);
            }
        });
};

exports.createStory = (req, res) => {
    var user = req.user.user;
    if (req.body.body === '' || req.body.body.length > 600) {
        res.code(401).json({ message: 'Story is invalid and therefore cannot be posted' });
    } else {
        var newStory = new Story({
            body: req.body.body,
            author: user.username,
            authorId: user.userid,
            parent: req.body.parent
        });

        newStory.save((err, story) => {
            if (err) {
                res.status(500).json({ message: err.message });
            } else {
                /* Update the parent to include the snip in its children list */
                if (newStory.parent !== "") {
                    Story.findByIdAndUpdate(
                        newStory.parent,
                        { $push: { 
                            'children': { 
                                $each: [ newStory._id ], 
                                $position: 0 }
                            }
                        },
                        { safe: true, new : true },
                        function(err, story) {
                            if (err) {
                                console.log("Story: new story -- find story by id and update")
                                console.log('error: ' + err);
                            }
                        }
                    );
                }
                /* Update the user to link to the new snippet */
                User.findByIdAndUpdate(
                    user.userid,
                    { $push: {
                        'stories': { 
                            $each: [newStory._id], 
                            $position: 0 }
                        }
                    },
                    { safe: true, new : true },
                    function(err, user) {
                        if (err) {
                            console.log("Story: new story -- find user by id and update");
                            console.log('error: ' + err);
                        }
                    }
                );

                res.json(story);
            }
        });
    }
};

exports.getStory = (req, res) => {
    Story.findById(req.params.storyId, (err, story) => {
        if (err) {
            res.status(500).json({ message: err });
        } else {
            if (story === null || story === undefined) {
                res.status(404).json({ message: `Story with id ${req.params.storyId} not found` })
            } else {
                res.json(story);
            }
        }
    });
};

exports.updateStory = (req, res) => {
    Story.findByIdAndUpdate({ _id: req.params.storyId, author: req.user._id }, {body: req.body.body}, {new: true}, (err, story) => {
        if (err) {
            res.status(500).json({ message: err.message });
        } else {
            res.json(story);
        }
    });
};

exports.deleteStory = (req, res) => {
    Story.remove({_id: req.params.storyId, author: req.user._id}, (err, story) => {
        if (err) {
            res.status(500).json({ message: err.message });
        } else {
            if (story === null || story === undefined) {
                res.status(404).json({ message: `Story with id ${req.params.storyId} not found`});
            } else {
                res.json(story);
            }
        }
    });
};


exports.getStoryChildren = (req, res) => {
    Story.findById(req.params.storyId, (err, story) => {
        if (err) {
            res.code(500).json({ message: err.message });
        } else {
            if (story === null || story === undefined) {
                res.code(404).json({ message: `story with id: ${req.params.storyId} could not be found`});
            } else {
                getChildren(story.children)
                    .then( (childlist) => {
                        res.send(childlist);
                    });
            }
        }
    });
}

exports.getFullParentStory = (req, res) => {
    Story.findById(req.params.storyId)
        .then( (story) => {
            if(story) {
                getParents(story).then( (parents) => {
                    res.send(parents);
                });
            } else {
                res.status(404).json({ message: `Story with id ${req.params.storyId} not found`});
            }
        })
        .catch( (error) => {
            res.code(500).json({ message: error.message });
        });
}

// Likes story if the user hasn't previously or unlikes it if they already have
exports.likeStory = (req, res) => {
    Story.findById(req.params.storyId)
        .then( (story) => {
            if (story) {
                let index = story.likeUsers.indexOf(req.user.user.userid);
                if(index == -1) {
                    //like the story
                    story.likeUsers.push(req.user.user.userid);
                    story.likes++;
                    story.save();
                    res.json({ likes: story.likes, likeUsers: story.likeUsers });
                } else {
                    story.likeUsers.splice(index, 1);
                    story.likes--;
                    story.save();
                    res.json({ likes: story.likes, likeUsers: story.likeUsers });
                }
            } else {
                res.status(404).json({ message: `Story with id ${req.params.storyId} not found`});
            }
        })
        .catch( (error) => {
            res.status(500).json({ message: error.message });
        })
}

