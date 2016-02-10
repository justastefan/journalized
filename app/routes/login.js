import Ember from 'ember';

export default Ember.Route.extend({

  actions: {
    loginSuccessful() {
      this.transitionTo('index');
    },
    registrationSuccessful() {
      this.transitionTo('login');
    }

  }
});
