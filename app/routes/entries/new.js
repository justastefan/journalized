import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    createSuccess(entry) {
        this.transitionTo('entries.show', entry);
    },
    cancelCreate() {
      this.transitionTo('entries');
    }
  }
});
