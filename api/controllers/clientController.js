var Client = require('../models/clientModel');


exports.createClient = (req, res) => {
  var client = new Client();

  client.name = req.body.name;
  client.id = req.body.id;
  client.secret = req.body.secret;
  client.userId = req.user._id;

  client.save((err) => {
    if (err)
      res.send(err);

    res.json(client);
  });
};

exports.getClients = function(req, res) {
  Client.find({ userId: req.user._id }, (err, clients) => {
    if (err)
      res.send(err);

    res.json(clients);
  });
};