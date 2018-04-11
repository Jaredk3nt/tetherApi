'use strict';

var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Story = mongoose.model('Story'),
    auth = require('./auth.js')

exports.listAllUsers = (req, res) => {
    User.find((err, users) => {
        if(err) {
            res.status(500).json({ message: err.message });
        }
        res.json(users);
    });
};

/* update this to work with passwords */
exports.createUser = (req, res) => {
    var letters = /^[0-9a-zA-Z]+$/;
    if ( req.body.username.match(letters) ) {
        User.findOne({ username: req.body.username }, function(err, user) {
            if (user == null) {
                User.findOne({ email: req.body.email}, function(err, user) {
                    if (user == null) {
                        var newUser = new User({
                            username: req.body.username,
                            email: req.body.email,
                            password: req.body.password,
                            firstName: req.body.firstName,
                            lastName: req.body.lastName,
                            profileImg: req.body.profileImg
                        });
                        // Hash the password
                        newUser.hashPassword(function(err, response) {
                            if (err) {
                                res.status(501).json({ message: "Creating user failed." });
                            }
                        });
                        // Save the user
                        newUser.save((err, user) => {
                            if(err) {
                                res.status(501).json({ message: "Creating user failed." });
                                return
                            }
                            res.cookie('auth_token', auth.generateJWT({ userid: newUser._id, username: newUser.username}), {path: '/'});
                            res.json({ username: newUser.username, _id: newUser._id });
                        });
                    } else if (err) {
                        res.status(501).json({ message: "Creating user failed." });
                    } else {
                        res.status(401).json({ message: "Email already in use." });
                    }
                })
            } else if (err) {
                res.status(501).json({ message: "Creating user failed." });
            } else {
                res.status(401).json({ message: "Username already exists." });
            }
        });
    } else {
        res.status(403).json({ message: "Usernames can only contain letters and numbers." });
    }
};

exports.login = (req, res) => {
    console.log( req.body.username + " : logging in");
    User.findOne({ username: req.body.username }, function(err, user){
        if (err) {
            res.status(502).json({ message: "Server error: failed to login." });
        } else if(user === null) {
            res.status(401).json({ message: "User account not found." });
        } else {
            user.verifyPassword(req.body.password, function(err, response) {
                if (err) {
                    res.status(500).json({ message: "Server error: failed to login." });
                } else if (response === false) {
                    res.status(401).json({ message: "Username or password incorrect." });
                } else { // User login is correct!
                    res.cookie('auth_token', auth.generateJWT({ userid: user._id, username: user.username}), {path: '/'});
                    res.status(200).json({ _id: user._id, username: req.body.username}); 
                }
            });
        }
    });
}

exports.getUser = (req, res) => {
    User.findById(req.params.userId, (err, user) => {
        if(err) {
            res.send(err);
        }
        if(user) {
            getStories(user.stories)
                .then( stories => {
                    user.stories = stories;
                    res.send(user);
                })
                .catch( err => {
                    res.status(500).json({message: err});
                })
        }
    });
};

exports.getUserByName = (req, res) => {
    User.findOne({ username: req.params.username })
        .then( (user) => {
            if(user) {
                getStories(user.stories)
                    .then( stories => {
                        user.stories = stories;
                        res.send(user);
                        return;
                    })
                    .catch( err => {
                        res.status(500).json({message: err});
                        return;
                    })
            } else {
                res.status(400).json({message: 'User not found.'});
                return;
            }
        })
        .catch( (err) => {
            res.status(500).json({message: err});
            return;
        })
}

exports.updateUser = (req, res) => {
    User.findByIdAndUpdate(req.params.userId, {
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        profileImg: req.body.profileImg
    }, (err, user) => {
        if(err) {
            console.log("User: update")
            res.send(err);
        }
        res.json(user);
    });
};

exports.getUsersStories = (req, res) => {
    User.findById(req.params.userId)
        .then( user => {
            getStories(user.stories)
                .then( stories => {
                    res.send(stories);
                })
                .catch( err => {
                    res.status(500).json({message: err});
                })
        })
        .catch( err => {
            res.status(400).json({message: err});
        })
}

exports.followUser = (req, res) => {
    // Update followed user
    User.findById(req.params.userId)
        .then( user => {
            if (user) {
                if (!followedBy(user.followers, req.user.user.userid)) {
                    // Update the calling user
                    User.findById(req.user.user.userid)
                        .then( user2 => {
                            if (user2) {
                                // Safe to add follower data
                                user.followers.splice(0, 0, { userid: user2._id, username: user2.username });
                                user2.following.splice(0, 0, { userid: user._id, username: user.username });
                                user.save();
                                user2.save();
                                res.status(200).json({message: `succesfully followed ${req.params.userId}.`});
                            } else {
                                res.status(400).json({message: `${req.user.user.userid} could not be found.`});
                            }
                        })
                        .catch( err => {
                            res.status(500).json({message: err.message});
                        });
                } else {
                    res.status(400).json({message: `${req.params.userId} could not be found.`});
                }
            }
        })
        .catch( err => {
            res.status(500).json({message: err.message});
        });
}


// Helper Functions
async function getStories(stories) {
    let storyList = [];
    for (let storyId of stories) {
        let story = await Story.findById(storyId);
        storyList.push(story);
    }
    return storyList;
}

let followedBy = (followers, userid) => {
    for (let follower of followers) {
        if (follower.userid === userid) {
            return true;
        }
    }
    return false;
}