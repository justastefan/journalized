import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    editSuccess() {
      this.transitionTo('entries.show', this.currentModel);
    },
    cancelEdit() {
      this.transitionTo('entries.show', this.currentModel);
    },
    deleteSuccess() {
      this.transitionTo('entries');
    }
  }
});
