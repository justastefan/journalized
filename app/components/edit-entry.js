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

  title: '',
  store: Ember.inject.service(),

  showUpload: false,
  isShowUpload: Ember.computed('edit.coverImage', 'showUpload', function() {
    if (!this.get('edit.coverImage')) {
      return true;
    }
    if (this.get('showUpload')) {
      return true;
    }
    return false;
  }),

  actions: {
    showUpload() {
      this.set('showUpload', true);
    },
    cancelUpload() {
      this.set('showUpload', false);
    },
    deleteCoverImage() {
      this.set('edit.coverImage', null);
    },
    upload() {
      var files = this.get('files');
      for(var i=0; i < files.length; i++) {
        console.log(files[i]);
      }

      this.set('showUpload', false);
    },
    save() {
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
    delete() {
      var model = this.get('model');
      model.destroyRecord().then(()=>{
        this.attrs.onDelete();
      }).catch((error)=>{
        this.set('errorMessage', 'Failed to delete');
        console.log(error);
      });
    },
    cancel() {
      this.attrs.onCancel();
    }
  }
});
