import Ember from 'ember';

export default Ember.Route.extend({
  store: Ember.inject.service(),
  init() {
  },
  actions: {
    latestEntries() {
      return this.get('store').findAll('entry');
    },
    latestEntryToUser() {
      return this.get('store').findAll('entryToUser');
    }
  }
});
