import Ember from 'ember';

export default Ember.Component.extend({
  errorMessage: '',

  edit: Ember.computed('model', function() {
    var model = this.get('model');
    if (model && Ember.typeOf(model.save) === 'function') {
      return {
        creationDate: this.get('model.creationDate'),
        title: this.get('model.title'),
        memo: this.get('model.memo'),
        public: this.get('model.public')
      };
    } else {
      return {
        creationDate: new Date(),
        public: false
      };
    }
  }),

  title: '',
  store: Ember.inject.service(),

  actions: {
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
