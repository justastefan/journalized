import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    editSuccess() {
      this.transitionTo('journal.show', this.currentModel);
    },
    cancelEdit() {
      this.transitionTo('journal.show', this.currentModel);
    },
    deleteSuccess() {
      this.transitionTo('journal');
    }
  }
});
