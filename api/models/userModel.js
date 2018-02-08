'use strict';
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        default: ''
    },
    lastName: {
        type: String,
        default: ''
    },
    profileImg: {
        type: String,
        default: ''
    },
    tokens : {
        type: Array
    },
    stories: {
        type: Array
    }
});

//Before each save we want to verify an update to the password
UserSchema.pre('save', function(callback) {
    var user = this;

    //Hash the password so it isnt saved in plaintext
    bcrypt.genSalt(5, function(err, salt) {
        if (err) {
            console.log("gen salt");
            return callback(err);
        }

        bcrypt.hash(user.password, salt, null, function(err, hash) {
            if (err) {
                console.log("hash")
                return callback(err);
            }

            user.password = hash;
            callback();
        });
    });
});

UserSchema.methods.validateToken = function(token, callback) {
    for (var t of this.tokens) {
        if (token === t) {
            callback(null, true);
            return
        }
    }
    return callback({ code: 403, message: "invalid token."}, false);
}

UserSchema.methods.verifyPassword = function(password, callback) {
    bcrypt.compare(password, this.password, function(err, isMatch) {
        if (err) {
            console.log("User: bcrypt compare")
            return callback(err);
        }

        callback(null, isMatch);
    });
};

module.exports = mongoose.model('User', UserSchema);
