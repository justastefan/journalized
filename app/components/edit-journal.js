import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  authManager: Ember.inject.service(),
  title: '',
  description: '',
  errorMessage: '',
  editJournal: Ember.computed('model', function() {
    var journal = this.get('model');
    if (journal && Ember.typeOf(journal.save) === 'function') {
      return {
        name: journal.get('name'),
        description: journal.get('description'),
        status: journal.get('status')
      };
    } else {
      return {
        name: '',
        description: '',
        status: 'private'
      };
    }
  }),

  actions: {
    doSave() {
      this.set('errorMessage','');
      var model = this.get('model');
      if (model && Ember.typeOf(model.save) === 'function') {
        model.setProperties(this.get('editJournal'));
        model.save()
        .then((savedJournal)=>{
          this.attrs.onSave(savedJournal);
        })
        .catch((error)=>{
            this.set('errorMessage', 'Failed to save');
            console.log(error);
        });

      } else {

        var json = this.get('editJournal');
        var journal = this.get('store').createRecord('journal', json);
        journal.save()
        .then((savedJournal) => {
          var journalUser = this.get('store').createRecord('journalUser', {
            journal: savedJournal,
            user: this.get('authManager.user'),
            status: 'admin'
          });
          return journalUser.save();
        })
        .then((savedJournalUser) => {
          // return the saved journal instead of the journalUser relation
          this.attrs.onSave(savedJournalUser.get('journal'));
        })
        .catch((error) => {
            this.set('errorMessage', 'Failed to save');
            console.log(error);
        });
      }
    },
    cancel() {
      this.attrs.onCancel();
    }
  }

});
