var jwt = require('jsonwebtoken');
var User = require('../models/userModel');


exports.generateJWT = (user) => {
    var token = jwt.sign({ user: user }, process.env.SECRET_KEY, { expiresIn: '60d'});
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
            User.findById(decodedToken.user.userid).then( (user) => {
                if(user !== null && user !== undefined) {
                    req.user = decodedToken;
                    next();
                    return;
                }
                res.status(401).json({message: 'invalid authentication'});
                return;
            })
        })        
        .catch( (err) => {
            console.log(err)
            res.status(401).json({message: 'invalid authentication'});
            return;
        });
}

exports.checkLogin = (req, res) => {
    token = req.cookies['auth_token'];
    if(token) {
        verifyJWT(token)
            .then((decodedToken) => {
                res.status(200).json({userid: decodedToken.user.userid, username: decodedToken.user.username})
            })
            .catch( (err) => {
                res.status(500).json({message: err});
            })
    } else {
        res.status(400).json({message: 'client not logged in'});
    }
}