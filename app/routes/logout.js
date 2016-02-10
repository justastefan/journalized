import Ember from 'ember';

export default Ember.Route.extend({
  authManager: Ember.inject.service(),
  beforeModel: function() {
    this.get('authManager').invalidate();
  }
});
