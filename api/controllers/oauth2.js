var oauth2orize = require('oauth2orize')
var User = require('../models/userModel');
var Client = require('../models/clientModel');
var Token = require('../models/tokenModel');
var Code = require('../models/codeModel');

var server = oauth2orize.createServer();

server.serializeClient((client, callback) => {
  return callback(null, client._id);
});

server.deserializeClient((id, callback) => {
  Client.findOne({ _id: id }, (err, client) => {
    if (err) { 
    	return callback(err); 
    }

    return callback(null, client);
  });
});

server.grant(oauth2orize.grant.code((client, redirectUri, user, ares, callback) => {
  // Create a new authorization code
  var code = new Code({
    value: uid(16),
    clientId: client._id,
    redirectUri: redirectUri,
    userId: user._id
  });

  // Save the auth code
  code.save((err) => {
    if (err) { 
    	return callback(err); 
    }

    callback(null, code.value);
  });
}));

server.exchange(oauth2orize.exchange.code((client, code, redirectUri, callback) => {
  Code.findOne({ value: code }, (err, authCode) => {
    if (err) { 
    	return callback(err); 
    }

    if (authCode === undefined) { 
    	return callback(null, false); 
    }

    if (client._id.toString() !== authCode.clientId) { 
    	return callback(null, false); 
    }

    if (redirectUri !== authCode.redirectUri) { 
    	return callback(null, false); 
    }

    // Delete auth code now that it has been used
    authCode.remove((err) => {
      if(err) { 
      	return callback(err); 
      }

      // Create a new access token
      var token = new Token({
        value: uid(256),
        clientId: authCode.clientId,
        userId: authCode.userId
      });

      // Save the access token and check for errors
      token.save((err) => {
        if (err) { 
        	return callback(err); 
        }

        callback(null, token);
      });
    });
  });
}));

//TODO: Get this working
// User authorization endpoint
exports.authorization = [
  server.authorization((clientId, redirectUri, callback) => {
  	console.log("HI!");

    Client.findOne({ id: clientId }, (err, client) => {
      if (err) { 
      	return callback(err); 
      }

      //TODO: Verify redirect

      return callback(null, client, redirectUri);
    });
  }, (client, user, done) => {
  	// TODO: Go to login page here
    // res.render('dialog', { transactionID: req.oauth2.transactionID, user: req.user, client: req.oauth2.client });

    //This should be skipping the decision phase, but for some reason we still get an error
	return done(null, true);
  })
]

// User decision endpoint
exports.decision = [
  server.decision()
]

// Application client token exchange endpoint
exports.token = [
  server.token(),
  server.errorHandler()
]


//TODO: Look into maybe doing this another way
function uid (len) {
  var buf = [],
  	chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
   	charlen = chars.length;

  for (var i = 0; i < len; ++i) {
    buf.push(chars[getRandomInt(0, charlen - 1)]);
  }

  return buf.join('');
};

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
