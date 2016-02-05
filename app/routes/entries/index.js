import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    createEntry() {
      this.transitionTo('entries.new');
    }
  }
});
