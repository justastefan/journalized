import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    editSuccess() {
      this.transitionTo('journals.show', this.currentModel);
    },
    cancelEdit() {
      this.transitionTo('journals.show', this.currentModel);
    },
    deleteSuccess() {
      this.transitionTo('journals');
    }
  }
});
