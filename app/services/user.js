import Ember from 'ember';

export default Ember.Service.extend({
  store: Ember.inject.service(),
  actions: {
    latestEntries() {
      return this.get('store').findAll('entry');
    },
    latestEntryToUser() {
      return this.get('store').findAll('entryToUser');
    }
  }
});
