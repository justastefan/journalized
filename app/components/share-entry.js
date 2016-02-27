import Ember from 'ember';

export default Ember.Component.extend({
  authManager: Ember.inject.service(),
  store: Ember.inject.service(),
  unsharedUsers: Ember.computed('users', function() {
    return this.get('users').filter((user) => {
      return !this.get('sharedUsers').findBy('id', user.get('id'));
    });
  }),
  actions: {
    doShare(user) {
      console.log('share');
      //this.get('store').createRecord();
      var userEntryJson = {
        tags: '',
        rating: null,
        isAuthor: this.get('authManager.user').get('id') === this.get('entry.user.id'),
        status: 'open',
        entry: this.get('entry'),
        user: this.get('authManager.user')
      };
      var userEntry = this.get('store').createRecord('userEntry', userEntryJson);
      userEntry.save()
      .then(() => {
        this.attrs.onChange();
      })
      .catch((error) => {
        console.log(error);
      });
    },
    doUnshare(user) {
      console.log('unshare');
      this.attrs.onChange();
    }
  }
});
