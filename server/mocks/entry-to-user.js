/*jshint node:true*/
module.exports = function(app) {
  var express = require('express');
  var entryToUserRouter = express.Router();

  var DATA = [
    {
      id: 1,
      entry: 1,
      user: 2,
      status: 1
    },
    {
      id: 2,
      entry: 2,
      user: 2,
      status: 2
    }
  ];

  entryToUserRouter.get('/', function(req, res) {
    res.send({
      'entryToUsers': DATA
    });
  });

  entryToUserRouter.post('/', function(req, res) {
    res.status(201).end();
  });

  entryToUserRouter.get('/:id', function(req, res) {
    var id = req.params.id;

    var dataFiltered = DATA.filter(function(d) {
      return id && (d.id.toString().indexOf(id) > -1);
    });
    if (dataFiltered.length >0) {
      res.send({
        'entryToUser': dataFiltered[0]
      });
    } else {
      res.status(404).end();
    }
  });

  entryToUserRouter.put('/:id', function(req, res) {
    res.send({
      'entryToUser': {
        id: req.params.id
      }
    });
  });

  entryToUserRouter.delete('/:id', function(req, res) {
    res.status(204).end();
  });

  // The POST and PUT call will not contain a request body
  // because the body-parser is not included by default.
  // To use req.body, run:

  //    npm install --save-dev body-parser

  // After installing, you need to `use` the body-parser for
  // this mock uncommenting the following line:
  //
  //app.use('/api/share_to_user', require('body-parser').json());
  app.use('/api/entryToUsers', entryToUserRouter);
};
