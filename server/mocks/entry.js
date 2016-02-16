/*jshint node:true*/
module.exports = function(app) {
  var express = require('express');
  var entryRouter = express.Router();
  var DATA = [
    {
      id: 1,
      creationDate: '2015-11-12',
      coverImage: 1,
      title: 'Mountain climbing was so fun',
      memo: 'Me an Daniel spent the weekend in a place where man belong - the alps in europe. I remember us not walking for so long in a while. Fun part: Daniel had to pull me up that place I once taught him how to climb - times changed! I eventually share this post with Daniel.',
      location: 'Germany>Alps',
      author: 1,
      public: false,
      updated: '2016-01-01T15:23:00',
      created: '2016-01-01T15:23:00',
      images: [1,2,3]
    },
    {
      id: 2,
      creationDate: '1958-11-02',
      coverImage: 3,
      title: 'Mom was born',
      memo: 'Unimaginable! No way this could happen today. But when mom was born - they didn´t go to a hospital but were stying at home. While it was snowing outside the only heat inside came from the ofen which was available only in the kitchen. I made this post public since it´s a long time ago and I want to know everybody about it. Haha',
      location: 'On a Farm',
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

  entryRouter.post('/', function(req, res) {
    // do validation
    var entry = req.body.entry;

    var newEntry = {
      id: maxId++,
      title: entry.title,
      memo: entry.memo,
      location: entry.location,
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



  var IMAGES = [
    {
      id: "1",
      "name":"b232cf85cc2933d7bcea3505ff480af4",
      "path":"https://drscdn.500px.org/photo/139584301/m%3D2048/",
      "thumb":"http://drscdn.500px.org/photo/139584301/h%3D300/5950da8e5e900779789988c44eb63b43",
    },
    {
      id: "2",
      "name":"6e491cc147d913a918a8a87e4ed88c1c",
      "path":"http://drscdn.500px.org/photo/119525409/m%3D2048/",
      "thumb":"http://drscdn.500px.org/photo/119525409/h%3D300/098e78f98bcfc3b21edf9da9fe1cd97e",
    },
    {
      id: "3",
      "name":"59c9d4969319d42f9881949fd77c87c2",
      "path":"http://drscdn.500px.org/photo/139715771/m%3D2048/",
      "thumb":"http://drscdn.500px.org/photo/139715771/h%3D300/db35b9c893becffc8327aeda3276ddfd",
    }
  ];
  var imageMaxId = IMAGES.length++;


    var imageRouter = express.Router();
    // token - authentication
    imageRouter.get('/:id', function(req, res) {
      var id = req.params.id;

      var dataFiltered = IMAGES.filter(function(d) {
        return id && (d.id.toString().indexOf(id) > -1);
      });
      if (dataFiltered.length >0) {
        res.send({
          'image': dataFiltered[0]
        });
      } else {
        res.status(404).end();
      }
    });

    imageRouter.post('/', function(req, res) {
      // do validation
      var entry = req.body.image;

      var newEntry = {
        id: imageMaxId++,
        "name":"3efed94637c50e0852b82a3c18228ce9",
        "path":"http://drscdn.500px.org/photo/140470053/q%3D80_m%3D1500/",
        "thumb":"http://drscdn.500px.org/photo/140470053/q%3D80_h%3D600/ecdc0bad1a79623543b41fd3eab1856b",
        // automatically set
        author: 1,
        updated: new Date(),
        created: new Date()
      }
      IMAGES.push(newEntry);
      res.status(201).send({"image": newEntry});
    });

    app.use('/api/images', require('body-parser').json(), imageRouter);

    var userEntryRouter = express.Router();

    var USER_ENTRIES = [
      {
        id: 1,
        entry: 1,
        user: 1,

        isAuthor: true,
        tags: 'my custom tags',
        status: 'approved',
        rating: 5
      },
      {
        id: 2,
        entry: 2,
        user: 1,

        isAuthor: false,
        tags: 'user 2 custom tags',
        status: 'open',
        rating: 4
      }
    ];

    var maxUserEntryId = USER_ENTRIES.length+1;

    userEntryRouter.get('/', function(req, res) {
      var userId = req.query.userId;
      var status = req.query.status;
      var dataFiltered = [];
      if (userId) {
        dataFiltered = USER_ENTRIES.filter(function(d) {
          return (d.user.toString() === userId) &&
          (!status || d.status === status);
        });
      }

      res.send({
        'userEntries': dataFiltered
      });
    });

    userEntryRouter.post('/', function(req, res) {
      // do validation
      var userEntry = req.body.userEntry;

      var newUserEntry = {
        id: maxUserEntryId++,
        user: userEntry.user*1,
        entry: userEntry.entry*1,
        tags: userEntry.tags,
        rating: userEntry.rating,
        status: userEntry.status,
        // should be determined by request
        isAuthor: userEntry.isAuthor,
        // automatically set
        updated: new Date(),
        created: new Date()
      };
      USER_ENTRIES.push(newUserEntry);
      res.status(201).send({"userEntry": newUserEntry});
    });

    userEntryRouter.get('/:id', function(req, res) {
      var id = req.params.id;

      var dataFiltered = USER_ENTRIES.filter(function(d) {
        return id && (d.id.toString().indexOf(id) > -1);
      });
      if (dataFiltered.length >0) {
        res.send({
          'userEntry': dataFiltered[0]
        });
      } else {
        res.status(404).end();
      }
    });

    userEntryRouter.put('/:id', function(req, res) {
      var originalSize = USER_ENTRIES.length;
      var removedEntry = USER_ENTRIES.filter(function(el) {
        return el.id !== 1*req.params.id;
      });
      if (removedEntry.length === originalSize) {
        res.status(404).end();
      } else {
        // add updated entry
        var updatedEntry = req.body.userEntry;
        updatedEntry.id = req.params.id*1;
        updatedEntry.updated = new Date();

        removedEntry.push(updatedEntry);
        USER_ENTRIES = removedEntry;
        res.send({
          "userEntry": updatedEntry
        });
      }
    });

    userEntryRouter.delete('/:id', function(req, res) {
      res.status(204).end();
    });

    app.use('/api/userEntries', require('body-parser').json(), userEntryRouter);
};
