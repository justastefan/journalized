/*jshint node:true*/
module.exports = function(app) {
  var express = require('express');
  var userRouter = express.Router();

  var DATA = [
    {
      id: 1,
      name: 'jonson',
      role: 'admin',
      buddies: [1,3]
    },
    {
      id: 2,
      name: 'josephine',
      role: 'guest',
      buddies: [1,3]
    },
    {
      id: 3,
      name: 'mr. x',
      role: 'guest',
      buddies: [2]
    }
  ];

  userRouter.get('/', function(req, res) {
    res.send({
      'users': DATA
    });
  });

  userRouter.post('/', function(req, res) {
    res.status(201).end();
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

  // The POST and PUT call will not contain a request body
  // because the body-parser is not included by default.
  // To use req.body, run:

  //    npm install --save-dev body-parser

  // After installing, you need to `use` the body-parser for
  // this mock uncommenting the following line:
  //
  //app.use('/api/user', require('body-parser').json());
  app.use('/api/users', userRouter);
};
