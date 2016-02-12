import Ember from 'ember';

export default Ember.Component.extend({
  errorMessage: '',
  files: [],

  edit: Ember.computed('model', function() {
    var model = this.get('model');
    if (model && Ember.typeOf(model.save) === 'function') {
      return {
        creationDate: this.get('model.creationDate'),
        title: this.get('model.title'),
        memo: this.get('model.memo'),
        public: this.get('model.public'),
        images: this.get('model.images'),
        coverImage: this.get('model.coverImage')
      };
    } else {
      return {
        creationDate: new Date(),
        public: false,
        images: [],
        coverImage: null
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
        model.setProperties(this.get('edit'));
      } else {
        var json = this.get('edit');
        model = this.get('store').createRecord('entry', json);
      }
      model.save().then((saved)=>{
        this.attrs.onSave(saved);
      }).catch((error)=>{
        this.set('errorMessage', 'Failed to save');
        console.log(error);
      });
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
