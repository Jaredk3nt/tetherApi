var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;

var jwt = require('jsonwebtoken');
var User = require('../models/userModel');


exports.generateJWT = (user) => {
    var token = jwt.sign({ user: user }, 'shhhhh', { expiresIn: '1d'});
    return token;
}

var verifyJWT = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, 'shhhhh', (err, decodedToken) => {
            if (err || !decodedToken) {
                return reject(err);
            }
            resolve(decodedToken);
        });
    });
}

exports.authenticate = (req, res, next) => {
    token = req.cookies['auth_token']
    console.log(token)

    verifyJWT(token)
        .then((decodedToken) => {
            console.log(decodedToken);
            req.user = decodedToken;
            next();
        })        
        .catch( (err) => {
            console.log(err)
            res.status(401).json({message: 'invalid authentication'});
        });
}

passport.use(new BasicStrategy( (username, token, callback) => {
    User.findOne({ username: username }, (err, user) => {
        if (err) { 
            return callback(err); 
        }

        if (!user) { 
            return callback(null, false); 
        }

        user.validateToken(token, (err, isMatch)=> {
            if (err) {
                console.log("token validation error");
                return callback(err);
            } else if (!isMatch) {
                return callback(null, false);
            } else {
                return callback(null, user);
            }
        });

        // user.verifyPassword(password, (err, isMatch) => {
        //     if (err) { 
        //         return callback(err); 
        //     }

        //     // Password did not match
        //     if (!isMatch) { 
        //         return callback(null, false); 
        //     }

        //     // Success
        //     return callback(null, user);
        // });
    });
}));

exports.isAuthenticated = passport.authenticate('basic', { session : true });