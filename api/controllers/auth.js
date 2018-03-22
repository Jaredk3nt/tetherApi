var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;

var jwt = require('jsonwebtoken');
var User = require('../models/userModel');


exports.generateJWT = (user) => {
    var token = jwt.sign({ user: user }, process.env.SECRET_KEY, { expiresIn: '1d'});
    return token;
}

var verifyJWT = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.SECRET_KEY, (err, decodedToken) => {
            if (err || !decodedToken) {
                return reject(err);
            }
            resolve(decodedToken);
        });
    });
}

exports.authenticate = (req, res, next) => {
    token = req.cookies['auth_token']
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