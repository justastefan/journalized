import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel() {
    // check if you're the author
    if (!this.modelFor('journal.show').get('isAuthor')) {
      this.transitionTo('journal.show', this.modelFor('journal.show'));
    }
  },
  store: Ember.inject.service(),
  model() {
    var entry = this.modelFor('journal.show').get('entry');
    return Ember.RSVP.hash({
      users: this.get('store').findAll('user'),
      entry: entry,
      sharedUsers: this.get('store').query('user', {entry: entry.get('id')})
    });
  },
  actions: {
    refreshRouter: function() {
      console.log('refresh');
      this.refresh();
    }
  }
});
