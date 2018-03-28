'use strict';

var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Story = mongoose.model('Story'),
    auth = require('./auth.js')

exports.listAllUsers = (req, res) => {
    User.find((err, users) => {
        if(err) {
            console.log("User: list all")
            res.send(err);
        }
        res.json(users);
    });
};

/* update this to work with passwords */
exports.createUser = (req, res) => {
    User.findOne({ username: req.body.username }, function (err, user) {
        if (user == null) {
            var newUser = new User({
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                profileImg: req.body.profileImg
            });
        
            newUser.save((err, user) => {
                if(err) {
                    console.log('saving user failed');
                    res.send(err);
                    return
                }
                res.cookie('auth_token', auth.generateJWT({ userid: newUser._id, username: newUser.username}), {path: '/'});
                res.json({ username: newUser.username, _id: newUser._id });
            });
        } else if (err) {
            res.json({ code: 501, message: "Creating user failed." });
        } else {
            res.json({ code: 401, message: "Username already exists." });
        }
    });
};

exports.login = (req, res) => {
    User.findOne({ username: req.body.username }, function(err, user){
        if (err) {
            res.status(502)
            res.json({ code: 502, message: "Server error: failed to login." });
        } else if(user == null) {
            res.status(402)
            res.json({ code: 402, message: "Username or password incorrect." });
        } else {
            user.verifyPassword(req.body.password, function(err, response) {
                if (err) {
                    res.json({ code: 502, message: "Server error: failed to login." });
                } else if (response == false) {
                    res.json({ code: 402, message: "Username or password incorrect." });
                } else { // User login is correct!
                    res.cookie('auth_token', auth.generateJWT({ userid: user._id, username: user.username}), {path: '/'});
                    res.json({ code: 202, _id: user._id, username: req.body.username}); 
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
        getStories(user.stories)
            .then( stories => {
                user.stories = stories;
                res.send(user);
            })
            .catch( err => {
                res.status(500).json({message: err});
            })
    });
};

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

async function getStories(stories) {
    let storyList = [];
    for (let storyId of stories) {
        let story = await Story.findById(storyId);
        storyList.push(story);
    }
    return storyList;
}