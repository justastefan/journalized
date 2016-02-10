import Ember from 'ember';
import SecureRoute from '../mixins/secure-route';

export default Ember.Route.extend(SecureRoute, {
  actions: {
    savedSuccessfully(entry) {
      this.transitionTo('entries.show', entry);
    }
  }
});
