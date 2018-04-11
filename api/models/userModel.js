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
    email: {
        type: String,
        default: '',
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    stories: {
        type: Array,
        default: []
    },
    firstName: {
        type: String,
        default: ''
    },
    lastName: {
        type: String,
        default: ''
    },
    followers: {
        type: Array,
        default: []
    },
    following: {
        type: Array,
        default: []
    },
    profileImg: {
        type: String,
        default: ''
    }
});

//Before each save we want to verify an update to the password
// UserSchema.pre('save', function(callback) {
//     var user = this;
//     callback();
// });

UserSchema.methods.hashPassword = function(callback) {
    var user = this;
    bcrypt.genSalt(5, function(err, salt) {
        if (err) {
            return callback(err);
        }

        bcrypt.hash(user.password, salt, null, function(err, hash) {
            if (err) {
                return callback(err);
            }

            user.password = hash;
            user.save();
            callback();
        });
    });
}

UserSchema.methods.verifyPassword = function(password, callback) {
    bcrypt.compare(password, this.password, function(err, isMatch) {
        if (err) {
            return callback(err);
        }

        callback(null, isMatch);
    });
};

module.exports = mongoose.model('User', UserSchema);
