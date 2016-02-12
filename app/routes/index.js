import Ember from 'ember';

export default Ember.Route.extend({
  authManager: Ember.inject.service(),
  model() {
    return {
      authManager: this.get('authManager')
    }
  }

});
