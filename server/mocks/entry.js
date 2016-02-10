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
  var maxId = DATA.length+1;

  entryRouter.get('/', function(req, res) {
    res.send({
      'entries': DATA
    });
  });


    // creationDate: DS.attr('date'),
    // title: DS.attr('string'),
    // memo: DS.attr('string'),
    // author: DS.belongsTo('user'),
    // public: DS.attr('boolean'),
    // updated: DS.attr('date'),
    // created: DS.attr('date')

  entryRouter.post('/', function(req, res) {
    // do validation
    var entry = req.body.entry;

    var newEntry = {
      id: maxId++,
      title: entry.title,
      memo: entry.memo,
      creationDate: entry.creationDate,
      public: entry.public,
      // automatically set
      author: 1,
      updated: new Date(),
      created: new Date()
    }
    DATA.push(newEntry);
    res.status(201).send({"entry": newEntry});
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
    var originalSize = DATA.length;
    var removedEntry = DATA.filter(function(el) {
      return el.id !== 1*req.params.id;
    });
    if (removedEntry.length === originalSize) {
      res.status(404).end();
    } else {
      // add updated entry
      var updatedEntry = req.body.entry;
      updatedEntry.id = req.params.id*1;
      updatedEntry.updated = new Date();

      removedEntry.push(updatedEntry);
      DATA = removedEntry;
      res.send({
        "entry": updatedEntry
      });
    }
  });

  entryRouter.delete('/:id', function(req, res) {
    var originalSize = DATA.length;
    var removeEntry = DATA.filter(function(el) {
      return el.id !== 1*req.params.id;
    });
    if (removeEntry.length === originalSize) {
      res.status(404).end();
    } else {
      DATA = removeEntry;
      res.status(204).end();
    }
  });


  app.use('/api/entries', require('body-parser').json(), entryRouter);
};
