import Ember from 'ember';

export default Ember.Component.extend({
  authManager: Ember.inject.service(),
  errorMessage: '',
  files: [],

  editEntry: Ember.computed('model', function() {
    var entry = this.get('model');
    if (entry && Ember.typeOf(entry.save) === 'function') {
      return {
        creationDate: entry.get('entry.creationDate'),
        title: entry.get('entry.title'),
        memo: entry.get('entry.memo'),
        location: entry.get('entry.location'),
        public: entry.get('entry.public'),
        images: entry.get('entry.images'),
        coverImage: entry.get('entry.coverImage'),
        author: entry.get('entry.author')
      };
    } else {
      return {
        creationDate: new Date(),
        title: '',
        memo: '',
        location: '',
        public: false,
        images: [],
        coverImage: null,
        author: this.get('authManager.user')
      };
    }
  }),

  editUserEntry: Ember.computed('model', function() {
    var entry = this.get('model');
    if (entry && Ember.typeOf(entry.save) === 'function') {
      return {
        tags: this.get('model.tags'),
        rating: this.get('model.rating'),
        status: this.get('model.status'),
        isAuthor: this.get('model.isAuthor')
      };
    } else {
      return {
        tags: '',
        rating: null,
        isAuthor: true,
        status: 'approved'
      };
    }
  }),
  isOpen: Ember.computed('editUserEntry.status', function() {
    var status = this.get('editUserEntry.status');
    return status && status.toString() === 'open';
  }),
  title: '',
  store: Ember.inject.service(),

  actions: {
    setCoverImage(image) {
      this.set('editEntry.coverImage', image);
      this.set('files', null);
    },
    doCancelUpload() {
      this.set('files', null);
    },
    doDeleteCoverImage() {
      this.set('editEntry.coverImage', null);
      this.set('files', null);
    },
    doUpload() {
      var files = this.get('files');
      for(var i=0; i < files.length; i++) {
        console.log(files[i]);
      }

      this.set('showUpload', false);
    },
    doApprove() {
      this.set('editUserEntry.status', 'approved');
      this.send('doSave');
    },
    doReject() {
      this.set('editUserEntry.status', 'rejected');
      this.send('doSave');
    },
    doSave() {
      this.set('errorMessage','');
      var model = this.get('model');
      if (model && Ember.typeOf(model.save) === 'function') {
        // model.setProperties(this.get('editEntry'));
        // model.save();
        // this.set('errorMessage', 'Missing implementation');
        model.setProperties(this.get('editUserEntry'));
        model.save()
        .then(()=>{
          // only save the "entry" when you're the author
          if (model.get('isAuthor')) {
            var id = model.get('entry.id');
            var entryProperties = this.get('editEntry');
            this.get('store').find('entry', id).then((entry)=> {
              entry.setProperties(entryProperties);
              return entry.save();
            }).catch((error)=>{
                this.set('errorMessage', 'Failed to save');
                console.log(error);
            });
          }
        }).catch((error)=>{
            this.set('errorMessage', 'Failed to save');
            console.log(error);
        });

      } else {

        var json = this.get('editEntry');
        var entry = this.get('store').createRecord('entry', json);
        entry.save()
        .then((entry) => {
          var userEntryJson = this.get('editUserEntry');
          userEntryJson.entry = entry;
          userEntryJson.user = this.get('authManager.user');
          var userEntry = this.get('store').createRecord('userEntry', userEntryJson);
          return userEntry.save();
        })
        .then((savedUserEntry) => {
          this.attrs.onSave(savedUserEntry);
        })
        .catch((error) => {
            this.set('errorMessage', 'Failed to save');
            console.log(error);
        });
        // model = this.get('store').createRecord('userEntry', {
        //   entry: entry,
        //   user: this.get('authManager.user'),
        //   status: 'approved',
        //   isAuthor: true
        // });
      }
      // model.save().then((saved)=>{
      //   this.attrs.onSave(saved);
      // }).catch((error)=>{
      //   this.set('errorMessage', 'Failed to save');
      //   console.log(error);
      // });
    },
    cancel() {
      this.attrs.onCancel();
    }
  }
});
