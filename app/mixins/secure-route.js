import Ember from 'ember';

export default Ember.Mixin.create({
  authManager: Ember.inject.service(),
  beforeModel(transition) {
    if (!this.get('authManager.isAuthenticated')) {
      transition.abort();
      this.get('authManager').set('attemptedTransition', transition);
      this.transitionTo('login');
    } else {
      return this._super(...arguments);
    }
  }
});
