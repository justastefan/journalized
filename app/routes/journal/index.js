import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    createEntry() {
      this.transitionTo('journal.new');
    }
  }
});
