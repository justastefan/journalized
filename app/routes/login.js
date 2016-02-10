import Ember from 'ember';

export default Ember.Route.extend({
  authManager: Ember.inject.service(),
  actions: {
    loginSuccessful() {
      var authManager = this.get('authManager');
      if (authManager.get('attemptedTransition')) {
        authManager.get('attemptedTransition').retry();
        authManager.set('attemptedTransition', null);
      } else {
        this.transitionTo('index');
      }
    },
    registrationSuccessful() {
      this.transitionTo('login');
    }

  }
});
