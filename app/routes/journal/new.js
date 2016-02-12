import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    createSuccess(entry) {
        this.transitionTo('journal.show', entry);
    },
    cancelCreate() {
      this.transitionTo('journal');
    }
  }
});
