/*jshint node:true*/
module.exports = function(app) {
  var express = require('express');
  var userRouter = express.Router();

  var DATA = [
    {
      id: 1,
      username: 'jonson',
      password: 'test',
      email: 'j@ons.on',
      role: 'admin',
      buddies: [1,3]
    },
    {
      id: 2,
      username: 'josephine',
      password: 'test',
      email: 'jo@sephi.ne',
      role: 'guest',
      buddies: [1,3]
    },
    {
      id: 3,
      username: 'mr. x',
      password: 'test',
      email: 'm@r.x',
      role: 'guest',
      buddies: [2]
    }
  ];
  var maxId = DATA.length+1;

  userRouter.get('/', function(req, res) {
    res.send({
      'users': DATA
    });
  });

  userRouter.post('/', function(req, res) {
    // do validation
    var user = req.body.user;
    var dataFiltered = DATA.filter(function(d) {
      return d.username.toString().indexOf(user.username) > -1
      || d.email.toString().indexOf(user.email) > -1;
    });

    if (dataFiltered.length > 0) {
      res.status(400).send({ error: "user name or email already exists"});
    } else {
      var newUser = {
        id: maxId++,
        username: user.username,
        email: user.email,
        password: user.password,
        // automatically set
        role: 'guest',
        buddies: []
      }
      DATA.push(newUser);
      res.send({"user": newUser});
    }
  });

  userRouter.get('/:id', function(req, res) {
    var id = req.params.id;

    var dataFiltered = DATA.filter(function(d) {
      return id && (d.id.toString().indexOf(id) > -1);
    });
    if (dataFiltered.length >0) {
      res.send({
        'user': dataFiltered[0]
      });
    } else {
      res.status(404).end();
    }
  });

  userRouter.put('/:id', function(req, res) {
    res.send({
      'user': {
        id: req.params.id
      }
    });
  });

  userRouter.delete('/:id', function(req, res) {
    res.status(204).end();
  });

  app.use('/api/users', require('body-parser').json(), userRouter);




  var tokenRouter = express.Router();
  // token - authentication
  tokenRouter.post('/', function(req, res) {
    var dataFiltered = DATA.filter(function(d) {
      // check for email or username
      return (d.username.toString().trim().indexOf(req.body.username) > -1
      || d.email.toString().trim().indexOf(req.body.username) > -1);
    });

    if (dataFiltered.length > 0) {
      res.send({ user_id: dataFiltered[0].id, access_token: 'tokenvaluexyz' });
    } else {
      res.status(400).send({ error: "invalid username/password"});
    }
  });

    // The POST and PUT call will not contain a request body
    // because the body-parser is not included by default.
    // To use req.body, run:

    //    npm install --save-dev body-parser

    // After installing, you need to `use` the body-parser for
    // this mock uncommenting the following line:
    //
    //app.use('/api/user', require('body-parser').json());

  app.use('/api/tokens', require('body-parser').json(), tokenRouter);
};
