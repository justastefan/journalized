/*jshint node:true*/
module.exports = function(app) {
  var express = require('express');
  var entryRouter = express.Router();
  var DATA = [
    {
      id: 1,
      creationDate: '2015-11-12',
      title: 'Mountain climbing was so fun',
      memo: 'Me an Daniel spent the weekend in a place where man belong - the alps in europe. I remember us not walking for so long in a while. Fun part: Daniel had to pull me up that place I once taught him how to climb - times changed! I eventually share this post with Daniel.',
      author: 1,
      public: false,
      updated: '2016-01-01T15:23:00',
      created: '2016-01-01T15:23:00'
    },
    {
      id: 2,
      creationDate: '1958-11-02',
      title: 'Mom was born',
      memo: 'Unimaginable! No way this could happen today. But when mom was born - they didn´t go to a hospital but were stying at home. While it was snowing outside the only heat inside came from the ofen which was available only in the kitchen. I made this post public since it´s a long time ago and I want to know everybody about it. Haha',
      author: 2,
      public: true,
      updated: '2016-01-01T15:23:00',
      created: '2016-01-01T15:23:00'
    }
  ];

  entryRouter.get('/', function(req, res) {
    res.send({
      'entries': DATA
    });
  });

  entryRouter.post('/', function(req, res) {
    res.status(201).end();
  });

  entryRouter.get('/:id', function(req, res) {
    var id = req.params.id;

    var dataFiltered = DATA.filter(function(d) {
      return id && (d.id.toString().indexOf(id) > -1);
    });
    if (dataFiltered.length >0) {
      res.send({
        'entry': dataFiltered[0]
      });
    } else {
      res.status(404).end();
    }
  });

  entryRouter.put('/:id', function(req, res) {
    res.send({
      'entry': {
        id: req.params.id
      }
    });
  });

  entryRouter.delete('/:id', function(req, res) {
    res.status(204).end();
  });

  // The POST and PUT call will not contain a request body
  // because the body-parser is not included by default.
  // To use req.body, run:

  //    npm install --save-dev body-parser

  // After installing, you need to `use` the body-parser for
  // this mock uncommenting the following line:
  //
  //app.use('/api/entry', require('body-parser').json());
  app.use('/api/entries', entryRouter);
};
