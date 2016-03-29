import Ember from 'ember';
import SecureRoute from '../mixins/secure-route';

export default Ember.Route.extend(SecureRoute, {
  actions: {
    selectedUserEntry(userEntry) {
      this.transitionTo('journal.show', userEntry);
    },
    savedSuccessfully(entry) {
      this.transitionTo('journal.show', entry);
    }
  }
});
